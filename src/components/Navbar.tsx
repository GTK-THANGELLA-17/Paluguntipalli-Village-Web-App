
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Image, Calendar, MapPin, Cloud, Info, Users, Bell, Globe, Music, Volume2, Play, Pause, Star, AlertTriangle, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from '@/components/ui/dropdown-menu';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n';
import ThemeToggle from './ThemeToggle';
import DeveloperModal from './DeveloperModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';

const mainNavLinks = [
  { name: 'Home', href: '#home', icon: <Home size={18} /> }
];

const dropdownNavLinks = [
  { 
    name: 'Explore',
    items: [
      { name: 'About', href: '#about', icon: <Info size={18} /> },
      { name: 'Why', href: '#why-use-app', icon: <Star size={18} /> },
      { name: 'Gallery', href: '#gallery', icon: <Image size={18} /> },
      { name: 'Today\'s Events', href: '#events-today', icon: <Calendar size={18} /> },
      { name: 'Places', href: '#places', icon: <MapPin size={18} /> },
      { name: 'Events', href: '#main-events', icon: <Calendar size={18} /> },
      { name: 'Weather', href: '#village-weather', icon: <Cloud size={18} /> },
      { name: 'Developed By', href: '#developer', icon: <User size={18} />, isDeveloper: true }
    ]
  },
  {
    name: 'Village',
    items: [
      { name: '360° Views', href: '#views360', icon: <MapPin size={18} /> },
      { name: 'Members', href: '#members', icon: <Users size={18} /> },
      { name: 'Announcements', href: '#important', icon: <Bell size={18} /> },
      { name: 'App Updates', href: '#app-updates', icon: <AlertTriangle size={18} /> }
    ]
  }
];

const Navbar = ({ isAudioPlaying, audioRef, setIsAudioPlaying }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'hi', name: 'हिंदी' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Hide navbar on scroll down, show on scroll up
      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      
      setIsScrolled(scrollPosition > 50);
      setLastScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavItemClick = (item: any) => {
    if (item.isDeveloper) {
      setShowDeveloperModal(true);
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(item.href);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(err => console.error("Audio playback failed:", err));
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  // Animation variants
  const navbarAnimations = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled py-2 shadow-md' : 'bg-transparent py-4'}`}
        initial="visible"
        animate={navbarVisible ? "visible" : "hidden"}
        variants={navbarAnimations}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#home" className="flex items-center gap-2">
              <Home className={`h-5 w-5 ${theme === 'light' ? 'text-green-600' : 'text-white'}`} />
              <span className={`text-xl font-bold font-playfair ${theme === 'light' ? 'text-black' : 'text-white'}`}>Paluguntipalli</span>
            </a>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Main nav links */}
                {mainNavLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Button 
                      variant="ghost" 
                      className={`hover:text-heritage hover:bg-white/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
                      onClick={() => scrollToSection(link.href)}
                    >
                      {link.icon}
                      <span className={`ml-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t(link.name)}</span>
                    </Button>
                  </NavigationMenuItem>
                ))}

                {/* Dropdown menus */}
                {dropdownNavLinks.map((dropdown) => (
                  <NavigationMenuItem key={dropdown.name}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className={`hover:text-heritage hover:bg-white/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                          <span className={theme === 'light' ? 'text-black' : 'text-white'}>{t(dropdown.name)}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white/95 backdrop-blur border border-gray-200 z-50 dark:bg-[#222222]/95 dark:border-gray-700">
                        {dropdown.items.map((item) => (
                          <DropdownMenuItem 
                            key={item.name} 
                            className="text-gray-800 dark:text-white hover:text-heritage cursor-pointer"
                            onClick={() => handleNavItemClick(item)}
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

            {/* Audio control button */}
            <Button
              variant="ghost"
              className={`hover:text-heritage hover:bg-white/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
              onClick={toggleAudio}
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

            {/* Language dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`hover:text-heritage hover:bg-white/10 transition-colors ${theme === 'light' ? 'text-black' : 'text-white'}`}
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

          {/* Mobile Nav - Rearranged */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile audio control with improved icon and animation - moved to first position */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full hover:text-heritage hover:bg-white/10 ${theme === 'light' ? 'text-black' : 'text-white'}`}
                onClick={toggleAudio}
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
            
            {/* Mobile theme toggle - smaller size */}
            <div className="sm:hidden">
              <ThemeToggle mobile={true} />
            </div>
            
            {/* Mobile language selection */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`rounded-full hover:text-heritage hover:bg-white/10 ${theme === 'light' ? 'text-black' : 'text-white'}`}
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
            
            {/* Mobile menu - Improved */}
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
                      <Home className={`h-5 w-5 ${theme === 'light' ? 'text-green-600' : 'text-white'}`} />
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
                        onClick={() => scrollToSection(link.href)}
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
                          key={item.name}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button 
                            variant="ghost" 
                            className="flex items-center justify-start pl-6 text-gray-800 dark:text-white hover:text-heritage hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                            onClick={() => handleNavItemClick(item)}
                          >
                            {item.icon}
                            <span className="ml-2">{t(item.name)}</span>
                          </Button>
                        </motion.div>
                      ))
                    ]
                  )}

                  {/* Audio control in mobile menu */}
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
                      onClick={toggleAudio}
                    >
                      {isAudioPlaying ? <Pause size={18} className="mr-2" /> : <Play size={18} className="mr-2" />}
                      <span>{isAudioPlaying ? "Stop Music" : "Play Music"}</span>
                    </Button>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile navigation indicator with animation */}
        <div className="lg:hidden w-full overflow-x-auto pb-1">
          <div className="flex justify-center gap-3 px-4 whitespace-nowrap relative h-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-heritage to-transparent absolute bottom-0"
            />
          </div>
        </div>
      </motion.header>

      {/* Developer Modal */}
      <DeveloperModal 
        open={showDeveloperModal}
        onOpenChange={setShowDeveloperModal}
      />
    </>
  );
};

export default Navbar;
