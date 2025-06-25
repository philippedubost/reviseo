'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { dataService } from '@/src/data/simplified-service';
import ConfettiManager from '@/src/components/ConfettiManager';
import { useLessonProgress, SubjectType } from '@/src/hooks/useLessonProgress';

interface PracticeCompletePageProps {
  params: {
    level: string;
    subject: string;
  };
}

export default function PracticeCompletePage({ params }: PracticeCompletePageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subjectId = params.subject as SubjectType;
  const levelId = params.level;
  
  const score = Number(searchParams.get('score')) || 0;
  const total = Number(searchParams.get('total')) || 0;
  const correct = Number(searchParams.get('correct')) || 0;
  
  const subject = dataService.getSubjectById(subjectId, levelId);
  const { totalXP, currentStreak, bestStreak } = useLessonProgress(subjectId, levelId);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181c24] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Matière non trouvée</h2>
          <Link href={`/${levelId}`}>
            <button className="btn">Retour aux matières</button>
          </Link>
        </div>
      </div>
    );
  }

  const getScoreMessage = () => {
    if (score >= 90) return "Excellent entraînement ! 🏆";
    if (score >= 80) return "Très bon entraînement ! 🌟";
    if (score >= 70) return "Bon entraînement ! 👍";
    if (score >= 60) return "Entraînement correct ! 😊";
    return "Continue à t'entraîner ! 💪";
  };

  const getScoreColor = () => {
    if (score >= 90) return "text-yellow-400";
    if (score >= 80) return "text-green-400";
    if (score >= 70) return "text-blue-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Confetti for completion */}
      <ConfettiManager
        currentStreak={currentStreak}
        previousStreak={0}
        isLessonComplete={true}
        subjectColor={subject.color}
      />

      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Link href={`/${levelId}/${subjectId}`} className="text-white text-lg">←</Link>
          <div>
            <h1 className="text-xl font-bold text-white">Entraînement terminé !</h1>
            <p className="text-sm text-gray-400">{subject.name}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 flex flex-col items-center justify-center">
        {/* Score Display */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-2">{getScoreMessage()}</h2>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>
            {score}%
          </div>
          <div className="text-gray-400">
            {correct} bonnes réponses sur {total} questions
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-md mb-8">
          <div className="bg-[#232a36] rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">XP Total :</span>
              <span className="text-white font-bold">{totalXP}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Série actuelle :</span>
              <span className="text-white font-bold">{currentStreak}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Meilleure série :</span>
              <span className="text-white font-bold">{bestStreak}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3">
          <Link href={`/${levelId}/${subjectId}/practice`}>
            <button className="btn bg-[#2ecc71] text-white w-full">
              🔄 Nouvel entraînement
            </button>
          </Link>
          
          <Link href={`/${levelId}/${subjectId}`}>
            <button className="btn bg-[#3498db] text-white w-full">
              📚 Voir les leçons
            </button>
          </Link>
          
          <Link href={`/${levelId}`}>
            <button className="btn bg-[#232a36] text-white w-full">
              🏠 Autres matières
            </button>
          </Link>
          
          <Link href="/">
            <button className="btn bg-[#6c757d] text-white w-full">
              🏠 Accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 