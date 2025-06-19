import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Satellite,
  Map as MapIcon,
  Navigation,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const { t } = useTranslation();
  const [mapView, setMapView] = useState<"road" | "satellite">("road");
  const [mapBlocked, setMapBlocked] = useState(false);

  const coords = "15.4808278,78.962409";
  const googleMapsUrl = `https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@${coords},15z`;

  const roadMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

  const satelliteMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli!5e1!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setMapBlocked(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userDirections = `https://www.google.com/maps/dir/${latitude},${longitude}/${coords}`;
          window.open(userDirections, "_blank");
        },
        () => {
          window.open(`https://www.google.com/maps/dir//${coords}`, "_blank");
        }
      );
    } else {
      window.open(`https://www.google.com/maps/dir//${coords}`, "_blank");
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        {/* Back to Features */}
        {onBackToFeatures && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                onBackToFeatures();
              }}
              variant="outline"
              className="flex items-center gap-2 bg-transparent text-black dark:text-white dark:bg-black border-gray-400 dark:border-gray-600 hover:bg-heritage hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              {t("Back to Features")}
            </Button>
          </motion.div>
        )}

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-heritage mr-3" size={36} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair text-black dark:text-white">
              {t("Village Map")}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Explore Paluguntipalli through interactive maps with road and satellite views."
            )}
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Toggle */}
          <div className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg h-fit">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-center lg:text-left">
                {t("Map View")}
              </h3>
              <div className="flex lg:flex-col gap-2">
                <Button
                  variant={mapView === "road" ? "default" : "ghost"}
                  onClick={() => {
                    setMapView("road");
                    setMapBlocked(window.innerWidth <= 768);
                  }}
                  className={`${
                    mapView === "road"
                      ? "bg-heritage text-white"
                      : "text-gray-600 dark:text-gray-300"
                  } w-full justify-start`}
                >
                  <MapIcon className="mr-2" size={16} />
                  {t("Road View")}
                </Button>
                <Button
                  variant={mapView === "satellite" ? "default" : "ghost"}
                  onClick={() => {
                    setMapView("satellite");
                    setMapBlocked(window.innerWidth <= 768);
                  }}
                  className={`${
                    mapView === "satellite"
                      ? "bg-heritage text-white"
                      : "text-gray-600 dark:text-gray-300"
                  } w-full justify-start`}
                >
                  <Satellite className="mr-2" size={16} />
                  {t("Satellite View")}
                </Button>
              </div>
            </div>
          </div>

          {/* Map + fallback + Note + Button */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border-4 border-heritage shadow-xl aspect-video bg-white dark:bg-gray-800 relative">
              {!mapBlocked ? (
                <iframe
                  src={mapView === "road" ? roadMapSrc : satelliteMapSrc}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title={`Paluguntipalli ${mapView}`}
                  onError={() => setMapBlocked(true)}
                />
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center p-4">
                  <AlertTriangle size={40} className="text-red-500 mb-4" />
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    {t(
                      "Map content is blocked or unavailable on this device."
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Always show note + button below the map */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                ⚠️ {t(
                  "Note: If you can't see the map above (common on mobile), click below to open it directly in Google Maps."
                )}
              </p>
              <Button asChild>
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2" size={18} />
                  {t("Open in Google Maps")}
                </a>
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <h3 className="flex items-center mb-2 font-bold text-gray-800 dark:text-white">
                <MapPin className="text-heritage mr-2" size={20} />
                Paluguntipalli
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AP 523368, India • {coords}
              </p>
            </div>
          </div>
        </div>

        {/* Cards below map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <MapIcon className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t('Interactive Navigation')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('Zoom, pan, and explore every corner of our village')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <Satellite className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t('Satellite Imagery')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('View detailed aerial images of village landmarks')}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <Navigation className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t('Directions')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {t('Get directions to reach Paluguntipalli easily')}
            </p>
            <Button onClick={handleDirectionsClick} className="hero-button group mx-auto inline-flex items-center">
              <Navigation size={18} className="mr-2 group-hover:animate-bounce" />
              {t('Get Directions')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VillageMap;
