'use client';

import { useState, useEffect } from 'react';
import { getFlaggedQuestions, unflagQuestion, type FlaggedQuestion } from '@/src/utils/questionFlagging';

export default function FlaggedQuestionsPage() {
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<FlaggedQuestion[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const questions = getFlaggedQuestions();
    setFlaggedQuestions(questions);
    setFilteredQuestions(questions);
  }, []);

  useEffect(() => {
    let filtered = flaggedQuestions;

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(q => q.subjectId === selectedSubject);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [flaggedQuestions, selectedSubject, searchTerm]);

  const handleUnflag = (question: FlaggedQuestion) => {
    unflagQuestion(question.questionId, question.subjectId, question.lessonId);
    setFlaggedQuestions(getFlaggedQuestions());
  };

  const getSubjectName = (subjectId: string) => {
    const subjectNames: Record<string, string> = {
      'maths': 'Mathématiques',
      'francais': 'Français',
      'sciences': 'Sciences'
    };
    return subjectNames[subjectId] || subjectId;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('fr-FR');
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID Question', 'Matière', 'Leçon', 'Question', 'Raison', 'Date', 'Mode Pratique'],
      ...filteredQuestions.map(q => [
        q.questionId.toString(),
        getSubjectName(q.subjectId),
        q.lessonId?.toString() || 'N/A',
        `"${q.questionText.replace(/"/g, '""')}"`,
        `"${q.reason.replace(/"/g, '""')}"`,
        formatDate(q.timestamp),
        q.isPracticeMode ? 'Oui' : 'Non'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `questions_signalées_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const subjects = ['all', 'maths', 'francais', 'sciences'];

  return (
    <div className="min-h-screen bg-[#181c24] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Questions Signalées</h1>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
          >
            📊 Exporter CSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#232a36] p-4 rounded-lg mb-6">
          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium mb-1">Matière :</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-[#181c24] text-white px-3 py-2 rounded border border-[#232a36]"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'Toutes les matières' : getSubjectName(subject)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Rechercher :</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher dans les questions ou raisons..."
                className="w-full bg-[#181c24] text-white px-3 py-2 rounded border border-[#232a36]"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#232a36] p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{filteredQuestions.length}</div>
              <div className="text-sm text-gray-400">Questions signalées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">
                {filteredQuestions.filter(q => q.isPracticeMode).length}
              </div>
              <div className="text-sm text-gray-400">Mode pratique</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {filteredQuestions.filter(q => !q.isPracticeMode).length}
              </div>
              <div className="text-sm text-gray-400">Mode leçon</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {new Set(filteredQuestions.map(q => q.subjectId)).size}
              </div>
              <div className="text-sm text-gray-400">Matières concernées</div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🚩</div>
              <div className="text-xl">Aucune question signalée</div>
              <div className="text-sm">Les questions que vous signalez apparaîtront ici</div>
            </div>
          ) : (
            filteredQuestions.map((question, index) => (
              <div key={`${question.questionId}-${question.subjectId}-${question.lessonId}-${question.timestamp}`} 
                   className="bg-[#232a36] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      {getSubjectName(question.subjectId)}
                    </span>
                    {question.lessonId && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        Leçon {question.lessonId}
                      </span>
                    )}
                    {question.isPracticeMode && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                        Mode pratique
                      </span>
                    )}
                    <span className="text-gray-400 text-sm">
                      ID: {question.questionId}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 text-sm">
                      {formatDate(question.timestamp)}
                    </span>
                    <button
                      onClick={() => handleUnflag(question)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs transition-colors"
                      title="Retirer le signalement"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">Question :</div>
                  <div className="text-white bg-[#181c24] p-3 rounded">
                    {question.questionText}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Raison du signalement :</div>
                  <div className="text-white bg-[#181c24] p-3 rounded">
                    {question.reason}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 