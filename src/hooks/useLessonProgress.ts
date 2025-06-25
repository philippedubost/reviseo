'use client';

import { useState, useEffect } from 'react';
import { getAllSubjects, getSubjectById, getAllLessonsForSubject } from '../data/simplified-service';
import type { Subject, Lesson } from '../data/simplified-service';

export type SubjectType = 'maths' | 'francais' | 'sciences' | 'histoire-geo' | 'philosophie';

interface LessonProgress {
  completedQuestions: number;
  correctAnswers: number; // Track correct answers for this lesson
  bestScore: number; // Best percentage achieved in one session (0-100)
  lastAttemptScore: number; // Last session score
  totalAttempts: number;
}

interface SubjectProgress {
  totalXP: number;
  currentStreak: number;
  bestStreak: number;
  lessonsProgress: Record<number, LessonProgress>;
  totalCorrectAnswers: number; // Track total correct answers across all lessons
  totalQuestionsAnswered: number; // Track total questions answered across all lessons
}

export function useLessonProgress(subject: SubjectType = 'maths', level: string = 'troisieme') {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  // Get storage key for the subject and level
  const getStorageKey = () => {
    const subjectKey = (() => {
      switch (subject) {
        case 'francais':
          return 'francais';
        case 'sciences':
          return 'sciences';
        case 'histoire-geo':
          return 'histoireGeo';
        case 'philosophie':
          return 'philosophie';
        default:
          return 'maths';
      }
    })();
    return `${subjectKey}Progress_${level}`;
  };

  // Load progress from localStorage
  const loadProgress = (): SubjectProgress => {
    if (typeof window === 'undefined') {
      return {
        totalXP: 0,
        currentStreak: 0,
        bestStreak: 0,
        lessonsProgress: {},
        totalCorrectAnswers: 0,
        totalQuestionsAnswered: 0
      };
    }
    
    const key = getStorageKey();
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {
      totalXP: 0,
      currentStreak: 0,
      bestStreak: 0,
      lessonsProgress: {},
      totalCorrectAnswers: 0,
      totalQuestionsAnswered: 0
    };
  };

  // Save progress to localStorage
  const saveProgress = (progress: SubjectProgress) => {
    if (typeof window === 'undefined') return;
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(progress));
  };

  // Update lesson progress with best score tracking
  const updateLessonProgress = (lessonId: number, sessionScore: number, completedQuestions: number, correctAnswers: number) => {
    const progress = loadProgress();
    const existingProgress = progress.lessonsProgress[lessonId] || {
      completedQuestions: 0,
      correctAnswers: 0,
      bestScore: 0,
      lastAttemptScore: 0,
      totalAttempts: 0
    };

    // Update lesson progress
    progress.lessonsProgress[lessonId] = {
      completedQuestions: Math.max(existingProgress.completedQuestions, completedQuestions),
      correctAnswers: Math.max(existingProgress.correctAnswers, correctAnswers),
      bestScore: Math.max(existingProgress.bestScore, sessionScore),
      lastAttemptScore: sessionScore,
      totalAttempts: existingProgress.totalAttempts + 1
    };

    // Update total correct answers and questions answered
    let totalCorrect = 0;
    let totalQuestions = 0;
    Object.values(progress.lessonsProgress).forEach(lessonProgress => {
      totalCorrect += lessonProgress.correctAnswers || 0;
      totalQuestions += lessonProgress.completedQuestions || 0;
    });
    
    progress.totalCorrectAnswers = totalCorrect;
    progress.totalQuestionsAnswered = totalQuestions;

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
              lastAttemptScore: progress.lessonsProgress[lessonId].lastAttemptScore,
              correctAnswers: progress.lessonsProgress[lessonId].correctAnswers
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

  // Calculate global progress for the subject (average of all lesson progresses)
  const calculateGlobalProgress = (updatedLessons: Lesson[]): number => {
    if (updatedLessons.length === 0) {
      return 0;
    }

    const progress = loadProgress();
    let totalBestScores = 0;

    updatedLessons.forEach(lesson => {
      const lessonProgress = progress.lessonsProgress[lesson.id];
      if (lessonProgress) {
        totalBestScores += lessonProgress.bestScore || 0;
      }
    });

    return totalBestScores / updatedLessons.length;
  };

  // Calculate subject progress percentage (correct answers / total questions)
  const calculateSubjectProgress = (): number => {
    const progress = loadProgress();
    
    // Ensure we have valid numbers
    const totalCorrect = Number(progress.totalCorrectAnswers) || 0;
    const totalQuestions = Number(progress.totalQuestionsAnswered) || 0;
    
    if (totalQuestions === 0) {
      return 0;
    }
    
    const percentage = (totalCorrect / totalQuestions) * 100;
    return Math.round(percentage);
  };

  // Recalculate totals from lessons progress (for backward compatibility)
  const recalculateTotals = (progress: SubjectProgress): SubjectProgress => {
    let totalCorrect = 0;
    let totalQuestions = 0;
    
    Object.values(progress.lessonsProgress).forEach(lessonProgress => {
      totalCorrect += lessonProgress.correctAnswers || 0;
      totalQuestions += lessonProgress.completedQuestions || 0;
    });
    
    return {
      ...progress,
      totalCorrectAnswers: totalCorrect,
      totalQuestionsAnswered: totalQuestions
    };
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      try {
        const subjectData = getSubjectById(subject);
        if (subjectData) {
          const updatedLessons = subjectData.lessons.map(lesson => ({
            ...lesson,
            completedQuestions: 0,
            completed: false,
            bestScore: 0,
            lastAttemptScore: 0,
            correctAnswers: 0
          }));
          
          setLessons(updatedLessons);
          
          // Load progress from localStorage
          const progress = loadProgress();
          setTotalXP(progress.totalXP);
          setCurrentStreak(progress.currentStreak);
          setBestStreak(progress.bestStreak);
          
          // Update lessons with progress data
          const lessonsWithProgress = updatedLessons.map(lesson => {
            const lessonProgress = progress.lessonsProgress[lesson.id];
            if (lessonProgress) {
              return {
                ...lesson,
                completedQuestions: lessonProgress.completedQuestions,
                completed: lessonProgress.completedQuestions === lesson.questions.length,
                bestScore: lessonProgress.bestScore,
                lastAttemptScore: lessonProgress.lastAttemptScore,
                correctAnswers: lessonProgress.correctAnswers
              };
            }
            return lesson;
          });
          
          setLessons(lessonsWithProgress);
          setGlobalProgress(calculateGlobalProgress(lessonsWithProgress));
        }
      } catch (error) {
        console.error('Error loading lesson progress:', error);
      }
    };

    loadInitialData();
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
    getLessonProgressPercentage,
    calculateSubjectProgress
  };
} 