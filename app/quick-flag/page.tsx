'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dataService, type Question, type Lesson, type Subject, type Level } from '@/src/data/simplified-service';
import { flagQuestion, isQuestionFlagged, unflagQuestion } from '@/src/utils/questionFlagging';
import { validateQuestion, isQuestionValidated } from '@/src/utils/questionValidation';
import { motion } from 'framer-motion';

interface QuestionWithContext extends Question {
  subjectId: string;
  subjectName: string;
  lessonId: number;
  lessonTitle: string;
  levelId: string;
  levelName: string;
}

export default function QuickFlagPage() {
  const router = useRouter();
  const [allQuestions, setAllQuestions] = useState<QuestionWithContext[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionWithContext[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFlagPopup, setShowFlagPopup] = useState<{ questionId: number; subjectId: string; lessonId: number } | null>(null);
  const [flagReason, setFlagReason] = useState('');

  // Load all questions from all levels, subjects, and lessons
  useEffect(() => {
    const loadAllQuestions = () => {
      const levels = dataService.getAllLevels();
      const questions: QuestionWithContext[] = [];

      levels.forEach(level => {
        level.subjects.forEach(subject => {
          subject.lessons.forEach(lesson => {
            lesson.questions.forEach(question => {
              questions.push({
                ...question,
                subjectId: subject.id,
                subjectName: subject.name,
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                levelId: level.id,
                levelName: level.name
              });
            });
          });
        });
      });

      setAllQuestions(questions);
      setFilteredQuestions(questions);
    };

    loadAllQuestions();
  }, []);

  // Filter questions based on selected criteria
  useEffect(() => {
    let filtered = allQuestions;

    // Filter out validated questions
    filtered = filtered.filter(q => !isQuestionValidated(q.id, q.subjectId, q.lessonId));

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(q => q.levelId === selectedLevel);
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(q => q.subjectId === selectedSubject);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === parseInt(selectedDifficulty));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.correctAnswer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQuestions(filtered);
  }, [allQuestions, selectedLevel, selectedSubject, selectedDifficulty, searchTerm]);

  const handleFlagClick = (questionId: number, subjectId: string, lessonId: number) => {
    if (isQuestionFlagged(questionId, subjectId, lessonId)) {
      unflagQuestion(questionId, subjectId, lessonId);
    } else {
      setShowFlagPopup({ questionId, subjectId, lessonId });
    }
  };

  const handleSubmitFlag = () => {
    if (showFlagPopup && flagReason.trim()) {
      const question = filteredQuestions.find(q => 
        q.id === showFlagPopup.questionId && 
        q.subjectId === showFlagPopup.subjectId && 
        q.lessonId === showFlagPopup.lessonId
      );
      
      if (question) {
        flagQuestion(
          showFlagPopup.questionId,
          showFlagPopup.subjectId,
          showFlagPopup.lessonId,
          flagReason.trim(),
          question.question,
          false
        );
      }
      
      setShowFlagPopup(null);
      setFlagReason('');
    }
  };

  const handleValidateClick = (questionId: number, subjectId: string, lessonId: number) => {
    const question = filteredQuestions.find(q => 
      q.id === questionId && 
      q.subjectId === subjectId && 
      q.lessonId === lessonId
    );
    
    if (question) {
      validateQuestion(questionId, subjectId, lessonId, question.question);
      // Refresh the filtered questions to remove the validated question
      setFilteredQuestions(prev => prev.filter(q => 
        !(q.id === questionId && q.subjectId === subjectId && q.lessonId === lessonId)
      ));
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Facile';
      case 2: return 'Moyen';
      case 3: return 'Difficile';
      default: return 'Inconnu';
    }
  };

  const getSubjectColor = (subjectId: string) => {
    switch (subjectId) {
      case 'maths': return 'bg-blue-500';
      case 'francais': return 'bg-purple-500';
      case 'sciences': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const levels = dataService.getAllLevels();
  const subjects = dataService.getAllSubjects();

  return (
    <div className="min-h-screen bg-[#181c24] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Signalement Rapide - Toutes les Questions</h1>
          <button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            title="Retour à l'accueil"
          >
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#232a36] p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Niveau :</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-[#181c24] text-white px-3 py-2 rounded border border-[#232a36]"
              >
                <option value="all">Tous les niveaux</option>
                {levels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Matière :</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#181c24] text-white px-3 py-2 rounded border border-[#232a36]"
              >
                <option value="all">Toutes les matières</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Difficulté :</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-[#181c24] text-white px-3 py-2 rounded border border-[#232a36]"
              >
                <option value="all">Toutes les difficultés</option>
                <option value="1">Facile</option>
                <option value="2">Moyen</option>
                <option value="3">Difficile</option>
              </select>
            </div>
            
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-1">Rechercher :</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher dans les questions..."
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
              <div className="text-sm text-gray-400">Questions affichées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{allQuestions.length}</div>
              <div className="text-sm text-gray-400">Questions totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {new Set(filteredQuestions.map(q => q.levelId)).size}
              </div>
              <div className="text-sm text-gray-400">Niveaux</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {new Set(filteredQuestions.map(q => q.subjectId)).size}
              </div>
              <div className="text-sm text-gray-400">Matières</div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <div className="text-xl">Aucune question trouvée</div>
              <div className="text-sm">Essayez de modifier vos filtres</div>
            </div>
          ) : (
            // Group questions by lesson
            Object.entries(
              filteredQuestions.reduce((acc, question) => {
                const key = `${question.levelId}-${question.subjectId}-${question.lessonId}`;
                if (!acc[key]) {
                  acc[key] = {
                    levelName: question.levelName,
                    subjectName: question.subjectName,
                    subjectId: question.subjectId,
                    lessonTitle: question.lessonTitle,
                    questions: []
                  };
                }
                acc[key].questions.push(question);
                return acc;
              }, {} as Record<string, { levelName: string; subjectName: string; subjectId: string; lessonTitle: string; questions: QuestionWithContext[] }>)
            ).map(([key, lessonGroup]) => (
              <div key={key} className="bg-[#232a36] p-4 rounded-lg">
                {/* Lesson Header */}
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-600">
                  <span className={`${getSubjectColor(lessonGroup.subjectId)} text-white px-3 py-1 rounded text-sm font-medium`}>
                    {lessonGroup.subjectName}
                  </span>
                  <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium">
                    {lessonGroup.levelName}
                  </span>
                  <span className="text-white font-medium">
                    {lessonGroup.lessonTitle}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({lessonGroup.questions.length} question{lessonGroup.questions.length > 1 ? 's' : ''})
                  </span>
                </div>
                
                {/* Questions in this lesson */}
                <div className="space-y-3">
                  {lessonGroup.questions.map((question) => (
                    <div key={`${question.id}-${question.subjectId}-${question.lessonId}`} 
                         className="bg-[#181c24] p-4 rounded-lg hover:bg-[#1f2937] transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        {/* Question Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`${getDifficultyColor(question.difficulty)} text-white px-2 py-1 rounded text-xs`}>
                              {getDifficultyText(question.difficulty)}
                            </span>
                            <span className="text-gray-400 text-xs">
                              Question #{question.id}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* Question */}
                            <div className="lg:col-span-1">
                              <div className="text-sm text-gray-400 mb-1">Question :</div>
                              <div className="text-white text-sm bg-[#232a36] p-3 rounded">
                                {question.question}
                              </div>
                            </div>
                            
                            {/* Correct Answer */}
                            <div className="lg:col-span-1">
                              <div className="text-sm text-gray-400 mb-1">Réponse correcte :</div>
                              <div className="text-green-400 text-sm bg-[#232a36] p-3 rounded font-medium">
                                {question.correctAnswer}
                              </div>
                            </div>
                            
                            {/* Other Options */}
                            <div className="lg:col-span-1">
                              <div className="text-sm text-gray-400 mb-1">Autres options :</div>
                              <div className="text-gray-300 text-sm bg-[#232a36] p-3 rounded">
                                {question.options && question.options.length > 0 ? (
                                  <ul className="space-y-1">
                                    {question.options.filter(opt => opt !== question.correctAnswer).map((option, idx) => (
                                      <li key={idx} className="text-red-400">• {option}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-gray-500">Aucune option</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex-shrink-0 flex gap-2">
                          {/* Validate Button */}
                          <button
                            onClick={() => handleValidateClick(question.id, question.subjectId, question.lessonId)}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-green-600 hover:bg-green-700 text-white"
                            title="Valider la question (OK)"
                          >
                            ✅
                          </button>
                          
                          {/* Flag Button */}
                          <button
                            onClick={() => handleFlagClick(question.id, question.subjectId, question.lessonId)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                              isQuestionFlagged(question.id, question.subjectId, question.lessonId)
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white'
                            }`}
                            title={isQuestionFlagged(question.id, question.subjectId, question.lessonId) ? 'Retirer le signalement' : 'Signaler la question'}
                          >
                            🚩
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Flag Popup */}
      {showFlagPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#232a36] p-6 rounded-lg max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold mb-4">Signaler cette question</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Raison du signalement :</label>
              <textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="Décrivez le problème avec cette question..."
                className="w-full bg-[#181c24] text-white px-3 py-2 rounded border border-[#232a36] h-24 resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowFlagPopup(null);
                  setFlagReason('');
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitFlag}
                disabled={!flagReason.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
              >
                Signaler
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}