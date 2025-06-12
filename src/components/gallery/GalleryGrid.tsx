// components/GalleryGrid.tsx
import { motion } from "framer-motion";
import GalleryItem from "./GalleryItem";

interface GalleryGridProps {
  items: {
    type: "image" | "video";
    src: string;
    thumbnail?: string;
    alt: string;
  }[];
  onItemSelect: (item: any) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onItemSelect }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
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
