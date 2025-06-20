'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLessonProgress, type SubjectType } from '@/src/hooks/useLessonProgress';
import { getSubjectById, getAllLessonsForSubject, type Lesson } from '@/src/data/subjects';
import ProgressBar from '@/src/components/ProgressBar';
import StatsBadges from '@/src/components/StatsBadges';
import BackToLessonsButton from '@/src/components/BackToLessonsButton';

interface GenericSubjectPageProps {
  subject: SubjectType;
  subjectPath: string;
  subjectName: string;
  subjectIcon: string;
  subjectColor: string;
}

export default function GenericSubjectPage({ 
  subject, 
  subjectPath, 
  subjectName, 
  subjectIcon, 
  subjectColor
}: GenericSubjectPageProps) {
  const { 
    lessons, 
    totalXP, 
    currentStreak, 
    bestStreak, 
    globalProgress,
    getLessonProgressPercentage 
  } = useLessonProgress(subject);

  // Get subject data for additional info
  const [subjectData, setSubjectData] = useState<any>(null);
  
  useEffect(() => {
    const data = getSubjectById(subject);
    setSubjectData(data);
  }, [subject]);

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Header */}
      <div className="text-center pt-4 pb-2 px-4">
        <div className="text-4xl mb-2">{subjectIcon}</div>
        <h1 className="text-xl font-bold text-white mb-1">{subjectName}</h1>
        {subjectData && (
          <p className="text-[#b0b8c1] text-sm">{subjectData.description}</p>
        )}
      </div>

      {/* Progress Bar */}
      <ProgressBar 
        progress={globalProgress}
        score={0}
        showScore={false}
      />

      {/* Stats Badges */}
      <StatsBadges 
        xp={totalXP}
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        currentQuestion={0}
        totalQuestions={0}
        showProgress={false}
        showStreaks={true}
      />

      {/* Lessons Grid */}
      <div className="flex-1 px-4 pb-16">
        <div className="grid grid-cols-1 gap-3">
          {lessons.map((lesson) => {
            const progressPercentage = getLessonProgressPercentage(lesson);
            const isCompleted = lesson.completed;
            const isStarted = (lesson.completedQuestions || 0) > 0;
            
            return (
              <Link key={lesson.id} href={`/${subjectPath}/lesson/${lesson.id}`}>
                <div className="card p-4 cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden">
                  {/* Lesson Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{lesson.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">{lesson.title}</h3>
                        <p className="text-[#b0b8c1] text-xs">{lesson.description}</p>
                      </div>
                    </div>
                    
                    {/* Status Icon */}
                    <div className="text-lg">
                      {isCompleted ? '✅' : isStarted ? '🔄' : '⏳'}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#232a36] rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-[#2ecc71]' : 
                        isStarted ? 'bg-[#f39c12]' : 'bg-[#6c757d]'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>

                  {/* Progress Info */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#b0b8c1]">
                      {lesson.completedQuestions || 0}/{lesson.questions.length} questions
                    </span>
                    <span className={`font-semibold ${
                      isCompleted ? 'text-[#2ecc71]' : 
                      isStarted ? 'text-[#f39c12]' : 'text-[#6c757d]'
                    }`}>
                      {progressPercentage}%
                    </span>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lesson.difficulty === 'easy' ? 'bg-[#2ecc71] text-[#181c24]' :
                      lesson.difficulty === 'medium' ? 'bg-[#f39c12] text-[#181c24]' :
                      'bg-[#e74c3c] text-white'
                    }`}>
                      {lesson.difficulty === 'easy' ? 'Facile' :
                       lesson.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
                    </span>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${subjectColor} opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none`}></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Practice Mode Card */}
        <div className="mt-6">
          <Link href={`/${subjectPath}/practice`}>
            <div className="card p-4 cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden border-2 border-[#ffd700]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Mode Survival</h3>
                    <p className="text-[#b0b8c1] text-xs">Répondez au plus de questions sans vous tromper</p>
                  </div>
                </div>
                <div className="text-lg">🏆</div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 