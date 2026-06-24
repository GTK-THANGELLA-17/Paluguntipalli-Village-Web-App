import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';

interface DateTimeDisplayProps {
  isScrolled: boolean;
}

const DateTimeDisplay = ({ isScrolled }: DateTimeDisplayProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [weatherTemp, setWeatherTemp] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Optimized weather fetch with error handling and caching
  const fetchWeatherTemp = useCallback(async () => {
    try {
      const cached = localStorage.getItem('weather_cache');
      const cacheTime = localStorage.getItem('weather_cache_time');
      
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 30 * 60 * 1000) {
        setWeatherTemp(JSON.parse(cached));
        return;
      }
      
      const lat = 15.4808278;
      const lon = 78.962409;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`,
        { signal: controller.signal }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error("Weather data not available");
      
      const data = await response.json();
      const temp = Math.round(data.current.temperature_2m);
      
      localStorage.setItem('weather_cache', JSON.stringify(temp));
      localStorage.setItem('weather_cache_time', Date.now().toString());
      
      setWeatherTemp(temp);
    } catch (err) {
      if (import.meta.env.DEV) console.warn("Weather fetch failed, using fallback:", err);
      setWeatherTemp(32);
    }
  }, []);

  useEffect(() => {
    fetchWeatherTemp();
    const weatherInterval = setInterval(fetchWeatherTemp, 30 * 60 * 1000);
    return () => clearInterval(weatherInterval);
  }, [fetchWeatherTemp]);

  // Optimized progress bar with RAF
  useEffect(() => {
    let animationFrame: number;
    
    const updateProgress = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      const totalProgress = (seconds + milliseconds / 1000) * (100 / 60);
      setProgress(totalProgress);
      
      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Optimized date/time timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isScrolled && (
        <motion.div 
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1],
            type: "spring",
            stiffness: 100
          }}
          className="fixed top-[72px] left-0 right-0 z-30 flex justify-center items-center py-2 bg-gradient-to-r from-white/90 via-heritage/40 to-white/90 dark:from-[#252525]/90 dark:via-slate/50 dark:to-[#252525]/90 backdrop-blur-xl shadow-2xl border-b-2 border-heritage/30 dark:border-white/30"
          style={{ height: '45px' }}
        >
          <motion.div 
            className="flex flex-col items-center sm:flex-row sm:gap-3 relative overflow-hidden rounded-2xl px-4 py-2 bg-white/90 dark:bg-[#252525]/90 backdrop-blur-xl border-2 border-heritage/40 dark:border-white/40 shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Premium animated background with multiple gradients */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-heritage/30 dark:via-white/20 to-transparent"
              animate={{ x: ['-150%', '150%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-blue-400/20 via-transparent to-purple-400/20"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Enhanced date display with smaller size */}
            <motion.p 
              className="text-[#000000] dark:text-white text-xs lg:text-sm font-bold relative z-10"
              initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 150,
                damping: 15
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 0px rgba(139,69,19,0)",
                    "0 0 10px rgba(139,69,19,0.5)",
                    "0 0 0px rgba(139,69,19,0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {currentDateTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </motion.span>
            </motion.p>
            
            {/* Premium separator with pulsing animation - smaller */}
            <motion.div 
              className="hidden sm:block w-1.5 h-1.5 bg-heritage dark:bg-white rounded-full relative"
              animate={{ 
                scale: [1, 1.5, 1], 
                opacity: [0.6, 1, 0.6],
                boxShadow: [
                  "0 0 0px rgba(139,69,19,0)",
                  "0 0 15px rgba(139,69,19,0.8)",
                  "0 0 0px rgba(139,69,19,0)"
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0 bg-heritage dark:bg-white rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [1, 0, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Enhanced time display with smaller size */}
            <motion.p 
              className="text-[#000000] dark:text-white font-bold text-xs lg:text-sm flex items-center relative z-10"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.5 }}
            >
              <motion.span
                animate={{
                  color: [
                    "rgb(0,0,0)",
                    "rgb(139,69,19)",
                    "rgb(0,0,0)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="dark:text-white"
              >
                {currentDateTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit' 
                })}
              </motion.span>
              {weatherTemp !== null && (
                <motion.span 
                  className="ml-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/80 dark:to-blue-800/80 px-2 py-1 rounded-full text-blue-800 dark:text-blue-100 text-xs font-bold relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.6, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: 0.8, 
                    type: "spring", 
                    stiffness: 120,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(59,130,246,0.4)"
                  }}
                >
                  {/* Premium weather background animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300/50 to-cyan-300/50"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10">{weatherTemp}°C</span>
                </motion.span>
              )}
            </motion.p>
            
            {/* Premium enhanced progress bar - smaller */}
            <div className="absolute -bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 overflow-hidden rounded-full">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-heritage via-blue-500 via-purple-500 to-pink-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              >
                {/* Premium shine effect on progress bar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DateTimeDisplay;
