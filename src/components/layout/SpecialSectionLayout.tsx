import React, { ReactNode } from 'react';
import LoadingScreen from "@/components/LoadingScreen";
import MainLayout from './MainLayout';

type ActiveSection = 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | 'live-streaming' | null;

interface SpecialSectionLayoutProps {
  children: ReactNode;
  loading: boolean;
  isAudioPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setIsAudioPlaying: (playing: boolean) => void;
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
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
        <div className="feature-detail-page pt-16 sm:pt-20 min-h-screen relative z-10">
          {activeSection === 'village-map' ? (
            <div>
              {React.cloneElement(children as React.ReactElement, { onBackToFeatures: handleBackToFeatures })}
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
