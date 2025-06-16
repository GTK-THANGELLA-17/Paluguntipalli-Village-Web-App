
import React from 'react';
import { Sparkles, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface AssistantHeaderProps {
  onReset: () => void;
  onClose: () => void;
}

const AssistantHeader: React.FC<AssistantHeaderProps> = ({ onReset, onClose }) => {
  return (
    <div className="relative p-3 sm:p-4 md:p-5 border-b border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-heritage via-heritage-dark to-heritage text-white rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center ring-2 ring-white/30 shadow-lg">
              <Sparkles size={16} className="sm:hidden text-white" />
              <Sparkles size={20} className="hidden sm:block text-white" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <motion.h3 
              className="font-bold text-sm sm:text-base tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Village Assistant
            </motion.h3>
            <motion.p 
              className="text-xs sm:text-sm opacity-90 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ✨ Always here to help! 🤖
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-1 sm:gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onReset}
              className="text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-200"
            >
              <RotateCcw size={14} className="sm:hidden" />
              <RotateCcw size={16} className="hidden sm:block" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-red-500/20 w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-200"
            >
              <X size={16} className="sm:hidden" />
              <X size={18} className="hidden sm:block" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssistantHeader;
