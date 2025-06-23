'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiManagerProps {
  currentStreak: number;
  previousStreak: number;
  isCorrect?: boolean; // Add this to trigger on correct answers
  isLessonComplete?: boolean; // Add this for lesson completion
  subjectColor?: string; // Add this for subject-specific colors
}

export default function ConfettiManager({ 
  currentStreak, 
  previousStreak, 
  isCorrect, 
  isLessonComplete, 
  subjectColor 
}: ConfettiManagerProps) {
  const lastTriggeredStreak = useRef(0);
  const lessonCompleteInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Test confetti on every correct answer
    if (isCorrect) {
      triggerTestConfetti();
    }
    
    // Lesson completion confetti
    if (isLessonComplete) {
      triggerLessonCompleteConfetti();
    }
    
    // Only trigger if streak increased and reached a milestone
    if (currentStreak > previousStreak && currentStreak > lastTriggeredStreak.current) {
      lastTriggeredStreak.current = currentStreak;
      
      // Trigger different confetti effects based on streak milestones
      if (currentStreak === 2) {
        triggerStreak2Confetti();
      } else if (currentStreak === 5) {
        triggerStreak5Confetti();
      } else if (currentStreak === 10) {
        triggerStreak10Confetti();
      } else if (currentStreak === 20) {
        triggerStreak20Confetti();
      }
    }

    // Cleanup lesson complete interval
    return () => {
      if (lessonCompleteInterval.current) {
        clearInterval(lessonCompleteInterval.current);
        lessonCompleteInterval.current = null;
      }
    };
  }, [currentStreak, previousStreak, isCorrect, isLessonComplete, subjectColor]);

  const triggerLessonCompleteConfetti = () => {
    // Get subject colors based on subjectColor prop
    const colors = getSubjectColors(subjectColor);
    
    // Initial celebration burst
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: colors,
      gravity: 0.8
    });

    // Continuous confetti loop for 10 seconds - more fluid and less intense
    const duration = 10000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      // Single gentle confetti burst - less particles, more frequent
      confetti({
        particleCount: 8,
        spread: 120,
        origin: { y: 0.8 },
        colors: colors,
        gravity: 0.8,
        startVelocity: 30
      });

      // Occasional side bursts for variety
      if (Math.random() < 0.3) { // 30% chance
        confetti({
          particleCount: 5,
          spread: 40,
          origin: { y: 0.6, x: Math.random() * 0.6 + 0.2 },
          colors: colors,
          gravity: 0.6,
          startVelocity: 15
        });
      }
    }, 150); // More frequent but smaller bursts

    lessonCompleteInterval.current = interval;
  };

  const getSubjectColors = (subjectColor?: string) => {
    // Always return the orange gradient colors
    return ['#F15A29', '#FFB300', '#FF8008', '#FFA500'];
  };

  const triggerTestConfetti = () => {
    // Simple test confetti for every correct answer
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b6b', '#4ecdc4']
    });
  };

  const triggerStreak2Confetti = () => {
    // Simple confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const triggerStreak5Confetti = () => {
    // Multiple bursts with different colors
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b6b', '#4ecdc4']
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.7, x: 0.3 },
        colors: ['#a8e6cf', '#ff8b94', '#ffd93d']
      });
    }, 200);
  };

  const triggerStreak10Confetti = () => {
    // Fireworks effect with multiple explosions
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create multiple firework bursts
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#ff8b94']
      }));
      
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffd93d', '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e']
      }));
    }, 250);
  };

  const triggerStreak20Confetti = () => {
    // Epic celebration with multiple effects
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    // Initial massive burst
    confetti({
      particleCount: 300,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#ff8b94', '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e'],
      gravity: 0.8
    });

    // Continuous fireworks
    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      
      // Multiple firework bursts
      for (let i = 0; i < 3; i++) {
        confetti(Object.assign({}, defaults, {
          particleCount: particleCount / 3,
          origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
          colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#ff8b94', '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e'],
          gravity: randomInRange(0.5, 1.2)
        }));
      }
    }, 200);

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6, x: 0.1 },
        colors: ['#ffd700', '#ff6b6b', '#4ecdc4'],
        angle: 45
      });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6, x: 0.9 },
        colors: ['#a8e6cf', '#ff8b94', '#6c5ce7'],
        angle: 135
      });
    }, 1000);

    // Final celebration burst
    setTimeout(() => {
      confetti({
        particleCount: 500,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#ff8b94', '#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e'],
        gravity: 0.6
      });
    }, 3000);
  };

  // This component doesn't render anything visible
  return null;
} 