import Image from "next/image";
import Link from "next/link";
import { getAllSubjects } from "@/src/data/subjects";

export default function Home() {
  const subjects = getAllSubjects();

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <h1 className="text-xl font-bold text-white mb-4 w-full text-center">Mes Matières</h1>
        
        {/* Main Subject Cards */}
        <div className="w-full flex flex-col gap-3">
          {subjects.map((subject) => (
            <Link key={subject.id} href={`/${subject.id}`} className="w-full">
              <div className="card flex flex-col items-center justify-center py-4 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden">
                <div className="mb-1 text-3xl">{subject.icon}</div>
                <div className="text-base font-bold text-white mb-1 text-center">{subject.name}</div>
                <div className="text-[#b0b8c1] text-center mb-3 text-xs">{subject.description}</div>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none`}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
