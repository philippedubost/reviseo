// Centralized color system for consistent subject theming
export interface SubjectColors {
  gradient: string;          // Tailwind gradient classes
  primary: string;          // Primary hex color
  secondary: string;        // Secondary hex color
  light: string;           // Light variant
  dark: string;            // Dark variant
  border: string;          // Border color
  bg: string;             // Background color
  text: string;           // Text color for contrast
}

// Subject color definitions - Using shades of green, cyan, and pink
export const SUBJECT_COLORS: Record<string, SubjectColors> = {
  maths: {
    gradient: 'from-[#06b6d4] to-[#0891b2]',
    primary: '#06b6d4',
    secondary: '#0891b2', 
    light: '#22d3ee',
    dark: '#0e7490',
    border: '#06b6d440',
    bg: '#06b6d410',
    text: '#ffffff'
  },
  francais: {
    gradient: 'from-[#ec4899] to-[#db2777]',
    primary: '#ec4899',
    secondary: '#db2777',
    light: '#f472b6',
    dark: '#be185d',
    border: '#ec489940',
    bg: '#ec489910',
    text: '#ffffff'
  },
  'histoire-geo': {
    gradient: 'from-[#10b981] to-[#059669]',
    primary: '#10b981',
    secondary: '#059669',
    light: '#34d399',
    dark: '#047857',
    border: '#10b98140',
    bg: '#10b98110',
    text: '#ffffff'
  },
  svt: {
    gradient: 'from-[#22c55e] to-[#16a34a]',
    primary: '#22c55e',
    secondary: '#16a34a',
    light: '#4ade80',
    dark: '#15803d',
    border: '#22c55e40',
    bg: '#22c55e10',
    text: '#ffffff'
  },
  anglais: {
    gradient: 'from-[#0891b2] to-[#0e7490]',
    primary: '#0891b2',
    secondary: '#0e7490',
    light: '#06b6d4',
    dark: '#164e63',
    border: '#0891b240',
    bg: '#0891b210',
    text: '#ffffff'
  },
  // Additional subjects for future use
  chimie: {
    gradient: 'from-[#f472b6] to-[#ec4899]',
    primary: '#f472b6',
    secondary: '#ec4899',
    light: '#f9a8d4',
    dark: '#db2777',
    border: '#f472b640',
    bg: '#f472b610',
    text: '#ffffff'
  },
  physique: {
    gradient: 'from-[#06b6d4] to-[#0284c7]',
    primary: '#06b6d4',
    secondary: '#0284c7',
    light: '#22d3ee',
    dark: '#0369a1',
    border: '#06b6d440',
    bg: '#06b6d410',
    text: '#ffffff'
  }
};

// Level color definitions - Using shades of blue and orange gradients
export const LEVEL_COLORS: Record<string, string> = {
  sixieme: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  cinquieme: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
  quatrieme: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
  troisieme: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
  seconde: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  premiere: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
  terminale: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
};

// Get subject colors with fallback
export function getSubjectColors(subjectId: string): SubjectColors {
  return SUBJECT_COLORS[subjectId] || SUBJECT_COLORS.maths;
}

// Get level color with fallback  
export function getLevelColor(levelId: string): string {
  return LEVEL_COLORS[levelId] || LEVEL_COLORS.sixieme;
}

// Generate CSS custom properties for a subject
export function getSubjectCSSVars(subjectId: string): Record<string, string> {
  const colors = getSubjectColors(subjectId);
  return {
    '--subject-primary': colors.primary,
    '--subject-secondary': colors.secondary,
    '--subject-light': colors.light,
    '--subject-dark': colors.dark,
    '--subject-border': colors.border,
    '--subject-bg': colors.bg,
    '--subject-text': colors.text
  };
}

// Get subject icon with fallback
export function getSubjectIcon(subjectId: string): string {
  const icons: Record<string, string> = {
    maths: '🔢',
    francais: '📝',
    'histoire-geo': '🌍',
    svt: '🌱',
    anglais: '🇬�',
    physique: '⚡',
    chimie: '⚗️'
  };
  return icons[subjectId] || '📚';
}

// Get difficulty color
export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy': return '#2ecc71';
    case 'medium': return '#f39c12';  
    case 'hard': return '#e74c3c';
    default: return '#6c757d';
  }
}

// Get difficulty background color
export function getDifficultyBgColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy': return 'bg-[#2ecc71] text-[#181c24]';
    case 'medium': return 'bg-[#f39c12] text-[#181c24]';
    case 'hard': return 'bg-[#e74c3c] text-white';
    default: return 'bg-[#6c757d] text-white';
  }
}