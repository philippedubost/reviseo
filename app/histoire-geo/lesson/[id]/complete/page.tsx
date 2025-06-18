'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getLessonById } from '@/src/data/histoireGeoLessons';
import { useLessonProgress } from '@/src/hooks/useLessonProgress';
import Link from 'next/link';

export default function HistoireGeoLessonCompletePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = parseInt(params.id as string);
  const score = parseInt(searchParams.get('score') || '0');
  
  const { updateLessonProgress } = useLessonProgress('histoireGeo');
  const lesson = getLessonById(lessonId);
  
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Sauvegarder le score final
    if (lesson && score > 0) {
      updateLessonProgress(lessonId, 10, score); // 10 questions complétées
    }
    
    // Afficher les confettis après un délai
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [lesson, lessonId, score, updateLessonProgress]);

  const getScoreMessage = () => {
    const percentage = (score / 100) * 100;
    if (percentage >= 90) return 'Excellent ! 🎉';
    if (percentage >= 70) return 'Très bien ! 👍';
    if (percentage >= 50) return 'Bien ! 😊';
    return 'Continue tes efforts ! 💪';
  };

  const getScoreColor = () => {
    const percentage = (score / 100) * 100;
    if (percentage >= 90) return 'text-[#2ecc71]';
    if (percentage >= 70) return 'text-[#00baff]';
    if (percentage >= 50) return 'text-[#f39c12]';
    return 'text-[#e74c3c]';
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <button 
            onClick={() => router.push('/histoire-geo')}
            className="btn bg-[#00baff] text-white font-bold px-6 py-2 rounded-lg"
          >
            Retour aux leçons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col items-center justify-center px-4">
      {/* Confettis */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '⭐', '🏆', '🎯'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Contenu principal */}
      <div className="text-center max-w-md w-full">
        <div className="mb-6">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-white mb-2">Leçon terminée !</h1>
          <p className="text-[#b0b8c1] text-sm">{lesson.title}</p>
        </div>

        {/* Score */}
        <div className="card mb-6 p-6">
          <div className="text-4xl font-bold mb-2">
            <span className={getScoreColor()}>{score}</span>
            <span className="text-white text-2xl">/100</span>
          </div>
          <div className="text-lg text-white mb-2">{getScoreMessage()}</div>
          <div className="text-[#b0b8c1] text-sm">
            Tu as répondu à 10 questions sur 10
          </div>
        </div>

        {/* Boutons */}
        <div className="flex flex-col gap-3">
          <Link href={`/histoire-geo/lesson/${lessonId}`}>
            <button className="card w-full py-3 bg-gradient-to-r from-[#00baff] to-[#2ecc71] text-white font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]">
              🔄 Recommencer la leçon
            </button>
          </Link>
          
          <Link href="/histoire-geo">
            <button className="card w-full py-3 bg-[#232a36] text-white font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]">
              📚 Retour aux leçons
            </button>
          </Link>
          
          <Link href="/histoire-geo/practice">
            <button className="card w-full py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24] text-white font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]">
              💀 Mode Survival
            </button>
          </Link>
        </div>

        {/* Statistiques */}
        <div className="mt-6 text-[#b0b8c1] text-xs">
          <p>Progression sauvegardée automatiquement</p>
        </div>
      </div>
    </div>
  );
} 