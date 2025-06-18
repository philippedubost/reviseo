interface ProgressBarProps {
  progress: number;
  score?: number;
  showScore?: boolean;
}

export default function ProgressBar({ progress, score, showScore = false }: ProgressBarProps) {
  return (
    <div className="relative mx-2 mt-2 mb-2">
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
      </div>
      {showScore && score !== undefined && (
        <div className="absolute inset-0 flex justify-end items-center pr-2 pointer-events-none">
          <span className="flex items-center gap-1 text-base font-extrabold" style={{ color: '#eb8601' }}>
            🏆 <span>{score}</span>
          </span>
        </div>
      )}
    </div>
  );
} 