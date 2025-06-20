import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Satellite,
  Map as MapIcon,
  Navigation,
  ArrowLeft,
  AlertTriangle,
  Sun,
  Landmark,
  LocateFixed, // ✅ replacement for StreetView
} from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mapView, setMapView] = useState<"road" | "satellite" | "street">(
    "road"
  );
  const [mapError, setMapError] = useState(false);

  const coords = "15.4808278,78.962409";
  const googleMapsPlaceUrl = `https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@${coords},15z`;

  const roadMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

  const satelliteMapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli!5e1!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`;

  const streetViewSrc = `https://www.google.com/maps/embed?pb=!4v1718791687212!6m8!1m7!1sCAoSLEFGMVFpcFBFVzdTZ1c2ZURw...`; // Replace with real Street View embed if needed

  // ✅ Mobile back → always go to home
  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

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
              className="flex items-center gap-2"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t("Village Map")}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Explore Paluguntipalli with road, satellite, street view and live weather."
            )}
          </p>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Toggle & Features */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <h3 className="font-bold mb-3">{t("Map Options")}</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant={mapView === "road" ? "default" : "ghost"}
                  onClick={() => {
                    setMapView("road");
                    setMapError(false);
                  }}
                >
                  <MapIcon className="mr-2" size={16} />
                  {t("Road View")}
                </Button>
                <Button
                  variant={mapView === "satellite" ? "default" : "ghost"}
                  onClick={() => {
                    setMapView("satellite");
                    setMapError(false);
                  }}
                >
                  <Satellite className="mr-2" size={16} />
                  {t("Satellite View")}
                </Button>
                <Button
                  variant={mapView === "street" ? "default" : "ghost"}
                  onClick={() => {
                    setMapView("street");
                    setMapError(false);
                  }}
                >
                  <LocateFixed className="mr-2" size={16} /> {/* ✅ replacement */}
                  {t("Street View")}
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start"
                >
                  <a
                    href={`https://www.google.com/search?q=weather+${coords}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Sun className="mr-2" size={16} />
                    {t("Check Weather")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start"
                >
                  <a
                    href={`https://www.google.com/maps/search/landmarks+near+${coords}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Landmark className="mr-2" size={16} />
                    {t("Nearby Places")}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border-4 border-heritage shadow-xl aspect-video bg-white dark:bg-gray-800 relative">
              {!mapError ? (
                <iframe
                  src={
                    mapView === "road"
                      ? roadMapSrc
                      : mapView === "satellite"
                      ? satelliteMapSrc
                      : streetViewSrc
                  }
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title={`Paluguntipalli ${mapView}`}
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
              <Button asChild>
                <a
                  href={googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2" size={18} />
                  {t("Open in Google Maps")}
                </a>
              </Button>
            </div>
          </div>

          {/* Info + Directions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <h3 className="flex items-center mb-2 font-bold">
                <MapPin className="mr-2" size={20} />
                Paluguntipalli
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AP 523368, India • {coords}
              </p>
              <Button
                onClick={handleDirectionsClick}
                className="w-full mt-4 flex items-center justify-center"
              >
                <Navigation className="mr-2" size={18} />
                {t("Get Directions")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VillageMap;
