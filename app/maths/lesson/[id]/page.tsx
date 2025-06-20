import GenericLessonPage from '@/src/components/GenericLessonPage';
import { getLessonById, getRandomQuestions } from '@/src/data/lessons';

export default function LessonPage() {
  return (
    <GenericLessonPage
      subjectPath="maths"
      getLessonById={getLessonById}
      getRandomQuestions={getRandomQuestions}
    />
  );
} 