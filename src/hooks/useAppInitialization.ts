
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAppInitialization = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 100;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    const startTime = performance.now();
    
    // Optimize AOS initialization
    AOS.init({
      duration: 200, // Reduced for better performance
      once: true,
      mirror: false,
      easing: 'ease-out',
      offset: 20,
      disable: window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });

    // Optimize language initialization
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['en', 'te', 'hi'].includes(savedLanguage)) {
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
    document.documentElement.lang = i18n.language;
    
    // Optimized resource preloading
    const preloadCriticalResources = () => {
      const criticalImages = [
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=75&fm=webp',
        'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=75&fm=webp'
      ];
      
      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });
    };
    
    // Faster loading completion
    const loadTimer = setTimeout(() => {
      const loadTime = performance.now() - startTime;
      console.log(`App loaded in ${loadTime.toFixed(2)}ms`);
      setLoading(false);
      
      // Preload resources after initial load
      if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadCriticalResources);
      } else {
        setTimeout(preloadCriticalResources, 100);
      }
    }, 500); // Reduced from 1000ms

    // Optimized scroll listener with passive flag
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [i18n, handleScroll]);

  return { loading, isScrolled };
};
