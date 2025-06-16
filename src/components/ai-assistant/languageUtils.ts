
import { Language, Message } from './types';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
];

export const translateMessage = async (message: Message, targetLang: string): Promise<string> => {
  console.log('Translating message to:', targetLang);
  
  if (targetLang === message.translatedTo) {
    return message.originalContent || message.content;
  }

  const translations: { [key: string]: { [key: string]: string } } = {
    'te': {
      'Hello': 'నమస్కారం',
      'Welcome': 'స్వాగతం',
      'Village': 'గ్రామం',
      'Assistant': 'సహాయకుడు',
      'features': 'లక్షణాలు',
      'quiz': 'క్విజ్',
      'community': 'కమ్యూనిటీ',
      'business': 'వ్యాపారం',
      'stories': 'కథలు',
      'map': 'మ్యాప్',
      'weather': 'వాతావరణం',
      'gallery': 'గ్యాలరీ',
      'contact': 'సంప్రదింపు',
      'help': 'సహాయం',
      'support': 'మద్దతు',
      'amazing': 'అద్భుతమైన',
      'explore': 'అన్వేషించండి',
      'discover': 'కనుగొనండి'
    },
    'hi': {
      'Hello': 'नमस्ते',
      'Welcome': 'स्वागत',
      'Village': 'गांव',
      'Assistant': 'सहायक',
      'features': 'विशेषताएं',
      'quiz': 'प्रश्नोत्तरी',
      'community': 'समुदाय',
      'business': 'व्यापार',
      'stories': 'कहानियां',
      'map': 'मानचित्र',
      'weather': 'मौसम',
      'gallery': 'गैलरी',
      'contact': 'संपर्क',
      'help': 'मदद',
      'support': 'समर्थन',
      'amazing': 'अद्भुत',
      'explore': 'खोजें',
      'discover': 'खोजें'
    },
    'en': {
      'నమస్కారం': 'Hello',
      'స్వాగతం': 'Welcome',
      'గ్రామం': 'Village',
      'సహాయకుడు': 'Assistant',
      'లక్షణాలు': 'features',
      'క్విజ़': 'quiz',
      'కమ్యూనిటీ': 'community',
      'వ్యాపారం': 'business',
      'కథలు': 'stories',
      'మ్యాప्': 'map',
      'వాతావరణం': 'weather',
      'గైలరీ': 'gallery',
      'సంప్రదింపు': 'contact',
      'సహాయం': 'help',
      'మద్దతు': 'support',
      'अద్భुতमैं': 'amazing',
      'अన్వేషించిं': 'explore',
      'కనుగोর्णి': 'discover'
    }
  };

  let translatedText = message.content;
  const langTranslations = translations[targetLang];
  
  if (langTranslations) {
    Object.entries(langTranslations).forEach(([original, translated]) => {
      const regex = new RegExp(original, 'gi');
      translatedText = translatedText.replace(regex, translated);
    });
  }

  if (translatedText === message.content && targetLang !== 'en') {
    if (targetLang === 'te') {
      translatedText = '📢 అనువాదం అందుబాటులో లేదు - దయచేసి ఇంగ్లీష్ వెర్షన్ చూడండి';
    } else if (targetLang === 'hi') {
      translatedText = '📢 अनुवाद उपलब्ध नहीं - कृपया अंग्रेजी संस्करण देखें';
    }
  }

  console.log('Translation completed:', translatedText);
  return translatedText;
};
