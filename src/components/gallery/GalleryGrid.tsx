import { motion } from "framer-motion";
import GalleryItem from './GalleryItem';

interface GalleryItemType {
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
}

interface GalleryGridProps {
  items: GalleryItemType[];
  onItemSelect: (item: GalleryItemType) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onItemSelect }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          }
        }
      }}
    >
      {items.map((item, index) => (
        <GalleryItem 
          key={item.src + index}  // Better unique key for React reconciliation
          item={item} 
          index={index} 
          onSelect={onItemSelect} 
        />
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
