'use client';

import GenericSubjectPage from '@/src/components/GenericSubjectPage';
import { getAllLessons } from '@/src/data/lessons';
import { useLessonProgress } from '@/src/hooks/useLessonProgress';

export default function MathsPage() {
  const { lessons, getLessonProgressPercentage } = useLessonProgress('maths');
  
  return (
    <GenericSubjectPage
      subject="maths"
      subjectPath="maths"
      subjectName="Mathématiques"
      lessons={lessons}
      getLessonProgressPercentage={getLessonProgressPercentage}
    />
  );
} 