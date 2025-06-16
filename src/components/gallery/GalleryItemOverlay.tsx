
import { motion } from "framer-motion";
import { Video, Play } from "lucide-react";

interface GalleryItemOverlayProps {
  item: any;
  isLoaded: boolean;
  isHovered: boolean;
}

const GalleryItemOverlay: React.FC<GalleryItemOverlayProps> = ({
  item,
  isLoaded,
  isHovered
}) => {
  return (
    <>
      {/* Premium overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Type indicator with animation */}
      {item.type === 'video' && isLoaded && (
        <motion.div 
          className="absolute top-4 right-4 z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20">
            <Video size={16} />
          </div>
        </motion.div>
      )}

      {/* Play button for videos */}
      {item.type === 'video' && isLoaded && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-heritage border-2 border-white/50 shadow-lg"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
            transition={{ duration: 0.2 }}
          >
            <Play size={28} className="ml-1" />
          </motion.div>
        </motion.div>
      )}

      {/* Premium shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </>
  );
};

export default GalleryItemOverlay;
