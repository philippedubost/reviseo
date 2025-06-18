interface StatsBadgesProps {
  streak: number;
  score: number;
  currentQuestion?: number;
  totalQuestions?: number;
  completedLessons?: number;
  totalLessons?: number;
  showProgress?: boolean;
}

export default function StatsBadges({ 
  streak, 
  score, 
  currentQuestion, 
  totalQuestions, 
  completedLessons, 
  totalLessons,
  showProgress = false 
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
        {/* Streak Badge */}
        <div className="flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2">
          <span className="text-lg">🔥</span>
          <div className="text-white text-sm font-semibold">{streak}</div>
        </div>
        
        {/* Score Badge */}
        <div className="flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2">
          <span className="text-lg">⭐</span>
          <div className="text-white text-sm font-semibold">{score}</div>
        </div>
        
        {/* Progress Badge */}
        <div className="flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2">
          <span className="text-lg">📊</span>
          <div className="text-white text-sm font-semibold">{getProgressPercentage()}%</div>
        </div>
      </div>
      {/* Ligne de démarcation */}
      <div className="h-px bg-gray-600"></div>
    </div>
  );
} 