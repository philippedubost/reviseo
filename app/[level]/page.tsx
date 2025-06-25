'use client';

import { dataService } from "@/src/data/simplified-service";
import SubjectCard from "@/src/components/SubjectCard";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

export default function LevelPage() {
  const params = useParams();
  const levelId = params.level as string;
  const level = dataService.getLevelById(levelId);
  
  if (!level) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Header avec retour */}
      <div className="px-4 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <a href="/" className="text-white text-lg">←</a>
          <h1 className="text-xl font-bold text-white">{level.name}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <h2 className="text-lg font-bold text-white mb-4 w-full text-center">Mes Matières</h2>
        
        {/* Subject Cards */}
        <div className="w-full flex flex-col gap-3">
          {level.subjects.map((subject) => (
            <SubjectCard 
              key={subject.id} 
              subject={subject} 
              levelId={level.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 