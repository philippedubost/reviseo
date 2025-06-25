import React from 'react';
import { motion } from 'framer-motion';

interface QualityIndicatorProps {
  validQuestions: number;
  totalQuestions: number;
  generationTime?: number;
  model?: string;
}

export default function QualityIndicator({ 
  validQuestions, 
  totalQuestions, 
  generationTime,
  model 
}: QualityIndicatorProps) {
  const qualityPercentage = Math.round((validQuestions / totalQuestions) * 100);
  const qualityLevel = qualityPercentage >= 90 ? 'excellent' : 
                      qualityPercentage >= 70 ? 'bon' : 
                      qualityPercentage >= 50 ? 'moyen' : 'faible';

  const getQualityColor = () => {
    switch (qualityLevel) {
      case 'excellent': return 'text-green-400';
      case 'bon': return 'text-blue-400';
      case 'moyen': return 'text-yellow-400';
      case 'faible': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getQualityIcon = () => {
    switch (qualityLevel) {
      case 'excellent': return '🌟';
      case 'bon': return '✅';
      case 'moyen': return '⚠️';
      case 'faible': return '❌';
      default: return '❓';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Qualité de la Génération</h3>
        <div className={`text-2xl ${getQualityColor()}`}>
          {getQualityIcon()}
        </div>
      </div>

      <div className="space-y-3">
        {/* Barre de progression */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${qualityPercentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-2 rounded-full ${
              qualityLevel === 'excellent' ? 'bg-green-500' :
              qualityLevel === 'bon' ? 'bg-blue-500' :
              qualityLevel === 'moyen' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          />
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="text-white font-semibold">{validQuestions}/{totalQuestions}</div>
            <div className="text-gray-400">Questions valides</div>
          </div>
          <div className="text-center">
            <div className={`font-semibold ${getQualityColor()}`}>{qualityPercentage}%</div>
            <div className="text-gray-400">Taux de qualité</div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        {(generationTime || model) && (
          <div className="pt-3 border-t border-gray-700">
            <div className="flex justify-between text-xs text-gray-400">
              {generationTime && (
                <span>⏱️ {generationTime}s</span>
              )}
              {model && (
                <span>🤖 {model}</span>
              )}
            </div>
          </div>
        )}

        {/* Message de qualité */}
        <div className={`text-sm ${getQualityColor()} text-center`}>
          {qualityLevel === 'excellent' && '🌟 Questions de très haute qualité générées !'}
          {qualityLevel === 'bon' && '✅ La plupart des questions sont de bonne qualité'}
          {qualityLevel === 'moyen' && '⚠️ Certaines questions nécessitent une amélioration'}
          {qualityLevel === 'faible' && '❌ Régénération recommandée pour améliorer la qualité'}
        </div>
      </div>
    </motion.div>
  );
} 