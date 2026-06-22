import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAppInitialization = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const startTime = performance.now();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    AOS.init({
      duration: 180,
      once: true,
      mirror: false,
      easing: 'ease-out',
      offset: 20,
      disable: window.innerWidth < 768 || prefersReducedMotion,
    });

    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['en', 'te', 'hi'].includes(savedLanguage) && i18n.language !== savedLanguage) {
      void i18n.changeLanguage(savedLanguage);
    }
    document.documentElement.lang = i18n.language;

    const loadTimer = setTimeout(() => {
      if (import.meta.env.DEV) {
        const loadTime = performance.now() - startTime;
        console.log(`App loaded in ${loadTime.toFixed(2)}ms`);
      }
      setLoading(false);
    }, 250);

    let ticking = false;
    const throttledHandleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 100;
        setIsScrolled(previous => previous === scrolled ? previous : scrolled);
        ticking = false;
      });
    };

    throttledHandleScroll();
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      clearTimeout(loadTimer);
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [i18n]);

  return { loading, isScrolled };
};
