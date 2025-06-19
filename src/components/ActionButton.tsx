interface ActionButtonProps {
  showResult: boolean;
  showOverlay: boolean;
  questionType: 'multiple-choice' | 'calculation';
  selectedAnswer: string;
  isCorrect: boolean;
  countdown: number | null;
  isLastQuestion: boolean;
  isPaused: boolean;
  onVerify: () => void;
  onNext: () => void;
  onSkip?: () => void;
}

export default function ActionButton({
  showResult,
  showOverlay,
  questionType,
  selectedAnswer,
  isCorrect,
  countdown,
  isLastQuestion,
  isPaused,
  onVerify,
  onNext,
  onSkip
}: ActionButtonProps) {
  return (
    <div className="flex flex-col gap-2">
      {!showResult ? (
        <div className="flex flex-col gap-2">
          {questionType === 'calculation' ? (
            <button
              className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold w-full max-w-md"
              onClick={onVerify}
              disabled={!selectedAnswer}
            >
              Vérifier
            </button>
          ) : (
            <button
              className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold w-full max-w-md"
              onClick={onVerify}
              disabled={!selectedAnswer}
            >
              Valider
            </button>
          )}
          
          {/* Skip button - only show when no answer is selected */}
          {!selectedAnswer && onSkip && (
            <button
              className="btn bg-[#6c757d] text-white text-sm w-full max-w-md opacity-80 hover:opacity-100 transition-opacity"
              onClick={onSkip}
            >
              ⏭️ Passer cette question
            </button>
          )}
        </div>
      ) : showResult && (!showOverlay || isPaused) ? (
        <button
          className={`btn text-lg font-bold w-full max-w-md ${isCorrect ? 'bg-[#00baff] text-white' : 'bg-[#ff4d6d] text-white'}`}
          onClick={onNext}
        >
          {isLastQuestion ? 'Terminer' : `Question suivante${countdown !== null && !isPaused ? ` (${countdown})` : ''}`}
        </button>
      ) : null}
    </div>
  );
} 