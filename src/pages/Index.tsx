
import { useState, useCallback, useMemo } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import DailyQuiz from "@/components/DailyQuiz";
import LocalBusiness from "@/components/LocalBusiness";
import CommunityStories from "@/components/CommunityStories";
import NeedServices from "@/components/NeedServices";
import WhyUseAppSection from "@/components/WhyUseAppSection";
import StayUpdated from "@/components/StayUpdated";
import VillageMap from "@/components/VillageMap";
import ApplicationSuggestions from "@/components/ApplicationSuggestions";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import MainContent from "@/components/sections/MainContent";
import MainLayout from "@/components/layout/MainLayout";
import SpecialSectionLayout from "@/components/layout/SpecialSectionLayout";
import { useAppInitialization } from "@/hooks/useAppInitialization";
import { useAudioManager } from "@/hooks/useAudioManager";
import { motion } from 'framer-motion';

const Index = () => {
  const [activeSection, setActiveSection] = useState<'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const { loading, isScrolled } = useAppInitialization();
  const { audioRef, isAudioPlaying, setIsAudioPlaying } = useAudioManager(loading, isScrolled);

  // Memoized callback to prevent recreation on every render
  const handleAIAssistantOpen = useCallback(() => {
    if (!isAIAssistantOpen) {
      console.log('Index handleAIAssistantOpen called - setting state to true');
      setIsAIAssistantOpen(true);
    }
  }, [isAIAssistantOpen]);

  // Memoized section change handler
  const handleSectionChange = useCallback((section: typeof activeSection) => {
    setActiveSection(section);
  }, []);

  // Memoized close handlers for each section
  const handleCloseSection = useCallback(() => setActiveSection(null), []);

  // Memoized special section props to prevent recreation
  const specialSectionProps = useMemo(() => ({
    loading,
    isAudioPlaying,
    audioRef,
    setIsAudioPlaying,
    activeSection,
    onSectionChange: handleSectionChange
  }), [loading, isAudioPlaying, audioRef, setIsAudioPlaying, activeSection, handleSectionChange]);

  // Special section renders with optimized props
  if (activeSection === 'village-map') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <VillageMap />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'app-suggestions') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <ApplicationSuggestions onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'quiz') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <DailyQuiz onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'community') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <CommunityStories onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'business') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <LocalBusiness onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'services') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <NeedServices onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'stay-updated') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <StayUpdated onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
  }

  if (activeSection === 'why-use-app') {
    return (
      <SpecialSectionLayout {...specialSectionProps}>
        <WhyUseAppSection onClose={handleCloseSection} />
      </SpecialSectionLayout>
    );
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
      </MainLayout>
    </>
  );
};

export default Index;
