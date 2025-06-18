'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getLessonById } from '@/src/data/histoireGeoLessons';
import BackToLessonsButton from '@/src/components/BackToLessonsButton';

export default function HistoireGeoLessonCompletePage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  
  const scoreParam = searchParams.get('score');
  const score = scoreParam ? Number(scoreParam) : 0;
  const lessonId = Number(params.id);
  const lesson = getLessonById(lessonId);
  
  // Debug logging
  console.log('Histoire-Géo complete page loaded:', { score, lessonId, lesson: !!lesson, scoreParam });
  
  // Validate score
  if (isNaN(score) || score < 0) {
    console.error('Invalid score:', scoreParam);
  }
  
  // If no score provided, redirect to lesson page
  if (!scoreParam) {
    console.log('No score provided, redirecting to lesson page');
    router.push(`/histoire-geo/lesson/${lessonId}`);
    return null;
  }
  
  // Calculate max score dynamically based on the lesson
  const maxScore = lesson ? lesson.questions.reduce((total, q) => total + q.points, 0) : 50;
  const percentage = Math.round((score / maxScore) * 100);

  // Handle case where lesson is not found
  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <BackToLessonsButton subject="histoire-geo" />
        </div>
      </div>
    );
  }

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent ! Tu es un champion ! 🏆";
    if (percentage >= 70) return "Très bien ! Continue comme ça ! 🌟";
    if (percentage >= 50) return "Bien ! Tu progresses ! 💪";
    return "Pas mal ! Continue à t'entraîner ! 📚";
  };

  const getPerformanceEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🌟";
    if (percentage >= 50) return "💪";
    return "📚";
  };

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

          {/* Score Display */}
          <div className="w-full mb-6">
            <div className="text-3xl font-bold text-white mb-2 text-center">
              {score} / {maxScore} points
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

          {/* Achievements */}
          <div className="grid grid-cols-3 gap-4 mb-6 w-full">
            <div className="bg-[#232a36] rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-white font-semibold text-sm">Streak</div>
              <div className="text-white/60 text-xs">5</div>
            </div>
            <div className="bg-[#232a36] rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-white font-semibold text-sm">Score</div>
              <div className="text-white/60 text-xs">{score} points</div>
            </div>
            <div className="bg-[#232a36] rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-white font-semibold text-sm">Précision</div>
              <div className="text-white/60 text-xs">{percentage}%</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <Link href={`/histoire-geo/lesson/${lessonId}`}>
              <button className="btn bg-[#232a36] text-white hover:bg-[#2a323e] transition-colors">
                🔄 Recommencer
              </button>
            </Link>
            
            <BackToLessonsButton 
              subject="histoire-geo" 
              className="btn bg-[#2ecc71] text-[#181c24] hover:bg-[#27ae60] transition-colors"
            >
              📚 Autres leçons
            </BackToLessonsButton>
            
            {/* Debug button for testing */}
            <button 
              onClick={() => console.log('Complete page test:', { score, maxScore, percentage, lessonId })}
              className="btn bg-[#ff6b6b] text-white hover:bg-[#ff5252] transition-colors"
            >
              🐛 Debug Info
            </button>
          </div>
        </div>
      </div>

      {/* Next Lesson Preview */}
      {lessonId === 1 && (
        <div className="w-full max-w-xs">
          <div className="card flex flex-col py-6 px-4 w-full">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Prochaine leçon</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">🌍</div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-white">Seconde Guerre mondiale</h4>
                <p className="text-white/80 text-sm">1939-1945, génocide</p>
              </div>
            </div>
            <Link href="/histoire-geo/lesson/2">
              <button className="btn bg-[#00baff] text-white hover:bg-[#0099cc] transition-colors">
                Commencer
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 