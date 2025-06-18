'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Question {
  id: number;
  type: 'multiple-choice' | 'calculation' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

const lessonData = {
  1: {
    title: "Calcul numérique",
    questions: [
      {
        id: 1,
        type: 'multiple-choice' as const,
        question: "Quelle est la valeur de 2³ × 2² ?",
        options: ["2⁵", "2⁶", "2⁷", "2⁸"],
        correctAnswer: "2⁵",
        explanation: "2³ × 2² = 2^(3+2) = 2⁵ = 32",
        points: 10
      },
      {
        id: 2,
        type: 'calculation' as const,
        question: "Calcule : √16 + √9",
        correctAnswer: 7,
        explanation: "√16 = 4 et √9 = 3, donc √16 + √9 = 4 + 3 = 7",
        points: 15
      },
      {
        id: 3,
        type: 'multiple-choice' as const,
        question: "Quelle fraction est équivalente à 0,75 ?",
        options: ["1/4", "2/3", "3/4", "4/5"],
        correctAnswer: "3/4",
        explanation: "0,75 = 75/100 = 3/4",
        points: 10
      },
      {
        id: 4,
        type: 'true-false' as const,
        question: "La racine carrée de 25 est 5",
        options: ["Vrai", "Faux"],
        correctAnswer: "Vrai",
        explanation: "5² = 25, donc √25 = 5",
        points: 5
      },
      {
        id: 5,
        type: 'multiple-choice' as const,
        question: "Quel est le résultat de (-3) × (-4) ?",
        options: ["-12", "-7", "7", "12"],
        correctAnswer: "12",
        explanation: "Le produit de deux nombres négatifs est positif : (-3) × (-4) = 12",
        points: 10
      }
    ]
  }
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = Number(params.id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const lesson = lessonData[lessonId as keyof typeof lessonData];
  const currentQuestion = lesson?.questions[currentQuestionIndex];

  useEffect(() => {
    if (!lesson) {
      router.push('/maths');
    }
  }, [lesson, router]);

  if (!lesson || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Leçon non trouvée</h2>
          <Link href="/maths">
            <button className="bg-yellow-400 text-purple-900 px-6 py-3 rounded-full font-semibold">
              Retour aux leçons
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer.toString();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + currentQuestion.points);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
      setShowExplanation(false);
    } else {
      // Lesson completed
      router.push(`/maths/lesson/${lessonId}/complete?score=${score}`);
    }
  };

  const progress = ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link href="/maths" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Reviseo Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-white font-semibold">Retour</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white font-semibold">🔥 {streak}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white font-semibold">⭐ {score}</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
          <div 
            className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-white/80 text-sm">
          <span>Question {currentQuestionIndex + 1} sur {lesson.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Question Card */}
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border-2 border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6">{currentQuestion.question}</h2>
            
            {/* Answer Options */}
            {currentQuestion.options && (
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-2xl text-left font-semibold transition-all duration-200 ${
                      selectedAnswer === option
                        ? showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-yellow-400 text-purple-900'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    } ${
                      showResult && option === currentQuestion.correctAnswer.toString()
                        ? 'bg-green-500 text-white'
                        : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Calculation Input */}
            {currentQuestion.type === 'calculation' && (
              <div className="space-y-4">
                <input
                  type="number"
                  value={selectedAnswer}
                  onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
                  disabled={showResult}
                  placeholder="Entrez votre réponse"
                  className="w-full p-4 rounded-2xl bg-white/20 text-white placeholder-white/60 border-2 border-white/30 focus:border-yellow-400 focus:outline-none"
                />
              </div>
            )}

            {/* Result Feedback */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-2xl ${
                isCorrect ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'
              } border-2`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{isCorrect ? '🎉' : '😔'}</span>
                  <span className="text-white font-semibold">
                    {isCorrect ? 'Correct !' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-white/90">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Valider
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transition-all duration-200"
              >
                {currentQuestionIndex < lesson.questions.length - 1 ? 'Question suivante' : 'Terminer'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 