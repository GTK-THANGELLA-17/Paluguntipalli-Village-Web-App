
import { motion } from "framer-motion";
import GalleryItem from './GalleryItem';

interface GalleryGridProps {
  items: any[];
  onItemSelect: (item: any) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onItemSelect }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {items.map((item, index) => (
        <GalleryItem 
          key={index} 
          item={item} 
          index={index} 
          onSelect={onItemSelect} 
        />
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
