import GenericSubjectPage from '@/src/components/GenericSubjectPage';
import { getAllSubjects } from '@/src/data/simplified-service';

// Generate static params for all subjects
export async function generateStaticParams() {
  const subjects = getAllSubjects();
  return subjects.map((subject) => ({
    subject: subject.id,
  }));
}

// Validate subject parameter
export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = await params;
  const subjects = getAllSubjects();
  const subject = subjects.find(s => s.id === subjectId);
  
  if (!subject) {
    return {
      title: 'Matière non trouvée',
    };
  }
  
  return {
    title: subject.name,
    description: subject.description,
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = await params;
  const subjects = getAllSubjects();
  const subject = subjects.find(s => s.id === subjectId);
  
  if (!subject) {
    return (
      <div className="min-h-screen bg-[#181c24] flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Matière non trouvée</h1>
          <a href="/" className="text-[#00baff] hover:underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <GenericSubjectPage
      subject={subject.id as 'maths' | 'francais' | 'sciences' | 'histoire-geo'}
      subjectPath={subject.id}
      subjectName={subject.name}
      subjectIcon={subject.icon}
      subjectColor={subject.color}
    />
  );
} 