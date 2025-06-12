import { useState } from 'react';
import { useTranslation } from "react-i18next";
import GalleryTabs from './gallery/GalleryTabs';
import GalleryGrid from './gallery/GalleryGrid';
import MediaViewer from './gallery/MediaViewer';
import { galleryData } from './gallery/galleryData';

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { t } = useTranslation();

  return (
    <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16">
          {t('Gallery', 'Gallery')}
        </h2>

        <div>
          <GalleryTabs 
            galleryData={galleryData}
            onItemSelect={setSelectedItem}
          />
        </div>

        <MediaViewer 
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </section>
  );
};

export default Gallery;
