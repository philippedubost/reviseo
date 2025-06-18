'use client';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LessonCompletePage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  
  const score = Number(searchParams.get('score')) || 0;
  const lessonId = Number(params.id);
  const maxScore = 50; // Total possible score for lesson 1
  const percentage = Math.round((score / maxScore) * 100);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link href="/maths" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Reviseo Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white">Reviseo</h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          {/* Completion Card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/30 text-center">
            {/* Celebration Animation */}
            <div className="text-6xl mb-6 animate-bounce">
              {getPerformanceEmoji()}
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Leçon terminée !
            </h2>

            <p className="text-xl text-white/90 mb-8">
              {getPerformanceMessage()}
            </p>

            {/* Score Display */}
            <div className="bg-white/20 rounded-3xl p-6 mb-8">
              <div className="text-3xl font-bold text-white mb-2">
                {score} / {maxScore} points
              </div>
              <div className="text-lg text-white/80 mb-4">
                {percentage}% de réussite
              </div>
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full p-1 mb-4">
                <div 
                  className="bg-yellow-400 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              {/* Performance Badge */}
              <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold">
                {percentage >= 90 ? "Champion" : 
                 percentage >= 70 ? "Excellent" : 
                 percentage >= 50 ? "Bien" : "En progression"}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-2">🔥</div>
                <div className="text-white font-semibold">Streak</div>
                <div className="text-white/60 text-sm">5 réponses</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-white font-semibold">Score</div>
                <div className="text-white/60 text-sm">{score} points</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-white font-semibold">Précision</div>
                <div className="text-white/60 text-sm">{percentage}%</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/maths/lesson/${lessonId}`}>
                <button className="w-full sm:w-auto bg-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors border-2 border-white/30">
                  🔄 Recommencer
                </button>
              </Link>
              
              <Link href="/maths">
                <button className="w-full sm:w-auto bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                  📚 Autres leçons
                </button>
              </Link>
            </div>
          </div>

          {/* Next Lesson Preview */}
          {lessonId === 1 && (
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Prochaine leçon</h3>
              <div className="flex items-center space-x-4">
                <div className="text-4xl">⚖️</div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">Équations</h4>
                  <p className="text-white/80 text-sm">Équations du premier degré</p>
                </div>
                <Link href="/maths/lesson/2">
                  <button className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                    Commencer
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 