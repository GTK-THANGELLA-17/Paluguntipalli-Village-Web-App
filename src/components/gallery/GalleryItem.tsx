import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import GalleryItemImage from "./GalleryItemImage";
import GalleryItemOverlay from "./GalleryItemOverlay";
import GalleryItemActions from "./GalleryItemActions";
import GalleryItemInfo from "./GalleryItemInfo";

interface GalleryItemProps {
  item: any;
  index: number;
  onSelect: (item: any) => void;
  disabled?: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onSelect, disabled = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  const getOptimizedImageUrl = (url: string, quality: number = 80) => {
    if (!url) return '';
    
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      const width = window.innerWidth <= 768 ? 600 : 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      return `${url}${separator}auto=format&fit=crop&w=${width}&q=${quality}&fm=webp&dpr=${dpr}&cs=tinysrgb`;
    }
    return url;
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !imageSrc) {
          const optimizedSrc = item.thumbnail
            ? getOptimizedImageUrl(item.thumbnail)
            : getOptimizedImageUrl(item.src);
          setImageSrc(optimizedSrc);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
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
    if (!hasError) {
      const jpegFallback = getOptimizedImageUrl(item.src, 60).replace('fm=webp', 'fm=jpg');
      if (jpegFallback !== imageSrc) {
        setImageSrc(jpegFallback);
        return;
      }
    }
    setHasError(true);
    setIsLoaded(false);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.src || disabled) return;

    try {
      const link = document.createElement('a');
      link.href = item.src;
      link.download = item.alt || 'image';
      link.target = '_blank'; // fallback if download fails
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert("Unable to download image. Try right-clicking and using 'Save image as...'");
    }
  };

  return (
    <motion.div 
      ref={imgRef}
      className={`gallery-item group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      data-aos="zoom-in"
      data-aos-delay={Math.min(100 * index, 500)}
      onClick={() => !disabled && onSelect(item)}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      whileHover={disabled ? {} : { y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🖼️</div>
              <div className="text-sm font-medium">Image unavailable</div>
            </div>
          </div>
        )}

        {imageSrc && !hasError && (
          <>
            <GalleryItemImage
              item={item}
              imageSrc={imageSrc}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
            />
            
            <GalleryItemOverlay
              item={item}
              isLoaded={isLoaded}
              isHovered={isHovered}
            />
            
            <GalleryItemActions
              item={item}
              isHovered={isHovered}
              disabled={disabled}
              onDownload={handleDownload}
            />
          </>
        )}
      </div>
      
      <GalleryItemInfo item={item} isHovered={isHovered} />
    </motion.div>
  );
};

export default GalleryItem;
