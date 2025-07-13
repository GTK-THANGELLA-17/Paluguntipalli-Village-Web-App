import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Satellite, Map as MapIcon, ZoomIn, ZoomOut, Navigation, ArrowLeft, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "./ui/alert";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const { t } = useTranslation();
  const [mapView, setMapView] = useState<'road' | 'satellite'>('road');
  const [mapError, setMapError] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Updated Google Maps embed URLs with better parameters
  const roadMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli%2C%20Andhra%20Pradesh%20523368!5e0!3m2!1sen!2sin!4v1704907890123!5m2!1sen!2sin&output=embed";
  const satelliteMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15367.123456789!2d78.962409!3d15.4808278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb4e1b7fe8a6969%3A0x6daeb87da9e27400!2sPaluguntipalli%2C%20Andhra%20Pradesh%20523368!5e1!3m2!1sen!2sin!4v1704907890123!5m2!1sen!2sin&output=embed";

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const destination = "15.4808278,78.962409";
          const directionsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${destination}`;
          window.open(directionsUrl, '_blank');
        },
        (error) => {
          const directionsUrl = `https://www.google.com/maps/dir//15.4808278,78.962409`;
          window.open(directionsUrl, '_blank');
        }
      );
    } else {
      const directionsUrl = `https://www.google.com/maps/dir//15.4808278,78.962409`;
      window.open(directionsUrl, '_blank');
    }
  };

  const handleIframeError = () => {
    setMapError(true);
  };

  const openInGoogleMaps = () => {
    const mapsUrl = "https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4808278,78.962409,15z";
    window.open(mapsUrl, '_blank');
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        {/* Back Button */}
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
              className="flex items-center gap-2 transition-colors bg-white dark:bg-black dark:text-white hover:bg-heritage hover:text-white"
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
            <h2 className="section-title text-[#000000] dark:text-white">
              {t('Village Map', 'Village Map')}
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('Explore Paluguntipalli through interactive maps with road and satellite views', 
              'Explore Paluguntipalli through interactive maps with road and satellite views')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Left Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg h-fit">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-center lg:text-left">Map View</h3>
              <div className="flex lg:flex-col gap-2">
                <Button
                  variant={mapView === 'road' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMapView('road')}
                  className={`${mapView === 'road' ? 'bg-heritage text-white' : 'text-gray-600 dark:text-gray-300'} w-full justify-start`}
                >
                  <MapIcon size={16} className="mr-2" />
                  Road View
                </Button>
                <Button
                  variant={mapView === 'satellite' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMapView('satellite')}
                  className={`${mapView === 'satellite' ? 'bg-heritage text-white' : 'text-gray-600 dark:text-gray-300'} w-full justify-start`}
                >
                  <Satellite size={16} className="mr-2" />
                  Satellite View
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div 
              ref={mapContainerRef}
              className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-heritage"
            >
              <div className="aspect-[4/3] relative">
                {mapError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-center p-6">
                    <AlertTriangle className="w-16 h-16 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Map Blocked</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Your browser is blocking the embedded map. This is common for security reasons.
                    </p>
                    <Button onClick={openInGoogleMaps} className="bg-heritage text-white hover:bg-heritage/90">
                      <ExternalLink size={16} className="mr-2" />
                      Open in Google Maps
                    </Button>
                  </div>
                ) : (
                  <>
                    <iframe
                      src={mapView === 'road' ? roadMapSrc : satelliteMapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title={`Paluguntipalli ${mapView === 'road' ? 'Road' : 'Satellite'} Map`}
                      onError={handleIframeError}
                    />
                    
                    {/* Fallback for blocked content */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Map not loading?</p>
                        <Button onClick={openInGoogleMaps} size="sm" variant="outline">
                          <ExternalLink size={14} className="mr-1" />
                          Open in Google Maps
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Map blocked alert */}
            <Alert className="mt-4 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                If the map doesn't load, your browser may be blocking embedded content. Click "Open in Google Maps" to view the location.
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* Right Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg h-fit">
              <div className="flex items-center mb-3">
                <MapPin className="text-heritage mr-2" size={20} />
                <h3 className="font-bold text-gray-800 dark:text-white">Paluguntipalli</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  AP 523368, India • 15.48°N, 78.96°E
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <MapIcon className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Interactive Navigation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Zoom, pan, and explore every corner of our village
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <Satellite className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Satellite Imagery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View detailed aerial images of village landmarks
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
            <Navigation className="text-heritage mx-auto mb-3" size={32} />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Directions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Get directions to reach Paluguntipalli easily
            </p>
            <Button onClick={handleDirectionsClick} className="hero-button group">
              <Navigation size={18} className="mr-2 group-hover:animate-bounce" />
              Get Directions
            </Button>
          </div>
        </motion.div>

        {/* Open in Google Maps Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <Button onClick={openInGoogleMaps} className="hero-button group">
            <MapPin size={18} className="mr-2 group-hover:animate-bounce" />
            {t('Open in Google Maps', 'Open in Google Maps')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default VillageMap;