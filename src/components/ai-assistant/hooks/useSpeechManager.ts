
import { useState, useEffect, useRef } from 'react';
import { SpeechManager } from '../speechUtils';

export const useSpeechManager = (selectedLanguage: string) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const speechManagerRef = useRef<SpeechManager | null>(null);

  // Initialize speech manager
  useEffect(() => {
    speechManagerRef.current = new SpeechManager(selectedLanguage);
  }, []);

  // Update speech manager language
  useEffect(() => {
    if (speechManagerRef.current) {
      speechManagerRef.current.updateLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  const handleSpeakText = (text: string) => {
    if (speechManagerRef.current) {
      speechManagerRef.current.speakText(
        text,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleStopSpeaking = () => {
    if (speechManagerRef.current) {
      speechManagerRef.current.stopSpeaking();
      setIsSpeaking(false);
    }
  };

  const handleStartListening = (onResult: (transcript: string) => void) => {
    if (speechManagerRef.current) {
      speechManagerRef.current.startListening(
        onResult,
        () => setIsListening(true),
        () => setIsListening(false),
        () => setIsListening(false)
      );
    }
  };

  const handleStopListening = () => {
    if (speechManagerRef.current) {
      speechManagerRef.current.stopListening();
      setIsListening(false);
    }
  };

  return {
    isSpeaking,
    isListening,
    handleSpeakText,
    handleStopSpeaking,
    handleStartListening,
    handleStopListening
  };
};
