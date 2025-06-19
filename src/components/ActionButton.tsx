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
          {/* Action buttons row */}
          <div className="flex gap-2 w-[95%] mx-auto">
            {/* Main action button (Valider/Vérifier) - only for calculation questions */}
            {questionType === 'calculation' && (
              <button
                className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold flex-1"
                onClick={onVerify}
                disabled={!selectedAnswer}
              >
                Vérifier
              </button>
            )}
            
            {/* Skip button - only show when no answer is selected */}
            {!selectedAnswer && onSkip && (
              <button
                className={`btn bg-[#6c757d] text-white text-sm hover:bg-[#5a6268] transition-colors border border-[#495057] ${
                  questionType === 'calculation' ? 'flex-1' : 'w-[95%] mx-auto'
                }`}
                onClick={onSkip}
              >
                ⏭️ Passer
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
} 