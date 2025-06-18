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
    <div className="min-h-screen flex flex-col items-center bg-[#181c24] px-4 pt-6">
      <h1 className="text-2xl font-bold text-white mb-6 w-full max-w-xs text-center">Mathématiques</h1>
      <div className="w-full max-w-xs flex flex-col gap-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`card flex flex-col items-center justify-center py-6 px-4 w-full cursor-pointer transition-opacity duration-200 ${lesson.locked ? 'opacity-40' : 'hover:opacity-80'}`}
            onClick={() => !lesson.locked && window.location.assign(`/maths/lesson/${lesson.id}`)}
          >
            <div className="mb-2 text-4xl">{lesson.icon}</div>
            <div className="text-lg font-bold text-white mb-1 text-center">{lesson.title}</div>
            <div className="text-[#b0b8c1] text-center mb-4 text-sm">{lesson.description}</div>
            <div className="w-full h-3 bg-[#232a36] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#2ecc71]" style={{ width: lesson.completed ? '100%' : '40%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 