
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cloud, CloudRain, Sun, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const Weather = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using OpenWeatherMap free API - Paluguntipalli coordinates (approximate)
        const apiKey = "4d8fb5b93d4af21d66a2948710284366"; // Free public API key
        const lat = 14.5138; // Approximate lat for Paluguntipalli
        const lon = 79.8927; // Approximate long for Paluguntipalli
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        
        if (!response.ok) throw new Error("Weather data not available");
        
        const data = await response.json();
        
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon
        });
        
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Unable to fetch weather data");
        
        // Fallback to sample data when API fails
        setWeather({
          temperature: 32,
          description: "Sunny with clear skies",
          humidity: 65,
          windSpeed: 12,
          icon: "01d"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section id="village-weather" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white">
  {t("Village Weather")}
</h2>

        
        <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-8 md:p-12 border border-blue-200 dark:border-gray-700
                     hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-300">
                  {t("Paluguntipalli Weather")}
                </h3>
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={40} />
                    <p className="ml-3 text-blue-600 dark:text-blue-400">{t("Loading weather data...")}</p>
                  </div>
                ) : error ? (
                  <p className="text-red-500 mb-4">{error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center md:justify-start items-center gap-2">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`} 
                        alt="Weather icon" 
                        className="w-16 h-16"
                      />
                      <div>
                        <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">
                          {weather?.temperature}°C
                        </p>
                        <p className="capitalize text-blue-600 dark:text-blue-400">
                          {weather?.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-left">
                      <div className="bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                        <p className="text-sm text-blue-600 dark:text-blue-400">{t("Humidity")}</p>
                        <p className="text-xl font-semibold text-blue-800 dark:text-blue-300">
                          {weather?.humidity}%
                        </p>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 p-2 rounded">
                        <p className="text-sm text-blue-600 dark:text-blue-400">{t("Wind Speed")}</p>
                        <p className="text-xl font-semibold text-blue-800 dark:text-blue-300">
                          {weather?.windSpeed} km/h
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{t("Typical weather patterns:")}</p>
                  <ul className="text-blue-800 dark:text-blue-300 mb-6 text-left list-disc list-inside">
                    <li>{t("Summers (March-June): Hot and dry (30°C - 40°C)")}</li>
                    <li>{t("Monsoon (July-September): Moderate rainfall")}</li>
                    <li>{t("Winters (November-February): Cool and pleasant (15°C - 28°C)")}</li>
                  </ul>
                </div>
                
                <Button 
                  asChild
                  className="bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-700 text-white
                         transition-all duration-300 transform hover:scale-105"
                >
                  <a 
                    href="https://www.google.com/search?q=paluguntipalli+weather" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Cloud size={18} />
                    {t("Check Current Weather")}
                  </a>
                </Button>
              </div>
              
              <div className="hidden md:block">
                <motion.div 
                  className="relative flex justify-center items-center"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
                >
                  {/* Weather icon animation */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center relative shadow-lg">
                    <motion.div 
                      className="absolute"
                      animate={{ y: [0, -10, 0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 10 }}
                    >
                      {weather?.description?.includes("rain") ? (
                        <CloudRain size={120} className="text-blue-300 dark:text-blue-500" />
                      ) : weather?.description?.includes("cloud") ? (
                        <Cloud size={120} className="text-blue-300 dark:text-blue-500" />
                      ) : (
                        <Sun size={120} className="text-yellow-400 dark:text-yellow-500" />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Weather;
