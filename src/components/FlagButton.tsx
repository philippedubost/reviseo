'use client';

import { useState } from 'react';
import { flagQuestion, isQuestionFlagged, unflagQuestion } from '@/src/utils/questionFlagging';

interface FlagButtonProps {
  questionId: number;
  subjectId: string;
  lessonId?: number;
  questionText: string;
  isPracticeMode?: boolean;
  className?: string;
}

export default function FlagButton({ 
  questionId, 
  subjectId, 
  lessonId, 
  questionText,
  isPracticeMode = false,
  className = ''
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
    }
  };

  const handleSubmitFlag = () => {
    if (reason.trim()) {
      flagQuestion(questionId, subjectId, lessonId, reason.trim(), questionText, isPracticeMode);
      setIsFlagged(true);
      setShowPopup(false);
      setReason('');
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setReason('');
  };

  return (
    <>
      <button
        onClick={handleFlagClick}
        className={`rounded transition-colors flex items-center justify-center shrink-0 min-w-[40px] p-1 !w-auto ${
          isFlagged 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
        } ${className}`}
        title={isFlagged ? 'Question signalée' : 'Signaler cette question'}
      >
        <span className="text-[12px]">🚩</span>
      </button>

      {/* Popup for flag reason */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#232a36] p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">
              Signaler cette question
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">Question :</p>
              <p className="text-white text-sm bg-[#181c24] p-2 rounded">
                {questionText}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">
                Raison du signalement :
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Expliquez pourquoi cette question pose problème..."
                className="w-full p-3 bg-[#181c24] text-white rounded border border-[#232a36] resize-none"
                rows={4}
                autoFocus
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitFlag}
                disabled={!reason.trim()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Signaler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 