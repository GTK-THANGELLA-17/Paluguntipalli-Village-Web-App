
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video } from "lucide-react";
import { useTranslation } from "react-i18next";
import GalleryGrid from './GalleryGrid';

interface GalleryTabsProps {
  galleryData: any;
  onItemSelect: (item: any) => void;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({ galleryData, onItemSelect }) => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="village" className="w-full" data-aos="fade-up" data-aos-delay="100">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 sm:mb-12 bg-white/80 dark:bg-[#333333]/80 backdrop-blur-sm h-auto shadow-lg border border-heritage/20">
        <TabsTrigger value="village" className="text-xs sm:text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white py-3 px-2 transition-all duration-300">
          <Image size={16} className="mr-1 sm:mr-2 hidden sm:inline w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <span className="truncate">{t('Village', 'Village')}</span>
        </TabsTrigger>
        <TabsTrigger value="festival" className="text-xs sm:text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white py-3 px-2 transition-all duration-300">
          <Image size={16} className="mr-1 sm:mr-2 hidden sm:inline w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <span className="truncate">{t('Festival', 'Festival')}</span>
        </TabsTrigger>
        <TabsTrigger value="videos" className="text-xs sm:text-sm md:text-base text-[#000000] dark:text-white data-[state=active]:bg-heritage data-[state=active]:text-white py-3 px-2 transition-all duration-300">
          <Video size={16} className="mr-1 sm:mr-2 hidden sm:inline w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          <span className="truncate">{t('Videos', 'Videos')}</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="village" id="village-gallery">
        <GalleryGrid items={galleryData.village} onItemSelect={onItemSelect} />
      </TabsContent>
      
      <TabsContent value="festival">
        <GalleryGrid items={galleryData.festival} onItemSelect={onItemSelect} />
      </TabsContent>
      
      <TabsContent value="videos">
        <GalleryGrid items={galleryData.videos} onItemSelect={onItemSelect} />
      </TabsContent>
    </Tabs>
  );
};

export default GalleryTabs;
