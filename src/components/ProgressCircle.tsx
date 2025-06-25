import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Animated progress value
  const progressMotionValue = useMotionValue(0);
  const animatedProgress = useTransform(progressMotionValue, (value) => {
    const offset = circumference - (value / 100) * circumference;
    return offset;
  });

  // Update progress with animation
  React.useEffect(() => {
    progressMotionValue.set(progress);
  }, [progress, progressMotionValue]);

  // Determine color based on progress
  const getProgressColor = (progress: number) => {
    if (progress >= 90) {
      return '#10b981'; // Green for 90%+
    } else if (progress >= 70) {
      return '#f59e0b'; // Orange for 70-89%
    } else if (progress >= 50) {
      return '#f97316'; // Darker orange for 50-69%
    } else {
      return '#ef4444'; // Red for below 50%
    }
  };

  const progressColor = getProgressColor(progress);

  return (
    <motion.div 
      className="relative flex items-center justify-center" 
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <svg className="absolute" width={size} height={size}>
        <motion.circle
          className="text-gray-700/50"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.circle
          className="transition-all duration-500"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedProgress}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          initial={{ strokeDashoffset: circumference }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      
      {/* Animated percentage text */}
      <motion.span 
        className="text-xs font-bold text-white relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {Math.round(progress)}%
      </motion.span>
      
      {/* Celebration particles when progress reaches 100% */}
      {progress >= 100 && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              initial={{ 
                x: "50%", 
                y: "50%", 
                scale: 0,
                opacity: 1 
              }}
              animate={{ 
                x: `${20 + (i % 3) * 30}%`, 
                y: `${20 + Math.floor(i / 3) * 30}%`, 
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: 0.8 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProgressCircle; 