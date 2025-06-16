
import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Gallery from "@/components/Gallery";
import TodaysEvents from "@/components/TodaysEvents";
import PlacesToVisit from "@/components/PlacesToVisit";
import Events from "@/components/Events";
import Weather from "@/components/Weather";
import Views360 from "@/components/Views360";
import Members from "@/components/Members";
import Announcements from "@/components/Announcements";
import ApplicationUpdates from "@/components/ApplicationUpdates";

interface MainContentProps {
  onSectionChange: (section: 'quiz' | 'community' | 'business' | 'services' | 'why-use-app' | 'stay-updated' | 'village-map' | 'app-suggestions' | null) => void;
  onAIAssistantOpen?: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ 
  onSectionChange,
  onAIAssistantOpen 
}) => {
  console.log('MainContent received onAIAssistantOpen:', !!onAIAssistantOpen);
  
  return (
    <>
      <Hero />
      <About />
      <FeaturesShowcase 
        onSectionChange={onSectionChange}
        onAIAssistantOpen={onAIAssistantOpen}
      />
      <Gallery />
      <TodaysEvents />
      <PlacesToVisit />
      <Events />
      <Weather />
      <Views360 />
      <Members />
      <Announcements />
      <ApplicationUpdates />
    </>
  );
};

export default MainContent;
