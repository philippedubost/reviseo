'use client';

import { useState, useEffect } from 'react';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { dataService } from '../data/simplified-service';

// Function to generate random animal + adjective combinations (kept for fallback)
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

// Function to get the most advanced level with actual progress
const getMostAdvancedLevel = () => {
  const levels = ['sixieme', 'cinquieme', 'quatrieme', 'troisieme', 'seconde', 'premiere', 'terminale'];
  const subjects = ['maths', 'francais', 'sciences'];
  
  // Check each level starting from the most advanced
  for (let i = levels.length - 1; i >= 0; i--) {
    const level = levels[i];
    
    // Check if there's any progress in any subject for this level
    for (const subject of subjects) {
      const storageKey = `${subject}Progress_${level}`;
      if (typeof window !== 'undefined') {
        const savedProgress = localStorage.getItem(storageKey);
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          // If there's any meaningful progress (XP > 0 or questions answered)
          if (progress.totalXP > 0 || progress.totalQuestionsAnswered > 0) {
            return level;
          }
        }
      }
    }
  }
  
  // Default to troisieme if no progress found
  return 'troisieme';
};

// Function to get level display name
const getLevelDisplayName = (levelId: string) => {
  switch (levelId) {
    case 'sixieme': return '6ème';
    case 'cinquieme': return '5ème';
    case 'quatrieme': return '4ème';
    case 'troisieme': return '3ème';
    case 'seconde': return '2nde';
    case 'premiere': return '1ère';
    case 'terminale': return 'Term.';
    default: return '3ème';
  }
};

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Get the most advanced level with actual progress
  const mostAdvancedLevel = getMostAdvancedLevel();
  
  // Get stats from all subjects for the most advanced level
  const mathsProgress = useLessonProgress('maths', mostAdvancedLevel);
  const francaisProgress = useLessonProgress('francais', mostAdvancedLevel);
  const sciencesProgress = useLessonProgress('sciences', mostAdvancedLevel);

  // Load student name from localStorage and check if first visit
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedName = localStorage.getItem('studentName');
      const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
      
      if (savedName) {
        setStudentName(savedName);
      }
      
      if (hasVisitedBefore) {
        setIsFirstVisit(false);
      }
    }
  }, []);

  // Save student name to localStorage
  const saveStudentName = (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('studentName', name);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  };

  // Handle nickname editing
  const handleEditClick = () => {
    setTempName(studentName);
    setIsEditing(true);
  };

  const handleSave = () => {
    const finalName = tempName.trim();
    if (finalName) {
      setStudentName(finalName);
      saveStudentName(finalName);
      setIsFirstVisit(false);
    }
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

  // Handle first time name input
  const handleFirstTimeNameSave = () => {
    const finalName = tempName.trim();
    if (finalName) {
      setStudentName(finalName);
      saveStudentName(finalName);
      setIsFirstVisit(false);
      setTempName('');
    }
  };

  // Calculate stats for the most advanced level only
  const totalStreak = Math.max(
    mathsProgress.currentStreak,
    francaisProgress.currentStreak,
    sciencesProgress.currentStreak
  );

  // Calculate mastery for the most advanced level only
  const levelMastery = Math.round(
    (mathsProgress.globalProgress + francaisProgress.globalProgress + sciencesProgress.globalProgress) / 3
  );

  const totalXP = mathsProgress.totalXP + francaisProgress.totalXP + sciencesProgress.totalXP;

  // Calculate weekly XP (mock data for now - in real app you'd track daily XP)
  const weeklyXP = Math.min(totalXP, 150 + Math.floor(totalXP * 0.3));

  return (
    <div className="px-4 py-4 mb-2">
      {/* Student Name Section */}
      <div className="mb-4 text-center">
        {!studentName && isFirstVisit ? (
          // First time: ask for name
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Salut ! 👋</h2>
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFirstTimeNameSave();
                  }
                }}
                className="bg-[#232a36] text-white text-lg px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-400 focus:outline-none text-center"
                placeholder="Comment tu t'appelles ?"
                autoFocus
                maxLength={20}
              />
              <button
                onClick={handleFirstTimeNameSave}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-4 py-2 rounded-lg transition-colors h-full flex items-center"
              >
                OK
              </button>
            </div>
          </div>
        ) : isEditing ? (
          // Editing existing name
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
          // Display name with edit option
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

      {/* Welcome Content for First Visit or Stats Dashboard */}
      {isFirstVisit && !studentName ? (
        <div className="text-center">
          <div className="text-gray-400 text-sm">
            <p>Ton coach personnel pour réviser et progresser 📚</p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Dashboard */}
          <div className="grid grid-cols-3 gap-2">
            {/* Learning Streak Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-3 text-white shadow-lg hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-xl mb-1">🔥</div>
                <div className="text-xl font-bold leading-tight">{totalStreak}</div>
                <div className="text-xs opacity-90 font-medium">Série</div>
              </div>
            </div>
            
            {/* Level Mastery Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl p-3 text-white shadow-lg hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-xl mb-1">🎯</div>
                <div className="text-xl font-bold leading-tight">{levelMastery}%</div>
                <div className="text-xs opacity-90 font-medium">Maîtrise<br />{getLevelDisplayName(mostAdvancedLevel)}</div>
              </div>
            </div>
            
            {/* Weekly XP Growth Card */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-3 text-white shadow-lg hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-xl mb-1">📈</div>
                <div className="text-lg font-bold leading-tight">+{weeklyXP}</div>
                <div className="text-xs opacity-90 font-medium">Cette<br />semaine</div>
              </div>
            </div>
          </div>

          {/* Quick motivation message */}
          <div className="mt-3 text-center">
            <p className="text-gray-400 text-sm">
              {totalStreak > 5 && "Tu es en feu ! 🔥"}
              {totalStreak <= 5 && levelMastery > 70 && "Excellent travail ! 💪"}
              {totalStreak <= 5 && levelMastery <= 70 && levelMastery > 30 && "Continue comme ça ! 🌟"}
              {totalStreak <= 5 && levelMastery <= 30 && "C'est parti pour apprendre ! 🚀"}
            </p>
          </div>


        </>
      )}
    </div>
  );
}