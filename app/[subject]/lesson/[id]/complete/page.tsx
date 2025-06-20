import GenericLessonCompletePage from '@/src/components/GenericLessonCompletePage';
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
  params: { subject: string; id: string } 
}) {
  const lessonId = parseInt(params.id);
  const lesson = getLessonById(params.subject, lessonId);
  
  if (!lesson) {
    return {
      title: 'Leçon non trouvée',
    };
  }
  
  return {
    title: `${lesson.title} - Terminé`,
    description: `Leçon terminée: ${lesson.description}`,
  };
}

export default function LessonCompletePage({ 
  params 
}: { 
  params: { subject: string; id: string } 
}) {
  const lessonId = parseInt(params.id);
  const lesson = getLessonById(params.subject, lessonId);
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Leçon non trouvée</h1>
          <a href={`/${params.subject}`} className="text-[#00baff] hover:underline">
            Retour aux leçons
          </a>
        </div>
      </div>
    );
  }

  return (
    <GenericLessonCompletePage subjectPath={params.subject} />
  );
} 