'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus automatique sur l'input pour les questions de type 'input'
  useEffect(() => {
    if (type === 'input' && !showResult && inputRef.current) {
      // Petit délai pour s'assurer que le DOM est rendu
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [type, showResult]);

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
    <motion.div 
      className="flex flex-col items-center mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="text-center max-w-2xl w-full">
        {(type === 'calculation' || type === 'input') ? (
          <>
            <motion.div 
              className="flex items-center justify-center gap-2 mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="text-lg font-bold"
                style={{ color: 'var(--mascot-color)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {question}
              </motion.div>
              {questionId && subjectId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <FlagButton
                    questionId={questionId}
                    subjectId={subjectId}
                    lessonId={lessonId}
                    questionText={question}
                    isPracticeMode={isPracticeMode}
                  />
                </motion.div>
              )}
            </motion.div>
            {latex && (
              <motion.div 
                className="flex justify-center items-center gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <BlockMath math={latex} />
                </motion.div>
                <motion.span 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--mascot-color)' }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  =
                </motion.span>
              </motion.div>
            )}
            <motion.div 
              className="w-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.input
                ref={inputRef}
                type="text"
                className="input text-center text-lg font-bold w-full max-w-md"
                placeholder="Votre réponse"
                value={selectedAnswer}
                onChange={e => !showResult && onAnswerChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={showResult}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                }}
                transition={{ duration: 0.2 }}
              />
              {!showResult && onSubmit && (
                <motion.button
                  className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold px-6 mt-2 relative overflow-hidden"
                  onClick={onSubmit}
                  disabled={!selectedAnswer.trim()}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="relative z-10">Valider</span>
                </motion.button>
              )}
            </motion.div>
          </>
        ) : (
          <>
            <motion.div 
              className="flex items-center justify-center gap-2 mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="text-lg font-bold"
                style={{ color: 'var(--mascot-color)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {question}
              </motion.div>
              {questionId && subjectId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <FlagButton
                    questionId={questionId}
                    subjectId={subjectId}
                    lessonId={lessonId}
                    questionText={question}
                    isPracticeMode={isPracticeMode}
                  />
                </motion.div>
              )}
            </motion.div>
            {latex && (
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <BlockMath math={latex} />
                </motion.div>
              </motion.div>
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
    </motion.div>
  );
} 