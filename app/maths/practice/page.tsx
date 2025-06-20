import GenericPracticePage from '@/src/components/GenericPracticePage';
import { getRandomQuestionsFromAllLessons } from '@/src/data/lessons';

export default function PracticePage() {
  return (
    <GenericPracticePage
      subject="maths"
      subjectPath="maths"
      subjectName="Mathématiques"
      getRandomQuestionsFromAllLessons={getRandomQuestionsFromAllLessons}
    />
  );
} 