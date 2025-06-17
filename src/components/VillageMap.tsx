import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Satellite,
  Map as MapIcon,
  Navigation,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const { t } = useTranslation();
  const [mapView, setMapView] = useState<"road" | "satellite">("road");

  const roadMapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli%2C%20Andhra%20Pradesh%20523368!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin";

  const satelliteMapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli%2C%20Andhra%20Pradesh%20523368!5e1!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin";

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const destination = "15.4808278,78.962409";
          const directionsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}`;
          window.open(directionsUrl, "_blank");
        },
        () => {
          const fallbackUrl = `https://www.google.com/maps/dir//15.4808278,78.962409`;
          window.open(fallbackUrl, "_blank");
        }
      );
    } else {
      const fallbackUrl = `https://www.google.com/maps/dir//15.4808278,78.962409`;
      window.open(fallbackUrl, "_blank");
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        {onBackToFeatures && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Button
              onClick={onBackToFeatures}
              variant="outline"
              className="flex items-center gap-2 hover:bg-heritage hover:text-white text-black dark:text-black"
            >
              <ArrowLeft size={16} />
              Back to Features
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-heritage mr-3" size={36} />
            <h2 className="text-4xl font-bold font-playfair text-[#000000] dark:text-white">
              {t("Village Map", "Village Map")}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Explore Paluguntipalli through interactive maps with road and satellite views",
              "Explore Paluguntipalli through interactive maps with road and satellite views"
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-center lg:text-left">
                Map View
              </h3>
              <div className="flex lg:flex-col gap-2">
                <Button
                  variant={mapView === "road" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMapView("road")}
                  className={`${
                    mapView === "road"
                      ? "bg-heritage text-white"
                      : "text-gray-600 dark:text-gray-300"
                  } w-full justify-start`}
                >
                  <MapIcon size={16} className="mr-2" />
                  Road View
                </Button>
                <Button
                  variant={mapView === "satellite" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMapView("satellite")}
                  className={`${
                    mapView === "satellite"
                      ? "bg-heritage text-white"
                      : "text-gray-600 dark:text-gray-300"
                  } w-full justify-start`}
                >
                  <Satellite size={16} className="mr-2" />
                  Satellite View
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative w-full rounded-2xl overflow-hidden border-4 border-heritage shadow-2xl bg-white dark:bg-black">
              <div className="relative w-full" style={{ paddingTop: "75%", minHeight: "400px" }}>
                <iframe
                  src={mapView === "road" ? roadMapSrc : satelliteMapSrc}
                  className="absolute top-0 left-0 w-full h-full rounded-2xl"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={`Paluguntipalli ${mapView} view`}
                />
              </div>
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center mb-3">
                <MapPin className="text-heritage mr-2" size={20} />
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Paluguntipalli
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AP 523368, India • 15.48°N, 78.96°E
              </p>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <MapIcon className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Interactive Navigation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Zoom, pan, and explore every corner of our village
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <Satellite className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Satellite Imagery
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View detailed aerial images of village landmarks
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <Navigation className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">
              Directions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Get directions to reach Paluguntipalli easily
            </p>
            <Button onClick={handleDirectionsClick} className="hero-button group">
              <Navigation size={18} className="mr-2 group-hover:animate-bounce" />
              Get Directions
            </Button>
          </div>
        </motion.div>

        {/* Open in Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <Button asChild className="hero-button group">
            <a
              href="https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4808278,78.962409,15z"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} className="mr-2 group-hover:animate-bounce" />
              {t("Open in Google Maps", "Open in Google Maps")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VillageMap;
