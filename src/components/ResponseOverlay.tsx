import FlagButton from './FlagButton';

interface ResponseOverlayProps {
  show: boolean;
  isExiting: boolean;
  isCorrect: boolean;
  isSkipped?: boolean;
  explanation: string;
  countdown: number | null;
  emoji: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onNext: () => void;
  // Flagging props
  questionId?: number;
  subjectId?: string;
  lessonId?: number;
  questionText?: string;
  isPracticeMode?: boolean;
}

export default function ResponseOverlay({
  show,
  isExiting,
  isCorrect,
  isSkipped = false,
  explanation,
  countdown,
  emoji,
  isPaused,
  onTogglePause,
  onNext,
  questionId,
  subjectId,
  lessonId,
  questionText,
  isPracticeMode = false
}: ResponseOverlayProps) {
  if (!show) return null;

  // Determine background color and text based on result type
  let backgroundColor, textColor, message;
  
  if (isSkipped) {
    backgroundColor = 'bg-[#6c757d]'; // Gray for skipped
    textColor = 'text-white';
    message = 'Question passée';
  } else if (isCorrect) {
    backgroundColor = 'bg-[#2ecc71]'; // Green for correct
    textColor = 'text-[#181c24]';
    message = 'Bonne réponse !';
  } else {
    backgroundColor = 'bg-[#ff4d6d]'; // Red for incorrect
    textColor = 'text-white';
    message = 'Mauvaise réponse';
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className={`${backgroundColor} p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 pointer-events-auto relative ${isExiting ? 'animate-jumpOut' : 'animate-jumpIn'}`}>
        {/* Flag Button - Top Right */}
        {questionId && subjectId && questionText && (
          <div className="absolute top-3 right-3">
            <FlagButton
              questionId={questionId}
              subjectId={subjectId}
              lessonId={lessonId}
              questionText={questionText}
              isPracticeMode={isPracticeMode}
              className="!bg-black/20 hover:!bg-black/30"
            />
          </div>
        )}
        
        <div className="text-6xl mb-6 animate-bounceLoop">
          {isSkipped ? '⏭️' : emoji}
        </div>
        <div className={`text-2xl font-bold mb-4 ${textColor}`}>
          {message}
        </div>
        <div className={`mb-6 text-sm ${isSkipped ? 'text-white/80' : isCorrect ? 'text-[#181c24]/80' : 'text-white/80'}`}>
          {isSkipped ? (
            <div>
              <div className="mb-3">Vous avez passé cette question. Aucun point n'a été modifié.</div>
              <div className="border-t border-white/20 pt-3">{explanation}</div>
            </div>
          ) : (
            explanation
          )}
        </div>
        <div className={`text-sm mb-6 ${isSkipped ? 'text-white/60' : isCorrect ? 'text-[#181c24]/60' : 'text-white/60'}`}>
          {isPaused ? (
            <span>⏸️ Pause - Cliquez sur Suivant pour continuer</span>
          ) : (
            <span>Question suivante dans {countdown} seconde{countdown !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          {!isPaused && (
            <button
              onClick={onTogglePause}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isSkipped 
                  ? 'bg-white text-[#6c757d] hover:bg-white/90'
                  : isCorrect 
                    ? 'bg-[#181c24] text-[#2ecc71] hover:bg-[#181c24]/90' 
                    : 'bg-white text-[#ff4d6d] hover:bg-white/90'
              }`}
            >
              ⏸️ Pause
            </button>
          )}
          <button
            onClick={onNext}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isSkipped 
                ? 'bg-white text-[#6c757d] hover:bg-white/90'
                : isCorrect 
                  ? 'bg-[#181c24] text-[#2ecc71] hover:bg-[#181c24]/90' 
                  : 'bg-white text-[#ff4d6d] hover:bg-white/90'
            }`}
          >
            ➡️ Suivant
          </button>
        </div>
      </div>
    </div>
  );
} 