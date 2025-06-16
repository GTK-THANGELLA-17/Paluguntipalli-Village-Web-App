
import { useState } from 'react';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import GalleryTabs from './gallery/GalleryTabs';
import MediaViewer from './gallery/MediaViewer';
import { galleryData } from './gallery/galleryData';

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  
  const handleItemSelect = (item: any) => {
    setIsLoading(true);
    setSelectedItem(item);
    // Simulate loading time for better UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsLoading(false);
  };
  
  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 font-playfair text-[#000000] dark:text-white" 
          data-aos="fade-up"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('Gallery', 'Heritage Gallery')}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GalleryTabs 
            galleryData={galleryData}
            onItemSelect={handleItemSelect}
            isLoading={isLoading}
          />
        </motion.div>

        <MediaViewer 
          selectedItem={selectedItem}
          onClose={handleClose}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default Gallery;
