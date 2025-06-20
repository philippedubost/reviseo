import GenericLessonCompletePage from '@/src/components/GenericLessonCompletePage';
import { getLessonById } from '@/src/data/lessons';

export default function LessonCompletePage() {
  return (
    <GenericLessonCompletePage
      subjectPath="maths"
      subjectName="Mathématiques"
      getLessonById={getLessonById}
    />
  );
} 