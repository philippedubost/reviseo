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

// Subject color definitions - Each subject has unique colors
export const SUBJECT_COLORS: Record<string, SubjectColors> = {
  maths: {
    gradient: 'from-[#00baff] to-[#2196f3]',
    primary: '#00baff',
    secondary: '#2196f3', 
    light: '#66d9ff',
    dark: '#0099cc',
    border: '#00baff40',
    bg: '#00baff10',
    text: '#ffffff'
  },
  francais: {
    gradient: 'from-[#e74c3c] to-[#f39c12]',
    primary: '#e74c3c',
    secondary: '#f39c12',
    light: '#ff6b6b',
    dark: '#c0392b',
    border: '#e74c3c40',
    bg: '#e74c3c10',
    text: '#ffffff'
  },
  'histoire-geo': {
    gradient: 'from-[#8B4513] to-[#D2691E]',
    primary: '#8B4513',
    secondary: '#D2691E',
    light: '#CD853F',
    dark: '#654321',
    border: '#8B451340',
    bg: '#8B451310',
    text: '#ffffff'
  },
  svt: {
    gradient: 'from-[#27ae60] to-[#2ecc71]',
    primary: '#27ae60',
    secondary: '#2ecc71',
    light: '#58d68d',
    dark: '#1e8449',
    border: '#27ae6040',
    bg: '#27ae6010',
    text: '#ffffff'
  },
  anglais: {
    gradient: 'from-[#2980b9] to-[#3498db]',
    primary: '#2980b9',
    secondary: '#3498db',
    light: '#5dade2',
    dark: '#1f618d',
    border: '#2980b940',
    bg: '#2980b910',
    text: '#ffffff'
  },
  // Additional subjects for future use
  chimie: {
    gradient: 'from-[#8e44ad] to-[#9b59b6]',
    primary: '#8e44ad',
    secondary: '#9b59b6',
    light: '#bb8fce',
    dark: '#6c3483',
    border: '#8e44ad40',
    bg: '#8e44ad10',
    text: '#ffffff'
  },
  physique: {
    gradient: 'from-[#1e3a8a] to-[#3b82f6]',
    primary: '#1e3a8a',
    secondary: '#3b82f6',
    light: '#60a5fa',
    dark: '#1e40af',
    border: '#1e3a8a40',
    bg: '#1e3a8a10',
    text: '#ffffff'
  }
};

// Level color definitions (for level-specific theming)
export const LEVEL_COLORS: Record<string, string> = {
  sixieme: 'linear-gradient(135deg, #3d4fcc 0%, #5a2b8a 100%)',
  cinquieme: 'linear-gradient(135deg, #c04dd8 0%, #c02a4a 100%)',
  quatrieme: 'linear-gradient(135deg, #1a6ad8 0%, #00a4b4 100%)',
  troisieme: 'linear-gradient(135deg, #1aa053 0%, #0ab08d 100%)',
  seconde: 'linear-gradient(135deg, #c03a6a 0%, #c08a2a 100%)',
  premiere: 'linear-gradient(135deg, #4a9a97 0%, #aa6570 100%)',
  terminale: 'linear-gradient(135deg, #c04a5e 0%, #aa6594 100%)'
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