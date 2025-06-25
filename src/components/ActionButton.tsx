import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="flex flex-col gap-2 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {!showResult ? (
        <div className="flex flex-row gap-2 w-full">
          {/* Skip button - toujours visible, désactivé si une réponse est sélectionnée */}
          <motion.button
            className="btn bg-[#6c757d] text-white text-sm hover:bg-[#5a6268] transition-colors border border-[#495057] flex-1 relative overflow-hidden"
            onClick={onSkip}
            style={{ minWidth: 0 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.1 }
            }}
            disabled={!!selectedAnswer || !onSkip}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Animated emoji */}
            <motion.span
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              ⏭️
            </motion.span>
            <span className="ml-1">Passer</span>
          </motion.button>
        </div>
      ) : null}
    </motion.div>
  );
} 