'use client';

import { useState } from 'react';
import { 
  getRandomQuestions, 
  getRandomQuestionsFromAllLessons, 
  getAllSubjects,
  type Question 
} from '@/src/data/simplified-service';

interface QuestionSelectorProps {
  onQuestionsSelected: (questions: Question[]) => void;
}

export default function QuestionSelector({ onQuestionsSelected }: QuestionSelectorProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('maths');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [questionCount, setQuestionCount] = useState(5);
  const [mode, setMode] = useState<'lesson' | 'all'>('lesson');
  
  const subjects = getAllSubjects();

  const handleGenerateQuestions = () => {
    let questions: Question[] = [];
    
    switch (mode) {
      case 'lesson':
        questions = getRandomQuestions(selectedSubject, selectedLesson, questionCount);
        break;
      case 'all':
        questions = getRandomQuestionsFromAllLessons(selectedSubject, questionCount);
        break;
    }
    
    onQuestionsSelected(questions);
  };

  return (
    <div className="bg-[#232a36] p-6 rounded-lg text-white">
      <h3 className="text-xl font-bold mb-4">Sélecteur de Questions</h3>
      
      <div className="space-y-4">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Mode :</label>
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value as any)}
            className="w-full p-2 bg-[#181c24] text-white rounded border border-[#232a36]"
          >
            <option value="lesson">Questions d'une leçon spécifique</option>
            <option value="all">Questions de toutes les leçons</option>
          </select>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Matière :</label>
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 bg-[#181c24] text-white rounded border border-[#232a36]"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Lesson Selection (only for lesson mode) */}
        {mode === 'lesson' && (
          <div>
            <label className="block text-sm font-medium mb-2">Leçon :</label>
            <select 
              value={selectedLesson} 
              onChange={(e) => setSelectedLesson(Number(e.target.value))}
              className="w-full p-2 bg-[#181c24] text-white rounded border border-[#232a36]"
            >
              {subjects.find(s => s.id === selectedSubject)?.lessons.map(lesson => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Question Count */}
        <div>
          <label className="block text-sm font-medium mb-2">Nombre de questions :</label>
          <select 
            value={questionCount} 
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full p-2 bg-[#181c24] text-white rounded border border-[#232a36]"
          >
            <option value={3}>3 questions</option>
            <option value={5}>5 questions</option>
            <option value={10}>10 questions</option>
            <option value={15}>15 questions</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateQuestions}
          className="w-full bg-[#2ecc71] text-[#181c24] font-bold py-2 px-4 rounded hover:bg-[#27ae60] transition-colors"
        >
          Générer les questions
        </button>
      </div>
    </div>
  );
} 