import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, Sparkles, Film, Camera, ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GalleryGrid from './GalleryGrid';

interface GalleryTabsProps {
  galleryData: any;
  onItemSelect: (item: any) => void;
  isLoading?: boolean;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({ galleryData, onItemSelect, isLoading = false }) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  const tabData = [
    {
      value: "village",
      label: t('Village', 'Village'),
      icon: <Map size={20} />,
      count: galleryData.village?.length || 0,
      color: "emerald",
      bgColor: "from-emerald-500 to-green-600"
    },
    {
      value: "festival",
      label: t('Festival', 'Festival'),
      icon: <Sparkles size={20} />,
      count: galleryData.festival?.length || 0,
      color: "purple",
      bgColor: "from-purple-500 to-pink-600"
    },
    {
      value: "videos",
      label: t('Videos', 'Videos'),
      icon: <Film size={20} />,
      count: galleryData.videos?.length || 0,
      color: "blue",
      bgColor: "from-blue-500 to-cyan-600"
    },
    {
      value: "heritage",
      label: t('Heritage', 'Heritage'),
      icon: <Camera size={20} />,
      count: galleryData.heritage?.length || 0,
      color: "amber",
      bgColor: "from-amber-500 to-orange-600"
    }
  ];

  // Scroll to tab content when a tab is clicked
  const handleTabChange = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Tabs defaultValue="village" onValueChange={handleTabChange} className="w-full">
        <motion.div 
          className="flex justify-center mb-6 sm:mb-8 lg:mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 w-full max-w-6xl px-2 sm:px-4 bg-transparent h-auto">
            {tabData.map((tab, index) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className="p-0 h-auto bg-transparent border-0 data-[state=active]:bg-transparent group cursor-pointer w-full"
                disabled={isLoading}
              >
                <motion.div
                  className="w-full"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${tab.bgColor} p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20 backdrop-blur-sm`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    <div className="relative z-10 text-white">
                      <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                        <motion.div 
                          className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm"
                          whileHover={{ rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {tab.icon}
                        </motion.div>
                        <motion.div 
                          className="bg-white/30 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 * index, type: "spring" }}
                        >
                          {tab.count}
                        </motion.div>
                      </div>
                      
                      <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-1">{tab.label}</h3>
                      <p className="text-white/80 text-xs sm:text-sm">
                        {tab.count} {tab.count === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </motion.div>
              </TabsTrigger>
            ))}
          </TabsList>
        </motion.div>

        <div ref={contentRef}>
          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
              >
                {galleryData[tab.value] && galleryData[tab.value].length > 0 ? (
                  <GalleryGrid 
                    items={galleryData[tab.value]} 
                    onItemSelect={onItemSelect}
                    isLoading={isLoading}
                  />
                ) : (
                  <motion.div 
                    className="text-center py-12 sm:py-16 lg:py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-6xl sm:text-8xl mb-4 sm:mb-6 opacity-40">
                      <ImageIcon size={60} className="mx-auto text-gray-400 sm:w-20 sm:h-20" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2 px-4">
                      No {tab.label.toLowerCase()} available
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500 px-4">
                      Check back later for new {tab.label.toLowerCase()} content
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </motion.div>
  );
};

export default GalleryTabs;
