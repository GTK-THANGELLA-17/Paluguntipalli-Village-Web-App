
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

const HeroActions = () => {
  const { t } = useTranslation();

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToEvents = useCallback(() => {
    const eventsSection = document.getElementById('main-events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.1 }}
    >
      <Button
        onClick={scrollToAbout}
        size="lg"
        className="bg-heritage hover:bg-heritage/90 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {t('hero.exploreButton')}
      </Button>
      <Button
        onClick={scrollToEvents}
        variant="outline"
        size="lg"
        className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-black px-8 py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
      >
        {t('hero.eventsButton')}
      </Button>
    </motion.div>
  );
};

export default HeroActions;
