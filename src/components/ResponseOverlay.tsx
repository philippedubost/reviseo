interface ResponseOverlayProps {
  show: boolean;
  isExiting: boolean;
  isCorrect: boolean;
  explanation: string;
  countdown: number | null;
  emoji: string;
  isPaused: boolean;
  onTogglePause: () => void;
  onNext: () => void;
}

export default function ResponseOverlay({
  show,
  isExiting,
  isCorrect,
  explanation,
  countdown,
  emoji,
  isPaused,
  onTogglePause,
  onNext
}: ResponseOverlayProps) {
  if (!show) return null;

  const backgroundColor = isCorrect ? 'bg-[#2ecc71]' : 'bg-[#ff4d6d]';
  const textColor = isCorrect ? 'text-[#181c24]' : 'text-white';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className={`${backgroundColor} p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4 pointer-events-auto ${isExiting ? 'animate-jumpOut' : 'animate-jumpIn'}`}>
        <div className="text-6xl mb-6 animate-bounceLoop">
          {emoji}
        </div>
        <div className={`text-2xl font-bold mb-4 ${textColor}`}>
          {isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse'}
        </div>
        <div className={`mb-6 text-sm ${isCorrect ? 'text-[#181c24]/80' : 'text-white/80'}`}>
          {explanation}
        </div>
        <div className={`text-sm mb-6 ${isCorrect ? 'text-[#181c24]/60' : 'text-white/60'}`}>
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
                isCorrect 
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
              isCorrect 
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