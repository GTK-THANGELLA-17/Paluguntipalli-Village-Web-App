
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

// Initialize i18next with comprehensive configuration
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
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span', 'div']
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode']
    }
  });

// Enhanced language change function with complete UI refresh
export const changeLanguage = async (language: string): Promise<boolean> => {
  try {
    
    // Validate language
    if (!['en', 'te', 'hi'].includes(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    
    // Change language immediately
    await i18n.changeLanguage(language);
    
    // Update localStorage
    localStorage.setItem('i18nextLng', language);
    
    // Update document language and attributes
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-language', language);
    
    // Apply translations to all elements
    applyTranslations();
    
    // Force React components to re-render by dispatching events
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
    window.dispatchEvent(new CustomEvent('i18nextLanguageChanged', { detail: language }));
    return true;
    
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

// Enhanced translation application
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

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key && i18n.exists(key)) {
        const translated = i18n.t(key);
        el.setAttribute('aria-label', translated);
      }
    });

    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key && i18n.exists(key)) {
        const translated = i18n.t(key);
        el.setAttribute('title', translated);
      }
    });

  } catch (error) {
    console.error('Error applying translations:', error);
  }
};

// Listen for language changes and apply translations
i18n.on('languageChanged', (lng) => {
  applyTranslations();
  
  // Update CSS direction for RTL languages if needed
  document.documentElement.dir = lng === 'ar' || lng === 'he' ? 'rtl' : 'ltr';
});

// Initialize translations on load
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
});

export default i18n;

