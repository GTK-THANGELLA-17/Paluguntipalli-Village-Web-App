
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { changeLanguage } from "@/i18n";
import { toast } from "sonner";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  // Enhanced language change function WITHOUT page refresh
  const handleLanguageChange = async (langCode: string) => {
    if (isChanging || langCode === currentLang) return;
    
    setIsChanging(true);
    setOpen(false);

    try {
      // Visual feedback with flag animation
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 bg-black/10 backdrop-blur-sm z-[9999] pointer-events-none transition-opacity duration-200';
      overlay.style.opacity = '0';
      document.body.appendChild(overlay);

      const flag = document.createElement('div');
      const lang = languages.find(l => l.code === langCode);
      flag.textContent = lang?.flag || '🌐';
      flag.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 2.5rem;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        text-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(flag);

      // Animate in
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        flag.style.opacity = '1';
        flag.style.transform = 'translate(-50%, -50%) scale(1.1)';
      });

      // Change language WITHOUT page refresh
      const success = await changeLanguage(langCode);
      
      if (success) {
        setCurrentLang(langCode);
        
        // Success feedback
        toast.success(t('language.changed', `Language changed to ${lang?.name}`), {
          description: t('language.applied', "Translation applied successfully"),
          duration: 2000,
        });
      } else {
        throw new Error('Language change failed');
      }

      // Animate out
      setTimeout(() => {
        flag.style.opacity = '0';
        flag.style.transform = 'translate(-50%, -50%) scale(0.8)';
        overlay.style.opacity = '0';
        
        setTimeout(() => {
          if (document.body.contains(overlay)) document.body.removeChild(overlay);
          if (document.body.contains(flag)) document.body.removeChild(flag);
        }, 200);
      }, 500);

    } catch (error) {
      console.error('Language change error:', error);
      toast.error(t('language.error', "Failed to change language"), {
        description: t('language.tryAgain', "Please try again"),
        duration: 3000,
      });
    } finally {
      setTimeout(() => setIsChanging(false), 700);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={t('language.select', 'Select a language')}
          disabled={isChanging}
          className="flex items-center gap-1.5 md:gap-2 bg-white dark:bg-[#222222] dark:text-white dark:border-white/20 transition-all duration-300 text-xs sm:text-sm min-w-0"
        >
          <Globe className={`${theme === 'light' ? "text-green-600" : "text-white"} flex-shrink-0`} size={14} />
          <span className="hidden sm:inline truncate">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="sm:hidden flex-shrink-0">
            {currentLanguage.flag}
          </span>
          <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] sm:w-[200px] p-0 dark:bg-[#222222] dark:border-white/20">
        <div className="space-y-1 p-2">
          {languages.map((language) => (
            <motion.div
              key={language.code}
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(0,0,0,0.03)' }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={`w-full justify-between text-left text-xs sm:text-sm dark:text-white dark:hover:bg-white/10 ${
                  currentLang === language.code ? 'bg-heritage/10 dark:bg-white/10' : ''
                } ${isChanging ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isChanging}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="text-base sm:text-lg flex-shrink-0">{language.flag}</span>
                  <span className="truncate">{language.name}</span>
                </span>
                {currentLang === language.code && (
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-white flex-shrink-0" />
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
