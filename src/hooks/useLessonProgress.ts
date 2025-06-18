import { useState, useEffect } from 'react';
import { getAllLessons, type Lesson } from '../data/lessons';
import { getAllLessons as getAllHistoireGeoLessons } from '../data/histoireGeoLessons';
import { getAllLessons as getAllFrancaisLessons } from '../data/francaisLessons';
import { getAllLessons as getAllSciencesLessons } from '../data/sciencesLessons';

export function useLessonProgress(subject: 'maths' | 'histoireGeo' | 'francais' | 'sciences' = 'maths') {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  // Déterminer les clés localStorage selon la matière
  const getStorageKeys = () => {
    switch (subject) {
      case 'histoireGeo':
        return {
          progress: 'histoireGeoLessonProgress',
          streak: 'histoireGeoCurrentStreak'
        };
      case 'francais':
        return {
          progress: 'francaisLessonProgress',
          streak: 'francaisCurrentStreak'
        };
      case 'sciences':
        return {
          progress: 'sciencesLessonProgress',
          streak: 'sciencesCurrentStreak'
        };
      default:
        return {
          progress: 'lessonProgress',
          streak: 'currentStreak'
        };
    }
  };

  // Charger les données depuis localStorage
  const loadProgress = (): Record<number, { completedQuestions: number; score: number }> => {
    if (typeof window === 'undefined') return {};
    const keys = getStorageKeys();
    const saved = localStorage.getItem(keys.progress);
    return saved ? JSON.parse(saved) : {};
  };

  // Sauvegarder les données dans localStorage
  const saveProgress = (progress: Record<number, { completedQuestions: number; score: number }>) => {
    if (typeof window === 'undefined') return;
    const keys = getStorageKeys();
    localStorage.setItem(keys.progress, JSON.stringify(progress));
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

  // Calculer la progression globale basée sur toutes les leçons
  const calculateGlobalProgress = (updatedLessons: Lesson[]): number => {
    if (updatedLessons.length === 0) return 0;
    
    let totalCompletedQuestions = 0;
    let totalQuestions = 0;
    
    updatedLessons.forEach(lesson => {
      const progress = loadProgress();
      const lessonProgress = progress[lesson.id];
      const completedQuestions = lessonProgress?.completedQuestions || 0;
      
      totalCompletedQuestions += completedQuestions;
      totalQuestions += lesson.questions.length;
    });
    
    return totalQuestions > 0 ? (totalCompletedQuestions / totalQuestions) * 100 : 0;
  };

  // Initialiser les données
  useEffect(() => {
    // Charger les leçons selon la matière
    let allLessons: Lesson[];
    switch (subject) {
      case 'histoireGeo':
        allLessons = getAllHistoireGeoLessons();
        break;
      case 'francais':
        allLessons = getAllFrancaisLessons();
        break;
      case 'sciences':
        allLessons = getAllSciencesLessons();
        break;
      default:
        allLessons = getAllLessons();
    }
    
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
    const globalProgressValue = calculateGlobalProgress(updatedLessons);
    
    setCompletedLessons(completed);
    setTotalScore(totalScore);
    setGlobalProgress(globalProgressValue);
    
    // Charger le streak depuis localStorage
    const keys = getStorageKeys();
    const savedStreak = localStorage.getItem(keys.streak);
    setCurrentStreak(savedStreak ? parseInt(savedStreak) : 0);
  }, [subject]);

  return {
    lessons,
    totalScore,
    completedLessons,
    currentStreak,
    globalProgress,
    updateLessonProgress,
    getLessonProgressPercentage
  };
} 