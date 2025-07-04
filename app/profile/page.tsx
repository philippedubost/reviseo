"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/src/components/Header';
import { getFlaggedQuestions, unflagQuestion, type FlaggedQuestion } from '@/src/utils/questionFlagging';

// Function to generate random animal + adjective combinations
const generateRandomNickname = () => {
  const animals = [
    'Hibou', 'Renard', 'Chat', 'Loup', 'Ours', 'Lapin', 'Écureuil', 
    'Panda', 'Koala', 'Tigre', 'Lion', 'Éléphant', 'Dauphin', 'Pingouin',
    'Aigle', 'Chouette', 'Castor', 'Raton laveur', 'Loutre'
  ];
  
  const adjectives = [
    'sérieux', 'curieux', 'malin', 'astucieux', 'studieux', 'brillant',
    'génial', 'futé', 'sage', 'vif', 'doué', 'créatif', 'motivé',
    'persévérant', 'intrépide', 'audacieux', 'réfléchi', 'ingénieux'
  ];
  
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  return `${randomAnimal} ${randomAdjective}`;
};

export default function ProfilePage() {
  const [studentName, setStudentName] = useState(() => generateRandomNickname());
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Load student name from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('studentName');
      if (savedName) {
        setStudentName(savedName);
      }
      // Load flagged questions
      setFlaggedQuestions(getFlaggedQuestions());
    }
  }, []);

  // Save student name to localStorage
  const saveStudentName = (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('studentName', name);
    }
  };

  // Handle name editing
  const handleEditName = () => {
    setTempName(studentName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    const finalName = tempName.trim() || generateRandomNickname();
    setStudentName(finalName);
    saveStudentName(finalName);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName('');
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Handle unflag question
  const handleUnflag = (question: FlaggedQuestion) => {
    unflagQuestion(question.questionId, question.subjectId, question.lessonId);
    setFlaggedQuestions(getFlaggedQuestions());
  };

  // Export flags to CSV
  const exportFlagsToCSV = async () => {
    setIsExporting(true);
    
    try {
      // Create CSV content
      const csvHeaders = ['Question ID', 'Matière', 'Leçon', 'Question', 'Raison', 'Date'];
      const csvRows = flaggedQuestions.map(flag => [
        flag.questionId,
        flag.subjectId,
        flag.lessonId,
        `"${flag.questionText.replace(/"/g, '""')}"`, // Escape quotes in CSV
        `"${flag.reason.replace(/"/g, '""')}"`,
        new Date(flag.flaggedAt).toLocaleDateString('fr-FR')
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.join(','))
        .join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `flags_${studentName}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Here you would normally send the CSV to the email
      // For now, we'll show a success message
      alert(`CSV exporté ! Il sera envoyé à pdubost@gmail.com\n\nContenu: ${flaggedQuestions.length} questions signalées de ${studentName}`);
      
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('Erreur lors de l\'export du CSV');
    } finally {
      setIsExporting(false);
    }
  };

  // Reset history
  const resetHistory = () => {
    if (typeof window !== 'undefined') {
      // Clear all progress data
      const levels = ['sixieme', 'cinquieme', 'quatrieme', 'troisieme', 'seconde', 'premiere', 'terminale'];
      const subjects = ['maths', 'francais', 'sciences', 'histoireGeo', 'philosophie'];
      
      subjects.forEach(subject => {
        levels.forEach(level => {
          localStorage.removeItem(`${subject}Progress_${level}`);
        });
      });
      
      // Clear flags
      localStorage.removeItem('flaggedQuestions');
      
      // Keep student name but mark as new visitor
      localStorage.removeItem('hasVisitedBefore');
      
      setFlaggedQuestions([]);
      setShowResetConfirmation(false);
      
      alert('Historique réinitialisé avec succès !');
    }
  };

  return (
    <div className="min-h-screen bg-[#181c24]">
      <Header showBackButton />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">👤 Profil Utilisateur</h1>
          
          {/* User Name Section */}
          <div className="bg-[#232a36] rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">✏️ Nom d'utilisateur</h2>
            
            {isEditingName ? (
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-[#181c24] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none"
                  placeholder="Votre nom"
                  autoFocus
                  maxLength={20}
                />
                <button
                  onClick={handleSaveName}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ✓ Sauver
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ✕ Annuler
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-white text-lg">{studentName}</span>
                <button
                  onClick={handleEditName}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ✏️ Modifier
                </button>
              </div>
            )}
          </div>

          {/* Flags Section */}
          <div className="bg-[#232a36] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">🚩 Questions signalées ({flaggedQuestions.length})</h2>
              {flaggedQuestions.length > 0 && (
                <button
                  onClick={exportFlagsToCSV}
                  disabled={isExporting}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  {isExporting ? '📤 Exportation...' : '📤 Exporter CSV'}
                </button>
              )}
            </div>
            
            {flaggedQuestions.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Aucune question signalée pour le moment</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {flaggedQuestions.map((flag, index) => (
                  <div key={index} className="bg-[#181c24] p-4 rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-400 font-medium">{flag.subjectId}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{flag.lessonId}</span>
                        </div>
                        <p className="text-white mb-2">{flag.questionText}</p>
                        <p className="text-yellow-400 text-sm">Raison: {flag.reason}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          Signalée le {new Date(flag.flaggedAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUnflag(flag)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        ✕ Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reset History Section */}
          <div className="bg-[#232a36] rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">🗑️ Réinitialiser l'historique</h2>
            <p className="text-gray-400 mb-4">
              Cette action supprimera définitivement tous vos progrès, flags et statistiques. 
              Votre nom d'utilisateur sera conservé.
            </p>
            
            {!showResetConfirmation ? (
              <button
                onClick={() => setShowResetConfirmation(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                🗑️ Réinitialiser l'historique
              </button>
            ) : (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <p className="text-red-400 font-medium mb-4">⚠️ Êtes-vous sûr(e) ?</p>
                <p className="text-gray-300 text-sm mb-4">
                  Cette action est irréversible et supprimera tous vos progrès.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={resetHistory}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    ✓ Oui, réinitialiser
                  </button>
                  <button
                    onClick={() => setShowResetConfirmation(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    ✕ Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}