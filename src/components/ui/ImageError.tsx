
import { motion } from 'framer-motion';

const ImageError = () => {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-500 dark:text-gray-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div 
          className="text-4xl mb-2"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📷
        </motion.div>
        <div className="text-sm font-medium">Image not available</div>
      </div>
    </motion.div>
  );
};

export default ImageError;
