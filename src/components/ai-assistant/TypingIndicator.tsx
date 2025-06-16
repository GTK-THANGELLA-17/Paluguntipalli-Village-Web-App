
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div 
      className="flex gap-2 sm:gap-3 justify-start"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-heritage to-heritage-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
        <Sparkles size={12} className="text-white sm:hidden animate-pulse" />
        <Sparkles size={14} className="text-white hidden sm:block animate-pulse" />
      </div>
      <div className="bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-700/90 p-3 sm:p-4 rounded-2xl backdrop-blur-sm shadow-lg">
        <div className="flex gap-1">
          <motion.div 
            className="w-2 h-2 bg-heritage rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="w-2 h-2 bg-heritage rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="w-2 h-2 bg-heritage rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
