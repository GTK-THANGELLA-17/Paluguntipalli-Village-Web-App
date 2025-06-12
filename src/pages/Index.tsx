import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Events from "@/components/Events";
import Weather from "@/components/Weather";
import Views360 from "@/components/Views360";
import Members from "@/components/Members";
import Announcements from "@/components/Announcements";
import Footer from "@/components/Footer";
import PlacesToVisit from "@/components/PlacesToVisit";
import LoadingScreen from "@/components/LoadingScreen";
import ContactForm from "@/components/ContactForm";
import TodaysEvents from "@/components/TodaysEvents";
import WhyUseApp from "@/components/WhyUseApp";
import ApplicationUpdates from "@/components/ApplicationUpdates";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import ScrollToTop from "@/components/ScrollToTop";
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/Bgm Sounds.mp3');
    audio.loop = true;
    audio.volume = 0.1;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.log('Auto-play prevented by browser');
      }
    };

    if (!loading) {
      playAudio();
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 0;
          setIsScrolled(scrolled);

          if (audioRef.current) {
            if (scrolled && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsAudioPlaying(false);
            } else if (!scrolled && audioRef.current.paused && !isAudioPlaying) {
              audioRef.current.play().then(() => {
                setIsAudioPlaying(true);
              }).catch(() => {
                console.log('Playback prevented at top');
              });
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled, loading]);

  useEffect(() => {
    const startTime = performance.now();
    const loadTimer = setTimeout(() => {
      const loadTime = performance.now() - startTime;
      console.log(`App loaded in ${loadTime.toFixed(2)}ms`);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
      mirror: false,
      easing: 'ease-out-cubic',
      offset: 20,
      disable: window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });

    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && ['en', 'te', 'hi'].includes(savedLanguage)) {
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
    document.documentElement.lang = i18n.language;

    const preloadCriticalResources = () => {
      const criticalImages = [
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80&fm=webp',
        'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80&fm=webp'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    if (!loading) {
      requestIdleCallback(preloadCriticalResources);
    }
  }, [i18n, loading]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {loading && <LoadingScreen />}

      <Navbar isAudioPlaying={isAudioPlaying} audioRef={audioRef} setIsAudioPlaying={setIsAudioPlaying} />
      <DateTimeDisplay isScrolled={isScrolled} />

      <Hero />
      <About />
      <Gallery />
      <TodaysEvents />
      <Events />
      <Weather />
      <PlacesToVisit />
      <ApplicationUpdates />
      <WhyUseApp />
      <Views360 />
      <Members />
      <Announcements />

      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <div className="max-w-7xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
