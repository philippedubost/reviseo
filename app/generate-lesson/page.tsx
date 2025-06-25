'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { llmService, type GenerationRequest, type PromptAnalysis } from '@/src/services/llm-service';
import LessonGenerationScreen from '@/src/components/LessonGenerationScreen';
import QualityIndicator from '@/src/components/QualityIndicator';

export default function GenerateLessonPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('maths');
  const [selectedLevel, setSelectedLevel] = useState('troisieme');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [qualityStats, setQualityStats] = useState<{
    validQuestions: number;
    totalQuestions: number;
    generationTime?: number;
    model?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Récupérer le prompt depuis l'URL
  useEffect(() => {
    const urlPrompt = searchParams.get('prompt');
    if (urlPrompt) {
      const decodedPrompt = decodeURIComponent(urlPrompt);
      setPrompt(decodedPrompt);
      // Analyser automatiquement le prompt
      analyzePrompt(decodedPrompt);
    }
  }, [searchParams]);

  const analyzePrompt = async (promptText: string) => {
    if (!promptText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = process.env.NODE_ENV === 'development' 
        ? llmService.analyzePromptFallback(promptText)
        : await llmService.analyzePrompt(promptText);
      
      setAnalysis(result);
      setSelectedSubject(result.subject);
      setSelectedLevel(result.level);
      setSelectedDifficulty(result.difficulty);
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
      setError('Erreur lors de l\'analyse du prompt');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const subjects = [
    { id: 'maths', name: 'Maths', icon: '📐', color: 'from-blue-500 to-cyan-500' },
    { id: 'histoire', name: 'Histoire', icon: '📚', color: 'from-amber-500 to-orange-500' },
    { id: 'geo', name: 'Géo', icon: '🌍', color: 'from-green-500 to-emerald-500' },
    { id: 'francais', name: 'Français', icon: '📖', color: 'from-purple-500 to-pink-500' },
    { id: 'svt', name: 'SVT', icon: '🔬', color: 'from-red-500 to-rose-500' },
    { id: 'physique', name: 'Physique', icon: '⚗️', color: 'from-indigo-500 to-blue-500' }
  ];

  const levels = [
    { id: 'sixieme', name: '6ème' },
    { id: 'cinquieme', name: '5ème' },
    { id: 'quatrieme', name: '4ème' },
    { id: 'troisieme', name: '3ème' },
    { id: 'seconde', name: '2nde' },
    { id: 'premiere', name: '1ère' },
    { id: 'terminale', name: 'Term' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Facile', color: 'from-green-500 to-emerald-500' },
    { id: 'medium', name: 'Moyen', color: 'from-yellow-500 to-orange-500' },
    { id: 'hard', name: 'Difficile', color: 'from-red-500 to-rose-500' }
  ];

  // Définir les niveaux verrouillés (exemple : tous sauf 'troisieme')
  const lockedLevels = levels.filter(l => l.id !== 'troisieme').map(l => l.id);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setQualityStats(null);
    const startTime = Date.now();

    try {
      const request: GenerationRequest = {
        prompt: prompt.trim(),
        subject: selectedSubject,
        level: selectedLevel,
        difficulty: selectedDifficulty,
        questionCount
      };

      // Utiliser le service LLM ou le mock pour les tests
      const lesson = process.env.NODE_ENV === 'development' 
        ? llmService.generateMockLesson(request)
        : await llmService.generateLesson(request);

      const generationTime = Math.round((Date.now() - startTime) / 1000);
      
      // Calculer les statistiques de qualité
      const totalQuestions = lesson.questions.length;
      const validQuestions = lesson.questions.filter(q => 
        q.question && q.question.length >= 20 && 
        q.explanation && q.explanation.length >= 50 &&
        q.correctAnswer && q.correctAnswer.trim() !== ''
      ).length;

      setQualityStats({
        validQuestions,
        totalQuestions,
        generationTime,
        model: process.env.NODE_ENV === 'development' ? 'Mock' : 'GPT-4'
      });

      // Sauvegarder la leçon dans le localStorage
      localStorage.setItem(`llm_lesson_${lesson.id}`, JSON.stringify(lesson));

      // Attendre un peu pour montrer les stats de qualité
      setTimeout(() => {
        // Rediriger vers la leçon générée
        router.push(`/llm-lesson/${lesson.id}`);
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la génération:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la génération de la leçon');
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <LessonGenerationScreen
        prompt={prompt}
        subject={selectedSubject}
        level={selectedLevel}
        difficulty={selectedDifficulty}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#181c24] flex flex-col">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="text-2xl"
            >
              🎯
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-white">Créer une leçon personnalisée</h1>
              <p className="text-sm text-gray-400">Génération IA de contenu éducatif</p>
            </div>
          </div>
          <motion.button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Indicateur de qualité (si disponible) */}
        {qualityStats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <QualityIndicator {...qualityStats} />
          </motion.div>
        )}

        {/* Message d'erreur */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-xl p-3"
          >
            <div className="text-red-400 text-sm">
              ❌ {error}
            </div>
          </motion.div>
        )}

        {/* Prompt Input + Generate Button alignés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError(null);
              if (e.target.value.length > 10) {
                analyzePrompt(e.target.value);
              }
            }}
            placeholder="Ex: Les équations du second degré, La Révolution française, Les volcans..."
            className="w-full py-2 px-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none min-h-[44px]"
            rows={2}
          />
        </motion.div>
        <div className="flex justify-center pt-2">
          <motion.button
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
            whileHover={{ scale: prompt.trim() ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Créer
          </motion.button>
        </div>
        {/* Fin du bloc aligné */}

        {/* Auto-detected Settings */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3"
          >
            <div className="text-blue-400 text-sm font-medium mb-2">
              ⚡ Paramètres détectés automatiquement
            </div>
            <div className="flex gap-2 text-xs">
              <span className="bg-blue-500/20 px-2 py-1 rounded">
                {subjects.find(s => s.id === analysis.subject)?.name}
              </span>
              <span className="bg-blue-500/20 px-2 py-1 rounded">
                {levels.find(l => l.id === analysis.level)?.name}
              </span>
              <span className="bg-blue-500/20 px-2 py-1 rounded">
                {difficulties.find(d => d.id === analysis.difficulty)?.name}
              </span>
            </div>
          </motion.div>
        )}

        {/* Compact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <label className="text-white font-medium">Paramètres</label>
          
          {/* Subject Selection */}
          <div className="grid grid-cols-3 gap-2">
            {subjects.map((subject) => (
              <motion.button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  selectedSubject === subject.id
                    ? `bg-gradient-to-r ${subject.color} border-white/30 text-white`
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-lg mb-1">{subject.icon}</div>
                <div className="text-xs font-medium">{subject.name}</div>
              </motion.button>
            ))}
          </div>

          {/* Level and Difficulty */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Niveau</label>
              <div className="grid grid-cols-4 gap-1">
                {levels.map((level) => {
                  const isLocked = lockedLevels.includes(level.id);
                  return (
                    <motion.button
                      key={level.id}
                      onClick={() => !isLocked && setSelectedLevel(level.id)}
                      disabled={isLocked}
                      className={`p-2 rounded border text-xs transition-all duration-300 ${
                        selectedLevel === level.id
                          ? 'bg-blue-500 border-white/30 text-white'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      } ${isLocked ? 'opacity-60 cursor-not-allowed bg-gray-700 grayscale line-through' : ''}`}
                      whileHover={{ scale: !isLocked ? 1.05 : 1 }}
                      whileTap={{ scale: !isLocked ? 0.95 : 1 }}
                    >
                      {level.name}
                      {isLocked && <span className="ml-1">🔒</span>}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Difficulté</label>
              <div className="grid grid-cols-3 gap-1">
                {difficulties.map((difficulty) => (
                  <motion.button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id as 'easy' | 'medium' | 'hard')}
                    className={`p-2 rounded border text-xs transition-all duration-300 ${
                      selectedDifficulty === difficulty.id
                        ? `bg-gradient-to-r ${difficulty.color} border-white/30 text-white`
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {difficulty.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info sur la qualité */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 text-xs"
        >
          <p>✨ Questions générées avec validation automatique de qualité</p>
          <p>🔄 Régénération automatique si qualité insuffisante</p>
        </motion.div>
      </div>
    </div>
  );
} 