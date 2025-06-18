'use client';

import 'katex/dist/katex.min.css';
// @ts-ignore
import { BlockMath } from 'react-katex';

interface QuestionDisplayProps {
  question: string;
  latex?: string;
  type: 'multiple-choice' | 'calculation';
  selectedAnswer: string;
  showResult: boolean;
  onAnswerChange: (answer: string) => void;
  onAnswerSelect: (answer: string) => void;
  onSubmit?: () => void;
}

export default function QuestionDisplay({
  question,
  latex,
  type,
  selectedAnswer,
  showResult,
  onAnswerChange,
  onAnswerSelect,
  onSubmit
}: QuestionDisplayProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResult && e.key === 'Enter' && selectedAnswer.trim()) {
      if (type === 'calculation' && onSubmit) {
        onSubmit();
      } else {
        onAnswerSelect(selectedAnswer.trim());
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center px-4 pt-4">
      <div className="text-center max-w-2xl w-full">
        {type === 'calculation' ? (
          <>
            <div className="text-lg font-bold mb-3" style={{ color: 'var(--mascot-color)' }}>
              {question}
            </div>
            {latex && (
              <div className="flex justify-center items-center gap-2">
                <BlockMath math={latex} />
                <span className="text-2xl font-bold" style={{ color: 'var(--mascot-color)' }}>=</span>
                <input
                  type="text"
                  className="input text-center text-lg font-bold w-24 ml-2"
                  placeholder="?"
                  value={selectedAnswer}
                  onChange={e => !showResult && onAnswerChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={showResult}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-lg font-bold mb-3" style={{ color: 'var(--mascot-color)' }}>
              {question}
            </div>
            {latex && (
              <div className="flex justify-center">
                <BlockMath math={latex} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 