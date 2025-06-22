import { getAllSubjects } from "@/src/data/subjects";
import SubjectCard from "@/src/components/SubjectCard";

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
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>
    </div>
  );
}
