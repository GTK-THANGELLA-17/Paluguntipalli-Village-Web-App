import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './ui/LoadingSpinner';
import ImageError from './ui/ImageError';
import NavigationArrows from './ui/NavigationArrows';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  showNavigationArrows?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '',
  loading = 'lazy',
  priority = false,
  showNavigationArrows = false,
  onPrevious,
  onNext
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const imgRef = useRef<HTMLDivElement>(null);

  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const separator = originalSrc.includes('?') ? '&' : '?';
      return `${originalSrc}${separator}auto=format&fit=crop&w=1200&q=85&fm=webp`;
    }
    return originalSrc;
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (loading === 'eager' || priority) {
      setImageSrc(getOptimizedSrc(src));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setImageSrc(getOptimizedSrc(src));
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: '200px',
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);

      timeoutId = setTimeout(() => {
        setImageSrc(getOptimizedSrc(src));
        observer.disconnect();
      }, 3000); // fallback
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [src, loading, priority, getOptimizedSrc]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative w-full overflow-hidden ${aspectRatio || 'aspect-video'} ${className}`}
    >
      {isLoading && imageSrc && <LoadingSpinner />}
      {hasError && <ImageError />}
      {!imageSrc && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
      )}

      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          loading={loading}
          sizes="(max-width: 768px) 100vw, 800px"
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
      )}

      {showNavigationArrows && !isLoading && !hasError && imageSrc && (
        <NavigationArrows onPrevious={onPrevious} onNext={onNext} />
      )}

      {priority && imageSrc && (
        <link rel="preload" as="image" href={imageSrc} />
      )}
    </div>
  );
};

export default OptimizedImage;
