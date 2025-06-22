'use client';

import Link from 'next/link';
import type { Subject } from '../data/types';
import { getAllLessonsForSubject } from '../data/subjects';
import { useLessonProgress, SubjectType } from '../hooks/useLessonProgress';
import ProgressCircle from './ProgressCircle';

interface SubjectCardProps {
  subject: Subject;
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const { globalProgress } = useLessonProgress(subject.id as SubjectType);
  
  // Get the correct lesson count for each subject
  const lessons = getAllLessonsForSubject(subject.id);
  const lessonCount = lessons.length;

  const colors = subject.color.split(' ');
  const fromColor = colors[0].replace('from-[', '').replace(']', '');
  const toColor = colors[1].replace('to-[', '').replace(']', '');
  const gradient = `linear-gradient(to right, ${fromColor}, ${toColor})`;

  return (
    <Link href={`/${subject.id}`} className="w-full">
      <div 
        className="card flex items-center justify-between p-4 w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden rounded-2xl"
        style={{ background: gradient }}
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">{subject.icon}</div>
          <div>
            <div className="text-lg font-bold text-white">{subject.name}</div>
            <div className="text-gray-200 text-xs">
              {lessonCount} leçons
            </div>
          </div>
        </div>
        <ProgressCircle progress={globalProgress} />
      </div>
    </Link>
  );
} 