import React from 'react';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

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
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute" width={size} height={size}>
        <circle
          className="text-gray-700/50"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-500"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <span className="text-xs font-bold text-white">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

export default ProgressCircle; 