'use client';

import { dataService } from "@/src/data/simplified-service";
import SubjectCard from "@/src/components/SubjectCard";
import PageTransition from "@/src/components/PageTransition";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function LevelPage() {
  const params = useParams();
  const levelId = params.level as string;
  const level = dataService.getLevelById(levelId);
  
  if (!level) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Header avec retour */}
        <motion.div 
          className="px-4 py-4 border-b border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.a 
              href="/" 
              className="text-white text-lg"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ←
            </motion.a>
            <h1 className="text-xl font-bold text-white">{level.name}</h1>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 px-2 pb-16">
          <motion.h2 
            className="text-lg font-bold text-white mb-4 w-full text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Mes Matières
          </motion.h2>
          
          {/* Subject Cards */}
          <div className="w-full flex flex-col gap-3">
            {level.subjects.map((subject, index) => (
              <SubjectCard 
                key={subject.id} 
                subject={subject} 
                levelId={level.id}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 