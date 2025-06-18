import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo.png"
            alt="Reviseo Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <h1 className="text-2xl font-bold text-white">Reviseo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-yellow-300 transition-colors">
            Se connecter
          </button>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
            S'inscrire
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Apprends comme un
            <span className="block text-yellow-300">champion !</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Prépare-toi pour le Brevet avec des exercices interactifs et amusants
          </p>

          {/* Subject Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/maths" className="group">
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border-2 border-white/30">
                <div className="text-6xl mb-4">🔢</div>
                <h3 className="text-2xl font-bold text-white mb-2">Mathématiques</h3>
                <p className="text-white/80">Algèbre, géométrie, statistiques</p>
                <div className="mt-4 text-yellow-300 font-semibold group-hover:translate-x-2 transition-transform">
                  Commencer →
                </div>
              </div>
            </Link>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 opacity-60">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">Français</h3>
              <p className="text-white/80">Grammaire, conjugaison, littérature</p>
              <div className="mt-4 text-white/60 font-semibold">
                Bientôt disponible
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/20 opacity-60">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-white mb-2">Histoire-Géo</h3>
              <p className="text-white/80">Histoire, géographie, EMC</p>
              <div className="mt-4 text-white/60 font-semibold">
                Bientôt disponible
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/maths">
            <button className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Commencer les Mathématiques
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 text-white/70">
        <p>© 2024 Reviseo - Prépare-toi pour le Brevet !</p>
      </footer>
    </div>
  );
}
