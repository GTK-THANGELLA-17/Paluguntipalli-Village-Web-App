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
}

const weatherCodeDescriptions: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
};

const Weather = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const lat = 15.4808278;
        const lon = 78.962409;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        const current = data.current;

        setWeather({
          temperature: Math.round(current.temperature_2m),
          description: weatherCodeDescriptions[current.weather_code] || "Current weather",
          humidity: Math.round(current.relative_humidity_2m),
          windSpeed: Math.round(current.wind_speed_10m),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Unable to fetch current weather data");
          setWeather({
            temperature: 30,
            description: "Seasonal weather estimate",
            humidity: 65,
            windSpeed: 12,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return <Sun size={120} className="text-yellow-400 dark:text-yellow-500" />;

    const description = weather.description.toLowerCase();
    if (description.includes("rain") || description.includes("drizzle") || description.includes("thunder")) {
      return <CloudRain size={120} className="text-blue-400 dark:text-blue-500" />;
    }

    if (description.includes("cloud") || description.includes("overcast") || description.includes("fog")) {
      return <Cloud size={120} className="text-gray-400 dark:text-gray-500" />;
    }

    return <Sun size={120} className="text-yellow-400 dark:text-yellow-500" />;
  };

  return (
    <section id="village-weather" className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title" data-aos="fade-up">{t("Village Weather")}</h2>

        <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 border border-blue-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
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
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center md:justify-start items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/60">
                        {weather?.description.toLowerCase().includes("rain") ? (
                          <CloudRain className="text-blue-500" size={36} />
                        ) : weather?.description.toLowerCase().includes("cloud") || weather?.description.toLowerCase().includes("overcast") ? (
                          <Cloud className="text-gray-500" size={36} />
                        ) : (
                          <Sun className="text-yellow-500" size={36} />
                        )}
                      </div>
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
                      <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400">{t("Humidity")}</p>
                        <p className="text-xl font-semibold text-blue-800 dark:text-blue-300">
                          {weather?.humidity}%
                        </p>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-blue-600 dark:text-blue-400">{t("Wind Speed")}</p>
                        <p className="text-xl font-semibold text-blue-800 dark:text-blue-300">
                          {weather?.windSpeed} km/h
                        </p>
                      </div>
                    </div>

                    {error && (
                      <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-2">
                        {t("Showing estimated weather data")}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-6">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{t("Typical weather patterns:")}</p>
                  <ul className="text-blue-800 dark:text-blue-300 mb-6 text-left list-disc list-inside text-sm">
                    <li>{t("Summers (March-June): Hot and dry (30°C - 40°C)")}</li>
                    <li>{t("Monsoon (July-September): Moderate rainfall")}</li>
                    <li>{t("Winters (November-February): Cool and pleasant (15°C - 28°C)")}</li>
                  </ul>
                </div>

                <Button
                  asChild
                  className="bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
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
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center relative shadow-lg">
                    <motion.div
                      className="absolute"
                      animate={{ y: [0, -10, 0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 10 }}
                    >
                      {getWeatherIcon()}
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