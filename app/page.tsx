"use client";
import { dataService } from "@/src/data/simplified-service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import StudentDashboard from "@/src/components/StudentDashboard";

export default function Home() {
  const router = useRouter();
  const levels = dataService.getAllLevels();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleElements, setVisibleElements] = useState({
    title: false,
    levels: Array(7).fill(false)
  });

  useEffect(() => {
    // Start the staggered animation sequence
    const timer1 = setTimeout(() => setVisibleElements(prev => ({ ...prev, title: true })), 200);
    
    // Animate levels one by one with 200ms intervals
    const levelTimers = [1, 2, 3, 4, 5, 6, 7].map((_, index) => 
      setTimeout(() => {
        setVisibleElements(prev => ({
          ...prev,
          levels: prev.levels.map((level, i) => i === index ? true : level)
        }));
      }, 600 + (index * 200))
    );

    // End loading state after all animations
    const finalTimer = setTimeout(() => setIsLoading(false), 600 + (7 * 200) + 300);

    return () => {
      clearTimeout(timer1);
      levelTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(finalTimer);
    };
  }, []);

  const getLevelGradient = (levelId: string) => {
    switch (levelId) {
      case 'sixieme':
        return 'linear-gradient(135deg, #3d4fcc 0%, #5a2b8a 100%)'; // Dark saturated purple-blue
      case 'cinquieme':
        return 'linear-gradient(135deg, #c04dd8 0%, #c02a4a 100%)'; // Dark saturated pink to coral
      case 'quatrieme':
        return 'linear-gradient(135deg, #1a6ad8 0%, #00a4b4 100%)'; // Dark saturated light blue
      case 'troisieme':
        return 'linear-gradient(135deg, #1aa053 0%, #0ab08d 100%)'; // Dark saturated green to turquoise
      case 'seconde':
        return 'linear-gradient(135deg, #c03a6a 0%, #c08a2a 100%)'; // Dark saturated pink to yellow
      case 'premiere':
        return 'linear-gradient(135deg, #4a9a97 0%, #aa6570 100%)'; // Dark saturated mint to pink
      case 'terminale':
        return 'linear-gradient(135deg, #c04a5e 0%, #aa6594 100%)'; // Dark saturated rose gold
      default:
        return 'linear-gradient(135deg, #3d4fcc 0%, #5a2b8a 100%)';
    }
  };

  // Ordered levels from 6ème to terminale
  const levelOrder = ['sixieme', 'cinquieme', 'quatrieme', 'troisieme', 'seconde', 'premiere', 'terminale'];
  
  // All levels are available
  const availableLevels = levelOrder;
  
  // No upcoming levels for now
  const upcomingLevels: { id: string; name: string; emoji: string; description: string }[] = [];

  const getLevelEmoji = (levelId: string) => {
    switch (levelId) {
      case 'sixieme': return '🌱'; // Growing/beginning
      case 'cinquieme': return '📚'; // Books/studying
      case 'quatrieme': return '🎯'; // Target/focus
      case 'troisieme': return '⚡'; // Energy/power
      case 'seconde': return '🚀'; // Rocket/acceleration
      case 'premiere': return '💎'; // Diamond/precious
      case 'terminale': return '👑'; // Crown/mastery
      default: return '📖';
    }
  };

  const getLevelDescription = (levelId: string) => {
    switch (levelId) {
      case 'sixieme': return 'Début du collège';
      case 'cinquieme': return 'Collège - Approfondissement';
      case 'quatrieme': return 'Collège - Consolidation';
      case 'troisieme': return 'Brevet - Préparation';
      case 'seconde': return 'Début du lycée';
      case 'premiere': return 'Lycée - Spécialisation';
      case 'terminale': return 'Bac - Excellence';
      default: return 'Lycée';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#181c24]">
      {/* Student Dashboard */}
      <StudentDashboard />

      {/* Level Selection Header */}
      <div className="px-4 py-4">
        <h1 
          className={`text-xl font-bold text-white text-center transition-all duration-700 ease-out ${
            visibleElements.title 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}
        >
          Choisis ton niveau
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <div className="w-full flex flex-col gap-1">
          {/* Available levels in order */}
          {levelOrder
            .map(levelId => levels.find(level => level.id === levelId))
            .filter(level => level && availableLevels.includes(level.id))
            .map((level, index) => (
            <button
              key={level!.id}
              className={`card flex items-center justify-between p-4 w-full cursor-pointer transition-all duration-700 ease-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl text-white border border-white/20 shadow-lg ${
                visibleElements.levels[index]
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-0 transform -translate-x-full'
              }`}
              style={{ background: getLevelGradient(level!.id) }}
              onClick={() => router.push(`/${level!.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl drop-shadow-lg">
                  {getLevelEmoji(level!.id)}
                </div>
                <div>
                  <div className="text-lg font-bold drop-shadow-md">{level!.name}</div>
                  <div className="text-white/90 text-sm font-medium">
                    {getLevelDescription(level!.id)}
                  </div>
                </div>
              </div>
              <div className="text-2xl drop-shadow-lg">→</div>
            </button>
          ))}

          {/* Upcoming levels (empty for now) */}
          {upcomingLevels.map((level) => (
            <div
              key={level.id}
              className="card flex items-center justify-between p-4 w-full relative overflow-hidden rounded-2xl text-gray-400 border border-gray-600 bg-gray-800 opacity-60 cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{level.emoji}</div>
                <div>
                  <div className="text-lg font-bold">{level.name}</div>
                  <div className="text-gray-500 text-sm">{level.description}</div>
                </div>
              </div>
              <div className="text-2xl text-gray-500">🔒</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
