
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, TrainFront } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

// Village attractions with proper Google Maps links
const villageAttractions = [
  {
    name: "Sri Peddaya Swamy Temple",
    description: "Ancient temple with historical significance and beautiful architecture",
    link: "https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4795123,78.9627302,42m/data=!3m1!1e3!4m6!3m5!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!8m2!3d15.4808278!4d78.962409!16s%2Fm%2F051xw63?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Kasinayana Temple.jpg",
    distance: "In village"
  },
  {
    name: "Peerla Chavidi",
    description: "Cultural landmark and festival venue where community celebrations happen",
    link: "https://www.google.com/maps/place/Peerla+Chavidi/@15.4798849,78.9622919,17z/data=!4m15!1m8!3m7!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!2sPaluguntipalli,+Andhra+Pradesh+523368!3b1!8m2!3d15.4808278!4d78.962409!16s%2Fm%2F051xw63!3m5!1s0x3bb4e16c6f66faed:0xf70656116ddb26a!8m2!3d15.4799415!4d78.9621971!16s%2Fg%2F11px3_fpg_?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Peerla chavidi 1.jpg",
    distance: "In village"
  },
  {
    name: "Hanuman Temple",
    description: "Religious site with impressive architecture and spiritual importance",
    link: "https://www.google.com/maps/place/Hanuman+temple/@15.4798849,78.9622919,17z/data=!4m15!1m8!3m7!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!2sPaluguntipalli,+Andhra+Pradesh+523368!3b1!8m2!3d15.4808278!4d78.962409!16s%2Fm%2F051xw63!3m5!1s0x3bb4e13972f894dd:0x7ad275cd67cda489!8m2!3d15.4792483!4d78.9637295!16s%2Fg%2F11ng1f2kwq?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Hanuman Statue.jpg",
    distance: "In village"
  },
  {
    name: "Village Square",
    description: "Central gathering place with traditional charm and cultural significance",
    link: "https://www.google.com/maps/place/Ramalayam/@15.479978,78.9621663,18.83z/data=!4m15!1m8!3m7!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!2sPaluguntipalli,+Andhra+Pradesh+523368!3b1!8m2!3d15.4808278!4d78.962409!16s%2Fm%2F051xw63!3m5!1s0x3bb4e1b7bf021981:0x8840ff075bc832ed!8m2!3d15.4800594!4d78.9624829!16s%2Fg%2F11ddzhs32h?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Temple .jpg",
    distance: "In village"
  },
{
    name: "PaalaRathi  Gundu , Water Tank",
    description: "Historic water reservoir that has served the village for generations",
    link: "https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4815925,78.9622207,158m/data=!3m1!1e3!4m6!3m5!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!8m2!3d15.4808278!4d78.962409!16s%2Fm%2F051xw63?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Water tank .jpg",
    distance: "In village"
  }

];

