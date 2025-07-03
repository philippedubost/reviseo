'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flagQuestion, isQuestionFlagged, unflagQuestion } from '@/src/utils/questionFlagging';

interface FlagButtonProps {
  questionId: number;
  subjectId: string;
  lessonId?: number;
  questionText: string;
  isPracticeMode?: boolean;
  className?: string;
  questionType?: 'multiple-choice' | 'calculation' | 'input';
  onPopupStateChange?: (isOpen: boolean) => void;
}

export default function FlagButton({ 
  questionId, 
  subjectId, 
  lessonId, 
  questionText,
  isPracticeMode = false,
  className = '',
  questionType,
  onPopupStateChange
}: FlagButtonProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState('');
  const [isFlagged, setIsFlagged] = useState(() => 
    isQuestionFlagged(questionId, subjectId, lessonId)
  );

  const handleFlagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFlagged) {
      unflagQuestion(questionId, subjectId, lessonId);
      setIsFlagged(false);
    } else {
      setShowPopup(true);
      onPopupStateChange?.(true); // Notify parent that popup opened
    }
  };

  const handleSubmitFlag = () => {
    if (reason.trim()) {
      flagQuestion(questionId, subjectId, lessonId, reason.trim(), questionText, isPracticeMode);
      setIsFlagged(true);
      setShowPopup(false);
      setReason('');
      onPopupStateChange?.(false); // Notify parent that popup closed
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setReason('');
    onPopupStateChange?.(false); // Notify parent that popup closed
  };

  // Suggestions rapides basées sur le type de question
  const getQuickSuggestions = () => {
    const commonSuggestions = [
      'Erreur dans la question',
      'Réponse incorrecte',
      'Question trop difficile',
      'Question trop facile',
      'Formulation peu claire'
    ];

    // Ajouter "proposer en choix multiple" pour les questions de saisie manuelle
    if (questionType === 'input' || questionType === 'calculation') {
      return ['Proposer en choix multiple', ...commonSuggestions];
    }

    return commonSuggestions;
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setReason(suggestion);
  };

  return (
    <>
      <motion.button
        onClick={handleFlagClick}
        className={`rounded transition-colors flex items-center justify-center shrink-0 min-w-[40px] p-1 !w-auto ${
          isFlagged 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
        } ${className}`}
        title={isFlagged ? 'Question signalée' : 'Signaler cette question'}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.9,
          transition: { duration: 0.1 }
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span 
          className="text-[12px]"
          animate={isFlagged ? {
            rotate: [0, -5, 5, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{
            duration: 0.5,
            repeat: isFlagged ? Infinity : 0,
            repeatDelay: 2
          }}
        >
          🚩
        </motion.span>
      </motion.button>

      {/* Popup for flag reason */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-[#232a36] p-6 rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.h3 
                className="text-lg font-bold text-white mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Signaler cette question
              </motion.h3>
              
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <p className="text-gray-300 text-sm mb-2">Question :</p>
                <p className="text-white text-sm bg-[#181c24] p-2 rounded">
                  {questionText}
                </p>
              </motion.div>

              {/* Quick suggestions */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <p className="text-gray-300 text-sm mb-2">Suggestions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  {getQuickSuggestions().map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      onClick={() => handleQuickSuggestion(suggestion)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        suggestion === 'Proposer en choix multiple' 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-400' 
                          : 'bg-[#181c24] hover:bg-[#2a3441] text-gray-300 border border-[#374151]'
                      } ${reason === suggestion ? 'ring-2 ring-blue-500' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 * index }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label className="block text-gray-300 text-sm mb-2">
                  Raison du signalement :
                </label>
                <motion.textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Expliquez pourquoi cette question pose problème ou sélectionnez une suggestion ci-dessus..."
                  className="w-full p-3 bg-[#181c24] text-white rounded border border-[#232a36] resize-none"
                  rows={4}
                  autoFocus
                  whileFocus={{ 
                    scale: 1.02,
                    boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.5)"
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              
              <motion.div 
                className="flex gap-2 justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <motion.button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  onClick={handleSubmitFlag}
                  disabled={!reason.trim()}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Signaler
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 