'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Subject } from '../data/simplified-service';
import { useLessonProgress, SubjectType } from '../hooks/useLessonProgress';
import { getSubjectColors } from '../utils/colors';
import ProgressCircle from './ProgressCircle';

interface SubjectCardProps {
  subject: Subject;
  levelId?: string;
  index?: number;
}

export default function SubjectCard({ subject, levelId, index = 0 }: SubjectCardProps) {
  const { globalProgress } = useLessonProgress(subject.id as SubjectType, levelId || 'troisieme');
  const lessonCount = subject.lessons.length;

  // Use centralized color system
  const subjectColors = getSubjectColors(subject.id);
  const gradient = `linear-gradient(to right, ${subjectColors.primary}, ${subjectColors.secondary})`;

  // Construire le lien avec le levelId si fourni
  const linkHref = levelId ? `/${levelId}/${subject.id}` : `/${subject.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <Link href={linkHref} className="w-full block">
        <motion.div 
          className="card flex items-center justify-between p-4 w-full cursor-pointer relative overflow-hidden rounded-2xl shadow-lg"
          style={{ background: gradient }}
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated background overlay */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Subject color border */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-2xl"
            whileHover={{ 
              borderColor: subjectColors.light,
              opacity: 0.6
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Floating particles effect */}
          <motion.div
            className="absolute top-2 right-2 w-2 h-2 rounded-full opacity-60"
            style={{ backgroundColor: subjectColors.light }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
          
          <div className="flex items-center gap-4 relative z-10">
            <motion.div 
              className="text-4xl"
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
            >
              {subject.icon}
            </motion.div>
            <div>
              <div className="text-lg font-bold text-white">{subject.name}</div>
              <div className="text-gray-200 text-xs">
                {lessonCount} leçon{lessonCount > 1 ? 's' : ''}
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <ProgressCircle progress={globalProgress} />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
} 