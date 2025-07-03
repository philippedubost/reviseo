'use client';

import { dataService } from "@/src/data/simplified-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useLessonProgress } from "@/src/hooks/useLessonProgress";
import ProgressCircle from "@/src/components/ProgressCircle";
import { useParams } from "next/navigation";
import BreadcrumbHeader from "@/src/components/BreadcrumbHeader";
import { getSubjectColors } from "@/src/utils/colors";

export default function SubjectPage() {
  const params = useParams();
  const levelId = params.level as string;
  const subjectId = params.subject as string;
  const subject = dataService.getSubjectById(subjectId as any, levelId);
  const { getLessonProgressPercentage } = useLessonProgress(subjectId as any, levelId);
  
  if (!subject) {
    notFound();
  }

  // Get subject colors from centralized system
  const subjectColors = getSubjectColors(subjectId);

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
      {/* Enhanced Header with Breadcrumb - Subject colors */}
      <BreadcrumbHeader 
        level={levelId}
        subject={subjectId}
      />

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
                href={`/${levelId}/${subjectId}/lesson/${lesson.id}`}
                className="w-full"
              >
                <div 
                  className="card flex items-center justify-between p-3 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl bg-[#232a36] text-white"
                  style={{
                    borderColor: subjectColors.border
                  }}
                >
                  {/* Subtle subject color border on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none rounded-2xl"
                    style={{
                      background: subjectColors.gradient
                    }}
                  />
                  
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
            href={`/${levelId}/${subjectId}/practice`}
            className="w-full"
          >
            <div 
              className="card flex items-center justify-center p-4 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl text-white"
              style={{
                background: `linear-gradient(135deg, ${subjectColors.primary}, ${subjectColors.secondary})`
              }}
            >
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