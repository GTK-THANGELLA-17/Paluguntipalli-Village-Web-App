
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Start with a small delay for smoother animation startup
    const startDelay = setTimeout(() => {
      // Smoothly animated progress bar with easing
      const interval = setInterval(() => {
        setProgress(prev => {
          // Make progress more natural with variable speed
          const increment = prev < 50 ? 2 : (prev < 80 ? 1 : 0.5);
          const newProgress = prev + increment;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            // Don't dismiss the loading screen yet, wait for animation completion
            setTimeout(() => setAnimationComplete(true), 800); // Shorter delay for smoother experience
            return 100;
          }
          return newProgress;
        });
      }, 20); // Faster interval for smoother animation
      
      return () => clearInterval(interval);
    }, 100); // Very short initial delay
    
    return () => clearTimeout(startDelay);
  }, []);

  // Animation variants - SIMPLIFIED for better performance
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.5, // Faster exit animation
        ease: "easeOut"
      }
    }
  };

  // Only show essential elements first, then add decorative ones
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-green-200"
    >
      {/* Background Village Skyline */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sun - simplified animation */}
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-yellow-300"
          initial={{ opacity: 0.7, scale: 0.9 }}
          animate={{ 
            opacity: [0.7, 1, 0.7],
            scale: [0.9, 1, 0.9],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-full bg-yellow-100 blur-xl opacity-60"></div>
        </motion.div>
        
        {/* Hills - simplified for performance */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 200">
          <motion.path 
            d="M0,150 Q300,50 600,120 T1200,100 L1200,200 L0,200 Z" 
            fill="#97C160" 
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7 }}
          />
          <motion.path 
            d="M0,170 Q400,100 800,180 T1200,140 L1200,200 L0,200 Z" 
            fill="#76A948" 
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </svg>
        
        {/* Village Elements - simplified for smoother performance */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 200">
          {/* Houses */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <rect x="300" y="120" width="60" height="50" fill="#D2B48C" />
            <polygon points="300,120 330,90 360,120" fill="#8B4513" />
            <rect x="315" y="150" width="20" height="20" fill="#8B4513" />
            
            <rect x="400" y="130" width="70" height="40" fill="#E6CCB3" />
            <polygon points="400,130 435,100 470,130" fill="#A0522D" />
            <rect x="420" y="150" width="15" height="20" fill="#A0522D" />
            
            <rect x="700" y="110" width="80" height="60" fill="#CDAA7D" />
            <polygon points="700,110 740,80 780,110" fill="#8B4513" />
            <rect x="730" y="140" width="20" height="30" fill="#8B4513" />
          </motion.g>
          
          {/* Trees */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Simplified tree animations for better performance */}
            <g>
              <rect x="210" y="150" width="10" height="50" fill="#8B4513" />
              <circle cx="215" cy="130" r="25" fill="#4CA64C" />
            </g>
            
            <g>
              <rect x="510" y="140" width="10" height="60" fill="#8B4513" />
              <circle cx="515" cy="120" r="30" fill="#388E3C" />
            </g>
            
            <g>
              <rect x="610" y="160" width="10" height="40" fill="#8B4513" />
              <circle cx="615" cy="140" r="20" fill="#4CA64C" />
            </g>
          </motion.g>
        </svg>
      </div>
      
      <div className="z-10 flex flex-col items-center">
        {/* Village Logo Emblem - simplified animation for better performance */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ 
            scale: [0, 1.1, 1],
            rotate: [-90, 0]
          }}
          transition={{ duration: 0.7 }}
          className="w-32 h-32 mx-auto mb-8 relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="48" fill="#FFF" fillOpacity="0.9" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="#76A948"
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            
            {/* House icon */}
            <motion.path
              d="M30,60 L30,40 L50,25 L70,40 L70,60 Z"
              stroke="#76A948"
              strokeWidth="2"
              fill="#97C160"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.3 }}
            />
            
            {/* Door */}
            <motion.rect
              x="45"
              y="45"
              width="10"
              height="15"
              fill="#8B4513"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />

            {/* Trees */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              <rect x="20" y="45" width="4" height="15" fill="#8B4513" />
              <circle cx="22" cy="40" r="8" fill="#4CA64C" />
              
              <rect x="76" y="48" width="4" height="12" fill="#8B4513" />
              <circle cx="78" cy="42" r="6" fill="#4CA64C" />
            </motion.g>
          </svg>
        </motion.div>
        
        {/* Village name with simplified animation */}
        <div className="flex items-center justify-center backdrop-blur-sm py-2 px-4 rounded-lg bg-white/30">
          <motion.div 
            className="flex"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <span className="text-3xl md:text-5xl font-bold text-green-800">PALUGUNTIPALLI</span>
          </motion.div>
        </div>
      
        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-green-800 mt-4 mb-8 font-playfair"
        >
          {t("The Cultural Heritage")}
        </motion.h2>
      </div>
      
      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-20 w-64 h-3 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="h-full bg-green-600"
          style={{ width: `${progress}%` }}
        />
      </motion.div>
      
      {/* Loading Percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-12 text-green-800 font-medium"
      >
        {Math.round(progress)}%
        {progress === 100 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-sm"
          >
            {animationComplete ? t("Starting...") : t("Preparing...")}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
