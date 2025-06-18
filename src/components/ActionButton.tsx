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
  onNext
}: ActionButtonProps) {
  return (
    <div className="flex justify-center px-4 pt-4">
      {!showResult && questionType === 'calculation' ? (
        <button
          className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold w-full max-w-md"
          onClick={onVerify}
          disabled={!selectedAnswer}
        >
          Vérifier
        </button>
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