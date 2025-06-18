# Random Question Selection System

This project now includes a comprehensive random question selection system that allows you to generate questions from a database of math problems.

## Features

### 1. Question Database
- **Location**: `src/data/lessons.ts`
- **Content**: 6 lessons with multiple questions each
- **Question Types**: Multiple choice, calculation, and text input
- **Difficulty Levels**: Easy (1), Medium (2), Hard (3)

### 2. Random Selection Functions

#### `getRandomQuestions(lessonId, count)`
- Gets random questions from a specific lesson
- **Parameters**:
  - `lessonId`: ID of the lesson (1-6)
  - `count`: Number of questions to return (default: 10)
- **Returns**: Array of random questions from that lesson

#### `getRandomQuestionsFromAllLessons(count)`
- Gets random questions from all lessons combined
- **Parameters**:
  - `count`: Number of questions to return (default: 10)
- **Returns**: Array of random questions from all lessons

#### `getQuestionsByDifficulty(difficulty, count)`
- Gets random questions filtered by difficulty level
- **Parameters**:
  - `difficulty`: 1 (easy), 2 (medium), or 3 (hard)
  - `count`: Number of questions to return (default: 10)
- **Returns**: Array of random questions of the specified difficulty

### 3. Available Lessons

1. **Nombres et Calculs** (Numbers and Calculations)
   - Fractions, powers, square roots
   - 5 questions available

2. **Géométrie** (Geometry)
   - Pythagorean theorem, trigonometry
   - 3 questions available

3. **Fonctions** (Functions)
   - Linear and affine functions
   - 3 questions available

4. **Statistiques** (Statistics)
   - Mean, median, range
   - 3 questions available

5. **Probabilités** (Probabilities)
   - Simple and conditional probabilities
   - 3 questions available

6. **Équations** (Equations)
   - First and second degree equations
   - 3 questions available

## Usage Examples

### Basic Usage

```typescript
import { 
  getRandomQuestions, 
  getRandomQuestionsFromAllLessons, 
  getQuestionsByDifficulty 
} from '@/src/data/lessons';

// Get 5 random questions from lesson 1
const lessonQuestions = getRandomQuestions(1, 5);

// Get 10 random questions from all lessons
const allQuestions = getRandomQuestionsFromAllLessons(10);

// Get 8 easy questions from any lesson
const easyQuestions = getQuestionsByDifficulty(1, 8);
```

### In React Components

```typescript
import { useState, useEffect } from 'react';
import { getRandomQuestions } from '@/src/data/lessons';

function MyComponent() {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Get 10 random questions from lesson 2
    const randomQuestions = getRandomQuestions(2, 10);
    setQuestions(randomQuestions);
  }, []);
  
  // Use questions in your component
}
```

## Integration Points

### 1. Lesson Pages
- **File**: `app/maths/lesson/[id]/page.tsx`
- **Feature**: Automatically gets random questions from the selected lesson
- **Implementation**: Uses `getRandomQuestions(lessonId, 10)`

### 2. Practice Mode
- **File**: `app/maths/practice/page.tsx`
- **Features**:
  - Random questions from all lessons
  - Filter by difficulty level
  - Customizable question count
- **Implementation**: Uses all three random selection functions

### 3. Question Selector Component
- **File**: `src/components/QuestionSelector.tsx`
- **Features**:
  - Interactive UI for selecting question parameters
  - Supports all selection modes
  - Callback function for question generation

## Question Structure

Each question has the following structure:

```typescript
interface Question {
  id: number;
  type: 'multiple-choice' | 'text' | 'calculation';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  latex?: string;
}
```

## Adding New Questions

To add new questions to the database:

1. Open `src/data/lessons.ts`
2. Find the appropriate lesson in the `lessons` array
3. Add new questions to the `questions` array
4. Follow the existing question structure
5. Ensure unique IDs within each lesson

Example:
```typescript
{
  id: 4, // Next available ID in the lesson
  type: 'multiple-choice',
  difficulty: 2,
  question: 'What is the value of 2² × 3²?',
  options: ['12', '36', '72', '144'],
  correctAnswer: '36',
  explanation: '2² = 4, 3² = 9, so 4 × 9 = 36',
  points: 15
}
```

## Testing the System

1. Start the development server: `npm run dev`
2. Navigate to `/maths` to see the lessons
3. Click on "Mode Pratique" to test random question selection
4. Try different modes and difficulty levels
5. Check that questions are properly randomized

## Benefits

- **Variety**: Students get different questions each time
- **Adaptability**: Can focus on specific topics or difficulty levels
- **Scalability**: Easy to add new questions and lessons
- **Flexibility**: Multiple selection modes for different use cases
- **Consistency**: All questions follow the same structure and scoring system 