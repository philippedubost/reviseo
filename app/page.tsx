"use client";
import { dataService } from "@/src/data/simplified-service";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const levels = dataService.getAllLevels();

  const getLevelGradient = (levelId: string) => {
    if (levelId === 'troisieme') {
      return 'linear-gradient(to right, #667eea, #764ba2)';
    } else if (levelId === 'terminale') {
      return 'linear-gradient(to right, #4facfe, #00f2fe)';
    } else {
      return 'linear-gradient(to right, #00baff, #0099cc)';
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
          {levels.map((level) => (
            <button
              key={level.id}
              className="card flex items-center justify-between p-4 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl text-white border border-[#2ecc71]"
              style={{ background: getLevelGradient(level.id) }}
              onClick={() => router.push(`/${level.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">
                  {level.id === 'sixieme' ? '📚' : 
                   level.id === 'cinquieme' ? '🎯' : 
                   level.id === 'quatrieme' ? '⚡' : 
                   level.id === 'troisieme' ? '🏆' : 
                   level.id === 'seconde' ? '🚀' : 
                   level.id === 'premiere' ? '💎' : 
                   level.id === 'terminale' ? '👑' : '📖'}
                </div>
                <div>
                  <div className="text-lg font-bold">{level.name}</div>
                  <div className="text-gray-300 text-sm">
                    {level.id === 'troisieme' ? 'Brevet' : 
                     level.id === 'terminale' ? 'Bac' : 
                     level.id === 'sixieme' ? 'Début du collège' :
                     level.id === 'cinquieme' ? 'Collège' :
                     level.id === 'quatrieme' ? 'Collège' :
                     level.id === 'seconde' ? 'Début du lycée' :
                     level.id === 'premiere' ? 'Lycée' : 'Lycée'}
                  </div>
                </div>
              </div>
              <div className="text-2xl">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
