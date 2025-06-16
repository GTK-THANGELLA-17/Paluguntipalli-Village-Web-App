
import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";

interface GalleryItemInfoProps {
  item: any;
  isHovered: boolean;
}

const GalleryItemInfo: React.FC<GalleryItemInfoProps> = ({ item, isHovered }) => {
  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-all duration-500"
      initial={{ y: 20 }}
      animate={{ y: isHovered ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        {item.type === 'image' ? <Image size={16} /> : <Video size={16} />}
        <span className="text-xs uppercase tracking-wider font-medium opacity-80">
          {item.type}
        </span>
      </div>
      <h3 className="font-semibold text-sm leading-tight">{item.alt}</h3>
    </motion.div>
  );
};

export default GalleryItemInfo;
