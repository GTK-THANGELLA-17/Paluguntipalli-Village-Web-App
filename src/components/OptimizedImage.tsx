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
  aspectRatio = 'aspect-square',
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

  // WebP optimization for unsplash images
  const getOptimizedSrc = useCallback((originalSrc: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const separator = originalSrc.includes('?') ? '&' : '?';
      return `${originalSrc}${separator}auto=format&fit=crop&w=800&q=85&fm=webp`;
    }
    return originalSrc;
  }, []);

  // Intersection Observer + Fallback for mobile
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
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
      // Fallback after 3 seconds
      timeoutId = setTimeout(() => {
        setImageSrc(getOptimizedSrc(src));
        observer.disconnect();
      }, 3000);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [src, loading, priority, getOptimizedSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectRatio} ${className}`}
      ref={imgRef}
    >
      {/* Loading Spinner */}
      {isLoading && imageSrc && <LoadingSpinner />}

      {/* Error Placeholder */}
      {hasError && <ImageError />}

      {/* Placeholder shimmer */}
      {!imageSrc && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse" />
      )}

      {/* Final Image */}
      {imageSrc && (
        <motion.img
          src={imageSrc}
          alt={alt}
          loading={loading}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: isLoading ? 0 : 1,
            scale: isLoading ? 1.1 : 1,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
      )}

      {/* Navigation Arrows */}
      {showNavigationArrows && !isLoading && !hasError && imageSrc && (
        <NavigationArrows onPrevious={onPrevious} onNext={onNext} />
      )}

      {/* Preload */}
      {priority && imageSrc && (
        <link rel="preload" as="image" href={imageSrc} />
      )}
    </div>
  );
};

export default OptimizedImage;
