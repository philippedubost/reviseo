import { useRouter } from 'next/navigation';

interface BackToLessonsButtonProps {
  subject: 'maths' | 'francais' | 'histoire-geo' | 'sciences';
  className?: string;
  children?: React.ReactNode;
}

export default function BackToLessonsButton({ 
  subject, 
  className = "btn bg-[#00baff] text-white font-bold px-6 py-2 rounded-lg",
  children 
}: BackToLessonsButtonProps) {
  const router = useRouter();

  const getSubjectPath = () => {
    switch (subject) {
      case 'francais':
        return '/francais';
      case 'histoire-geo':
        return '/histoire-geo';
      case 'sciences':
        return '/sciences';
      default:
        return '/maths';
    }
  };

  const handleClick = () => {
    router.push(getSubjectPath());
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children || 'Retour aux leçons'}
    </button>
  );
} 