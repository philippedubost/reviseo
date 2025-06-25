'use client';

import 'katex/dist/katex.min.css';
// @ts-ignore
import { BlockMath } from 'react-katex';
import FlagButton from './FlagButton';
import AnswerOptions from './AnswerOptions';

interface QuestionDisplayProps {
  question: string;
  latex?: string;
  type: 'multiple-choice' | 'calculation' | 'input';
  selectedAnswer: string;
  showResult: boolean;
  onAnswerChange: (answer: string) => void;
  onAnswerSelect: (answer: string) => void;
  onSubmit?: () => void;
  // Multiple choice props
  options?: string[];
  correctAnswer?: string;
  // Flagging props
  questionId?: number;
  subjectId?: string;
  lessonId?: number;
  isPracticeMode?: boolean;
}

export default function QuestionDisplay({
  question,
  latex,
  type,
  selectedAnswer,
  showResult,
  onAnswerChange,
  onAnswerSelect,
  onSubmit,
  options = [],
  correctAnswer = '',
  questionId,
  subjectId,
  lessonId,
  isPracticeMode = false
}: QuestionDisplayProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResult && e.key === 'Enter' && selectedAnswer.trim()) {
      if ((type === 'calculation' || type === 'input') && onSubmit) {
        onSubmit();
      } else {
        onAnswerSelect(selectedAnswer.trim());
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-center max-w-2xl w-full">
        {(type === 'calculation' || type === 'input') ? (
          <>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-lg font-bold" style={{ color: 'var(--mascot-color)' }}>
                {question}
              </div>
              {questionId && subjectId && (
                <FlagButton
                  questionId={questionId}
                  subjectId={subjectId}
                  lessonId={lessonId}
                  questionText={question}
                  isPracticeMode={isPracticeMode}
                />
              )}
            </div>
            {latex && (
              <div className="flex justify-center items-center gap-2 mb-4">
                <BlockMath math={latex} />
                <span className="text-2xl font-bold" style={{ color: 'var(--mascot-color)' }}>=</span>
              </div>
            )}
            <div className="w-full flex justify-center">
              <input
                type="text"
                className="input text-center text-lg font-bold w-full max-w-md"
                placeholder="Votre réponse"
                value={selectedAnswer}
                onChange={e => !showResult && onAnswerChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={showResult}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="text-lg font-bold" style={{ color: 'var(--mascot-color)' }}>
                {question}
              </div>
              {questionId && subjectId && (
                <FlagButton
                  questionId={questionId}
                  subjectId={subjectId}
                  lessonId={lessonId}
                  questionText={question}
                  isPracticeMode={isPracticeMode}
                />
              )}
            </div>
            {latex && (
              <div className="flex justify-center">
                <BlockMath math={latex} />
              </div>
            )}
            {type === 'multiple-choice' && options.length > 0 && (
              <AnswerOptions
                options={options}
                correctAnswer={correctAnswer}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                onAnswerSelect={onAnswerSelect}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
} 