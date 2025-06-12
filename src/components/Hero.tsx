
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import HeroBackground from "./hero/HeroBackground";
import HeroNavigation from "./hero/HeroNavigation";
import HeroContent from "./hero/HeroContent";

const Hero = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const totalSlides = 7; // 1 video + 6 images

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  }, [totalSlides]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative overflow-hidden"
    >
      <HeroBackground
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        direction={direction}
        setDirection={setDirection}
        videoEnded={videoEnded}
        setVideoEnded={setVideoEnded}
        isAutoPlay={isAutoPlay}
      />
      
      <HeroNavigation
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrevSlide={handlePrevSlide}
        onNextSlide={handleNextSlide}
        onGoToSlide={goToSlide}
        direction={direction}
        isAutoPlay={isAutoPlay}
      />

      <HeroContent />
    </section>
  );
};

export default Hero;
