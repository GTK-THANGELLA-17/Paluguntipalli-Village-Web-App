
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ThemeToggleProps {
  mobile?: boolean;
}

const ThemeToggle = ({ mobile = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRay, setShowRay] = useState(false);

  // Handle the toggle with animation lock to prevent multiple rapid clicks
  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleTheme();
    
    // For sun rays or moon glow effects
    setShowRay(true);
    setTimeout(() => {
      setShowRay(false);
    }, 700);
    
    // Release animation lock after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  // Debug logging to track theme changes
  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  const buttonSize = mobile ? 'h-6 w-6 min-w-6' : 'h-10 w-10';
  const iconSize = mobile ? 14 : 20;

  return (
    <div className="relative">
      {/* Light/dark effect overlay with improved mobile sizing */}
      {showRay && (
        <motion.div
          className={`absolute -z-10 rounded-full ${
            theme === "dark" 
              ? "bg-gradient-radial from-blue-800/40 to-transparent" 
              : "bg-gradient-radial from-yellow-300/40 to-transparent"
          }`}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: mobile ? 2 : 2.5 }}
          exit={{ opacity: 0, scale: mobile ? 2.5 : 3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            width: mobile ? "150%" : "200%",
            height: mobile ? "150%" : "200%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        />
      )}
      
      <Button
        variant="ghost"
        size={mobile ? "sm" : "icon"}
        onClick={handleToggle}
        disabled={isAnimating}
        className={`relative z-10 rounded-full transition-all duration-700 hover:scale-110 ${buttonSize} ${
          theme === 'dark' 
            ? 'bg-[#333333] text-white hover:bg-[#444444]' 
            : 'bg-[#B5C7EB]/30 text-[#000000] hover:bg-[#B5C7EB]/50'
        } ${mobile ? 'p-1' : 'p-2'}`}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ 
              scale: 0.3, 
              opacity: 0, 
              rotate: theme === 'dark' ? -180 : 0,
              y: theme === 'dark' ? 8 : -8
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: 0,
              y: 0
            }}
            exit={{ 
              scale: 0.2, 
              opacity: 0,
              rotate: theme === 'dark' ? 0 : 180,
              y: theme === 'dark' ? -8 : 8
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 150,
              damping: 12 
            }}
            className="absolute flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Sun 
                  size={iconSize} 
                  className="text-yellow-300 filter drop-shadow-md"
                />
              </motion.div>
            ) : (
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Moon 
                  size={iconSize} 
                  className="text-blue-800 filter drop-shadow-sm"
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle glow effect for mobile */}
        {mobile && (
          <motion.div
            className={`absolute inset-0 rounded-full ${
              theme === 'dark' 
                ? 'bg-yellow-300/10' 
                : 'bg-blue-800/10'
            }`}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
