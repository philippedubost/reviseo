import { useState, useEffect } from 'react';
import { getAllLessons, type Lesson } from '../data/lessons';
import { getAllLessons as getAllHistoireGeoLessons } from '../data/histoireGeoLessons';
import { getAllLessons as getAllFrancaisLessons } from '../data/francaisLessons';
import { getAllLessons as getAllSciencesLessons } from '../data/sciencesLessons';

export type Subject = 'maths' | 'histoireGeo' | 'francais' | 'sciences';

interface LessonProgress {
  completedQuestions: number;
  bestScore: number; // Best percentage achieved in one session (0-100)
  lastAttemptScore: number; // Last session score
  totalAttempts: number;
}

interface SubjectProgress {
  totalXP: number;
  currentStreak: number;
  bestStreak: number;
  lessonsProgress: Record<number, LessonProgress>;
}

export function useLessonProgress(subject: Subject = 'maths') {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  // Get storage keys for the subject
  const getStorageKey = () => {
    switch (subject) {
      case 'histoireGeo':
        return 'histoireGeoProgress';
      case 'francais':
        return 'francaisProgress';
      case 'sciences':
        return 'sciencesProgress';
      default:
        return 'mathsProgress';
    }
  };

  // Load progress from localStorage
  const loadProgress = (): SubjectProgress => {
    if (typeof window === 'undefined') {
      return {
        totalXP: 0,
        currentStreak: 0,
        bestStreak: 0,
        lessonsProgress: {}
      };
    }
    
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {
      totalXP: 0,
      currentStreak: 0,
      bestStreak: 0,
      lessonsProgress: {}
    };
  };

  // Save progress to localStorage
  const saveProgress = (progress: SubjectProgress) => {
    if (typeof window === 'undefined') return;
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(progress));
  };

  // Update lesson progress with best score tracking
  const updateLessonProgress = (lessonId: number, sessionScore: number, completedQuestions: number) => {
    const progress = loadProgress();
    const existingProgress = progress.lessonsProgress[lessonId] || {
      completedQuestions: 0,
      bestScore: 0,
      lastAttemptScore: 0,
      totalAttempts: 0
    };

    // Update lesson progress
    progress.lessonsProgress[lessonId] = {
      completedQuestions: Math.max(existingProgress.completedQuestions, completedQuestions),
      bestScore: Math.max(existingProgress.bestScore, sessionScore),
      lastAttemptScore: sessionScore,
      totalAttempts: existingProgress.totalAttempts + 1
    };

    saveProgress(progress);
    
    // Update local state
    setLessons(prevLessons => 
      prevLessons.map(lesson => 
        lesson.id === lessonId 
          ? { 
              ...lesson, 
              completedQuestions: progress.lessonsProgress[lessonId].completedQuestions,
              completed: progress.lessonsProgress[lessonId].completedQuestions === lesson.questions.length,
              bestScore: progress.lessonsProgress[lessonId].bestScore,
              lastAttemptScore: progress.lessonsProgress[lessonId].lastAttemptScore
            }
          : lesson
      )
    );
  };

  // Add XP points (+10 for correct, -5 for wrong)
  const addXP = (isCorrect: boolean) => {
    const progress = loadProgress();
    const points = isCorrect ? 10 : -5;
    progress.totalXP = Math.max(0, progress.totalXP + points); // Prevent negative XP
    saveProgress(progress);
    setTotalXP(progress.totalXP);
  };

  // Update streak (subject-specific)
  const updateStreak = (isCorrect: boolean) => {
    const progress = loadProgress();
    
    if (isCorrect) {
      progress.currentStreak += 1;
      progress.bestStreak = Math.max(progress.bestStreak, progress.currentStreak);
    } else {
      progress.currentStreak = 0;
    }
    
    saveProgress(progress);
    setCurrentStreak(progress.currentStreak);
    setBestStreak(progress.bestStreak);
  };

  // Get lesson progress percentage (based on best score)
  const getLessonProgressPercentage = (lesson: Lesson): number => {
    const progress = loadProgress();
    const lessonProgress = progress.lessonsProgress[lesson.id];
    if (!lessonProgress) return 0;
    return lessonProgress.bestScore;
  };

  // Calculate global progress for the subject (average of best scores)
  const calculateGlobalProgress = (updatedLessons: Lesson[]): number => {
    if (updatedLessons.length === 0) return 0;
    
    let totalBestScore = 0;
    let lessonsWithAttempts = 0;
    
    updatedLessons.forEach(lesson => {
      const progress = loadProgress();
      const lessonProgress = progress.lessonsProgress[lesson.id];
      if (lessonProgress && lessonProgress.totalAttempts > 0) {
        totalBestScore += lessonProgress.bestScore;
        lessonsWithAttempts += 1;
      }
    });
    
    return lessonsWithAttempts > 0 ? totalBestScore / lessonsWithAttempts : 0;
  };

  // Initialize data
  useEffect(() => {
    // Load lessons based on subject
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
    
    // Update lessons with saved progress
    const updatedLessons = allLessons.map(lesson => {
      const lessonProgress = progress.lessonsProgress[lesson.id];
      return {
        ...lesson,
        completedQuestions: lessonProgress?.completedQuestions || 0,
        completed: lessonProgress?.completedQuestions === lesson.questions.length,
        bestScore: lessonProgress?.bestScore || 0,
        lastAttemptScore: lessonProgress?.lastAttemptScore || 0
      };
    });

    setLessons(updatedLessons);
    setTotalXP(progress.totalXP);
    setCurrentStreak(progress.currentStreak);
    setBestStreak(progress.bestStreak);
    setGlobalProgress(calculateGlobalProgress(updatedLessons));
  }, [subject]);

  return {
    lessons,
    totalXP,
    currentStreak,
    bestStreak,
    globalProgress,
    updateLessonProgress,
    addXP,
    updateStreak,
    getLessonProgressPercentage
  };
} 