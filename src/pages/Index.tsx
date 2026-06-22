import { lazy, Suspense, useEffect, useRef, useState, useCallback, useMemo, type ReactNode } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import MainContent from "@/components/sections/MainContent";
import MainLayout from "@/components/layout/MainLayout";
import SpecialSectionLayout from "@/components/layout/SpecialSectionLayout";
import { useAppInitialization } from "@/hooks/useAppInitialization";
import { useAudioManager } from "@/hooks/useAudioManager";
import { motion } from 'framer-motion';

const DailyQuiz = lazy(() => import("@/components/DailyQuiz"));
const LocalBusiness = lazy(() => import("@/components/LocalBusiness"));
const CommunityStories = lazy(() => import("@/components/CommunityStories"));
const NeedServices = lazy(() => import("@/components/NeedServices"));
const WhyUseAppSection = lazy(() => import("@/components/WhyUseAppSection"));
const StayUpdated = lazy(() => import("@/components/StayUpdated"));
const VillageMap = lazy(() => import("@/components/VillageMap"));
const ApplicationSuggestions = lazy(() => import("@/components/ApplicationSuggestions"));
const LiveStreaming = lazy(() => import("@/components/LiveStreaming"));

type ActiveSection = 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | 'live-streaming' | null;

const Index = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const shouldReturnToFeatures = useRef(false);
  const { loading, isScrolled } = useAppInitialization();
  const { audioRef, isAudioPlaying, setIsAudioPlaying } = useAudioManager(loading, isScrolled);

  const handleAIAssistantOpen = useCallback(() => {
    setIsAIAssistantOpen(true);
  }, []);

  const handleSectionChange = useCallback((section: ActiveSection) => {
    shouldReturnToFeatures.current = section === null;
    setActiveSection(section);
  }, []);

  const handleCloseSection = useCallback(() => {
    shouldReturnToFeatures.current = true;
    setActiveSection(null);
  }, []);

  useEffect(() => {
    if (activeSection !== null || !shouldReturnToFeatures.current) return;

    const scrollFrame = requestAnimationFrame(() => {
      document.getElementById('features')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      shouldReturnToFeatures.current = false;
    });

    return () => cancelAnimationFrame(scrollFrame);
  }, [activeSection]);

  const specialSectionProps = useMemo(() => ({
    loading,
    isAudioPlaying,
    audioRef,
    setIsAudioPlaying,
    activeSection,
    onSectionChange: handleSectionChange
  }), [loading, isAudioPlaying, audioRef, setIsAudioPlaying, activeSection, handleSectionChange]);

  const renderSpecialSection = useCallback((children: ReactNode) => (
    <SpecialSectionLayout {...specialSectionProps}>
      <Suspense fallback={<LoadingScreen />}>
        {children}
      </Suspense>
    </SpecialSectionLayout>
  ), [specialSectionProps]);

  if (activeSection === 'village-map') {
    return renderSpecialSection(<VillageMap onBackToFeatures={handleCloseSection} />);
  }

  if (activeSection === 'live-streaming') {
    return renderSpecialSection(<LiveStreaming onClose={handleCloseSection} />);
  }

  if (activeSection === 'app-suggestions') {
    return renderSpecialSection(<ApplicationSuggestions onClose={handleCloseSection} />);
  }

  if (activeSection === 'quiz') {
    return renderSpecialSection(<DailyQuiz onClose={handleCloseSection} />);
  }

  if (activeSection === 'community') {
    return renderSpecialSection(<CommunityStories onClose={handleCloseSection} />);
  }

  if (activeSection === 'business') {
    return renderSpecialSection(<LocalBusiness onClose={handleCloseSection} />);
  }

  if (activeSection === 'services') {
    return renderSpecialSection(<NeedServices onClose={handleCloseSection} />);
  }

  if (activeSection === 'stay-updated') {
    return renderSpecialSection(<StayUpdated onClose={handleCloseSection} />);
  }

  if (activeSection === 'why-use-app') {
    return renderSpecialSection(<WhyUseAppSection onClose={handleCloseSection} />);
  }

  return (
    <>
      {loading && <LoadingScreen />}
      
      <MainLayout
        loading={loading}
        isScrolled={isScrolled}
        isAudioPlaying={isAudioPlaying}
        audioRef={audioRef}
        setIsAudioPlaying={setIsAudioPlaying}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isAIAssistantOpen={isAIAssistantOpen}
        onAIAssistantOpenChange={setIsAIAssistantOpen}
        onAIAssistantOpen={handleAIAssistantOpen}
      >
        <MainContent 
          onSectionChange={handleSectionChange} 
          onAIAssistantOpen={handleAIAssistantOpen}
        />
        
        <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="section-title text-[#000000] dark:text-white"
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
      </MainLayout>
    </>
  );
};

export default Index;
