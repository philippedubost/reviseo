import { useState, useEffect } from 'react';
import { getAllLessons, type Lesson } from '../data/lessons';

export function useLessonProgress() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Charger les données depuis localStorage
  const loadProgress = (): Record<number, { completedQuestions: number; score: number }> => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('lessonProgress');
    return saved ? JSON.parse(saved) : {};
  };

  // Sauvegarder les données dans localStorage
  const saveProgress = (progress: Record<number, { completedQuestions: number; score: number }>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lessonProgress', JSON.stringify(progress));
  };

  // Mettre à jour la progression d'une leçon
  const updateLessonProgress = (lessonId: number, completedQuestions: number, score: number) => {
    const progress = loadProgress();
    progress[lessonId] = { completedQuestions, score };
    saveProgress(progress);
    
    // Mettre à jour l'état local
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === lessonId 
          ? { 
              ...lesson, 
              completedQuestions, 
              completed: completedQuestions === lesson.questions.length,
              score 
            }
          : lesson
      )
    );
  };

  // Calculer le pourcentage de progression d'une leçon
  const getLessonProgressPercentage = (lesson: Lesson): number => {
    const progress = loadProgress();
    const lessonProgress = progress[lesson.id];
    if (!lessonProgress) return 0;
    return (lessonProgress.completedQuestions / lesson.questions.length) * 100;
  };

  // Initialiser les données
  useEffect(() => {
    const allLessons = getAllLessons();
    const progress = loadProgress();
    
    // Mettre à jour les leçons avec la progression sauvegardée
    const updatedLessons = allLessons.map(lesson => {
      const lessonProgress = progress[lesson.id];
      return {
        ...lesson,
        completedQuestions: lessonProgress?.completedQuestions || 0,
        completed: lessonProgress?.completedQuestions === lesson.questions.length,
        score: lessonProgress?.score || 0
      };
    });

    setLessons(updatedLessons);
    
    // Calculer les statistiques globales
    const completed = updatedLessons.filter(lesson => lesson.completed).length;
    const totalScore = updatedLessons.reduce((total, lesson) => total + (lesson.score || 0), 0);
    
    setCompletedLessons(completed);
    setTotalScore(totalScore);
    
    // Simuler un streak (dans une vraie app, ceci viendrait d'une API)
    const savedStreak = localStorage.getItem('currentStreak');
    setCurrentStreak(savedStreak ? parseInt(savedStreak) : 0);
  }, []);

  return {
    lessons,
    totalScore,
    completedLessons,
    currentStreak,
    updateLessonProgress,
    getLessonProgressPercentage
  };
} 