import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const pathname = usePathname();
  const isFlaggedQuestionsPage = pathname === '/flagged-questions';

  return (
    <header className="bg-[#181c24] border-b border-[#232a36] px-4 py-3">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {showBackButton && (
          <Link href="/" className="text-[#b0b8c1] hover:text-white transition-colors text-sm">
            ← Retour
          </Link>
        )}
        
        <Link href="/" className="flex items-center justify-center flex-1">
          <Image
            src="/images/logo.png"
            alt="Reviseo Logo"
            width={180}
            height={180}
            className="rounded-lg"
          />
        </Link>
        
        <div className="flex items-center gap-2">
          {!isFlaggedQuestionsPage && (
            <Link 
              href="/flagged-questions" 
              className="text-[#b0b8c1] hover:text-white transition-colors p-2 rounded-full hover:bg-[#232a36]"
              title="Questions signalées"
            >
              🚩
            </Link>
          )}
          {/* Espace vide pour équilibrer le layout quand le bouton retour est présent */}
          {showBackButton && <div className="w-16"></div>}
        </div>
      </div>
    </header>
  );
} 