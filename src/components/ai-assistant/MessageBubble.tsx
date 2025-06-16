
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Volume2, Languages, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
  selectedLanguage: string;
  onSpeakText: (text: string) => void;
  onTranslateMessage: (message: Message) => void;
  onNavigationClick: (sectionId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  selectedLanguage,
  onSpeakText,
  onTranslateMessage,
  onNavigationClick
}) => {
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 400 }}
    >
      <div className={`flex gap-2 sm:gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
        {message.type === 'assistant' && (
          <motion.div 
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-heritage to-heritage-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles size={12} className="text-white sm:hidden" />
            <Sparkles size={14} className="text-white hidden sm:block" />
          </motion.div>
        )}
        
        <motion.div 
          className={`max-w-[80%] p-3 sm:p-4 rounded-2xl backdrop-blur-sm ${
            message.type === 'user'
              ? 'bg-gradient-to-br from-heritage to-heritage-dark text-white shadow-lg ring-1 ring-white/20'
              : 'bg-gradient-to-br from-gray-50/90 to-white/90 dark:from-gray-800/90 dark:to-gray-700/90 text-gray-900 dark:text-white shadow-lg ring-1 ring-black/5 dark:ring-white/10'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs opacity-70 font-medium">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            {message.type === 'assistant' && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSpeakText(message.content)}
                  className="h-6 w-6 opacity-60 hover:opacity-100 hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <Volume2 size={10} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onTranslateMessage(message)}
                  className="h-6 w-6 opacity-60 hover:opacity-100 hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <Languages size={10} />
                </Button>
              </div>
            )}
          </div>
        </motion.div>
        
        {message.type === 'user' && (
          <motion.div 
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/20"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <User size={12} className="sm:hidden" />
            <User size={14} className="hidden sm:block" />
          </motion.div>
        )}
      </div>

      {message.type === 'assistant' && message.navigationOptions && (
        <motion.div 
          className="ml-10 sm:ml-12 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">✨ Quick Actions:</p>
          <div className="flex flex-wrap gap-2">
            {message.navigationOptions.map((option, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigationClick(option.sectionId)}
                  className="text-xs h-8 px-3 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 border border-heritage/20 text-heritage dark:text-heritage-light hover:bg-heritage/10 dark:hover:bg-heritage/20 backdrop-blur-sm shadow-sm transition-all duration-200"
                >
                  <span className="mr-1">{option.emoji}</span>
                  {option.label}
                  <ExternalLink size={10} className="ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
