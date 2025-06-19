'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getLessonById } from '@/src/data/lessons';
import BackToLessonsButton from '@/src/components/BackToLessonsButton';
import { useLessonProgress } from '@/src/hooks/useLessonProgress';

export default function LessonCompletePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = parseInt(params.id as string);
  
  const { totalXP, currentStreak, bestStreak, getLessonProgressPercentage } = useLessonProgress('maths');
  const lesson = getLessonById(lessonId);
  
  // Get session results from URL params
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const correct = parseInt(searchParams.get('correct') || '0');
  
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const maxScore = total;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent travail ! Tu es un champion !";
    if (percentage >= 70) return "Très bien ! Continue comme ça !";
    if (percentage >= 50) return "Bien joué ! Tu progresses !";
    return "Continue à t'entraîner, tu vas y arriver !";
  };

  const getPerformanceEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🌟";
    if (percentage >= 50) return "💪";
    return "📚";
  };

  // Get lesson progress info
  const lessonProgress = lesson ? getLessonProgressPercentage(lesson) : 0;

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col items-center px-4 pt-6">
      <h1 className="text-2xl font-bold text-white mb-6 w-full max-w-xs text-center mx-auto">Leçon terminée !</h1>
      
      {/* Completion Card */}
      <div className="w-full max-w-xs mb-6">
        <div className="card flex flex-col items-center justify-center py-6 px-4 w-full">
          {/* Celebration Animation */}
          <div className="text-6xl mb-6 animate-bounce">
            {getPerformanceEmoji()}
          </div>

          <p className="text-lg text-white mb-6 text-center">
            {getPerformanceMessage()}
          </p>

          {/* Session Results */}
          <div className="w-full mb-6">
            <div className="text-3xl font-bold text-white mb-2 text-center">
              {correct} / {total} réponses correctes
            </div>
            <div className="text-lg text-white/80 mb-4 text-center">
              {percentage}% de réussite
            </div>
            
            {/* Progress Bar */}
            <div className="progress-bar mb-4">
              <div 
                className="progress-bar-inner"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            {/* Performance Badge */}
            <div className="text-center">
              <div className="inline-block bg-[#2ecc71] text-[#181c24] px-4 py-2 rounded-full font-semibold">
                {percentage >= 90 ? "Champion" : 
                 percentage >= 70 ? "Excellent" : 
                 percentage >= 50 ? "Bien" : "En progression"}
              </div>
            </div>
          </div>

          {/* Lesson Progress vs Session */}
          <div className="w-full mb-6">
            <div className="text-center mb-3">
              <div className="text-sm text-[#b0b8c1] mb-1">Progression de la leçon</div>
              <div className="text-lg font-bold text-white">{Math.round(lessonProgress)}%</div>
            </div>
            
            {lessonProgress > 0 && (
              <div className="progress-bar mb-2">
                <div 
                  className="progress-bar-inner"
                  style={{ width: `${lessonProgress}%` }}
                ></div>
              </div>
            )}
            
            {percentage > lessonProgress && (
              <div className="text-center text-sm text-[#2ecc71]">
                🎉 Nouveau record pour cette leçon !
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-3 gap-4 mb-6 w-full">
            <div className="bg-[#232a36] rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-white font-semibold text-sm">Streak actuel</div>
              <div className="text-white/60 text-xs">{currentStreak}</div>
            </div>
            <div className="bg-[#232a36] rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-white font-semibold text-sm">XP Total</div>
              <div className="text-white/60 text-xs">{totalXP} points</div>
            </div>
            <div className="bg-[#232a36] rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-white font-semibold text-sm">Meilleur streak</div>
              <div className="text-white/60 text-xs">{bestStreak}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <Link href={`/maths/lesson/${lessonId}`}>
              <button className="btn bg-[#232a36] text-white hover:bg-[#2a323e] transition-colors">
                🔄 Recommencer
              </button>
            </Link>
            
            <BackToLessonsButton 
              subject="maths" 
              className="btn bg-[#2ecc71] text-[#181c24] hover:bg-[#27ae60] transition-colors"
            >
              📚 Autres leçons
            </BackToLessonsButton>
          </div>
        </div>
      </div>

      {/* Next Lesson Preview */}
      {lesson && (
        <div className="w-full max-w-xs">
          <div className="card p-4">
            <h3 className="text-white font-semibold mb-2">Prochaine leçon suggérée</h3>
            <p className="text-[#b0b8c1] text-sm mb-3">
              Continue ton apprentissage avec la leçon suivante
            </p>
            <Link href="/maths">
              <button className="btn bg-[#00baff] text-white hover:bg-[#0099cc] transition-colors w-full">
                📚 Voir toutes les leçons
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 