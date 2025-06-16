
import React from 'react';
import { Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface MessageInputProps {
  inputValue: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputValue,
  onChange,
  onSend,
  onKeyPress,
  isListening,
  onStartListening,
  onStopListening
}) => {
  return (
    <div className="relative p-3 sm:p-4 border-t border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/80 via-white/80 to-gray-50/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 backdrop-blur-lg">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-heritage/5 via-transparent to-blue-500/5 opacity-50"></div>
      
      <div className="relative flex gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <Input
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ask me anything... ✨"
            onKeyPress={onKeyPress}
            className="h-10 sm:h-12 text-sm pr-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-heritage/20 dark:border-gray-600/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl shadow-lg focus:ring-2 focus:ring-heritage/50 focus:border-heritage transition-all duration-200"
          />
          {inputValue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Sparkles size={16} className="text-heritage animate-pulse" />
            </motion.div>
          )}
        </div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={isListening ? onStopListening : onStartListening}
            size="icon" 
            variant={isListening ? "destructive" : "outline"}
            className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl shadow-lg backdrop-blur-sm border transition-all duration-200 ${
              isListening 
                ? 'bg-gradient-to-br from-red-500 to-red-600 border-red-400/50 animate-pulse' 
                : 'bg-white/90 dark:bg-gray-800/90 border-heritage/20 hover:bg-heritage/10 dark:hover:bg-heritage/20'
            }`}
          >
            {isListening ? (
              <>
                <MicOff size={14} className="sm:hidden text-white" />
                <MicOff size={16} className="hidden sm:block text-white" />
              </>
            ) : (
              <>
                <Mic size={14} className="sm:hidden text-heritage" />
                <Mic size={16} className="hidden sm:block text-heritage" />
              </>
            )}
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onSend} 
            size="icon" 
            className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-heritage to-heritage-dark hover:from-heritage-dark hover:to-heritage text-white rounded-xl shadow-lg border border-heritage/30 transition-all duration-200"
          >
            <Send size={14} className="sm:hidden" />
            <Send size={16} className="hidden sm:block" />
          </Button>
        </motion.div>
      </div>
      
      {isListening && (
        <motion.div 
          className="absolute -top-2 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
            🎤 Listening...
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MessageInput;
