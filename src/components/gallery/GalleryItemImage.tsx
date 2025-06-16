
import { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

interface GalleryItemImageProps {
  item: any;
  imageSrc: string;
  onImageLoad: () => void;
  onImageError: () => void;
}

const GalleryItemImage: React.FC<GalleryItemImageProps> = ({
  item,
  imageSrc,
  onImageLoad,
  onImageError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onImageLoad();
  };

  const handleError = () => {
    setIsLoaded(false);
    onImageError();
  };

  return (
    <>
      {!isLoaded && imageSrc && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={item.alt}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        style={{
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />
    </>
  );
};

export default GalleryItemImage;
