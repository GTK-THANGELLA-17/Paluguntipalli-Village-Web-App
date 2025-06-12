
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HeroNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
  direction: number;
  isAutoPlay: boolean;
}

const HeroNavigation = ({
  currentSlide,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  onGoToSlide,
  direction,
  isAutoPlay
}: HeroNavigationProps) => {
  return (
    <>
      {/* Navigation Arrows - Positioned lower to avoid text overlap */}
      <motion.button
        onClick={onPrevSlide}
        className="absolute left-4 top-[65%] -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
      </motion.button>
      
      <motion.button
        onClick={onNextSlide}
        className="absolute right-4 top-[65%] -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowRight size={20} />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <motion.button
            key={i}
            animate={{ 
              scale: currentSlide === i ? 1.2 : 1,
              backgroundColor: currentSlide === i ? "#ffffff" : "rgba(255,255,255,0.4)"
            }}
            whileHover={{ scale: currentSlide === i ? 1.2 : 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full transition-all duration-300"
            onClick={() => onGoToSlide(i)}
          />
        ))}
      </div>
    </>
  );
};

export default HeroNavigation;
