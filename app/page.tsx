import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#181c24] px-4 pt-6">
      <h1 className="text-2xl font-bold text-white mb-6 w-full max-w-xs text-left">Mes Matières</h1>
      {/* Main Subject Card */}
      <div className="card flex flex-col items-center justify-center w-full max-w-xs py-8 mb-8 shadow-lg">
        <div className="mb-4">
          <span className="text-5xl">🔢</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Mathématiques</h2>
        <p className="text-[#b0b8c1] text-center mb-6">Algèbre, géométrie, statistiques</p>
        <Link href="/maths" className="w-full">
          <button className="btn bg-[#2ecc71] text-[#181c24] text-lg font-bold w-full mt-2">
            Commencer
          </button>
        </Link>
      </div>
    </div>
  );
}
