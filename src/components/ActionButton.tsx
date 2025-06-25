import { useEffect } from 'react';

interface ActionButtonProps {
  showResult: boolean;
  showOverlay: boolean;
  questionType: 'multiple-choice' | 'calculation' | 'input';
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        if (showOverlay) {
          // If overlay is showing, trigger Suivant
          onNext();
        } else if (!showResult) {
          // If not showing result, trigger Vérifier for input/calculation or handle multiple choice
          if (questionType === 'calculation' || questionType === 'input') {
            if (selectedAnswer.trim()) {
              onVerify();
            }
          }
          // For multiple choice, the answer is already selected when clicked
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showOverlay, showResult, questionType, selectedAnswer, onVerify, onNext]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {!showResult ? (
        <div className="flex flex-row gap-2 w-full">
          {/* Main action button (Valider/Vérifier) - pour calculation et input */}
          {(questionType === 'calculation' || questionType === 'input') && (
            <button
              className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold flex-1"
              onClick={onVerify}
              disabled={!selectedAnswer}
              style={{ minWidth: 0 }}
            >
              Vérifier
            </button>
          )}
          {/* Skip button - toujours visible, désactivé si une réponse est sélectionnée */}
          <button
            className="btn bg-[#6c757d] text-white text-sm hover:bg-[#5a6268] transition-colors border border-[#495057] flex-1"
            onClick={onSkip}
            disabled={!!selectedAnswer || !onSkip}
            style={{ minWidth: 0 }}
          >
            ⏭️ Passer
          </button>
        </div>
      ) : null}
    </div>
  );
} 