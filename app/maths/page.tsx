'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllLessons, type Lesson } from '../../src/data/lessons';
import StatsBadges from '../../src/components/StatsBadges';
import { useLessonProgress } from '../../src/hooks/useLessonProgress';

export default function MathsPage() {
  const { 
    lessons, 
    totalXP, 
    currentStreak, 
    bestStreak,
    globalProgress,
    getLessonProgressPercentage 
  } = useLessonProgress('maths');

  const [survivalRecord, setSurvivalRecord] = useState(0);

  // Load survival record from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRecord = localStorage.getItem('mathsSurvivalRecord');
      setSurvivalRecord(savedRecord ? parseInt(savedRecord) : 0);
    }
  }, []);

  const getDifficultyIndicator = (difficulty: string) => {
    if (difficulty === 'hard') return '🔥';
    return null;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-[#2ecc71]'; // Green for excellent
    if (percentage >= 70) return 'bg-[#00baff]'; // Blue for good
    if (percentage > 0) return 'bg-[#f39c12]'; // Orange for in progress
    return 'bg-[#232a36]'; // Gray for not started
  };

  const getStatusText = (lesson: Lesson) => {
    const progress = getLessonProgressPercentage(lesson);
    if (progress >= 90) return '🏆 Excellent';
    if (progress >= 70) return `✅ Bien (${Math.round(progress)}%)`;
    if (progress > 0) return `📚 En cours (${Math.round(progress)}%)`;
    return '';
  };

  const getCompletedLessons = () => {
    return lessons.filter(lesson => getLessonProgressPercentage(lesson) > 0).length;
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
        xp={totalXP}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        completedLessons={getCompletedLessons()}
        totalLessons={lessons.length}
        showProgress={true}
        showStreaks={true}
      />

      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <h1 className="text-xl font-bold text-white mb-4 w-full text-center">Mathématiques</h1>
        
        <div className="w-full flex flex-col gap-3">
          {lessons.map((lesson) => {
            const progressPercentage = getLessonProgressPercentage(lesson);
            const progressColor = getProgressColor(progressPercentage);
            const difficultyIndicator = getDifficultyIndicator(lesson.difficulty);
            const statusText = getStatusText(lesson);

            return (
              <Link href={`/maths/lesson/${lesson.id}`} key={lesson.id} className="w-full">
                <div className="card flex flex-col items-center justify-center py-4 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden">
                  <div className="mb-1 text-3xl">{lesson.icon}</div>
                  <div className="text-base font-bold text-white mb-1 text-center">{lesson.title}</div>
                  <div className="text-[#b0b8c1] text-center mb-3 text-xs">{lesson.description}</div>
                  
                  {/* Progress indicator */}
                  {progressPercentage > 0 && (
                    <div className="w-full mb-2">
                      <div className="flex justify-between text-xs text-[#b0b8c1] mb-1">
                        <span>Progression</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full bg-[#232a36] rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Status and difficulty */}
                  <div className="flex items-center gap-2">
                    {difficultyIndicator && (
                      <span className="text-sm">{difficultyIndicator}</span>
                    )}
                    {statusText && (
                      <span className="text-xs text-[#2ecc71] font-semibold">{statusText}</span>
                    )}
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00baff] to-[#2ecc71] opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Practice Mode Card */}
        <div className="mt-4">
          <Link href="/maths/practice" className="w-full">
            <div className="card flex flex-col items-center justify-center py-4 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24]">
              <div className="mb-1 text-3xl">⚡</div>
              <div className="text-base font-bold text-white mb-1 text-center">Mode Survival</div>
              <div className="text-white/80 text-center mb-3 text-xs">Défie-toi avec des questions aléatoires</div>
              <div className="text-xs text-white/60">
                🏆 Record: {survivalRecord} questions
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 