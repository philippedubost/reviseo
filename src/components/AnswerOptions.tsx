import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnswerOptionsProps {
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
  showResult: boolean;
  onAnswerSelect: (answer: string) => void;
}

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fonction pour déterminer si les options sont courtes
function areOptionsShort(options: string[]): boolean {
  return options.every(option => option.length <= 8);
}

export default function AnswerOptions({
  options,
  correctAnswer,
  selectedAnswer,
  showResult,
  onAnswerSelect
}: AnswerOptionsProps) {
  // Mélanger les options à chaque rendu pour éviter le biais de la première réponse
  const shuffledOptions = useMemo(() => {
    return shuffleArray(options);
  }, [options]);

  const isShortOptions = areOptionsShort(shuffledOptions);

  return (
    <motion.div 
      className="w-full mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${
        isShortOptions 
          ? 'grid grid-cols-2 gap-3 max-w-md mx-auto' 
          : 'flex flex-col gap-3 max-w-md mx-auto'
      }`}>
        {shuffledOptions.map((option, idx) => {
          let state = '';
          if (showResult) {
            if (option === correctAnswer) state = 'correct';
            else if (option === selectedAnswer) state = 'incorrect';
          } else if (option === selectedAnswer) state = 'selected';
          
          return (
            <motion.button
              key={`${option}-${idx}`}
              className={`answer-option text-base font-bold py-3 px-4 rounded-lg relative overflow-hidden ${
                state === 'correct' ? 'bg-[#2ecc71] text-[#181c24] border-2 border-[#2ecc71]' :
                state === 'incorrect' ? 'bg-[#ff4d6d] text-white border-2 border-[#ff4d6d]' :
                state === 'selected' ? 'bg-[#00baff] text-white border-2 border-[#00baff]' :
                'bg-[#232a36] text-white border-2 border-[#232a36]'
              } transition-all duration-200`}
              onClick={() => !showResult && onAnswerSelect(option)}
              disabled={showResult}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                ...(showResult && state === 'correct' && {
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }),
                ...(showResult && state === 'incorrect' && {
                  x: [0, -5, 5, -5, 0],
                })
              }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
                ease: [0.4, 0.0, 0.2, 1],
                ...(showResult && state === 'correct' && {
                  duration: 0.6,
                  times: [0, 0.3, 0.6, 1],
                }),
                ...(showResult && state === 'incorrect' && {
                  duration: 0.4,
                  times: [0, 0.25, 0.5, 0.75, 1],
                })
              }}
              whileHover={{ 
                scale: showResult ? 1 : 1.05,
                y: showResult ? 0 : -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: showResult ? 1 : 0.95,
                transition: { duration: 0.1 }
              }}
            >
              {/* Ripple effect for hover */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Success sparkle effect for correct answers */}
              {showResult && state === 'correct' && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      initial={{ 
                        x: "50%", 
                        y: "50%", 
                        scale: 0,
                        opacity: 1 
                      }}
                      animate={{ 
                        x: `${20 + i * 30}%`, 
                        y: `${20 + i * 20}%`, 
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0]
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  ))}
                </motion.div>
              )}
              
              <span className="relative z-10">{option}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
} 