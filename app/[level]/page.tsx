'use client';

import { dataService } from "@/src/data/simplified-service";
import SubjectCard from "@/src/components/SubjectCard";
import PageTransition from "@/src/components/PageTransition";
import BreadcrumbHeader from "@/src/components/BreadcrumbHeader";
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
        {/* Enhanced Header with Breadcrumb - Level gradient background */}
        <BreadcrumbHeader 
          level={levelId}
        />

        {/* Main Content */}
        <div className="flex-1 px-2 pb-16">
          {/* Section Title */}
          <div className="text-center py-4">
            <h2 className="text-lg font-bold text-white">Mes Matières</h2>
          </div>
          
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