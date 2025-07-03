'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, usePathname } from "next/navigation";
import { getSubjectColors, getLevelColor, getSubjectIcon } from "@/src/utils/colors";
import { dataService } from "@/src/data/simplified-service";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  color?: string;
  isActive?: boolean;
}

interface BreadcrumbHeaderProps {
  level?: string;
  subject?: string;
  lesson?: {
    id: number;
    title: string;
  };
  customTitle?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function BreadcrumbHeader({
  level,
  subject,
  lesson,
  customTitle,
  showBackButton = true,
  backHref
}: BreadcrumbHeaderProps) {
  const params = useParams();
  const pathname = usePathname();
  
  // Auto-detect context from URL if not provided
  const detectedLevel = level || (params.level as string);
  const detectedSubject = subject || (params.subject as string);
  
  // Get data for display
  const levelData = detectedLevel ? dataService.getLevelById(detectedLevel) : null;
  const subjectData = detectedSubject ? dataService.getSubjectById(detectedSubject, detectedLevel) : null;
  
  // Get colors
  const subjectColors = detectedSubject ? getSubjectColors(detectedSubject) : null;
  const levelColor = detectedLevel ? getLevelColor(detectedLevel) : null;
  
  // Build breadcrumb items - More concise for lesson/question pages
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // For lesson pages, show concise navigation: Subject > Lesson
  if (lesson) {
    // Only show subject > lesson for lessons (more concise)
    if (subjectData && detectedLevel) {
      breadcrumbs.push({
        label: subjectData.name,
        href: `/${detectedLevel}/${detectedSubject}`,
        icon: getSubjectIcon(detectedSubject),
        color: subjectColors?.gradient
      });
    }
    
    breadcrumbs.push({
      label: lesson.title,
      isActive: true,
      icon: "📖"
    });
  } else {
    // For level/subject pages, show full navigation
    
    // Add level breadcrumb
    if (levelData) {
      breadcrumbs.push({
        label: levelData.name,
        href: `/${detectedLevel}`,
        icon: "🎓",
        color: levelColor || undefined
      });
    }
    
    // Add subject breadcrumb
    if (subjectData && detectedLevel) {
      breadcrumbs.push({
        label: subjectData.name,
        href: `/${detectedLevel}/${detectedSubject}`,
        icon: getSubjectIcon(detectedSubject),
        color: subjectColors?.gradient
      });
    }
    
    // Add custom title if provided
    if (customTitle) {
      breadcrumbs.push({
        label: customTitle,
        isActive: true,
        icon: "📚"
      });
    }
  }
  
  // Determine back navigation
  const getBackHref = (): string => {
    if (backHref) return backHref;
    
    if (lesson && detectedLevel && detectedSubject) {
      return `/${detectedLevel}/${detectedSubject}`;
    }
    if (detectedSubject && detectedLevel) {
      return `/${detectedLevel}`;
    }
    if (detectedLevel) {
      return '/';
    }
    return '/';
  };

  // Determine if this is a level page (no subject specified)
  const isLevelPage = detectedLevel && !detectedSubject;
  
  // Get background style
  const getBackgroundStyle = () => {
    if (isLevelPage && levelColor) {
      // Use level gradient for level pages
      return {
        background: levelColor,
        borderBottomColor: '#ffffff20'
      };
    } else if (subjectColors) {
      // Use subject colors for subject/lesson pages
      return {
        borderBottomColor: subjectColors.border,
        backgroundColor: `${subjectColors.bg}08`
      };
    }
    return {};
  };

  return (
    <motion.header 
      className="bg-[#181c24] border-b border-gray-700 px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={getBackgroundStyle()}
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Back Button */}
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href={getBackHref()}
              className="text-white hover:scale-110 transition-all duration-200 p-2 rounded-full"
              style={(isLevelPage || subjectColors) ? {
                color: isLevelPage ? '#ffffff' : subjectColors?.light,
              } : {}}
            >
              <motion.span
                whileHover={{ x: -3, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-lg"
              >
                ←
              </motion.span>
            </Link>
          </motion.div>
        )}
        
        {/* Breadcrumb Navigation */}
        <motion.div 
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <nav className="flex items-center space-x-2 text-sm max-w-full overflow-hidden">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center space-x-2">
                {index > 0 && (
                  <span className="text-gray-500 text-xs">›</span>
                )}
                
                {crumb.href && !crumb.isActive ? (
                  <Link 
                    href={crumb.href}
                    className="flex items-center space-x-1 hover:opacity-80 transition-opacity truncate"
                  >
                    {crumb.icon && (
                      <span className="text-xs">{crumb.icon}</span>
                    )}
                    <span 
                      className="font-medium truncate max-w-24 sm:max-w-32"
                      style={(isLevelPage || (subjectColors && index === 1)) ? {
                        color: isLevelPage ? '#ffffff' : subjectColors?.light
                      } : {
                        color: '#b0b8c1'
                      }}
                    >
                      {crumb.label}
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-1 truncate">
                    {crumb.icon && (
                      <span className="text-xs">{crumb.icon}</span>
                    )}
                    <span 
                      className="font-bold text-white truncate max-w-32 sm:max-w-48"
                      style={(isLevelPage || subjectColors) ? {
                        color: isLevelPage ? '#ffffff' : subjectColors?.light
                      } : {}}
                    >
                      {crumb.label}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
        
        {/* Right side spacer or additional buttons */}
        <div className="w-10">
          {/* Add additional buttons here if needed */}
        </div>
      </div>
      
      {/* Subtle gradient underline for subject pages */}
      {subjectColors && (
        <motion.div 
          className={`h-0.5 bg-gradient-to-r ${subjectColors.gradient} opacity-30`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}
    </motion.header>
  );
}