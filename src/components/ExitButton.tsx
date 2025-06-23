'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ExitButtonProps {
  onExit: () => void;
  className?: string;
}

export default function ExitButton({ onExit, className = "" }: ExitButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleExitClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmExit = () => {
    setShowConfirmation(false);
    onExit();
  };

  const handleCancelExit = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {/* Exit Button */}
      <button
        onClick={handleExitClick}
        className={`exit-button text-white hover:text-red-400 transition-colors duration-200 ${className}`}
        title="Quitter"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-[#232a36] p-6 rounded-2xl shadow-2xl text-center max-w-sm mx-4 animate-jumpIn">
            <div className="text-4xl mb-4">⚠️</div>
            <div className="text-white text-xl font-bold mb-4">
              Êtes-vous sûr de vouloir quitter ?
            </div>
            <div className="text-[#b0b8c1] text-sm mb-6">
              Votre progression sera sauvegardée, mais vous perdrez votre série actuelle.
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancelExit}
                className="px-4 py-2 rounded-lg font-semibold transition-colors bg-[#6c757d] text-white hover:bg-[#5a6268]"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmExit}
                className="px-4 py-2 rounded-lg font-semibold transition-colors bg-[#e74c3c] text-white hover:bg-[#c0392b]"
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 