import { useMemo } from 'react';

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
    <div className="w-full mb-6">
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
            <button
              key={`${option}-${idx}`}
              className={`answer-option text-base font-bold py-3 px-4 rounded-lg ${
                state === 'correct' ? 'bg-[#2ecc71] text-[#181c24] border-2 border-[#2ecc71]' :
                state === 'incorrect' ? 'bg-[#ff4d6d] text-white border-2 border-[#ff4d6d]' :
                state === 'selected' ? 'bg-[#00baff] text-white border-2 border-[#00baff]' :
                'bg-[#232a36] text-white border-2 border-[#232a36]'
              } transition-all duration-200`}
              onClick={() => !showResult && onAnswerSelect(option)}
              disabled={showResult}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
} 