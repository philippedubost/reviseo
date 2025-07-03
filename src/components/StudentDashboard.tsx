'use client';

import { useState, useEffect } from 'react';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { dataService } from '../data/simplified-service';

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState('Étudiant');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  // Get stats from all subjects (using troisieme as default level)
  const mathsProgress = useLessonProgress('maths', 'troisieme');
  const francaisProgress = useLessonProgress('francais', 'troisieme');
  const sciencesProgress = useLessonProgress('sciences', 'troisieme');

  // Load student name from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('studentName');
      if (savedName) {
        setStudentName(savedName);
      }
    }
  }, []);

  // Save student name to localStorage
  const saveStudentName = (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('studentName', name);
    }
  };

  // Handle nickname editing
  const handleEditClick = () => {
    setTempName(studentName);
    setIsEditing(true);
  };

  const handleSave = () => {
    const finalName = tempName.trim() || 'Étudiant';
    setStudentName(finalName);
    saveStudentName(finalName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName('');
    setIsEditing(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Calculate overall stats
  const totalStreak = Math.max(
    mathsProgress.currentStreak,
    francaisProgress.currentStreak,
    sciencesProgress.currentStreak
  );

  const overallProgress = Math.round(
    (mathsProgress.globalProgress + francaisProgress.globalProgress + sciencesProgress.globalProgress) / 3
  );

  const totalXP = mathsProgress.totalXP + francaisProgress.totalXP + sciencesProgress.totalXP;

  // Calculate weekly XP (mock data for now - in real app you'd track daily XP)
  const weeklyXP = Math.min(totalXP, 150 + Math.floor(totalXP * 0.3));

  return (
    <div className="px-4 py-6 mb-4">
      {/* Editable Student Name */}
      <div className="mb-6 text-center">
        {isEditing ? (
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSave}
              className="bg-[#232a36] text-white text-xl font-bold px-3 py-1 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-center"
              placeholder="Ton nom"
              autoFocus
              maxLength={20}
            />
          </div>
        ) : (
          <div
            onClick={handleEditClick}
            className="inline-flex items-center gap-2 cursor-pointer hover:bg-[#232a36] px-3 py-1 rounded-lg transition-colors group"
          >
            <h2 className="text-xl font-bold text-white">
              Salut {studentName} ! 👋
            </h2>
            <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
              ✏️
            </span>
          </div>
        )}
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-3">
        {/* Learning Streak Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-center">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-2xl font-bold">{totalStreak}</div>
            <div className="text-xs opacity-90 font-medium">Série</div>
          </div>
        </div>
        
        {/* Overall Progress Card */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-4 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <div className="text-xs opacity-90 font-medium">Maîtrise</div>
          </div>
        </div>
        
        {/* Weekly XP Growth Card */}
        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-4 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="text-xl font-bold">+{weeklyXP}</div>
            <div className="text-xs opacity-90 font-medium">Cette semaine</div>
          </div>
        </div>
      </div>

      {/* Quick motivation message */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">
          {totalStreak > 5 && "Tu es en feu ! 🔥"}
          {totalStreak <= 5 && overallProgress > 70 && "Excellent travail ! 💪"}
          {totalStreak <= 5 && overallProgress <= 70 && overallProgress > 30 && "Continue comme ça ! 🌟"}
          {totalStreak <= 5 && overallProgress <= 30 && "C'est parti pour apprendre ! 🚀"}
        </p>
      </div>
    </div>
  );
}