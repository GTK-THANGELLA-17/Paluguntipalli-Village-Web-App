import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import { Button } from "./ui/button";
import {
  MapPin,
  Satellite,
  Map as MapIcon,
  Navigation,
  ArrowLeft,
} from "lucide-react";

interface VillageMapProps {
  onBackToFeatures?: () => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const center = {
  lat: 15.4808278,
  lng: 78.962409,
};

const VillageMap: React.FC<VillageMapProps> = ({ onBackToFeatures }) => {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");

  const handleDirectionsClick = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&destination=15.4808278,78.962409",
      "_blank"
    );
  };

  return (
    <section className="py-10 px-4 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto space-y-6">
        {onBackToFeatures && (
          <Button
            onClick={onBackToFeatures}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Features
          </Button>
        )}

        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-3">
            <MapPin size={32} className="text-heritage" />
            <h2 className="text-3xl font-bold">Village Map</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Explore Paluguntipalli through an interactive map with satellite and road views
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Controls */}
          <div className="lg:w-1/4 space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-3">Map View</h3>
              <Button
                onClick={() => setMapType("roadmap")}
                className={`mb-2 w-full ${
                  mapType === "roadmap" ? "bg-heritage text-white" : ""
                }`}
              >
                <MapIcon className="mr-2" size={16} />
                Road View
              </Button>
              <Button
                onClick={() => setMapType("satellite")}
                className={`w-full ${
                  mapType === "satellite" ? "bg-heritage text-white" : ""
                }`}
              >
                <Satellite className="mr-2" size={16} />
                Satellite View
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">Paluguntipalli</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AP 523368, India • 15.48°N, 78.96°E
              </p>
            </div>
          </div>

          {/* Google Map */}
          <div className="lg:w-3/4">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                mapTypeId={mapType}
              />
            </LoadScript>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center mt-6 space-y-4">
          <Button onClick={handleDirectionsClick} className="hero-button group">
            <Navigation size={18} className="mr-2 group-hover:animate-bounce" />
            Get Directions
          </Button>

          <Button asChild className="hero-button group">
            <a
              href="https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={18} className="mr-2 group-hover:animate-bounce" />
              Open in Google Maps
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VillageMap;
