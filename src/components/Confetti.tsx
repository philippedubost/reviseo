'use client';

import { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
  streak: number;
  onComplete?: () => void;
}

interface ConfettiPiece {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  emoji?: string;
}

export default function Confetti({ show, streak, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  // Determine confetti level based on streak
  const getConfettiLevel = (streak: number) => {
    if (streak >= 20) return 4; // Epic
    if (streak >= 10) return 3; // Amazing
    if (streak >= 5) return 2;  // Great
    if (streak >= 2) return 1;  // Good
    return 0; // No confetti
  };

  // Generate confetti pieces based on level
  const generateConfetti = (level: number): ConfettiPiece[] => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    const emojis = ['⭐', '🎉', '🎊', '🏆', '💎', '🔥', '✨', '🌟', '💫', '🎯', '🥇', '💪'];
    
    const pieces: ConfettiPiece[] = [];
    const count = level * 15; // More pieces for higher levels
    
    for (let i = 0; i < count; i++) {
      const isEmoji = level >= 2 && Math.random() > 0.7; // Add emojis for higher levels
      
      pieces.push({
        id: `confetti-${i}-${Date.now()}`,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: level >= 3 ? 8 + Math.random() * 8 : 4 + Math.random() * 6,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: 2 + Math.random() * 4,
        rotationSpeed: (Math.random() - 0.5) * 10,
        emoji: isEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : undefined
      });
    }
    
    return pieces;
  };

  // Animate confetti
  useEffect(() => {
    if (!show) {
      setPieces([]);
      return;
    }

    const level = getConfettiLevel(streak);
    if (level === 0) return;

    const newPieces = generateConfetti(level);
    setPieces(newPieces);

    const animationDuration = 3000 + level * 1000; // Longer animation for higher levels
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / animationDuration;

      setPieces(prevPieces => 
        prevPieces.map(piece => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY + progress * 2, // Gravity effect
          rotation: piece.rotation + piece.rotationSpeed,
          velocityY: piece.velocityY + 0.1, // Gravity
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setPieces([]);
          onComplete?.();
        }, 500);
      }
    };

    requestAnimationFrame(animate);
  }, [show, streak, onComplete]);

  if (!show || pieces.length === 0) return null;

  const level = getConfettiLevel(streak);
  const levelNames = ['', 'Good!', 'Great!', 'Amazing!', 'EPIC!'];
  const levelColors = ['', '#4ecdc4', '#45b7d1', '#ff9ff3', '#ff6b6b'];

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Level indicator */}
      {level > 0 && (
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold animate-bounce"
          style={{ color: levelColors[level] }}
        >
          {levelNames[level]}
        </div>
      )}
      
      {/* Confetti pieces */}
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg)`,
            fontSize: piece.size,
            color: piece.color,
            textShadow: level >= 3 ? '0 0 10px currentColor' : 'none',
          }}
        >
          {piece.emoji || '✦'}
        </div>
      ))}
      
      {/* Additional effects for higher levels */}
      {level >= 3 && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-400/20 animate-pulse" />
      )}
      
      {level >= 4 && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 animate-pulse" />
      )}
    </div>
  );
} 