// Nearby places to visit with proper Google Maps links
const nearbyPlaces = [
  {
    name: "Giddalur Railway Station",
    description: "connecting to major cities. Serves as a transit hub for surrounding villages.",
    distance: "12 km From Pluguntipalli",
    link: "https://www.google.com/maps/place/Giddaluru+Railway+Station/@15.379469,78.9233687,634m/data=!3m1!1e3!4m10!1m2!2m1!1sgiddalur+railway+station!3m6!1s0x3bb4e427028c2da3:0x9743593fc6153a3b!8m2!3d15.3793268!4d78.9263358!15sChhnaWRkYWx1ciByYWlsd2F5IHN0YXRpb25aGiIYZ2lkZGFsdXIgcmFpbHdheSBzdGF0aW9ukgEKdHJhaW5feWFyZKoBVRABKhMiD3JhaWx3YXkgc3RhdGlvbigAMh4QASIaEPE7TflKcIVcG3cFncRvBkGLW11ITRI7VpUyHBACIhhnaWRkYWx1ciByYWlsd2F5IHN0YXRpb27gAQA!16s%2Fg%2F11f04d1_sg?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Giddalur Railway Station Board.png",
    icon: <TrainFront size={14} />
  },
  {
    name: "Rangaswamy Gundam",
    description: "",
    distance: "17 km From Pluguntipalli",
    link: "https://www.google.com/maps/place/Sri+Nemali+Gundla+Ranganayakaswamy+Temple/@15.5147678,78.8677641,190m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3bb51d6e5fa314c9:0x876c07ed15fa7ca3!2sRangaswamy+Gundam!8m2!3d15.5153118!4d78.8695807!16s%2Fg%2F1q62kkffn!3m5!1s0x3bb51d6f8753c2a7:0x87adba392bcef6e4!8m2!3d15.5148813!4d78.8685384!16s%2Fg%2F1tgnkjbz?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Rangaswamy Gundam.jpg"
  },
  {
    name: "Cumbum Cheruvu",
    description: " ",
    distance: "25 km From Pluguntipalli",
    link: "https://www.google.com/maps/place/CUMBUM+CHERUVU+alugu/@15.5907554,79.0811935,1266m/data=!3m1!1e3!4m10!1m2!2m1!1scumbum+cheruvu!3m6!1s0x3bb521b26c28cd6b:0xffdc9bfb4114f8e7!8m2!3d15.5907554!4d79.0902057!15sCg5jdW1idW0gY2hlcnV2dZIBEnRvdXJpc3RfYXR0cmFjdGlvbqoBQxABKgsiB2NoZXJ1dnUoADIeEAEiGqleTACV_mY4xbJ-iQlwhu5IgaQeGhSiTxGoMhIQAiIOY3VtYnVtIGNoZXJ1dnXgAQA!16s%2Fg%2F11r2j83dkb?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Cumbum Lake.png"
  },
  {
    name: "Kasinayana Ashramam, Jyothi",
    description: "",
    distance: "30 km From Pluguntipalli",
    link: "https://www.google.com/maps/place/Kasinayana+Ashramam,+Jyothi/@15.0609535,78.7938688,167m/data=!3m1!1e3!4m14!1m7!3m6!1s0x3bb48db4dc96ee31:0xdbb2f83093a2f3a5!2sKasinayana+Ashramam,+Jyothi!8m2!3d15.0611529!4d78.7939061!16s%2Fg%2F1w6r6qpr!3m5!1s0x3bb48db4dc96ee31:0xdbb2f83093a2f3a5!8m2!3d15.0611529!4d78.7939061!16s%2Fg%2F1w6r6qpr?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Kasinayana Ashramam.jpg"
  },
  {
    name: "Brahmamgari Matham",
    description: "",
    distance: "22 km From Pluguntipalli",
    link: "https://www.google.com/maps/place/Sri+Achalananda+Swamy+Mandiram/@14.8548771,78.8704599,1089m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3bb49b7c97db3d17:0xa6caf9e02027a32c!2sBrahmamgari+Matam,+Palugurallapalle+Part+IV,+Andhra+Pradesh+516503!3b1!8m2!3d14.8590686!4d78.8734029!16s%2Fm%2F02r8svd!3m5!1s0x3bb49b7da7947393:0x2773108738193962!8m2!3d14.8563508!4d78.8751211!16s%2Fg%2F11hbt2hz7m?entry=ttu&g_ep=EgoyMDI1MDUwMy4wIKXMDSoASAFQAw%3D%3D",
    image: "/Brahmamgari Matham.png"
  }
];

