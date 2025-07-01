"use client";
import { dataService } from "@/src/data/simplified-service";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const levels = dataService.getAllLevels();

  const getLevelGradient = (levelId: string) => {
    switch (levelId) {
      case 'sixieme':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Soft purple-blue
      case 'cinquieme':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'; // Pink to coral
      case 'quatrieme':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'; // Light blue
      case 'troisieme':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'; // Green to turquoise
      case 'seconde':
        return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'; // Pink to yellow
      case 'premiere':
        return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'; // Mint to pink
      case 'terminale':
        return 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%, #fecfef 100%)'; // Rose gold
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
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
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white text-center">Choisis ton niveau</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <div className="w-full flex flex-col gap-3">
          {/* Available levels in order */}
          {levelOrder
            .map(levelId => levels.find(level => level.id === levelId))
            .filter(level => level && availableLevels.includes(level.id))
            .map((level) => (
            <button
              key={level!.id}
              className="card flex items-center justify-between p-4 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl text-white border border-white/20 shadow-lg"
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
