'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationEffectProps {
  isVisible: boolean;
  type?: 'confetti' | 'fireworks' | 'stars' | 'hearts';
  duration?: number;
  onComplete?: () => void;
}

export default function CelebrationEffect({ 
  isVisible, 
  type = 'confetti', 
  duration = 3000,
  onComplete 
}: CelebrationEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate particles based on type
      const newParticles = [];
      const particleCount = type === 'fireworks' ? 20 : type === 'stars' ? 15 : type === 'hearts' ? 12 : 30;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: getRandomColor(type),
          delay: Math.random() * 0.5
        });
      }
      
      setParticles(newParticles);
      
      // Auto-hide after duration
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, type, duration, onComplete]);

  const getRandomColor = (type: string) => {
    const colors = {
      confetti: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'],
      fireworks: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d9de0', '#e15759', '#ff9ff3'],
      stars: ['#ffd700', '#ffed4e', '#fff200', '#ffeb3b', '#fdd835'],
      hearts: ['#ff6b6b', '#ff8a80', '#ffcdd2', '#f8bbd9', '#e1bee7']
    };
    
    const colorArray = colors[type as keyof typeof colors] || colors.confetti;
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  const getParticleIcon = (type: string) => {
    switch (type) {
      case 'stars': return '⭐';
      case 'hearts': return '❤️';
      case 'fireworks': return '✨';
      default: return '🎉';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{ 
                scale: 0,
                opacity: 0,
                y: 0,
                x: 0,
                rotate: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: type === 'fireworks' ? [-20, -100] : [-20, -60],
                x: type === 'fireworks' ? [0, (Math.random() - 0.5) * 100] : [0, (Math.random() - 0.5) * 40],
                rotate: [0, 360]
              }}
              transition={{
                duration: type === 'fireworks' ? 2 : 1.5,
                delay: particle.delay,
                ease: "easeOut"
              }}
            >
              {type === 'confetti' ? (
                <div 
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: particle.color }}
                />
              ) : (
                <div className="text-2xl">
                  {getParticleIcon(type)}
                </div>
              )}
            </motion.div>
          ))}
          
          {/* Center celebration text */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-4xl font-bold text-white text-center">
              {type === 'stars' && '🌟 Excellent ! 🌟'}
              {type === 'hearts' && '💖 Bravo ! 💖'}
              {type === 'fireworks' && '🎆 Félicitations ! 🎆'}
              {type === 'confetti' && '🎉 Bien joué ! 🎉'}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 