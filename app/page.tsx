"use client";
import { dataService } from "@/src/data/simplified-service";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const levels = dataService.getAllLevels();
  const [quizPrompt, setQuizPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const placeholders = [
    "l'egypte ancienne en 6eme",
    "les flux de transports en 2de", 
    "Litterature terminale L",
    "les volcans en 4eme",
    "la guerre froide en 3eme"
  ];

  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex];
    let currentIndex = 0;
    setIsTyping(true);
    setDisplayText("");

    const typeInterval = setInterval(() => {
      if (currentIndex < currentPlaceholder.length) {
        setDisplayText(currentPlaceholder.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Pause avant de commencer à effacer
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (currentIndex > 0) {
              setDisplayText(currentPlaceholder.slice(0, currentIndex - 1));
              currentIndex--;
            } else {
              clearInterval(deleteInterval);
              // Pause avant de passer au suivant
              setTimeout(() => {
                setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
              }, 300);
            }
          }, 30);
        }, 1000);
      }
    }, 50);

    return () => {
      clearInterval(typeInterval);
    };
  }, [placeholderIndex]);

  const getLevelGradient = (levelId: string) => {
    if (levelId === 'troisieme') {
      return 'linear-gradient(to right, #667eea, #764ba2)';
    } else if (levelId === 'terminale') {
      return 'linear-gradient(to right, #4facfe, #00f2fe)';
    } else {
      return 'linear-gradient(to right, #00baff, #0099cc)';
    }
  };

  // Niveaux disponibles (cliquables)
  const availableLevels = ['troisieme'];
  
  // Niveaux à venir (grisés)
  const upcomingLevels = [
    { id: 'sixieme', name: 'Sixième', emoji: '📚', description: 'Début du collège' },
    { id: 'cinquieme', name: 'Cinquième', emoji: '🎯', description: 'Collège' },
    { id: 'quatrieme', name: 'Quatrième', emoji: '⚡', description: 'Collège' },
    { id: 'seconde', name: 'Seconde', emoji: '🚀', description: 'Début du lycée' },
    { id: 'premiere', name: 'Première', emoji: '💎', description: 'Lycée' },
    { id: 'terminale', name: 'Terminale', emoji: '👑', description: 'Bac' }
  ];

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizPrompt.trim()) {
      // Rediriger vers la page de génération avec le prompt pré-rempli
      router.push(`/generate-lesson?prompt=${encodeURIComponent(quizPrompt.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#181c24]">
      {/* Main Content */}
      <div className="flex-1 px-2 pb-16 pt-4">
        <div className="w-full flex flex-col gap-3">
          
          {/* Quizz à la carte */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-4 w-full relative overflow-hidden rounded-2xl text-white border border-[#ff6b6b] bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24] opacity-30 grayscale-[.5]"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                🎯
              </motion.div>
              <div>
                <div className="text-lg font-bold">Choisis ton propre Sujet</div>
                <div className="text-gray-200 text-sm">Crée ton propre quizz personnalisé avec l'IA</div>
              </div>
            </div>
            
            <form onSubmit={handleQuizSubmit} className="space-y-3">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={quizPrompt}
                  onChange={(e) => setQuizPrompt(e.target.value)}
                  placeholder={displayText}
                  className="flex-1 h-11 px-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-500"
                />
                <motion.button
                  type="submit"
                  className="h-11 px-4 bg-[#1a1a1a] text-white font-medium rounded-lg transition-all duration-300 ease-in-out border-2 border-white/30 whitespace-nowrap flex items-center gap-2 opacity-60 cursor-not-allowed"
                  disabled
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='text-lg'>🚀</span> Créer
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Séparateur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 my-2"
          >
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-500 text-sm">ou explore pour ton niveau</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </motion.div>

          {/* Niveaux disponibles */}
          {levels
            .filter(level => availableLevels.includes(level.id))
            .map((level, index) => (
            <motion.button
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card flex items-center justify-between p-4 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl text-white border border-[#2ecc71]"
              style={{ background: getLevelGradient(level.id) }}
              onClick={() => router.push(`/${level.id}`)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  {level.id === 'sixieme' ? '📚' : 
                   level.id === 'cinquieme' ? '🎯' : 
                   level.id === 'quatrieme' ? '⚡' : 
                   level.id === 'troisieme' ? '🏆' : 
                   level.id === 'seconde' ? '🚀' : 
                   level.id === 'premiere' ? '💎' : 
                   level.id === 'terminale' ? '👑' : '📖'}
                </motion.div>
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
              <motion.div 
                className="text-2xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          ))}

          {/* Niveaux à venir (grisés) */}
          {upcomingLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="card flex items-center justify-between p-4 w-full relative overflow-hidden rounded-2xl text-gray-400 border border-gray-600 bg-gray-800 opacity-30 cursor-not-allowed grayscale-[.5]"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{level.emoji}</div>
                <div>
                  <div className="text-lg font-bold">{level.name}</div>
                  <div className="text-gray-500 text-sm">{level.description}</div>
                </div>
              </div>
              <div className="text-2xl text-gray-500">🔒</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
