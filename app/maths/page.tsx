'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  locked: boolean;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Calcul numérique",
    description: "Fractions, puissances, racines carrées",
    icon: "🔢",
    difficulty: "easy",
    completed: false,
    locked: false
  },
  {
    id: 2,
    title: "Équations",
    description: "Équations du premier degré",
    icon: "⚖️",
    difficulty: "medium",
    completed: false,
    locked: false
  },
  {
    id: 3,
    title: "Géométrie",
    description: "Théorème de Pythagore, trigonométrie",
    icon: "📐",
    difficulty: "medium",
    completed: false,
    locked: true
  },
  {
    id: 4,
    title: "Fonctions",
    description: "Fonctions linéaires et affines",
    icon: "📈",
    difficulty: "hard",
    completed: false,
    locked: true
  },
  {
    id: 5,
    title: "Statistiques",
    description: "Moyenne, médiane, quartiles",
    icon: "📊",
    difficulty: "medium",
    completed: false,
    locked: true
  },
  {
    id: 6,
    title: "Probabilités",
    description: "Probabilités simples",
    icon: "🎲",
    difficulty: "hard",
    completed: false,
    locked: true
  }
];

export default function MathsPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Reviseo Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white">Reviseo</h1>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white font-semibold">🔥 12</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white font-semibold">⭐ 0</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
          <div className="bg-yellow-400 h-3 rounded-full w-1/6 transition-all duration-500"></div>
        </div>
        <div className="flex justify-between mt-2 text-white/80 text-sm">
          <span>Progression</span>
          <span>1/6 leçons</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-2 text-center">
            Mathématiques - 3ème
          </h2>
          <p className="text-white/80 text-center mb-8">
            Prépare-toi pour le Brevet avec des exercices interactifs
          </p>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`relative group cursor-pointer ${
                  lesson.locked ? 'opacity-60' : 'hover:scale-105'
                } transition-all duration-300`}
                onClick={() => !lesson.locked && setSelectedLesson(lesson)}
              >
                <div className={`bg-white/20 backdrop-blur-sm rounded-3xl p-6 border-2 ${
                  lesson.locked ? 'border-white/20' : 'border-white/30 hover:border-yellow-300'
                }`}>
                  {/* Lock Icon */}
                  {lesson.locked && (
                    <div className="absolute top-4 right-4 text-white/60">
                      🔒
                    </div>
                  )}
                  
                  {/* Completed Check */}
                  {lesson.completed && (
                    <div className="absolute top-4 right-4 text-green-400">
                      ✅
                    </div>
                  )}

                  <div className="text-4xl mb-4">{lesson.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{lesson.description}</p>
                  
                  {/* Difficulty Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(lesson.difficulty)}`}></div>
                    <span className="text-white/60 text-sm">
                      {lesson.difficulty === 'easy' && 'Facile'}
                      {lesson.difficulty === 'medium' && 'Moyen'}
                      {lesson.difficulty === 'hard' && 'Difficile'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Start Button */}
          <div className="text-center mt-12">
            <Link href="/maths/lesson/1">
              <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Commencer la première leçon
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedLesson.title}</h3>
            <p className="text-gray-600 mb-6">{selectedLesson.description}</p>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedLesson(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <Link href={`/maths/lesson/${selectedLesson.id}`} className="flex-1">
                <button className="w-full bg-yellow-400 text-purple-900 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                  Commencer
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 