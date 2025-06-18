'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import 'katex/dist/katex.min.css';
// @ts-ignore
import { BlockMath, InlineMath } from 'react-katex';

interface Question {
  id: number;
  type: 'multiple-choice' | 'calculation' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
  latex?: string;
}

const lessonData = {
  1: {
    title: "Calcul numérique",
    questions: [
      {
        id: 1,
        type: 'multiple-choice' as const,
        question: "Résoudre une équation :",
        latex: '5x + 5(2x + 2) - 4 = -6x - 2',
        options: [
          String.raw`x = -\frac{11}{16}`,
          String.raw`x = -\frac{3}{11}`,
          String.raw`x = -\frac{1}{7}`,
          String.raw`x = -\frac{8}{21}`
        ],
        correctAnswer: String.raw`x = -\frac{8}{21}`,
        explanation: "On développe, on regroupe les x, puis on isole x.",
        points: 10
      },
      {
        id: 2,
        type: 'multiple-choice' as const,
        question: "Simplifier l'expression sous la forme la plus simple :",
        latex: '6(-4b-4a) - 4a + 7b',
        options: [
          '2a + 42b',
          '-23a - 4b',
          '-2a + 3b',
          '-28a - 17b'
        ],
        correctAnswer: '-28a - 17b',
        explanation: "On distribue puis on regroupe les termes semblables.",
        points: 10
      },
      {
        id: 3,
        type: 'calculation' as const,
        question: "Convertir des unités :",
        latex: '10km = \\underline{\phantom{00000}} m',
        correctAnswer: 10000,
        explanation: "1 km = 1000 m donc 10 km = 10 000 m.",
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

  const lesson = lessonData[lessonId as keyof typeof lessonData];
  const currentQuestion = lesson?.questions[currentQuestionIndex];

  useEffect(() => {
    if (!lesson) {
      router.push('/maths');
    }
  }, [lesson, router]);

  if (!lesson || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181c24] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Leçon non trouvée</h2>
          <Link href="/maths">
            <button className="btn">Retour aux leçons</button>
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
    } else {
      router.push(`/maths/lesson/${lessonId}/complete?score=${score}`);
    }
  };

  const progress = ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Progress Bar */}
      <div className="progress-bar mx-4 mt-4">
        <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="flex justify-between mx-6 text-xs text-[#ffe156] font-bold mb-4">
        <span>Question {currentQuestionIndex + 1} / {lesson.questions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      {/* Main Content Container */}
      <div className="flex-1 px-4 pb-24">
        {/* Question Content */}
        <div className="text-center mb-6">
          <div className="text-lg font-bold mb-3 text-[#ffe156]">
            {currentQuestion.question}
          </div>
          {currentQuestion.latex && (
            <div className="flex justify-center mb-4">
              <BlockMath math={currentQuestion.latex} />
            </div>
          )}
        </div>

        {/* Answer Options */}
        {currentQuestion.options && (
          <div className="flex flex-col gap-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              let state = '';
              if (showResult) {
                if (option === currentQuestion.correctAnswer) state = 'correct';
                else if (option === selectedAnswer) state = 'incorrect';
              } else if (option === selectedAnswer) state = 'selected';
              return (
                <button
                  key={idx}
                  className={`answer-option text-base font-bold py-3 px-4 rounded-lg ${
                    state === 'correct' ? 'bg-[#2ecc71] text-[#181c24] border-2 border-[#2ecc71]' :
                    state === 'incorrect' ? 'bg-[#ff4d6d] text-white border-2 border-[#ff4d6d]' :
                    state === 'selected' ? 'bg-[#00baff] text-white border-2 border-[#00baff]' :
                    'bg-[#232a36] text-white border-2 border-[#232a36]'
                  } transition-all duration-200`}
                  onClick={() => !showResult && handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  <BlockMath math={option} />
                </button>
              );
            })}
          </div>
        )}

        {/* Calculation Input */}
        {currentQuestion.type === 'calculation' && (
          <div className="flex flex-col items-center mb-6">
            <input
              type="number"
              className="input text-center text-lg font-bold w-full max-w-xs"
              placeholder="Votre réponse"
              value={selectedAnswer}
              onChange={e => !showResult && setSelectedAnswer(e.target.value)}
              disabled={showResult}
            />
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div className={`text-center p-4 rounded-lg mb-6 ${isCorrect ? 'bg-[#2ecc71] text-[#181c24]' : 'bg-[#ff4d6d] text-white'}`}>
            <div className="text-xl mb-2">{isCorrect ? '🎉 Bravo !' : '😔 Oups !'}</div>
            <div className="font-bold mb-1">{isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse.'}</div>
            <div className="text-sm">{currentQuestion.explanation}</div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        {!showResult ? (
          <button
            className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold w-full max-w-md"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            Vérifier
          </button>
        ) : (
          <button
            className={`btn text-lg font-bold w-full max-w-md ${isCorrect ? 'bg-[#00baff] text-white' : 'bg-[#ff4d6d] text-white'}`}
            onClick={handleNext}
          >
            Question suivante !
          </button>
        )}
      </div>
    </div>
  );
} 