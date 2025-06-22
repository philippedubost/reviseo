# Data Structure Documentation

This directory contains all the educational content organized in a structured and maintainable way.

## Directory Structure

```
src/data/
├── types/           # Shared TypeScript interfaces and types
├── utils/           # Shared utility functions
├── subjects/        # Subject-specific data and functions
│   ├── mathematiques/
│   ├── francais/
│   ├── sciences/
│   └── index.ts     # Main subjects configuration
└── index.ts         # Main data exports
```

## Organization

### Types (`types/index.ts`)
Contains all shared TypeScript interfaces:
- `Question`: Question structure with options, answers, explanations
- `Lesson`: Lesson structure with questions and metadata
- `Subject`: Subject structure with lessons and styling
- `SubjectType`: Union type for subject identifiers

### Utils (`utils/index.ts`)
Contains shared utility functions:
- `shuffle()`: Fisher-Yates array shuffling
- `getRandomQuestions()`: Get random questions from a set
- `getRandomQuestionsFromAllLessons()`: Get random questions from all lessons
- `getQuestionsByDifficulty()`: Filter questions by difficulty
- `getQuestionsInDifficultyOrder()`: Sort questions by difficulty

### Subjects
Each subject has its own directory with:
- `lessons.ts`: All lessons and questions for that subject
- `index.ts`: Subject-specific functions and exports

#### Available Subjects:
1. **Mathématiques** (`mathematiques/`)
   - 8 lessons covering numbers, geometry, functions, statistics, probabilities, equations, inequalities, and systems
   
2. **Français** (`francais/`)
   - 2 lessons covering grammar/conjugation and spelling/vocabulary
   
3. **Sciences** (`sciences/`)
   - 2 lessons covering electricity/energy and mechanics/motion

### Main Exports (`subjects/index.ts`)
Provides unified access to all subjects with helper functions:
- `subjects`: Array of all subjects with their metadata
- `getSubjectById()`: Get a specific subject by ID
- `getAllSubjects()`: Get all subjects
- `getLessonById()`: Get a specific lesson by subject and lesson ID
- `getRandomQuestions()`: Get random questions from a lesson
- `getRandomQuestionsFromAllLessons()`: Get random questions from all lessons in a subject
- `getAllLessonsForSubject()`: Get all lessons for a subject

## Usage Examples

### Basic Usage
```typescript
import { getAllSubjects, getSubjectById } from '@/src/data/subjects';

// Get all subjects
const subjects = getAllSubjects();

// Get a specific subject
const maths = getSubjectById('maths');
```

### Subject-Specific Access
```typescript
import { Mathematiques, Francais } from '@/src/data';

// Access mathematics lessons directly
const mathsLessons = Mathematiques.getAllLessons();
const randomMathsQuestions = Mathematiques.getRandomQuestionsFromAllLessons(10);

// Access French lessons directly
const frenchLessons = Francais.getAllLessons();
```

### Utility Functions
```typescript
import { getRandomQuestions, getQuestionsByDifficulty } from '@/src/data/utils';

// Get random questions from a lesson
const randomQuestions = getRandomQuestions(lesson.questions, 5);

// Get questions by difficulty
const easyQuestions = getQuestionsByDifficulty(lesson.questions, 1, 3);
```

## Benefits of This Structure

1. **Modularity**: Each subject is self-contained and can be developed independently
2. **Maintainability**: Easy to add new subjects or modify existing ones
3. **Type Safety**: Shared types ensure consistency across the application
4. **Reusability**: Utility functions can be used across all subjects
5. **Scalability**: Easy to add new subjects without affecting existing code
6. **Performance**: Subject-specific functions allow for optimized queries

## Adding a New Subject

1. Create a new directory in `subjects/`
2. Create `lessons.ts` with the subject's lessons and questions
3. Create `index.ts` with subject-specific functions
4. Add the subject to `subjects/index.ts`
5. Update the `SubjectType` in `types/index.ts`

## Migration Notes

This structure replaces the previous flat file organization where all data was in separate files. The new structure provides better organization, type safety, and maintainability while preserving all existing functionality. 