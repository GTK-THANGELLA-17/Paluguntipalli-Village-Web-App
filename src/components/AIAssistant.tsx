
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';

import { AIAssistantProps } from './ai-assistant/types';
import { useScrollAndVisibility } from './ai-assistant/hooks/useScrollAndVisibility';
import { useSpeechManager } from './ai-assistant/hooks/useSpeechManager';
import { useMessageManager } from './ai-assistant/hooks/useMessageManager';
import FloatingButton from './ai-assistant/FloatingButton';
import AssistantHeader from './ai-assistant/AssistantHeader';
import LanguageControls from './ai-assistant/LanguageControls';
import MessageInput from './ai-assistant/MessageInput';
import MessageBubble from './ai-assistant/MessageBubble';
import TypingIndicator from './ai-assistant/TypingIndicator';
import SuggestedQuestions from './ai-assistant/SuggestedQuestions';

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  isOpen: externalIsOpen, 
  onOpenChange,
  onSectionChange
}) => {
  const { i18n } = useTranslation();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  const { isScrolled, showAssistant } = useScrollAndVisibility();
  const {
    isSpeaking,
    isListening,
    handleSpeakText,
    handleStopSpeaking,
    handleStartListening,
    handleStopListening
  } = useSpeechManager(selectedLanguage);
  
  const {
    messages,
    inputValue,
    setInputValue,
    isTyping,
    showQuestions,
    messagesEndRef,
    handleQuestionClick,
    handleSendMessage,
    resetChat,
    handleTranslateMessage
  } = useMessageManager(isOpen);

  const handleNavigationClick = (sectionId: string) => {
    if (onSectionChange && (sectionId === 'quiz' || sectionId === 'community' || sectionId === 'business' || sectionId === 'services' || sectionId === 'why-use-app' || sectionId === 'stay-updated' || sectionId === 'village-map')) {
      onSectionChange(sectionId);
      setIsOpen(false);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <div>
      <FloatingButton
        isScrolled={isScrolled}
        showAssistant={showAssistant}
        isOpen={isOpen}
        onClick={() => setIsOpen(true)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/20 to-black/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            
            <motion.div
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[75vh] sm:h-[80vh] md:h-[600px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-t-2xl sm:rounded-3xl shadow-2xl flex flex-col border border-white/20 dark:border-gray-700/50 overflow-hidden"
              initial={{ y: "100%", scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: "100%", scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-heritage/5 via-transparent to-blue-500/5 pointer-events-none" />
              
              <AssistantHeader onReset={resetChat} onClose={() => setIsOpen(false)} />
              
              <LanguageControls
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                isSpeaking={isSpeaking}
                onStopSpeaking={handleStopSpeaking}
              />

              <ScrollArea className="flex-1 p-3 sm:p-4 relative">
                <div className="space-y-3 sm:space-y-4">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      selectedLanguage={selectedLanguage}
                      onSpeakText={handleSpeakText}
                      onTranslateMessage={(message) => handleTranslateMessage(message, selectedLanguage)}
                      onNavigationClick={handleNavigationClick}
                    />
                  ))}

                  {isTyping && <TypingIndicator />}

                  {showQuestions && !isTyping && (
                    <SuggestedQuestions onQuestionClick={handleQuestionClick} />
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <MessageInput
                inputValue={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                isListening={isListening}
                onStartListening={() => handleStartListening(setInputValue)}
                onStopListening={handleStopListening}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
