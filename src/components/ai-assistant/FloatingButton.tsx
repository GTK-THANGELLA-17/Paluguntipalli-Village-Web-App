
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingButtonProps {
  isScrolled: boolean;
  showAssistant: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  isScrolled,
  showAssistant,
  isOpen,
  onClick
}) => {
  return (
    <AnimatePresence>
      {!isScrolled && showAssistant && !isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ type: "spring", duration: 0.6, stiffness: 400 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-heritage to-heritage-dark rounded-full blur-lg opacity-50 animate-pulse"></div>
            
            <Button
              onClick={onClick}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-heritage via-heritage-dark to-heritage shadow-2xl border-2 border-white/20 backdrop-blur-sm overflow-hidden group transition-all duration-300"
              size="icon"
            >
              {/* Animated background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
              
              <div className="relative flex items-center justify-center">
                <MessageSquare size={20} className="sm:hidden text-white z-10" />
                <MessageSquare size={24} className="hidden sm:block text-white z-10" />
              </div>
            </Button>
            
            {/* Notification dot with enhanced animation */}
            <motion.div 
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg border-2 border-white flex items-center justify-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={8} className="text-white" />
            </motion.div>
            
            {/* Floating particles effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-2 left-1/2 w-1 h-1 bg-heritage rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -right-2 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-heritage-light rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -left-2 w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingButton;
