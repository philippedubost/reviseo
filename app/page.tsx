import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="flex-1 px-2 pb-16">
        <h1 className="text-xl font-bold text-white mb-4 w-full text-center">Mes Matières</h1>
        
        {/* Main Subject Card */}
        <div className="w-full flex flex-col gap-3">
          <Link href="/maths" className="w-full">
            <div className="card flex flex-col items-center justify-center py-4 px-3 w-full cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden">
              <div className="mb-1 text-3xl">🔢</div>
              <div className="text-base font-bold text-white mb-1 text-center">Mathématiques</div>
              <div className="text-[#b0b8c1] text-center mb-3 text-xs">Algèbre, géométrie, statistiques</div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00baff] to-[#2ecc71] opacity-0 hover:opacity-10 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
