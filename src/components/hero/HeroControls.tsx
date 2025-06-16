
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroControlsProps {
  currentSlide: number;
  totalSlides: number;
  isPlaying: boolean;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onTogglePlay: () => void;
  onSlideSelect: (index: number) => void;
}

const HeroControls = ({
  currentSlide,
  totalSlides,
  isPlaying,
  onPrevSlide,
  onNextSlide,
  onTogglePlay,
  onSlideSelect
}: HeroControlsProps) => {
  return (
    <>
      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full bg-black/20 backdrop-blur-sm border border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full bg-black/20 backdrop-blur-sm border border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideSelect(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default HeroControls;
