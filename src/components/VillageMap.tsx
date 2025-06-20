import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  ArrowLeft,
  AlertTriangle,
  Landmark,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const { t } = useTranslation();
  const [mapError, setMapError] = useState(false);

  const coords = "15.4808278,78.962409";
  const googleMapsPlaceUrl = `https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@${coords},15z`;

  const roadMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

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
              className="flex items-center gap-2 bg-transparent text-black dark:bg-black dark:text-white border-gray-400 dark:border-gray-600 hover:bg-heritage hover:text-white transition-colors"
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
              "Explore Paluguntipalli directly in Google Maps and get directions easily."
            )}
          </p>
        </motion.div>

        {/* Map + Fallback */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="rounded-xl overflow-hidden border-4 border-heritage shadow-xl aspect-video bg-white dark:bg-gray-800 relative">
            {!mapError ? (
              <iframe
                src={roadMapSrc}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Paluguntipalli Map"
                onError={() => setMapError(true)}
              />
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-center p-4">
                <AlertTriangle size={40} className="text-red-500 mb-4" />
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  {t("Map content is blocked or unavailable on this device.")}
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              ⚠️{" "}
              {t(
                "Note: If you can't see the map above, click below to open it directly in Google Maps."
              )}
            </p>
            <Button asChild className="mb-3">
              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2" size={18} />
                {t("Open in Google Maps")}
              </a>
            </Button>
            <Button onClick={handleDirectionsClick} className="ml-2">
              <Navigation className="mr-2" size={18} />
              {t("Get Directions")}
            </Button>
          </div>
        </div>

        {/* Extra Option Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild variant="secondary">
            <a
              href={`https://www.google.com/maps/search/nearby+places+Paluguntipalli`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Landmark className="mr-2" size={18} />
              {t("View Nearby Places")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VillageMap;
