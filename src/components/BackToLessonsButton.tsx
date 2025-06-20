'use client';

import Link from 'next/link';

interface BackToLessonsButtonProps {
  subject: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackToLessonsButton({ 
  subject, 
  className = "btn bg-[#232a36] text-white hover:bg-[#2a323e] transition-colors",
  children = "📚 Retour aux leçons"
}: BackToLessonsButtonProps) {
  return (
    <Link href={`/${subject}`}>
      <button className={className}>
        {children}
      </button>
    </Link>
  );
} 