
import { Language, Message } from './types';

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: 'ðŸ‡ºðŸ‡¸' },
  { code: 'te', name: 'à°¤à±†à°²à±à°—à±', flag: 'ðŸ‡®ðŸ‡³' },
  { code: 'hi', name: 'à¤¹à¤¿à¤‚à¤¦à¥€', flag: 'ðŸ‡®ðŸ‡³' }
];

export const translateMessage = async (message: Message, targetLang: string): Promise<string> => {
  
  if (targetLang === message.translatedTo) {
    return message.originalContent || message.content;
  }

  const translations: { [key: string]: { [key: string]: string } } = {
    'te': {
      'Hello': 'à°¨à°®à°¸à±à°•à°¾à°°à°‚',
      'Welcome': 'à°¸à±à°µà°¾à°—à°¤à°‚',
      'Village': 'à°—à±à°°à°¾à°®à°‚',
      'Assistant': 'à°¸à°¹à°¾à°¯à°•à±à°¡à±',
      'features': 'à°²à°•à±à°·à°£à°¾à°²à±',
      'quiz': 'à°•à±à°µà°¿à°œà±',
      'community': 'à°•à°®à±à°¯à±‚à°¨à°¿à°Ÿà±€',
      'business': 'à°µà±à°¯à°¾à°ªà°¾à°°à°‚',
      'stories': 'à°•à°¥à°²à±',
      'map': 'à°®à±à°¯à°¾à°ªà±',
      'weather': 'à°µà°¾à°¤à°¾à°µà°°à°£à°‚',
      'gallery': 'à°—à±à°¯à°¾à°²à°°à±€',
      'contact': 'à°¸à°‚à°ªà±à°°à°¦à°¿à°‚à°ªà±',
      'help': 'à°¸à°¹à°¾à°¯à°‚',
      'support': 'à°®à°¦à±à°¦à°¤à±',
      'amazing': 'à°…à°¦à±à°­à±à°¤à°®à±ˆà°¨',
      'explore': 'à°…à°¨à±à°µà±‡à°·à°¿à°‚à°šà°‚à°¡à°¿',
      'discover': 'à°•à°¨à±à°—à±Šà°¨à°‚à°¡à°¿'
    },
    'hi': {
      'Hello': 'à¤¨à¤®à¤¸à¥à¤¤à¥‡',
      'Welcome': 'à¤¸à¥à¤µà¤¾à¤—à¤¤',
      'Village': 'à¤—à¤¾à¤‚à¤µ',
      'Assistant': 'à¤¸à¤¹à¤¾à¤¯à¤•',
      'features': 'à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤‚',
      'quiz': 'à¤ªà¥à¤°à¤¶à¥à¤¨à¥‹à¤¤à¥à¤¤à¤°à¥€',
      'community': 'à¤¸à¤®à¥à¤¦à¤¾à¤¯',
      'business': 'à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤°',
      'stories': 'à¤•à¤¹à¤¾à¤¨à¤¿à¤¯à¤¾à¤‚',
      'map': 'à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤°',
      'weather': 'à¤®à¥Œà¤¸à¤®',
      'gallery': 'à¤—à¥ˆà¤²à¤°à¥€',
      'contact': 'à¤¸à¤‚à¤ªà¤°à¥à¤•',
      'help': 'à¤®à¤¦à¤¦',
      'support': 'à¤¸à¤®à¤°à¥à¤¥à¤¨',
      'amazing': 'à¤…à¤¦à¥à¤­à¥à¤¤',
      'explore': 'à¤–à¥‹à¤œà¥‡à¤‚',
      'discover': 'à¤–à¥‹à¤œà¥‡à¤‚'
    },
    'en': {
      'à°¨à°®à°¸à±à°•à°¾à°°à°‚': 'Hello',
      'à°¸à±à°µà°¾à°—à°¤à°‚': 'Welcome',
      'à°—à±à°°à°¾à°®à°‚': 'Village',
      'à°¸à°¹à°¾à°¯à°•à±à°¡à±': 'Assistant',
      'à°²à°•à±à°·à°£à°¾à°²à±': 'features',
      'à°•à±à°µà°¿à°œà¤¼': 'quiz',
      'à°•à°®à±à°¯à±‚à°¨à°¿à°Ÿà±€': 'community',
      'à°µà±à°¯à°¾à°ªà°¾à°°à°‚': 'business',
      'à°•à°¥à°²à±': 'stories',
      'à°®à±à°¯à°¾à°ªà¥': 'map',
      'à°µà°¾à°¤à°¾à°µà°°à°£à°‚': 'weather',
      'à°—à±ˆà°²à°°à±€': 'gallery',
      'à°¸à°‚à°ªà±à°°à°¦à°¿à°‚à°ªà±': 'contact',
      'à°¸à°¹à°¾à°¯à°‚': 'help',
      'à°®à°¦à±à°¦à°¤à±': 'support',
      'à¤…à°¦à±à°­à¥à¦¤à¤®à¥ˆà¤‚': 'amazing',
      'à¤…à°¨à±à°µà±‡à°·à°¿à°‚à°šà°¿à¤‚': 'explore',
      'à°•à°¨à±à°—à¥‹à¦°à¥à¤£à°¿': 'discover'
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
      translatedText = 'ðŸ“¢ à°…à°¨à±à°µà°¾à°¦à°‚ à°…à°‚à°¦à±à°¬à°¾à°Ÿà±à°²à±‹ à°²à±‡à°¦à± - à°¦à°¯à°šà±‡à°¸à°¿ à°‡à°‚à°—à±à°²à±€à°·à± à°µà±†à°°à±à°·à°¨à± à°šà±‚à°¡à°‚à°¡à°¿';
    } else if (targetLang === 'hi') {
      translatedText = 'ðŸ“¢ à¤…à¤¨à¥à¤µà¤¾à¤¦ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ - à¤•à¥ƒà¤ªà¤¯à¤¾ à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€ à¤¸à¤‚à¤¸à¥à¤•à¤°à¤£ à¤¦à¥‡à¤–à¥‡à¤‚';
    }
  }
  return translatedText;
};

