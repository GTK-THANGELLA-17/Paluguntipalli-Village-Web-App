
import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

interface GalleryItemProps {
  item: any;
  index: number;
  onSelect: (item: any) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Enhanced image optimization with progressive loading
  const getOptimizedImageUrl = (url: string) => {
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}auto=format&fit=crop&w=400&q=75&fm=webp&dpr=1`;
    }
    return url;
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !imageSrc) {
          const optimizedSrc = item.thumbnail ? 
            getOptimizedImageUrl(item.thumbnail) : 
            getOptimizedImageUrl(item.src);
          setImageSrc(optimizedSrc);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [item, imageSrc]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <motion.div 
      ref={imgRef}
      className="gallery-item group cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
      data-aos="zoom-in"
      data-aos-delay={Math.min(100 * index, 500)}
      onClick={() => onSelect(item)}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-xl relative bg-gray-200 dark:bg-gray-700">
        {!isLoaded && imageSrc && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm">Image unavailable</div>
            </div>
          </div>
        )}

        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt={item.alt}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
              style={{
                imageRendering: 'auto',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
            
            {item.type === 'video' && isLoaded && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-heritage/80 backdrop-blur-sm text-white border-2 border-white/30">
                  <Video size={24} className="sm:w-8 sm:h-8" />
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="text-white p-4 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.type === 'image' ? <Image size={20} className="mx-auto mb-2 sm:w-6 sm:h-6" /> : <Video size={20} className="mx-auto mb-2 sm:w-6 sm:h-6" />}
          <p className="font-medium text-sm sm:text-base">{item.alt}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GalleryItem;
