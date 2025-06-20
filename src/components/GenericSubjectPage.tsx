'use client';

import { useLessonProgress, type Subject } from '@/src/hooks/useLessonProgress';
import StatsBadges from '@/src/components/StatsBadges';
import Link from 'next/link';
import type { Lesson } from '@/src/data/lessons';

interface GenericSubjectPageProps {
  subject: Subject;
  subjectPath: string;
  subjectName: string;
  lessons: Lesson[];
  getLessonProgressPercentage: (lesson: Lesson) => number;
}

export default function GenericSubjectPage({ 
  subject, 
  subjectPath, 
  subjectName, 
  lessons, 
  getLessonProgressPercentage 
}: GenericSubjectPageProps) {
  const { totalXP, currentStreak, bestStreak, globalProgress } = useLessonProgress(subject);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-[#2ecc71]';
    if (percentage >= 60) return 'bg-[#f39c12]';
    if (percentage >= 40) return 'bg-[#e67e22]';
    return 'bg-[#e74c3c]';
  };

  const getDifficultyIndicator = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  const getStatusText = (lesson: Lesson) => {
    if (lesson.completed) return '✅ Terminée';
    if (lesson.completedQuestions > 0) return '🔄 En cours';
    return '⏳ À faire';
  };

  const getCompletedLessons = () => {
    return lessons.filter(lesson => lesson.completed).length;
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
        <h1 className="text-xl font-bold text-white mb-4 w-full text-center">{subjectName}</h1>
        
        <div className="w-full flex flex-col gap-3">
          {lessons.map((lesson) => {
            const progressPercentage = getLessonProgressPercentage(lesson);
            const progressColor = getProgressColor(progressPercentage);
            const difficultyIndicator = getDifficultyIndicator(lesson.difficulty);
            const statusText = getStatusText(lesson);

            return (
              <Link href={`/${subjectPath}/lesson/${lesson.id}`} key={lesson.id} className="w-full">
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
                  <div className="flex justify-between items-center w-full text-xs">
                    <span className="text-[#b0b8c1]">{statusText}</span>
                    <span className="text-[#b0b8c1]">{difficultyIndicator} {lesson.difficulty}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 