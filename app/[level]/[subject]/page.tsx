'use client';

import { dataService } from "@/src/data/simplified-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useLessonProgress } from "@/src/hooks/useLessonProgress";
import ProgressCircle from "@/src/components/ProgressCircle";

interface SubjectPageProps {
  params: {
    level: string;
    subject: string;
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const subject = dataService.getSubjectById(params.subject, params.level);
  const { getLessonProgressPercentage } = useLessonProgress(params.subject as any, params.level);
  
  if (!subject) {
    notFound();
  }

  // Function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
        return 'bg-green-500';
      case 'moyen':
        return 'bg-orange-500';
      case 'difficile':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header avec navigation */}
      <div className="px-4 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Link href={`/${params.level}`} className="text-white text-lg">←</Link>
          <div>
            <h1 className="text-xl font-bold text-white">{subject.name}</h1>
            <p className="text-sm text-gray-400">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <h2 className="text-lg font-bold text-white mb-4 w-full text-center">Mes Leçons</h2>
        
        {/* Lesson Cards */}
        <div className="w-full flex flex-col gap-3">
          {subject.lessons.map((lesson) => {
            const progress = getLessonProgressPercentage(lesson);
            return (
              <Link 
                key={lesson.id} 
                href={`/${params.level}/${params.subject}/lesson/${lesson.id}`}
                className="w-full"
              >
                <div className="card flex items-center justify-between p-3 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl bg-[#232a36] text-white">
                  <div className="flex items-center gap-3 w-full">
                    <div className="text-2xl">{lesson.icon}</div>
                    <div className="flex-1">
                      <div className="text-base font-bold">{lesson.title}</div>
                      <div className="text-[10px] text-gray-300">{lesson.description}</div>
                    </div>
                    
                    {/* Progress Circle */}
                    <ProgressCircle progress={progress} size={45} strokeWidth={4} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Practice Button */}
        <div className="mt-6">
          <Link 
            href={`/${params.level}/${params.subject}/practice`}
            className="w-full"
          >
            <div className="card flex items-center justify-center p-4 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🎯</div>
                <div className="text-lg font-bold">Mode Entraînement</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 