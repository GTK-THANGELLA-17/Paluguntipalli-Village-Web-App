
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

const HeroContent = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1.2
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.08,
      y: -4,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.92,
      transition: {
        duration: 0.1
      }
    }
  };

  const sparkleVariants = {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.4, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-32 sm:mt-36 lg:mt-40">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Enhanced floating sparkles decoration with premium animations */}
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute -top-12 -right-12 text-yellow-300"
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute -top-8 -left-16 text-yellow-300"
          style={{ animationDelay: "1.5s" }}
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute top-4 right-8 text-yellow-300 opacity-70"
          style={{ animationDelay: "3s" }}
        >
          <Sparkles size={20} />
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 font-playfair leading-tight relative"
        >
          <motion.span
            className="bg-gradient-to-r from-white via-yellow-200 via-white to-yellow-100 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: "300% 300%"
            }}
          >
            {t('hero.title')}
          </motion.span>
          
          {/* Premium glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 font-light leading-relaxed opacity-95 relative max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="block"
          >
            {t('hero.subtitle')}
          </motion.span>
          
          {/* Premium text shadow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-lg"
            animate={{
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.a
            href="#about"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative bg-heritage hover:bg-heritage-dark text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg lg:text-xl font-semibold transition-all duration-500 shadow-2xl overflow-hidden border-2 border-white/20"
          >
            {/* Premium gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-heritage-light via-heritage to-heritage-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            
            {/* Premium shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut"
              }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              {t('hero.exploreButton')}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl"
              >
                →
              </motion.div>
            </span>
          </motion.a>
          
          <motion.a
            href="#main-events"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative border-2 border-white text-white hover:bg-white hover:text-heritage px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg lg:text-xl font-semibold transition-all duration-500 backdrop-blur-md shadow-2xl overflow-hidden"
          >
            {/* Premium glass effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
              initial={false}
            />
            
            {/* Premium border glow */}
            <motion.div
              className="absolute inset-0 border-2 border-white/50 rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            <span className="relative z-10 flex items-center gap-3">
              {t('hero.eventsButton')}
              <motion.div
                animate={{ 
                  y: [0, -3, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xl"
              >
                ✨
              </motion.div>
            </span>
          </motion.a>
        </motion.div>

        {/* Enhanced scroll indicator with premium animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/80 text-sm lg:text-base font-light mb-4 tracking-wider"
          >
            Discover More
          </motion.div>
          
          {/* Premium animated scroll indicator */}
          <motion.div className="relative">
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center relative overflow-hidden"
            >
              <motion.div
                animate={{
                  y: [0, 16, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
            
            {/* Premium glow effect */}
            <motion.div
              className="absolute inset-0 w-6 h-10 border-2 border-white/20 rounded-full blur-md"
              animate={{
                opacity: [0, 0.8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Premium floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      {/* Premium ambient light effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default HeroContent;
