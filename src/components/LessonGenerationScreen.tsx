'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LessonGenerationScreenProps {
  prompt: string;
  subject: string;
  level: string;
  difficulty: string;
}

export default function LessonGenerationScreen({ 
  prompt, 
  subject, 
  level, 
  difficulty 
}: LessonGenerationScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState('');

  const steps = [
    'Analyse de votre demande...',
    'Recherche de contenu adapté...',
    'Création des questions...',
    'Vérification du niveau...',
    'Finalisation de la leçon...'
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    const dotsInterval = setInterval(() => {
      setDots((prev) => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotsInterval);
    };
  }, [steps.length]);

  const getSubjectIcon = (subject: string) => {
    const icons: Record<string, string> = {
      'maths': '📐',
      'histoire': '📚',
      'geo': '🌍',
      'francais': '📖',
      'svt': '🔬',
      'physique': '⚗️'
    };
    return icons[subject] || '🎯';
  };

  const getLevelName = (level: string) => {
    const levels: Record<string, string> = {
      'sixieme': 'Sixième',
      'cinquieme': 'Cinquième',
      'quatrieme': 'Quatrième',
      'troisieme': 'Troisième',
      'seconde': 'Seconde',
      'premiere': 'Première',
      'terminale': 'Terminale'
    };
    return levels[level] || level;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c24] via-[#1a1f2a] to-[#0f1419] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-6xl mb-4"
          >
            {getSubjectIcon(subject)}
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Génération en cours
          </h1>
          <p className="text-gray-400">
            Création de votre leçon personnalisée
          </p>
        </motion.div>

        {/* Lesson Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-lg">📝</span>
              <div>
                <p className="text-white font-medium">Sujet</p>
                <p className="text-gray-300 text-sm">{prompt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🎓</span>
              <div>
                <p className="text-white font-medium">Niveau</p>
                <p className="text-gray-300 text-sm">{getLevelName(level)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-white font-medium">Difficulté</p>
                <p className="text-gray-300 text-sm capitalize">{difficulty}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: 0, 
                opacity: index === currentStep ? 1 : 0.5 
              }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30' 
                  : 'bg-white/5'
              }`}
            >
              <motion.div
                animate={index === currentStep ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-blue-400' : 'bg-gray-500'
                }`}
              />
              <span className={`text-sm ${
                index === currentStep ? 'text-white' : 'text-gray-400'
              }`}>
                {step}
                {index === currentStep && dots}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400 text-sm">
            Cela peut prendre quelques secondes...
          </p>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
} 