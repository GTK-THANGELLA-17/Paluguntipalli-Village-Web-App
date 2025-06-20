
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Menu, Home, Play, Pause, Globe, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/providers/ThemeProvider';
import { changeLanguage } from '@/i18n';
import ThemeToggle from '../ThemeToggle';

interface MobileNavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onAIAssistantClick: () => void;
  onNavLinkClick: (link: any) => void;
  onNavItemClick: (item: any) => void;
  mainNavLinks: any[];
  dropdownNavLinks: any[];
}

const MobileNavigation = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isAudioPlaying,
  onToggleAudio,
  onAIAssistantClick,
  onNavLinkClick,
  onNavItemClick,
  mainNavLinks,
  dropdownNavLinks
}: MobileNavigationProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिंदी' }
  ];

  return (
    <div className="lg:hidden flex items-center gap-2">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full hover:text-heritage hover:bg-heritage/10 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          onClick={onToggleAudio}
          aria-label={isAudioPlaying ? "Stop background music" : "Play background music"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isAudioPlaying ? 'pause' : 'play'}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isAudioPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>
      
      <div className="sm:hidden">
        <ThemeToggle mobile={true} />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className={`rounded-full hover:text-heritage hover:bg-heritage/10 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          >
            <Globe size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white/95 backdrop-blur border border-gray-200 z-50 dark:bg-[#222222]/95 dark:border-gray-700">
          {languages.map((lang) => (
            <DropdownMenuItem 
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`text-gray-800 dark:text-white hover:text-heritage cursor-pointer ${i18n.language === lang.code ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-full ${theme === 'light' ? 'text-black hover:bg-black/5' : 'text-white hover:bg-white/10'}`}
          >
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white text-gray-800 border-l border-gray-200 z-50 dark:bg-[#222222] dark:text-white dark:border-gray-700 overflow-y-auto w-[75vw] sm:max-w-sm">
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-heritage rounded-lg flex items-center justify-center">
                  <Home className="text-white" size={16} />
                </div>
                <span className={`text-xl font-bold font-playfair ${theme === 'light' ? 'text-black' : 'text-white'}`}>Paluguntipalli</span>
              </div>
            </div>

            {mainNavLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="ghost" 
                  className="flex items-center justify-start text-gray-800 dark:text-white hover:text-heritage hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                  onClick={() => onNavLinkClick(link)}
                >
                  {link.icon}
                  <span className="ml-2 text-lg">{t(link.name)}</span>
                </Button>
              </motion.div>
            ))}
            
            {dropdownNavLinks.flatMap(dropdown => 
              [
                <div key={dropdown.name} className="px-4 py-2 mt-4 text-sm font-semibold text-heritage dark:text-white border-b border-gray-100 dark:border-gray-700">
                  {t(dropdown.name)}
                </div>,
                ...dropdown.items.map(item => (
                  <motion.div 
                    key={`${dropdown.name}-${item.name}`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="ghost" 
                      className="flex items-center justify-start pl-6 text-gray-800 dark:text-white hover:text-heritage hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                      onClick={() => onNavItemClick(item)}
                    >
                      {item.icon}
                      <span className="ml-2">{t(item.name)}</span>
                    </Button>
                  </motion.div>
                ))
              ]
            )}

            {/* Chat Assistant in Mobile Menu */}
            <div className="px-4 py-2 mt-4 text-sm font-semibold text-heritage dark:text-white border-b border-gray-100 dark:border-gray-700">
              Assistant
            </div>
            <motion.div 
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="ghost" 
                className="flex items-center justify-start pl-6 text-gray-800 dark:text-white hover:text-heritage hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                onClick={onAIAssistantClick}
              >
                <Bot size={18} className="mr-2" />
                <span>Chat Assistant</span>
              </Button>
            </motion.div>

            <div className="px-4 py-2 mt-4 text-sm font-semibold text-heritage dark:text-white border-b border-gray-100 dark:border-gray-700">
              Audio Controls
            </div>
            <motion.div 
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="ghost" 
                className="flex items-center justify-start pl-6 text-gray-800 dark:text-white hover:text-heritage hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                onClick={onToggleAudio}
              >
                {isAudioPlaying ? <Pause size={18} className="mr-2" /> : <Play size={18} className="mr-2" />}
                <span>{isAudioPlaying ? "Stop Music" : "Play Music"}</span>
              </Button>
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
