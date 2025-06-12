
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroBackgroundProps {
  currentSlide: number;
  setCurrentSlide: (slide: number | ((prev: number) => number)) => void;
  direction: number;
  setDirection: (direction: number) => void;
  videoEnded: boolean;
  setVideoEnded: (ended: boolean) => void;
  isAutoPlay: boolean;
}

const slideshowImages = [
  "/Village.jpg"
];

const videoUrls = ["/Village video.mp4"];

const HeroBackground = ({
  currentSlide,
  setCurrentSlide,
  direction,
  setDirection,
  videoEnded,
  setVideoEnded,
  isAutoPlay
}: HeroBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [useVideo, setUseVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  
  const totalSlides = videoUrls.length + slideshowImages.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev: number) => {
      const next = (prev + 1) % totalSlides;
      
      if (prev === totalSlides - 1) {
        if (next < videoUrls.length) {
          setIsVideoLoaded(false);
          setVideoEnded(false);
        }
        return 0;
      }
      
      if (next < videoUrls.length) {
        setIsVideoLoaded(false);
        setVideoEnded(false);
      }
      return next;
    });
  }, [totalSlides, setCurrentSlide, setVideoEnded]);

  useEffect(() => {
    if (isAutoPlay && (videoEnded || currentSlide >= videoUrls.length)) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000); // Slightly increased interval for better viewing
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentSlide, isAutoPlay, videoEnded, nextSlide]);

  useEffect(() => {
    if (currentSlide >= videoUrls.length || !useVideo) return;
    
    const handleCanPlay = () => setIsVideoLoaded(true);
    const handleError = () => {
      setUseVideo(false);
    };
    
    if (videoRef.current) {
      videoRef.current.addEventListener('canplay', handleCanPlay);
      videoRef.current.addEventListener('error', handleError);
      videoRef.current.load();
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('canplay', handleCanPlay);
          videoRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [currentSlide, useVideo]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    nextSlide();
  };

  const slideVariant = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        {useVideo && currentSlide < videoUrls.length && (
          <motion.div 
            key={`video-${currentSlide}`}
            className="absolute inset-0"
            variants={slideVariant}
            initial="initial"
            animate={{ ...slideVariant.animate, opacity: isVideoLoaded ? 1 : 0 }}
            exit="exit"
          >
            <video
              ref={videoRef}
              src={videoUrls[currentSlide]}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        )}
        
        {currentSlide >= videoUrls.length && (
          <motion.div 
            key={`image-${currentSlide}`}
            className="absolute inset-0"
            variants={slideVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ 
              backgroundImage: `url(${slideshowImages[(currentSlide - videoUrls.length) % slideshowImages.length]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            
            {/* Subtle animated overlay for depth */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroBackground;
