
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Message, PredefinedQuestion } from '../types';
import { translateMessage } from '../languageUtils';
import { generateAIResponse } from '../aiResponseGenerator';

export const useMessageManager = (isOpen: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'assistant',
        content: 'Hello! Welcome to the Paluguntipalli Village help assistant. I can guide you to village features, festival updates, map, services, stories, and contact information. How can I help today?',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleQuestionClick = (question: PredefinedQuestion) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question.question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setShowQuestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: question.answer,
        timestamp: new Date(),
        navigationOptions: question.navigationOptions
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setShowQuestions(true);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowQuestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        navigationOptions: response.navigationOptions
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setShowQuestions(true);
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setShowQuestions(true);
    setInputValue('');
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: 'welcome-reset',
        type: 'assistant',
        content: 'Chat reset. I am ready to help you explore the Paluguntipalli village app again. What would you like to know?',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }, 300);
  };

  const handleTranslateMessage = async (message: Message, selectedLanguage: string) => {
    try {
      const translated = await translateMessage(message, selectedLanguage);
      setMessages(prev => prev.map(m => 
        m.id === message.id 
          ? { 
              ...m, 
              content: translated, 
              originalContent: m.originalContent || message.content, 
              translatedTo: selectedLanguage 
            }
          : m
      ));
      toast.success('Message translated successfully!');
    } catch (error) {
      toast.error('Translation failed. Please try again.');
    }
  };

  return {
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
  };
};

