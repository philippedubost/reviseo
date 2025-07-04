'use client';

import { useState, useEffect } from 'react';

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
  // New props for reactive animations
  lastAnswerCorrect?: boolean | null;
  showAnswerFeedback?: boolean;
  isSkipped?: boolean;
}

interface PopupAnimation {
  id: string;
  text: string;
  type: 'xp' | 'streak';
  isCorrect: boolean;
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
  subjectProgress,
  lastAnswerCorrect = null,
  showAnswerFeedback = false,
  isSkipped = false
}: StatsBadgesProps) {
  const [xpAnimation, setXpAnimation] = useState(false);
  const [streakAnimation, setStreakAnimation] = useState(false);
  const [popups, setPopups] = useState<PopupAnimation[]>([]);

  // Handle answer feedback animations
  useEffect(() => {
    if (showAnswerFeedback && lastAnswerCorrect !== null && !isSkipped) {
      // Flash animations
      setXpAnimation(true);
      setStreakAnimation(true);
      
      // Create popup animations
      const newPopups: PopupAnimation[] = [];
      
      // XP popup
      newPopups.push({
        id: `xp-${Date.now()}`,
        text: lastAnswerCorrect ? '+10' : '-5',
        type: 'xp',
        isCorrect: lastAnswerCorrect
      });
      
      // Streak popup
      if (showStreaks) {
        newPopups.push({
          id: `streak-${Date.now()}`,
          text: lastAnswerCorrect ? '+1' : '💀',
          type: 'streak',
          isCorrect: lastAnswerCorrect
        });
      }
      
      setPopups(prev => [...prev, ...newPopups]);
      
      // Reset flash animations after 300ms
      setTimeout(() => {
        setXpAnimation(false);
        setStreakAnimation(false);
      }, 300);
      
      // Remove popups after animation completes (3 seconds)
      setTimeout(() => {
        setPopups(prev => prev.filter(popup => !newPopups.find(np => np.id === popup.id)));
      }, 3000);
    }
  }, [showAnswerFeedback, lastAnswerCorrect, showStreaks, isSkipped]);

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
    <div className="mx-2 mb-2 flex justify-between items-center">
      {/* Left side: XP and Streak badges */}
      <div className="flex gap-2">
        {/* XP Badge */}
        <div className={`flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2 relative transition-all duration-300 ${
          xpAnimation ? 'bg-yellow-500 scale-110 shadow-lg shadow-yellow-500/50 animate-badgeFlash' : ''
        }`}>
          <span className="text-lg">⭐</span>
          <div className="text-white text-sm font-semibold">{xp || 0}</div>
          
          {/* XP Popup */}
          {popups.filter(p => p.type === 'xp').map((popup) => (
            <div
              key={popup.id}
              className={`absolute -top-4 left-1/2 transform -translate-x-1/2 text-sm font-bold animate-popupFloat ${
                popup.isCorrect ? 'text-yellow-400' : 'text-red-400'
              }`}
            >
              {popup.text}
            </div>
          ))}
        </div>
        
        {/* Current Streak Badge */}
        {showStreaks && (
          <div className={`flex items-center gap-2 bg-[#232a36] rounded-lg px-3 py-2 relative transition-all duration-300 ${
            streakAnimation ? 'bg-orange-500 scale-110 shadow-lg shadow-orange-500/50 animate-badgeFlash' : ''
          }`}>
            <span className="text-lg">🔥</span>
            <div className="text-white text-sm font-semibold">{currentStreak || 0}</div>
            
            {/* Streak Popup */}
            {popups.filter(p => p.type === 'streak').map((popup) => (
              <div
                key={popup.id}
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2 text-sm font-bold animate-popupFloat ${
                  popup.isCorrect ? 'text-orange-400' : 'text-red-400'
                }`}
              >
                {popup.text}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Right side: Progress bar with count - Added gap with ml-4 */}
      <div className="flex items-center gap-2 flex-1 max-w-xs ml-4">
        <div className="relative flex-1">
          <div className="progress-bar">
            <div 
              className="progress-bar-inner" 
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
        <div className="text-white text-sm font-semibold bg-[#232a36] rounded-lg px-2 py-1 min-w-[3rem] text-center">
          {getProgressDisplay()}
        </div>
      </div>
    </div>
  );
} 