const NearbyAttractions = () => {
  const { t } = useTranslation();
  const [activePlace, setActivePlace] = useState<number | null>(0);
  const [activeVillagePlace, setActiveVillagePlace] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'village' | 'nearby'>('village');
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="places" className="py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
       <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16">
  {t("Places to Visit")}
</h2>

        
        {/* Tabs for switching between Village and Nearby attractions */}
        <div className="flex justify-center mb-10">
          <div className="flex p-1 rounded-full bg-gray-100 dark:bg-[#222222]">
            <button
              onClick={() => setActiveTab('village')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'village' 
                  ? 'bg-heritage text-white dark:bg-[#000000] dark:text-white shadow-md' 
                  : 'text-[#000000] dark:text-white hover:bg-gray-200 dark:hover:bg-[#333333]'
              }`}
            >
              <span className="text-sm md:text-base">{t("Village Attractions")}</span>
            </button>
            <button
              onClick={() => setActiveTab('nearby')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'nearby' 
                  ? 'bg-heritage text-white dark:bg-[#000000] dark:text-white shadow-md' 
                  : 'text-[#000000] dark:text-white hover:bg-gray-200 dark:hover:bg-[#333333]'
              }`}
            >
              <span className="text-sm md:text-base">{t("Nearby Places")}</span>
            </button>
          </div>
        </div>
        
        {/* Places List - Shows different content based on active tab */}
        {activeTab === 'village' ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {villageAttractions.map((place, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setActiveVillagePlace(index)}
                className={`relative group overflow-hidden rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  activeVillagePlace === index ? "ring-2 ring-green-500 dark:ring-white" : ""
                }`}
              >
                {/* Background image with enhanced hover animation */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={place.image} 
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                
                {/* Content overlay with improved animations */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 group-hover:translate-y-0">
                  <h4 className="text-xl font-semibold text-white mb-1 group-hover:translate-y-0 transition-transform duration-300">{t(place.name)}</h4>
                  <p className="text-gray-300 text-sm mb-2 transform transition-all duration-300 opacity-90 group-hover:opacity-100">{t(place.description)}</p>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="custom"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(place.link, '_blank');
                      }}
                      className="text-xs bg-[#000000] text-white hover:bg-[#333333] dark:bg-[#000000] dark:text-white"
                    >
                      <MapPin size={12} /> 
                      {t("Google Maps")}
                    </Button>
                    <a 
                      href={place.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 dark:text-white hover:text-green-300 transition-colors transform hover:scale-125 hover:rotate-12 transition-transform duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <>
            {/* Featured Railway Station Card */}
            {!isMobile && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10 bg-white dark:bg-[#1D1D1D] rounded-lg overflow-hidden shadow-lg"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img 
                      src="/Giddalur Railway Station.png" 
                      alt="Giddalur Railway Station" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-2">
                      <TrainFront className="mr-2 text-heritage dark:text-blue-400" size={24} />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Giddalur Railway Station</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Giddalur Railway Station is an important transit hub located 12km from Paluguntipalli. It serves as 
                      the main railway connection for several surrounding villages, providing essential transportation links 
                      to major cities and towns across the region. The station features both passenger and express train services 
                      with daily connections to Hyderabad, Chennai, and Bengaluru.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-xs font-medium">Distance: 12km</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-xs font-medium">Daily Trains: 8+</span>
                      <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 rounded-full text-xs font-medium">Amenities Available</span>
                    </div>
                    <Button 
                      onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Giddalur+Railway+Station", "_blank")}
                      className="mt-2 bg-heritage text-white hover:bg-opacity-90 dark:bg-blue-600 dark:hover:bg-blue-700 w-fit"
                    >
                      <MapPin size={16} className="mr-2" /> View on Map
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {nearbyPlaces.map((place, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onMouseEnter={() => setActivePlace(index)}
                  className={`relative group overflow-hidden rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                    activePlace === index ? "ring-2 ring-green-500 dark:ring-white" : ""
                  }`}
                >
                  {/* Background image with enhanced hover animation */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content overlay with improved animations */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end transform transition-all duration-300 group-hover:translate-y-0">
                    <h4 className="text-xl font-semibold text-white mb-1 group-hover:translate-y-0 transition-transform duration-300">
                      {place.icon && <span className="mr-1.5 inline-block">{place.icon}</span>}
                      {t(place.name)}
                    </h4>
                    <p className="text-gray-300 text-sm mb-2 transform transition-all duration-300 opacity-90 group-hover:opacity-100">{t(place.description)}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-white">
                        <MapPin size={14} className="text-green-400 dark:text-white mr-1" />
                        <span>{place.distance}</span>
                      </div>
                      <Button 
                        variant="custom"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(place.link, '_blank');
                        }}
                        className="text-xs bg-[#000000] text-white hover:bg-[#333333] dark:bg-[#000000] dark:text-white"
                      >
                        {t("Google Maps")}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default NearbyAttractions;
