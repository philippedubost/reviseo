'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useLessonProgress, type SubjectType } from '@/src/hooks/useLessonProgress';
import { getLessonById } from '@/src/data/subjects';
import type { Lesson } from '@/src/data/types';
import BackToLessonsButton from './BackToLessonsButton';
import ProgressBar from './ProgressBar';
import StatsBadges from './StatsBadges';
import ActionButton from './ActionButton';

interface GenericLessonCompletePageProps {
  subjectPath: string;
}

// Mapping from subject path to Subject type
const subjectPathToType: Record<string, SubjectType> = {
  'maths': 'maths',
  'francais': 'francais',
  'sciences': 'sciences'
};

export default function GenericLessonCompletePage({ 
  subjectPath
}: GenericLessonCompletePageProps) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = parseInt(params.id as string);
  
  const subject = subjectPathToType[subjectPath];
  const { updateLessonProgress, totalXP, currentStreak, bestStreak } = useLessonProgress(subject);
  
  // Get session data from URL params
  const sessionScore = parseInt(searchParams.get('score') || '0');
  const totalQuestions = parseInt(searchParams.get('total') || '0');
  const correctAnswers = parseInt(searchParams.get('correct') || '0');
  
  // Get lesson data
  const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
  
  // Ref to track if progress has been saved to prevent infinite re-renders
  const progressSavedRef = useRef(false);
  
  useEffect(() => {
    const currentLesson = getLessonById(subject, lessonId);
    setLesson(currentLesson);
  }, [subject, lessonId]);
  
  // Calculate percentage
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  
  // Determine emoji and message based on performance
  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        emoji: '🏆',
        message: 'Excellent ! Vous maîtrisez parfaitement cette leçon !',
        color: 'text-[#ffd700]'
      };
    } else if (percentage >= 70) {
      return {
        emoji: '🎉',
        message: 'Très bien ! Vous avez une bonne compréhension.',
        color: 'text-[#2ecc71]'
      };
    } else if (percentage >= 50) {
      return {
        emoji: '👍',
        message: 'Pas mal ! Continuez à vous entraîner.',
        color: 'text-[#f39c12]'
      };
    } else {
      return {
        emoji: '💪',
        message: 'Ne vous découragez pas ! La pratique rend parfait.',
        color: 'text-[#e74c3c]'
      };
    }
  };
  
  const performance = getPerformanceData();
  
  // Save progress when component mounts (only once)
  useEffect(() => {
    if (lesson && sessionScore > 0 && !progressSavedRef.current) {
      progressSavedRef.current = true;
      updateLessonProgress(lessonId, sessionScore, totalQuestions, correctAnswers);
    }
  }, [lesson, lessonId, sessionScore, totalQuestions, correctAnswers, updateLessonProgress]);
  
  const handleRetry = () => {
    router.push(`/${subjectPath}/lesson/${lessonId}`);
  };
  
  const handleNextLesson = () => {
    // Find next lesson
    const nextLessonId = lessonId + 1;
    router.push(`/${subjectPath}/lesson/${nextLessonId}`);
  };
  
  const handleBackToLessons = () => {
    router.push(`/${subjectPath}`);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <BackToLessonsButton subject={subjectPath as 'maths' | 'francais' | 'sciences'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Header */}
      <div className="text-center pt-8 pb-6 px-4">
        <div className="text-6xl mb-4">{performance.emoji}</div>
        <h1 className="text-2xl font-bold text-white mb-2">Leçon terminée !</h1>
        <p className={`text-lg font-semibold ${performance.color} mb-2`}>
          {performance.message}
        </p>
        <p className="text-[#b0b8c1] text-sm">{lesson.title}</p>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Score Card */}
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{percentage}%</div>
            <div className="text-[#b0b8c1] text-xs">Score</div>
          </div>
          
          {/* Questions Card */}
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{correctAnswers}/{totalQuestions}</div>
            <div className="text-[#b0b8c1] text-xs">Réponses correctes</div>
          </div>
        </div>
      </div>

      {/* XP and Streak Info */}
      <div className="px-4 mb-6">
        <div className="card p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#b0b8c1] text-sm">XP Total</span>
            <span className="text-white font-semibold">{totalXP}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#b0b8c1] text-sm">Série actuelle</span>
            <span className="text-white font-semibold">{currentStreak}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#b0b8c1] text-sm">Meilleure série</span>
            <span className="text-white font-semibold">{bestStreak}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mb-6 space-y-3">
        <button
          onClick={handleRetry}
          className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          🔄 Réessayer
        </button>
        
        <button
          onClick={handleNextLesson}
          className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          ➡️ Leçon suivante
        </button>
        
        <button
          onClick={handleBackToLessons}
          className="w-full bg-[#95a5a6] hover:bg-[#7f8c8d] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          📚 Retour aux leçons
        </button>
      </div>
    </div>
  );
} 