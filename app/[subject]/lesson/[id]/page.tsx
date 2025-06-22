import GenericLessonPage from '@/src/components/GenericLessonPage';
import { getAllSubjects, getLessonById } from '@/src/data/subjects';

// Generate static params for all lessons
export async function generateStaticParams() {
  const subjects = getAllSubjects();
  const params: { subject: string; id: string }[] = [];
  
  subjects.forEach((subject) => {
    subject.lessons.forEach((lesson) => {
      params.push({
        subject: subject.id,
        id: lesson.id.toString(),
      });
    });
  });
  
  return params;
}

// Validate parameters
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ subject: string; id: string }> 
}) {
  const { subject: subjectId, id: lessonIdStr } = await params;
  const lessonId = parseInt(lessonIdStr);
  const lesson = getLessonById(subjectId, lessonId);
  
  if (!lesson) {
    return {
      title: 'Leçon non trouvée',
    };
  }
  
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

export default async function LessonPage({ 
  params 
}: { 
  params: Promise<{ subject: string; id: string }> 
}) {
  const { subject: subjectId, id: lessonIdStr } = await params;
  const lessonId = parseInt(lessonIdStr);
  const lesson = getLessonById(subjectId, lessonId);
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <a href={`/${subjectId}`} className="text-[#00baff] hover:underline">
            Retour aux leçons
          </a>
        </div>
      </div>
    );
  }

  return (
    <GenericLessonPage subjectPath={subjectId} />
  );
} 