'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllLessons, type Lesson } from '../../src/data/sciencesLessons';
import StatsBadges from '../../src/components/StatsBadges';
import { useLessonProgress } from '../../src/hooks/useLessonProgress';

export default function SciencesPage() {
  const { 
    lessons, 
    totalScore, 
    completedLessons, 
    currentStreak, 
    globalProgress,
    getLessonProgressPercentage 
  } = useLessonProgress('sciences');

  const [survivalRecord, setSurvivalRecord] = useState(0);

  // Charger le record de survival depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRecord = localStorage.getItem('sciencesSurvivalRecord');
      setSurvivalRecord(savedRecord ? parseInt(savedRecord) : 0);
    }
  }, []);

  const getDifficultyIndicator = (difficulty: string) => {
    if (difficulty === 'hard') return '🔥';
    return null;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-[#2ecc71]'; // Vert pour terminé
    if (percentage > 0) return 'bg-[#00baff]'; // Bleu pour en cours
    return 'bg-[#232a36]'; // Gris pour non commencé
  };

  const getStatusText = (lesson: Lesson) => {
    const progress = getLessonProgressPercentage(lesson);
    if (progress === 100) return '✅ Terminé';
    if (progress > 0) return `En cours (${Math.round(progress)}%)`;
    return '';
  };

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Progress Bar */}
      <div className="mx-2 mt-2 mb-2">
        <div className="progress-bar">
          <div className="progress-bar-inner" style={{ width: `${globalProgress}%` }}></div>
        </div>
      </div>

      {/* Stats Badges */}
      <StatsBadges 
        streak={currentStreak}
        score={totalScore}
        completedLessons={completedLessons}
        totalLessons={lessons.length}
        showProgress={true}
      />

      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <h1 className="text-xl font-bold text-white mb-4 w-full text-center">Sciences</h1>
        
        <div className="w-full flex flex-col gap-3">
          {lessons.map((lesson) => {
            const progressPercentage = getLessonProgressPercentage(lesson);
            const progressColor = getProgressColor(progressPercentage);
            const difficultyIndicator = getDifficultyIndicator(lesson.difficulty);
            
            return (
              <div
                key={lesson.id}
                className="card flex flex-col items-center justify-center py-4 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden"
                onClick={() => window.location.assign(`/sciences/lesson/${lesson.id}`)}
              >
                {/* Difficulty Indicator */}
                {difficultyIndicator && (
                  <div className="absolute top-2 right-2 text-lg">
                    {difficultyIndicator}
                  </div>
                )}
                
                <div className="mb-1 text-3xl">{lesson.icon}</div>
                <div className="text-base font-bold text-white mb-1 text-center">{lesson.title}</div>
                <div className="text-[#b0b8c1] text-center mb-3 text-xs">{lesson.description}</div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#232a36] rounded-full overflow-hidden mb-1">
                  <div 
                    className={`h-full transition-all duration-500 ${progressColor}`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                {/* Status Text */}
                <div className="text-xs text-[#b0b8c1] text-center">
                  {getStatusText(lesson)}
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Survival Mode Button - Tout en bas */}
        <div className="w-full mt-4">
          <Link href="/sciences/practice">
            <div className="card flex flex-col items-center justify-center py-4 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-[1.02] bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24] border-2 border-transparent hover:border-[#ff6b6b]">
              <div className="mb-1 text-3xl">💀</div>
              <div className="text-base font-bold text-white mb-1 text-center">Mode Survival</div>
              <div className="text-white text-center mb-1 text-xs opacity-90">Réponds au plus de questions sans te tromper</div>
              <div className="text-white text-xs opacity-75 mb-1">Une erreur = Game Over</div>
              <div className="text-white text-xs font-bold" style={{ color: '#ffd700' }}>
                🏆 Record: {survivalRecord} questions
              </div>
            </div>
          </Link>
        </div>

        {/* Reset Scores Button */}
        <div className="w-full mt-4">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('sciencesLessonProgress');
                localStorage.removeItem('sciencesSurvivalRecord');
                localStorage.removeItem('sciencesCurrentStreak');
                window.location.reload();
              }
            }}
            className="card flex flex-col items-center justify-center py-3 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-[1.02]"
            style={{
              backgroundColor: 'rgba(220, 38, 38, 0.4)',
              border: '2px solid #dc2626',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(185, 28, 28, 0.4)';
              e.currentTarget.style.borderColor = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.4)';
              e.currentTarget.style.borderColor = '#dc2626';
            }}
          >
            <div className="mb-1 text-xl">🗑️</div>
            <div className="text-xs font-bold text-white text-center">Réinitialiser tous les scores</div>
            <div className="text-white text-center text-xs opacity-75 mt-1">Supprime progression et records</div>
          </button>
        </div>
      </div>
    </div>
  );
} 