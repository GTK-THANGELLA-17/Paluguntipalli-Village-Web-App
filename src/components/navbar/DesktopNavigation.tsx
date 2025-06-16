
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MessageSquare, Play, Pause, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { changeLanguage } from '@/i18n';

interface DesktopNavigationProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onAIAssistantClick: () => void;
  onNavLinkClick: (link: any) => void;
  onNavItemClick: (item: any) => void;
  mainNavLinks: any[];
  dropdownNavLinks: any[];
}

const DesktopNavigation = ({
  isAudioPlaying,
  onToggleAudio,
  onAIAssistantClick,
  onNavLinkClick,
  onNavItemClick,
  mainNavLinks,
  dropdownNavLinks
}: DesktopNavigationProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिंदी' }
  ];

  return (
    <nav className="hidden lg:flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          {mainNavLinks.map((link) => (
            <NavigationMenuItem key={link.name}>
              <Button 
                variant="ghost" 
                className={`hover:text-heritage hover:bg-heritage/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
                onClick={() => onNavLinkClick(link)}
              >
                <span className={`ml-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t(link.name)}</span>
              </Button>
            </NavigationMenuItem>
          ))}

          {dropdownNavLinks.map((dropdown) => (
            <NavigationMenuItem key={dropdown.name}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`hover:text-heritage hover:bg-heritage/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <span className={theme === 'light' ? 'text-black' : 'text-white'}>{t(dropdown.name)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/95 backdrop-blur border border-gray-200 z-50 dark:bg-[#222222]/95 dark:border-gray-700">
                  {dropdown.items.map((item) => (
                    <DropdownMenuItem 
                      key={item.name} 
                      className="text-gray-800 dark:text-white hover:text-heritage cursor-pointer"
                      onClick={() => onNavItemClick(item)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        {t(item.name)}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* AI Assistant Button */}
      <Button
        variant="ghost"
        className={`hover:text-heritage hover:bg-heritage/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
        onClick={onAIAssistantClick}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={18} />
        <span className={`ml-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>AI Assistant</span>
      </Button>

      {/* Audio Control */}
      <Button
        variant="ghost"
        className={`hover:text-heritage hover:bg-heritage/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
        onClick={onToggleAudio}
        aria-label={isAudioPlaying ? "Stop background music" : "Play background music"}
      >
        {isAudioPlaying ? (
          <motion.div 
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Pause size={18} />
            <span className={`ml-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Stop Music</span>
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Play size={18} />
            <span className={`ml-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Play Music</span>
          </motion.div>
        )}
      </Button>

      {/* Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className={`hover:text-heritage hover:bg-heritage/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
          >
            <Globe size={18} />
            <span className={`ml-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
            </span>
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
    </nav>
  );
};

export default DesktopNavigation;
