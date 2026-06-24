
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";
import VideoPlayer from "./VideoPlayer";

const eventImages = [
  "/Festival Gallery/Image 1.JPG",
  "/Festival Gallery/Image 2.JPG",
  "/Festival Gallery/Image 3.JPG",
  "/Festival Gallery/Image 4.JPG",
  "/Festival Gallery/Image 5.jpg",  // lowercase
  "/Festival Gallery/Image 6.jpg",  // lowercase
  "/Festival Gallery/Image 7.jpg",  // lowercase
  "/Festival Gallery/Image 8.JPG",
  "/Festival Gallery/Image 9.JPG",
  "/Festival Gallery/Image 10.JPG",
  "/Festival Gallery/Image 11.JPG",
  "/Festival Gallery/Image 12.JPG",
  "/Festival Gallery/Image 13.jpg",  // lowercase
  "/Festival Gallery/Image 14.jpg",  // lowercase
  "/Festival Gallery/Image 15.JPG",
  "/Festival Gallery/Image 16.JPG",
  "/Festival Gallery/Image 17.JPG",
  "/Festival Gallery/Image 18.JPG",
  "/Festival Gallery/Image 19.JPG",
  "/Festival Gallery/Image 20.JPG",
  "/Festival Gallery/Image 21.JPG",
  "/Festival Gallery/Image 22.JPG",
  "/Festival Gallery/Image 23.JPG",
  "/Festival Gallery/Image 24.JPG",
  "/Festival Gallery/Image 25.JPG",
  "/Festival Gallery/Image 26.JPG",
  "/Festival Gallery/Image 27.JPG",
  "/Festival Gallery/Image 28.JPG"
];



const videoData = [
  {
    id: 1,
    title: "Pedda Sarigesu Festival Video 1",
    videoSrc: "/Festival Videos/Video 1.mp4",
    thumbnailSrc: "/Main Events Thumbnails/Video 1.jpg"
  },
  {
    id: 2,
    title: "Pedda Sarigesu Festival Video 2",
    videoSrc: "/Festival Videos/Video 2.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 2.jpg"
  },
  {
    id: 3,
    title: "Pedda Sarigesu Festival Video 3",
    videoSrc: "/Festival Videos/Video 3.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 3.jpg"
  },
  {
    id: 4,
    title: "Pedda Sarigesu Festival Video 4",
    videoSrc: "/Festival Videos/Video 4.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 4.jpg"
  },
  {
    id: 5,
    title: "Pedda Sarigesu Festival Video 5",
    videoSrc: "/Festival Videos/Video 5.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 5.jpg"
  },
  {
    id: 6,
    title: "Pedda Sarigesu Festival Video 6",
    videoSrc: "/Festival Videos/Video 6.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 6.jpg"
  },
  {
    id: 7,
    title: "Pedda Sarigesu Festival Video 7",
    videoSrc: "/Festival Videos/Video 7.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 7.jpg"
  },
  {
    id: 8,
    title: "Pedda Sarigesu Festival Video 8",
    videoSrc: "/Festival Videos/Video 8.mov",
    thumbnailSrc: "/Main Events Thumbnails/Video 8.jpg"
  },
  {
    id: 9,
    title: "Pedda Sarigesu Festival Video 9",
    videoSrc: "/Festival Videos/Video 9.mp4",
    thumbnailSrc: "/Main Events Thumbnails/Video 9.jpg"
  },
  {
    id: 10,
    title: "Pedda Sarigesu Festival Video 10",
    videoSrc: "/Festival Videos/Video 10.mp4",
    thumbnailSrc: "/Main Events Thumbnails/Video 10.jpg"
  },
  {
    id: 11,
    title: "Pedda Sarigesu Festival Video 11",
    videoSrc: "/Festival Videos/Video 11.mp4",
    thumbnailSrc: "/Main Events Thumbnails/Video 11.jpg"
  },
  {
    id: 12,
    title: "Pedda Sarigesu Festival Video 12",
    videoSrc: "/Festival Videos/Video 12.mp4",
    thumbnailSrc: "/Main Events Thumbnails/Video 12.jpg"
  },
  {
    id: 13,
    title: "Pedda Sarigesu Festival Video 13",
    videoSrc: "/Festival Videos/Video 13.mp4",
    thumbnailSrc: "/Main Events Thumbnails/Video 13.jpg"
  }
];



const Events = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoize navigation functions to prevent unnecessary re-renders
  const nextImage = useMemo(() => () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventImages.length);
  }, []);

  const prevImage = useMemo(() => () => {
    setCurrentImageIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length);
  }, []);

  // Optimize visible images calculation
  const visibleImages = useMemo(() => 
    showAllImages ? eventImages : eventImages.slice(0, 3),
    [showAllImages]
  );

  return (
    <section id="main-events" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Main Events
        </motion.h2>
        
        <motion.div 
          className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-center">
            <div className="w-full lg:w-1/3">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-heritage dark:border-white">
                <OptimizedImage
                  src={eventImages[currentImageIndex]}
                  alt={`Peerla Panduga Image ${currentImageIndex + 1}`}
                  className="w-full h-full"
                  priority={true}
                  showNavigationArrows={true}
                  onPrevious={prevImage}
                  onNext={nextImage}
                />
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-playfair text-[#000000] dark:text-white">Peerla Panduga</h3>
              <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-[#000000] dark:text-white">
                <strong>Peerla Panduga</strong> is the main event celebrated during every
                Moharam. The 2026 celebrations are taking place on June 25 to 26 with vibrant processions, religious rituals, and cultural
                performances that unite the community.
              </p>
              <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-[#000000] dark:text-white">
                This festival showcases the rich cultural heritage of Paluguntipalli and brings together 
                people from all walks of life. The festivities include traditional music, dance performances,
                and a grand procession through the village.
              </p>
              <Button className="bg-[#000000] hover:bg-[#333333] text-white dark:bg-[#000000] dark:hover:bg-[#333333] dark:text-white transition-all duration-300">
                <Calendar size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Festival Dates: June 25 to 26, 2026</span>
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.h3 
          className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center font-playfair text-[#000000] dark:text-white" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Peerla Panduga Images and Memories
        </motion.h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleImages.map((image, index) => (
            <motion.div 
              key={`image-${index}`}
              className="gallery-item relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <OptimizedImage
                src={image}
                alt={`Peerla Panduga Image ${index + 1}`}
                aspectRatio="aspect-[4/3]"
                className="rounded-lg w-full hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8">
          <Button 
            variant="outline" 
            onClick={() => setShowAllImages(!showAllImages)}
            className="border-2 bg-[#000000] text-white hover:bg-[#333333] dark:bg-[#000000] dark:text-white dark:border-white dark:hover:bg-[#333333] transition-all duration-300"
          >
            {showAllImages ? (
              <>
                <ChevronUp size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Show More</span>
              </>
            )}
          </Button>
        </div>
        
        <motion.h3 
          className="text-xl sm:text-2xl font-bold mt-12 sm:mt-16 mb-6 sm:mb-8 text-center font-playfair text-[#000000] dark:text-white" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Peerla Panduga Videos and Highlights
        </motion.h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videoData.map((video, index) => (
            <motion.div 
              key={`video-${video.id}`}
              className="gallery-item relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VideoPlayer
                videoSrc={video.videoSrc}
                thumbnailSrc={video.thumbnailSrc}
                title={video.title}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
