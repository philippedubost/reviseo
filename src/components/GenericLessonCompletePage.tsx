'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BackToLessonsButton from '@/src/components/BackToLessonsButton';
import type { Lesson } from '@/src/data/lessons';

interface GenericLessonCompletePageProps {
  subjectPath: string;
  subjectName: string;
  getLessonById: (id: number) => Lesson | undefined;
}

export default function GenericLessonCompletePage({ 
  subjectPath, 
  subjectName, 
  getLessonById 
}: GenericLessonCompletePageProps) {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  
  const scoreParam = searchParams.get('score');
  const totalParam = searchParams.get('total');
  const correctParam = searchParams.get('correct');
  
  const score = scoreParam ? Number(scoreParam) : 0;
  const total = totalParam ? Number(totalParam) : 0;
  const correct = correctParam ? Number(correctParam) : 0;
  const lessonId = Number(params.id);
  const lesson = getLessonById(lessonId);
  
  // Debug logging
  console.log(`${subjectName} complete page loaded:`, { score, total, correct, lessonId, lesson: !!lesson, scoreParam });
  
  // Validate score
  if (isNaN(score) || score < 0) {
    console.error('Invalid score:', scoreParam);
  }
  
  // If no score provided, redirect to lesson page
  if (!scoreParam) {
    console.log('No score provided, redirecting to lesson page');
    router.push(`/${subjectPath}/lesson/${lessonId}`);
    return null;
  }

  // Handle case where lesson is not found
  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <BackToLessonsButton subject={subjectPath as 'maths' | 'francais' | 'histoire-geo' | 'sciences'} />
        </div>
      </div>
    );
  }

  // Calculate performance metrics
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPerfect = percentage === 100;
  const isGood = percentage >= 80;
  const isPassing = percentage >= 60;

  const getPerformanceEmoji = () => {
    if (isPerfect) return '🏆';
    if (isGood) return '🎉';
    if (isPassing) return '✅';
    return '💪';
  };

  const getPerformanceMessage = () => {
    if (isPerfect) return 'Parfait ! Excellent travail !';
    if (isGood) return 'Très bien ! Continue comme ça !';
    if (isPassing) return 'Bien joué ! Tu progresses !';
    return 'Continue à t\'entraîner, tu vas y arriver !';
  };

  const getPerformanceColor = () => {
    if (isPerfect) return 'text-[#ffd700]';
    if (isGood) return 'text-[#2ecc71]';
    if (isPassing) return 'text-[#f39c12]';
    return 'text-[#e74c3c]';
  };

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Performance Display */}
        <div className="card p-6 text-center mb-6 w-full">
          <div className="text-6xl mb-4">{getPerformanceEmoji()}</div>
          <h1 className="text-2xl font-bold text-white mb-2">{getPerformanceMessage()}</h1>
          <p className="text-[#b0b8c1] mb-4">
            Tu as répondu à {correct} questions correctement sur {total}
          </p>
          
          {/* Score Display */}
          <div className={`text-4xl font-bold mb-2 ${getPerformanceColor()}`}>
            {percentage}%
          </div>
          
          {/* Score Bar */}
          <div className="w-full bg-[#232a36] rounded-full h-3 mb-4">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                isPerfect ? 'bg-[#ffd700]' :
                isGood ? 'bg-[#2ecc71]' :
                isPassing ? 'bg-[#f39c12]' : 'bg-[#e74c3c]'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          {/* Lesson Info */}
          <div className="text-sm text-[#b0b8c1]">
            <p className="font-semibold text-white">{lesson.title}</p>
            <p>{lesson.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link href={`/${subjectPath}/lesson/${lessonId}`}>
            <button className="btn bg-[#232a36] text-white hover:bg-[#2a323e] transition-colors w-full">
              🔄 Recommencer
            </button>
          </Link>
          
          <BackToLessonsButton 
            subject={subjectPath as 'maths' | 'francais' | 'histoire-geo' | 'sciences'} 
            className="btn bg-[#2ecc71] text-[#181c24] hover:bg-[#27ae60] transition-colors w-full"
          >
            📚 Autres leçons
          </BackToLessonsButton>
        </div>
      </div>

      {/* Next Lesson Preview */}
      {lesson && (
        <div className="w-full max-w-xs mt-6">
          <div className="card p-4">
            <h3 className="text-white font-semibold mb-2">Prochaine leçon suggérée</h3>
            <p className="text-[#b0b8c1] text-sm mb-3">
              Continue ton apprentissage avec la leçon suivante
            </p>
            <Link href={`/${subjectPath}`}>
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