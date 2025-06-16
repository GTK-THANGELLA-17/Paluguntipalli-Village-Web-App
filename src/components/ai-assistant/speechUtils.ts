
import { toast } from 'sonner';

export class SpeechManager {
  private speechSynthesis: SpeechSynthesis | null = null;
  private speechRecognition: SpeechRecognition | null = null;
  private isSpeaking = false;
  private isListening = false;
  private selectedLanguage: string;

  constructor(language: string = 'en') {
    this.selectedLanguage = language;
    this.initializeSpeechServices();
  }

  private initializeSpeechServices() {
    if (typeof window !== 'undefined') {
      this.speechSynthesis = window.speechSynthesis;
      
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        this.speechRecognition = new SpeechRecognitionAPI();
        this.speechRecognition.continuous = false;
        this.speechRecognition.interimResults = false;
      }
    }
  }

  updateLanguage(language: string) {
    this.selectedLanguage = language;
    if (this.speechRecognition) {
      this.speechRecognition.lang = this.getLanguageCode(language);
    }
  }

  private getLanguageCode(lang: string): string {
    switch (lang) {
      case 'te': return 'te-IN';
      case 'hi': return 'hi-IN';
      default: return 'en-US';
    }
  }

  speakText(text: string, onStart?: () => void, onEnd?: () => void, onError?: () => void) {
    if (!this.speechSynthesis) return;

    this.speechSynthesis.cancel();

    const cleanText = text.replace(/[🌟🎯🏛️🏞️✨🚪💫🧩📚📖💝🏪💼🗺️🌍🌤️☀️📅🎉🎨📷💫🏘️🤖👋🎯]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.lang = this.getLanguageCode(this.selectedLanguage);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };
    
    utterance.onend = () => {
      this.isSpeaking = false;
      onEnd?.();
    };
    
    utterance.onerror = () => {
      this.isSpeaking = false;
      onError?.();
      toast.error('Speech synthesis failed');
    };

    this.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }

  startListening(onResult: (transcript: string) => void, onStart?: () => void, onEnd?: () => void, onError?: () => void) {
    if (!this.speechRecognition) {
      toast.error('Speech recognition not supported');
      return;
    }

    this.isListening = true;
    this.speechRecognition.lang = this.getLanguageCode(this.selectedLanguage);
    
    this.speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      this.isListening = false;
    };

    this.speechRecognition.onerror = () => {
      this.isListening = false;
      onError?.();
      toast.error('Speech recognition failed');
    };

    this.speechRecognition.onend = () => {
      this.isListening = false;
      onEnd?.();
    };

    this.speechRecognition.onstart = () => {
      onStart?.();
    };

    this.speechRecognition.start();
  }

  stopListening() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
      this.isListening = false;
    }
  }

  getIsSpeaking() {
    return this.isSpeaking;
  }

  getIsListening() {
    return this.isListening;
  }
}
