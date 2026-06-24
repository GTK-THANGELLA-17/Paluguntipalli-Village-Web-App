import React, { ReactNode } from 'react';
import LoadingScreen from "@/components/LoadingScreen";
import MainLayout from '@/components/layout/MainLayout';

interface SpecialSectionLayoutProps {
  children: ReactNode;
  loading: boolean;
  isAudioPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setIsAudioPlaying: (playing: boolean) => void;
  activeSection: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | 'live-streaming' | null;
  onSectionChange: (section: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | 'live-streaming' | null) => void;
}

const SpecialSectionLayout: React.FC<SpecialSectionLayoutProps> = ({
  children,
  loading,
  isAudioPlaying,
  audioRef,
  setIsAudioPlaying,
  activeSection,
  onSectionChange
}) => {
  const handleBackToFeatures = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSectionChange(null);
  };

  return (
    <>
      {loading && <LoadingScreen />}
      <MainLayout
        loading={loading}
        isScrolled={true}
        isAudioPlaying={isAudioPlaying}
        audioRef={audioRef}
        setIsAudioPlaying={setIsAudioPlaying}
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      >
        <div className="pt-20 min-h-screen relative z-10">
          {/* Pass onBackToFeatures prop to VillageMap if it's the active section */}
          {activeSection === 'village-map' ? (
            <div>
              {React.cloneElement(children as React.ReactElement<{ onBackToFeatures?: () => void }>, { onBackToFeatures: handleBackToFeatures })}
            </div>
          ) : (
            children
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default SpecialSectionLayout;


