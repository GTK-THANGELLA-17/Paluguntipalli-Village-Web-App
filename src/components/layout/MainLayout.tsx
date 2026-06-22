
import { ReactNode, useState } from 'react';
import Navbar from "@/components/Navbar";
import DateTimeDisplay from "@/components/DateTimeDisplay";
import ScrollToTop from "@/components/ScrollToTop";
import AIAssistant from "@/components/AIAssistant";

interface MainLayoutProps {
  children: ReactNode;
  loading: boolean;
  isScrolled: boolean;
  isAudioPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setIsAudioPlaying: (playing: boolean) => void;
  activeSection: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | 'live-streaming' | null;
  onSectionChange: (section: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | 'live-streaming' | null) => void;
  isAIAssistantOpen?: boolean;
  onAIAssistantOpenChange?: (open: boolean) => void;
  onAIAssistantOpen?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  loading,
  isScrolled,
  isAudioPlaying,
  audioRef,
  setIsAudioPlaying,
  activeSection,
  onSectionChange,
  isAIAssistantOpen,
  onAIAssistantOpenChange,
  onAIAssistantOpen
}) => {
  const handleAIAssistantOpen = () => {
    if (onAIAssistantOpen) {
      onAIAssistantOpen();
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar 
        isScrolled={isScrolled}
        isAudioPlaying={isAudioPlaying} 
        audioRef={audioRef} 
        setIsAudioPlaying={setIsAudioPlaying}
        onSectionChange={onSectionChange}
        onAIAssistantOpen={handleAIAssistantOpen}
      />
      <DateTimeDisplay isScrolled={isScrolled} />
      {children}
      <ScrollToTop />
      <AIAssistant 
        isOpen={isAIAssistantOpen}
        onOpenChange={onAIAssistantOpenChange}
        onSectionChange={onSectionChange}
      />
    </div>
  );
};

export default MainLayout;
