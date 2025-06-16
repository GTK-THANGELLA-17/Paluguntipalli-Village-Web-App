// components/GalleryItem.tsx
import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

interface GalleryItemProps {
  item: {
    type: "image" | "video";
    src: string;
    thumbnail?: string;
    alt: string;
  };
  index: number;
  onSelect: (item: any) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onSelect }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getOptimizedImageUrl = (url: string) => {
    if (url.includes("unsplash.com")) {
      const sep = url.includes("?") ? "&" : "?";
      return `${url}${sep}auto=format&fit=crop&w=600&q=80&fm=webp`;
    }
    return url;
  };

  useEffect(() => {
    const finalURL = getOptimizedImageUrl(item.thumbnail || item.src);
    setImageSrc(finalURL);
  }, [item]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(item)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="aspect-[4/3] bg-gray-200 dark:bg-gray-800 relative">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <LoadingSpinner />
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 z-10">
            Failed to load
          </div>
        )}

        {imageSrc && (
          <img
            ref={imgRef}
            src={imageSrc}
            alt={item.alt}
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Optional: Video icon overlay */}
        {item.type === "video" && isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 text-white p-2 rounded-full">
              <Video size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Overlay with text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center rounded-xl">
        <div className="text-white text-center p-2 text-sm">{item.alt}</div>
      </div>
    </motion.div>
  );
};

export default GalleryItem;
