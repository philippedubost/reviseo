'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingMascotProps {
  emoji?: string;
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
}

export default function FloatingMascot({ 
  emoji = '🎓', 
  size = 'medium', 
  speed = 'normal' 
}: FloatingMascotProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show mascot after a delay
    const showTimer = setTimeout(() => setIsVisible(true), 2000);
    
    // Update position periodically
    const moveTimer = setInterval(() => {
      setPosition({
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: Math.random() * 80 + 10, // 10% to 90% of screen height
      });
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(moveTimer);
    };
  }, []);

  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  const speedMultiplier = {
    slow: 8,
    normal: 6,
    fast: 4
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed pointer-events-none z-40 ${sizeClasses[size]}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -20, -20, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: speedMultiplier[speed],
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {emoji}
      </motion.div>
      
      {/* Sparkle effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
} 