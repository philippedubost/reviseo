interface StatsBadgesProps {
  xp?: number;
  currentStreak?: number;
  bestStreak?: number;
  currentQuestion?: number;
  totalQuestions?: number;
  completedLessons?: number;
  totalLessons?: number;
  showProgress?: boolean;
  showStreaks?: boolean;
}

export default function StatsBadges({ 
  xp, 
  currentStreak, 
  bestStreak,
  currentQuestion, 
  totalQuestions, 
  completedLessons, 
  totalLessons,
  showProgress = false,
  showStreaks = true
}: StatsBadgesProps) {
  const getProgressPercentage = () => {
    if (showProgress && totalLessons && completedLessons !== undefined) {
      return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    }
    if (currentQuestion && totalQuestions) {
      return totalQuestions > 0 ? Math.round((currentQuestion / totalQuestions) * 100) : 0;
    }
    return 0;
  };

  return (
    <div className="mx-2 mb-2">
      <div className="flex justify-between mb-2">
        {/* XP Badge */}
        <div className="flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2">
          <span className="text-lg">⭐</span>
          <div className="text-white text-sm font-semibold">{xp || 0}</div>
        </div>
        
        {/* Current Streak Badge */}
        {showStreaks && (
          <div className="flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2">
            <span className="text-lg">🔥</span>
            <div className="text-white text-sm font-semibold">{currentStreak || 0}</div>
          </div>
        )}
        
        {/* Progress Badge */}
        <div className="flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2">
          <span className="text-lg">📊</span>
          <div className="text-white text-sm font-semibold">{getProgressPercentage()}%</div>
        </div>
      </div>
      
      {/* Best Streak Display (if available) */}
      {showStreaks && bestStreak && bestStreak > 0 && (
        <div className="flex justify-center mb-2">
          <div className="flex items-center gap-1 bg-[#2ecc71] rounded-lg px-2 py-1">
            <span className="text-sm">🏆</span>
            <span className="text-white text-xs font-semibold">Meilleur: {bestStreak}</span>
          </div>
        </div>
      )}
      
      {/* Separator line */}
      <div className="h-px bg-gray-600"></div>
    </div>
  );
} 