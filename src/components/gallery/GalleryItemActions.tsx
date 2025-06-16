
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";

interface GalleryItemActionsProps {
  item: any;
  isHovered: boolean;
  disabled: boolean;
  onDownload: (e: React.MouseEvent) => void;
}

const GalleryItemActions: React.FC<GalleryItemActionsProps> = ({
  item,
  isHovered,
  disabled,
  onDownload
}) => {
  return (
    <motion.div 
      className="absolute top-4 left-4 flex gap-2 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={onDownload}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={disabled}
      >
        <Download size={14} />
      </motion.button>
      <motion.button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Eye size={14} />
      </motion.button>
    </motion.div>
  );
};

export default GalleryItemActions;
