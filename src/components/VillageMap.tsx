import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Satellite, Map as MapIcon, Navigation, ArrowLeft, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "./ui/alert";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const VILLAGE_COORDINATES = "15.4808278,78.962409";
const GOOGLE_MAPS_PLACE_URL = "https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4808278,78.962409,15z";

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const { t } = useTranslation();
  const [mapView, setMapView] = useState<'road' | 'satellite'>('road');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSlow, setMapSlow] = useState(false);
  const [mapError, setMapError] = useState(false);

  const mapSources = useMemo(() => ({
    road: "https://maps.google.com/maps?q=Paluguntipalli%2C%20Andhra%20Pradesh%20523368%2C%20India&z=15&output=embed",
    satellite: "https://maps.google.com/maps?q=15.4808278%2C78.962409&t=k&z=16&output=embed",
  }), []);

  useEffect(() => {
    setMapLoaded(false);
    setMapSlow(false);
    setMapError(false);

    const slowTimer = window.setTimeout(() => {
      setMapSlow(true);
    }, 5000);

    return () => window.clearTimeout(slowTimer);
  }, [mapView]);

  const handleDirectionsClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const directionsUrl = `https://www.google.com/maps/dir/${latitude},${longitude}/${VILLAGE_COORDINATES}`;
          window.open(directionsUrl, '_blank', 'noopener,noreferrer');
        },
        () => {
          const directionsUrl = `https://www.google.com/maps/dir//${VILLAGE_COORDINATES}`;
          window.open(directionsUrl, '_blank', 'noopener,noreferrer');
        },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
      );
    } else {
      const directionsUrl = `https://www.google.com/maps/dir//${VILLAGE_COORDINATES}`;
      window.open(directionsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const openInGoogleMaps = () => {
    window.open(GOOGLE_MAPS_PLACE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
    setMapSlow(false);
    setMapError(false);
  };

  const handleMapError = () => {
    setMapError(true);
    setMapSlow(true);
  };

  return (
    <section className="feature-section-shell py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
      <div className="feature-container container mx-auto px-3 sm:px-4 lg:px-6">
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
              className="min-h-11 w-full justify-center gap-2 bg-white transition-colors hover:bg-heritage hover:text-white dark:bg-black dark:text-white sm:w-auto"
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
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-0">
            <MapPin className="text-heritage sm:mr-3" size={36} />
            <h2 className="section-title text-[#000000] dark:text-white">
              {t('Village Map', 'Village Map')}
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('Explore Paluguntipalli through interactive maps with road and satellite views',
              'Explore Paluguntipalli through interactive maps with road and satellite views')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start"
          >
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg h-fit">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 text-center lg:text-left">Map View</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-2">
                <Button
                  variant={mapView === 'road' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMapView('road')}
                  className={`${mapView === 'road' ? 'bg-heritage text-white' : 'text-gray-600 dark:text-gray-300'} min-h-11 w-full justify-center lg:justify-start`}
                >
                  <MapIcon size={16} className="mr-2" />
                  Road View
                </Button>
                <Button
                  variant={mapView === 'satellite' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMapView('satellite')}
                  className={`${mapView === 'satellite' ? 'bg-heritage text-white' : 'text-gray-600 dark:text-gray-300'} min-h-11 w-full justify-center lg:justify-start`}
                >
                  <Satellite size={16} className="mr-2" />
                  Satellite View
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-heritage bg-gray-100 dark:bg-gray-800">
              <div className="relative min-h-[320px] aspect-[1/1] sm:aspect-[4/3] lg:aspect-[4/3]">
                {!mapLoaded && !mapError && (
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 text-center">
                    <MapPin className="mb-3 text-heritage animate-pulse" size={40} />
                    <p className="font-semibold text-gray-800 dark:text-white">Loading Paluguntipalli map...</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">This may take a moment on mobile networks.</p>
                  </div>
                )}

                {mapError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-center p-6">
                    <AlertTriangle className="w-14 h-14 text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Map could not load</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Your browser, network, or privacy settings may be blocking the embedded map.
                    </p>
                    <Button onClick={openInGoogleMaps} className="min-h-11 bg-heritage text-white hover:bg-heritage/90">
                      <ExternalLink size={16} className="mr-2" />
                      Open in Google Maps
                    </Button>
                  </div>
                ) : (
                  <iframe
                    key={mapView}
                    src={mapSources[mapView]}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 z-10 h-full w-full bg-white"
                    title={`Paluguntipalli ${mapView === 'road' ? 'Road' : 'Satellite'} Map`}
                    onLoad={handleMapLoad}
                    onError={handleMapError}
                  />
                )}
              </div>
            </div>

            {(mapSlow || mapError) && (
              <Alert className="mt-4 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  If the embedded map is slow or blank, open the same Paluguntipalli location directly in Google Maps.
                  <Button
                    type="button"
                    variant="link"
                    onClick={openInGoogleMaps}
                    className="h-auto px-1 py-0 text-orange-900 underline dark:text-orange-100"
                  >
                    Open in Google Maps
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 flex lg:flex-col justify-center lg:justify-start"
          >
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg h-fit">
              <div className="flex items-center mb-3">
                <MapPin className="text-heritage mr-2" size={20} />
                <h3 className="font-bold text-gray-800 dark:text-white">Paluguntipalli</h3>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  AP 523368, India · 15.48°N, 78.96°E
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 max-w-4xl mx-auto"
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