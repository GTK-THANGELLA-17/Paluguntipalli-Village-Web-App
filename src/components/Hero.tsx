
import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import HeroSlideshow from './hero/HeroSlideshow';
import HeroControls from './hero/HeroControls';
import HeroActions from './hero/HeroActions';

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const totalSlides = 3;

  // Memoized callbacks for better performance
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleSlideSelect = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Optimized keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case ' ':
          event.preventDefault();
          handleTogglePlay();
          break;
        case 'Escape':
          event.preventDefault();
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, handleTogglePlay]);

  // Memoized motion variants for better performance
  const contentVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }), []);

  return (
    <section 
      id="home" 
      className="relative h-screen w-full overflow-hidden"
      role="banner"
      aria-label="Hero slideshow"
    >
      <HeroSlideshow
        currentSlide={currentSlide}
        isPlaying={isPlaying}
        onSlideChange={setCurrentSlide}
      />

      <HeroControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isPlaying={isPlaying}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onTogglePlay={handleTogglePlay}
        onSlideSelect={handleSlideSelect}
      />

      {/* Content with optimized animations */}
      <div className="relative z-40 flex items-center justify-center h-full text-white text-center px-4 pt-40 sm:pt-20">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 font-playfair drop-shadow-lg"
            variants={contentVariants}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            variants={contentVariants}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={contentVariants}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <HeroActions />
          </motion.div>
        </motion.div>
      </div>

      {/* Skip to content link for accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only absolute top-4 left-4 z-[70] bg-white text-black px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>
    </section>
  );
};

export default Hero;
