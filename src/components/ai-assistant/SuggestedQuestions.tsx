
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { predefinedQuestions } from './predefinedQuestions';
import { PredefinedQuestion } from './types';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: PredefinedQuestion) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onQuestionClick }) => {
  return (
    <motion.div 
      className="mt-4 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        <HelpCircle size={16} className="text-heritage" />
        💭 Suggested Questions:
      </div>
      <div className="grid gap-2">
        {predefinedQuestions.slice(0, 4).map((question, index) => (
          <motion.div 
            key={question.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuestionClick(question)}
              className="text-left justify-start h-auto p-3 text-sm leading-relaxed bg-gradient-to-r from-white/60 to-gray-50/60 dark:from-gray-800/60 dark:to-gray-700/60 border border-heritage/20 text-gray-700 dark:text-gray-200 hover:bg-heritage/10 dark:hover:bg-heritage/20 backdrop-blur-sm shadow-sm transition-all duration-200"
            >
              {question.question}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SuggestedQuestions;
