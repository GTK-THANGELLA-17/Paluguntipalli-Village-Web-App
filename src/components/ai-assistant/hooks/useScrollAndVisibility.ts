
import { useState, useEffect } from 'react';

export const useScrollAndVisibility = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const aboutSection = document.getElementById('about');
      
      setIsScrolled(scrollTop > 100);
      
      if (aboutSection) {
        const aboutSectionTop = aboutSection.offsetTop;
        const aboutSectionHeight = aboutSection.offsetHeight;
        const isAboutSectionPastViewport = scrollTop > aboutSectionTop + aboutSectionHeight;
        setShowAssistant(!isAboutSectionPastViewport);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled, showAssistant };
};
