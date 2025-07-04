import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const pathname = usePathname();
  const isUserProfilePage = pathname === '/profile';

  return (
    <motion.header 
      className="bg-[#181c24] border-b border-[#232a36] px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/" 
              className="text-[#b0b8c1] hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              <motion.span
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
              Retour
            </Link>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="/" className="flex items-center justify-center flex-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/images/logo.png"
                alt="Reviseo Logo"
                width={180}
                height={180}
                className="rounded-lg"
              />
            </motion.div>
          </Link>
        </motion.div>
        
        <div className="flex items-center gap-2">
          {!isUserProfilePage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                href="/profile" 
                className="text-[#b0b8c1] hover:text-white transition-colors p-2 rounded-full hover:bg-[#232a36] block"
                title="Profil utilisateur"
              >
                <motion.span
                  whileHover={{ 
                    scale: 1.2
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  ⚙️
                </motion.span>
              </Link>
            </motion.div>
          )}
          {/* Espace vide pour équilibrer le layout quand le bouton retour est présent */}
          {showBackButton && <div className="w-16"></div>}
        </div>
      </div>
    </motion.header>
  );
} 