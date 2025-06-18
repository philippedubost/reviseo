interface AnswerOptionsProps {
  options: string[];
  correctAnswer: string;
  selectedAnswer: string;
  showResult: boolean;
  onAnswerSelect: (answer: string) => void;
}

export default function AnswerOptions({
  options,
  correctAnswer,
  selectedAnswer,
  showResult,
  onAnswerSelect
}: AnswerOptionsProps) {
  return (
    <div className="w-full px-4">
      <div className="flex flex-col gap-3 max-w-md mx-auto">
        {options.map((option, idx) => {
          let state = '';
          if (showResult) {
            if (option === correctAnswer) state = 'correct';
            else if (option === selectedAnswer) state = 'incorrect';
          } else if (option === selectedAnswer) state = 'selected';
          
          return (
            <button
              key={idx}
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