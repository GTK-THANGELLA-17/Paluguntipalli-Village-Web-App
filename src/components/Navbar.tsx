
import { useState, useEffect } from 'react';
import { Home, Image, Calendar, MapPin, Cloud, Info, Users, Bell, Globe, Music, Volume2, Play, Pause, Star, AlertTriangle, User, Phone, Map, MessageSquare, Bot, Grid3X3 } from 'lucide-react';
import { motion } from 'framer-motion';
import DeveloperModal from './DeveloperModal';
import NavbarBrand from './navbar/NavbarBrand';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';

interface NavbarProps {
  isScrolled: boolean;
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  onSectionChange: (section: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | null) => void;
  onAIAssistantOpen?: () => void;
}

const mainNavLinks = [
  { name: 'Home', href: '#home', icon: <Home size={18} /> },
  { name: 'Features', href: '#features', icon: <Grid3X3 size={18} /> }
];

const dropdownNavLinks = [
  { 
    name: 'Explore',
    items: [
      { name: 'About', href: '#about', icon: <Info size={18} /> },
      { name: 'Why Use App', href: '#why-use-app', icon: <Star size={18} />, isSpecial: true },
      { name: 'Stay Updated', href: '#stay-updated', icon: <Bell size={18} />, isSpecial: true },
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
      { name: 'Features', href: '#features', icon: <Grid3X3 size={18} /> },
      { name: '360° Views', href: '#views360', icon: <MapPin size={18} /> },
      { name: 'Members', href: '#members', icon: <Users size={18} /> },
      { name: 'Announcements', href: '#important', icon: <Bell size={18} /> },
      { name: 'App Updates', href: '#app-updates', icon: <AlertTriangle size={18} /> }
    ]
  },
  {
    name: 'Community',
    items: [
      { name: 'Community Stories', href: '#community', icon: <Users size={18} />, isSpecial: true },
      { name: 'Business Directory', href: '#business', icon: <Map size={18} />, isSpecial: true },
      { name: 'Services', href: '#services', icon: <Phone size={18} />, isSpecial: true }
    ]
  }
];

const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  isAudioPlaying,
  setIsAudioPlaying,
  audioRef,
  onSectionChange,
  onAIAssistantOpen,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
      
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

  const handleHomeClick = () => {
    onSectionChange(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = (link: any) => {
    if (link.name === 'Home') {
      handleHomeClick();
    } else if (link.name === 'Features') {
      scrollToSection('#features');
    } else {
      scrollToSection(link.href);
    }
  };

  const handleNavItemClick = (item: any) => {
    if (item.isDeveloper) {
      setShowDeveloperModal(true);
      setIsMobileMenuOpen(false);
    } else if (item.isSpecial) {
      if (item.name === 'Why Use App') {
        onSectionChange('why-use-app');
      } else if (item.name === 'Stay Updated') {
        onSectionChange('stay-updated');
      } else if (item.name === 'Community Stories') {
        onSectionChange('community');
      } else if (item.name === 'Business Directory') {
        onSectionChange('business');
      } else if (item.name === 'Services') {
        onSectionChange('services');
      }
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(item.href);
    }
  };

  const handleAIAssistantClick = () => {
    if (onAIAssistantOpen) {
      onAIAssistantOpen();
    }
    setIsMobileMenuOpen(false);
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

  const navbarAnimations = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}
        initial="visible"
        animate={navbarVisible ? "visible" : "hidden"}
        variants={navbarAnimations}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <NavbarBrand onHomeClick={handleHomeClick} />

          <DesktopNavigation
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={toggleAudio}
            onAIAssistantClick={handleAIAssistantClick}
            onNavLinkClick={handleNavLinkClick}
            onNavItemClick={handleNavItemClick}
            mainNavLinks={mainNavLinks}
            dropdownNavLinks={dropdownNavLinks}
          />

          <MobileNavigation
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            isAudioPlaying={isAudioPlaying}
            onToggleAudio={toggleAudio}
            onAIAssistantClick={handleAIAssistantClick}
            onNavLinkClick={handleNavLinkClick}
            onNavItemClick={handleNavItemClick}
            mainNavLinks={mainNavLinks}
            dropdownNavLinks={dropdownNavLinks}
          />
        </div>

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

      <DeveloperModal 
        open={showDeveloperModal}
        onOpenChange={setShowDeveloperModal}
      />
    </>
  );
};

export default Navbar;
