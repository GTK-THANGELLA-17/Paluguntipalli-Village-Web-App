
import { Bell, MapPin, Newspaper, Building2, Zap, Wheat, TrendingUp, ArrowLeft, Home, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import NewsAPI from "./api/NewsAPI";
import CurrencyAPI from "./api/CurrencyAPI";
import CommodityAPI from "./api/CommodityAPI";
import Weather from "./Weather";
import { useState, useEffect } from "react";

interface StayUpdatedProps {
  onClose: () => void;
}

const healthTips = [
  {
    title: "Stay Hydrated",
    tip: "Drink at least 8-10 glasses of water daily, especially during hot weather",
    icon: "💧"
  },
  {
    title: "Eat Fresh Vegetables",
    tip: "Include locally grown seasonal vegetables in your daily diet for better nutrition",
    icon: "🥬"
  },
  {
    title: "Regular Exercise",
    tip: "Take a 30-minute walk daily or do light exercises to stay fit",
    icon: "🚶"
  },
  {
    title: "Proper Sleep",
    tip: "Get 7-8 hours of quality sleep every night for better health",
    icon: "😴"
  },
  {
    title: "Hand Hygiene",
    tip: "Wash your hands frequently with soap and water to prevent infections",
    icon: "🧼"
  }
];

const StayUpdated: React.FC<StayUpdatedProps> = ({ onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = () => {
    onClose();
    // Small delay to ensure the transition happens, then scroll to features section
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-heritage/10 to-white dark:from-[#1a1a1a] dark:to-[#252525] py-20">
      <div className="container mx-auto px-4">
        {/* Responsive Back Button */}
        <motion.div 
          className={`fixed top-20 right-4 z-50 transition-all duration-300 ${
            isScrolled ? 'top-24 scale-90' : 'top-20 scale-100'
          }`}
          animate={{ 
            y: isScrolled ? 0 : 0,
            scale: isScrolled ? 0.9 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={handleBackClick}
            variant="outline"
            size="sm"
            className="bg-white/95 dark:bg-gray-800/95 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Features
          </Button>
        </motion.div>

        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Bell className="text-heritage dark:text-white mr-2" size={32} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-0 font-playfair text-[#000000] dark:text-white">
              Stay Updated
            </h2>
          </motion.div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time information and updates to keep your village community connected and informed.
          </p>
        </div>

        {/* Live Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weather - using existing component */}
            <div className="lg:col-span-2">
              <Weather />
            </div>
            
            {/* News Updates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <NewsAPI />
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-gray-900 dark:text-white">
                    <Heart className="mr-2 text-red-600" size={20} />
                    Daily Health Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {healthTips.map((tip, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-start mb-2">
                          <span className="mr-2 text-lg">{tip.icon}</span>
                          <div>
                            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1">{tip.title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300">{tip.tip}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Market Prices */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CommodityAPI />
            </motion.div>

            {/* Currency Exchange */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CurrencyAPI />
            </motion.div>
          </div>
        </motion.div>

        {/* API Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-heritage/10 to-heritage/5 dark:from-heritage/20 dark:to-heritage/10 border-heritage/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-heritage dark:text-white flex items-center">
                <TrendingUp className="mr-2" size={24} />
                Live Data Sources
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                All data above is fetched from real sources and updated automatically throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Weather Data", source: "OpenWeatherMap API", update: "Real-time" },
                  { name: "Daily News", source: "NewsAPI (India)", update: "Every 30 min" },
                  { name: "Health Tips", source: "Curated Health Guidelines", update: "Daily" },
                  { name: "Market Prices", source: "Commodity APIs", update: "Hourly" },
                  { name: "Currency Rates", source: "ExchangeRate API", update: "Every 30 min" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className="flex flex-col p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <span className="font-medium text-sm text-gray-800 dark:text-white">{item.name}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{item.source}</span>
                    <span className="text-xs text-heritage mt-1">{item.update}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-white dark:bg-gray-800 shadow-xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-playfair text-[#000000] dark:text-white">
              Complete Village Information Hub
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              From weather and news to health tips and market prices, all the information above is live and 
              updates automatically. Stay connected with everything that matters to daily life in Paluguntipalli.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <div className="flex items-center text-heritage dark:text-white">
                <Bell size={20} className="mr-2" />
                <span className="font-medium text-sm sm:text-base">Auto-Updates</span>
              </div>
              <div className="flex items-center text-heritage dark:text-white">
                <MapPin size={20} className="mr-2" />
                <span className="font-medium text-sm sm:text-base">Local Focus</span>
              </div>
              <div className="flex items-center text-heritage dark:text-white">
                <Heart size={20} className="mr-2" />
                <span className="font-medium text-sm sm:text-base">Health & Wellness</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StayUpdated;
