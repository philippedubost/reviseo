# Quick Flag Feature - Documentation

## Overview
A new feature has been added to allow quick flagging of questions in a compact format. This feature provides an efficient way to review and flag questions across all levels, subjects, and lessons.

## Features

### 1. **Compact Question Display**
- Questions are displayed in a compact format with three main sections:
  - **Question**: The actual question text
  - **Correct Answer**: Highlighted in green for easy identification
  - **Other Options**: Alternative answers displayed in red

### 2. **Comprehensive Filtering**
- **Level Filter**: Filter by educational level (6ème to Terminale)
- **Subject Filter**: Filter by subject (Mathématiques, Français, Sciences, etc.)
- **Difficulty Filter**: Filter by difficulty level (Easy, Medium, Hard)
- **Search**: Text search across questions, answers, and lesson titles

### 3. **Statistics Dashboard**
- **Questions Displayed**: Number of questions currently visible
- **Total Questions**: Total number of questions in the system
- **Levels**: Number of different levels represented
- **Subjects**: Number of different subjects represented

### 4. **Quick Flag Functionality**
- **Flag Button**: Located on the right side of each question
- **Visual Feedback**: Flagged questions show a red flag, unflagged show a gray flag
- **Popup Modal**: When flagging, a modal appears to enter the reason for flagging
- **Instant Toggle**: Already flagged questions can be unflagged with a single click

### 5. **Question Context**
Each question displays:
- **Subject Badge**: Color-coded subject identification
- **Level Badge**: Educational level indicator
- **Difficulty Badge**: Color-coded difficulty level (Green=Easy, Yellow=Medium, Red=Hard)
- **Lesson Title**: The lesson the question belongs to

## Navigation

### Access Points
1. **Dashboard Quick Actions**: From the main dashboard, click "⚡ Signalement rapide"
2. **Direct URL**: Navigate to `/quick-flag`

### Related Pages
- **Flagged Questions**: View all flagged questions at `/flagged-questions`
- **Main Dashboard**: Return to the main dashboard at `/`

## Technical Implementation

### Key Components
- **Page**: `app/quick-flag/page.tsx`
- **Data Service**: Uses `src/data/simplified-service.ts` for data access
- **Flagging Utility**: Uses `src/utils/questionFlagging.ts` for flag management

### Data Structure
The page loads all questions from all levels, subjects, and lessons into a single interface with the following structure:
```typescript
interface QuestionWithContext {
  id: number;
  type: 'multiple-choice' | 'calculation' | 'input';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
  subjectId: string;
  subjectName: string;
  lessonId: number;
  lessonTitle: string;
  levelId: string;
  levelName: string;
}
```

### Responsive Design
- **Mobile**: Single column layout with stacked question sections
- **Tablet**: Two-column layout for better space utilization
- **Desktop**: Three-column layout showing question, correct answer, and options side by side

## Usage Scenarios

### 1. **Content Review**
Teachers and content creators can quickly review all questions to identify:
- Incorrect answers
- Poorly worded questions
- Difficulty level mismatches
- Missing or inadequate explanations

### 2. **Quality Assurance**
- Systematic review of questions by subject or level
- Bulk flagging of problematic content
- Tracking of flagged items for improvement

### 3. **Content Management**
- Quick access to all questions in the system
- Efficient filtering and searching capabilities
- Easy identification of questions needing attention

## Benefits

1. **Efficiency**: Review hundreds of questions quickly in a single interface
2. **Comprehensive**: Access to all questions across all levels and subjects
3. **Contextual**: Full context provided for each question (level, subject, lesson)
4. **Intuitive**: Simple one-click flagging with visual feedback
5. **Organized**: Advanced filtering and search capabilities
6. **Responsive**: Works well on all device sizes

## Future Enhancements

Potential improvements could include:
- Bulk flagging capabilities
- Export functionality for flagged questions
- Advanced sorting options (by date, difficulty, etc.)
- Question editing capabilities
- Integration with content management workflows