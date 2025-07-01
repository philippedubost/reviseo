/**
 * Service de données modulaire pour l'application éducative
 * Structure: 7 niveaux × 5 matières × 8 leçons × 8 questions = 2,240 questions
 */

export interface Question {
  id: number;
  type: 'multiple-choice' | 'input';
  difficulty: number;
  question: string;
  correctAnswer: string;
  explanation: string;
  points: number;
  options?: string[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface EducationData {
  levels: Level[];
}

/**
 * Charger toutes les données depuis le fichier principal
 */
export async function loadAllData(): Promise<EducationData> {
  try {
    const response = await fetch('/data/index.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
    throw error;
  }
}

/**
 * Charger un niveau spécifique
 */
export async function loadLevel(levelId: string): Promise<Level> {
  try {
    const response = await fetch(`/data/levels/${levelId}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors du chargement du niveau ${levelId}:`, error);
    throw error;
  }
}

/**
 * Charger les métadonnées
 */
export async function loadMetadata() {
  try {
    const response = await fetch('/data/metadata.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du chargement des métadonnées:', error);
    throw error;
  }
}

/**
 * Obtenir la liste des niveaux disponibles
 */
export async function getAvailableLevels(): Promise<Array<{id: string, name: string}>> {
  const metadata = await loadMetadata();
  return metadata.levels.map((level: any) => ({
    id: level.id,
    name: level.name
  }));
}
