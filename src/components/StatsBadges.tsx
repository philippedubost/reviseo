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
  subjectProgress?: number;
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
  showStreaks = true,
  subjectProgress
}: StatsBadgesProps) {
  const getProgressPercentage = () => {
    if (subjectProgress !== undefined) {
      return subjectProgress;
    }
    if (showProgress && totalLessons && completedLessons !== undefined) {
      return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    }
    if (currentQuestion && totalQuestions) {
      return totalQuestions > 0 ? Math.round((currentQuestion / totalQuestions) * 100) : 0;
    }
    return 0;
  };

  const getProgressDisplay = () => {
    if (currentQuestion && totalQuestions) {
      return `${currentQuestion}/${totalQuestions}`;
    }
    return `${getProgressPercentage()}%`;
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
          <div className="text-white text-sm font-semibold">{getProgressDisplay()}</div>
        </div>
      </div>
      
      {/* Separator line */}
      <div className="h-px bg-gray-600"></div>
    </div>
  );
} 