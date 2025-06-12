
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import te from './locales/te.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  te: { translation: te },
  hi: { translation: hi }
};

// Initialize i18next with reliable configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span']
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode']
    }
  });

// Enhanced language change function WITHOUT page refresh
export const changeLanguage = async (language: string): Promise<boolean> => {
  try {
    console.log('Changing language to:', language);
    
    // Validate language
    if (!['en', 'te', 'hi'].includes(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    // Change language immediately
    await i18n.changeLanguage(language);
    
    // Update localStorage
    localStorage.setItem('i18nextLng', language);
    
    // Update document language
    document.documentElement.lang = language;
    
    // NO PAGE REFRESH - just apply translations
    applyTranslations();
    
    console.log('Language changed successfully to:', language);
    return true;
    
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

// Apply translations to DOM elements
export const applyTranslations = (): void => {
  try {
    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && i18n.exists(key)) {
        const translated = i18n.t(key);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          (el as HTMLInputElement).setAttribute('placeholder', translated);
        } else {
          el.textContent = translated;
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('input[data-i18n-placeholder], textarea[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && i18n.exists(key)) {
        const translated = i18n.t(key);
        (el as HTMLInputElement).setAttribute('placeholder', translated);
      }
    });
  } catch (error) {
    console.error('Error applying translations:', error);
  }
};

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  console.log('Language changed event fired:', lng);
  applyTranslations();
});

export default i18n;
