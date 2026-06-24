import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Slide {
  type: 'image';
  src: string;
  title: string;
  subtitle: string;
}

interface HeroSlideshowProps {
  currentSlide: number;
  isPlaying: boolean;
  onSlideChange: (slide: number) => void;
}

const HeroSlideshow = ({ currentSlide, isPlaying, onSlideChange }: HeroSlideshowProps) => {
  const { t } = useTranslation();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const slides: Slide[] = useMemo(() => [
    {
      type: 'image',
      src: '/Starting Slide show/Hanuman Statue.webp',
      title: t('hero.title'),
      subtitle: t('hero.subtitle')
    },
    {
      type: 'image', 
      src: '/Starting Slide show/pedda sarigesu 1.jpg',
      title: t('hero.title'),
      subtitle: t('hero.subtitle')
    },
    {
      type: 'image',
      src: '/Starting Slide show/VILLAGE START.jpg',
      title: t('hero.title'),
      subtitle: t('hero.subtitle')
    }
  ], [t]);

  // Preload next image for smoother transitions
  const preloadNextImage = useCallback((index: number) => {
    const nextIndex = (index + 1) % slides.length;
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(nextIndex));
    };
    img.src = slides[nextIndex].src;
  }, [slides]);

  // Auto-advance slides with optimized timing
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      onSlideChange(nextSlide);
      preloadNextImage(nextSlide);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide, slides.length, onSlideChange, preloadNextImage]);

  // Preload first image on mount
  useEffect(() => {
    preloadNextImage(0);
  }, [preloadNextImage]);


  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[currentSlide].src}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-cover optimized-img"
            loading={currentSlide === 0 ? "eager" : "lazy"}
            decoding="async"
            style={{ 
              objectFit: 'cover'
            }}
            onLoad={() => handleImageLoad(currentSlide)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }}
          />
          
          {/* Loading placeholder for unloaded images */}
          {!loadedImages.has(currentSlide) && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-10" />
    </div>
  );
};

export default HeroSlideshow;

