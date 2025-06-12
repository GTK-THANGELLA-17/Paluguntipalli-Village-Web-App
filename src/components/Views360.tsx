
import { Button } from "@/components/ui/button";
import { MapPin, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Views360 = () => {
  const { t } = useTranslation();

  return (
    <section id="views360" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16" 
          data-aos="fade-up"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('360° Views Of Village', '360° Views Of Village')}
        </motion.h2>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-8 text-[#000000] dark:text-white max-w-3xl mx-auto">
              {t('Explore immersive 360° views of Paluguntipalli streets and landmarks. Take a virtual tour to experience the village beauty from every angle.', 
                'Explore immersive 360° views of Paluguntipalli streets and landmarks. Take a virtual tour to experience the village beauty from every angle.')}
            </p>
            
            {/* Main 360° Preview */}
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-heritage mb-8 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[16/9] bg-gray-200 relative">
                <img 
                  src="/Hanuman Statue.jpg" 
                  alt="Village 360 View Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Enhanced 360 overlay */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-white text-center"
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-24 h-24 border-4 border-white rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="text-2xl font-bold">360°</div>
                      <motion.div 
                        className="absolute inset-0 border-4 border-heritage rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                    <p className="text-xl font-medium flex items-center justify-center gap-2">
                      <Eye size={20} />
                      {t('Click to explore in Google Maps', 'Click to explore in Google Maps')}
                    </p>
                  </motion.div>
                </motion.div>
                
                {/* Interactive overlay for the link */}
                <a 
                  href="https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4798863,78.9623224,3a,75y,312.42h,102.3t/data=!3m8!1e1!3m6!1sAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z%3Dw203-h100-k-no-pi-0-ya50.731716-ro-0-fo100!7i8704!8i4352!4m9!3m8!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!8m2!3d15.4808278!4d78.962409!10e5!14m1!1BCgIgARICCAI!16s%2Fm%2F051xw63"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                ></a>
              </div>
            </motion.div>
            
            <div className="flex justify-center">
              <Button asChild className="hero-button group">
                <a 
                  href="https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/@15.4798863,78.9623224,3a,75y,312.42h,102.3t/data=!3m8!1e1!3m6!1sAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipNV2ytJPGqXx9quZQ30InjtuXaKFZ_SIFwanP3z%3Dw203-h100-k-no-pi-0-ya50.731716-ro-0-fo100!7i8704!8i4352!4m9!3m8!1s0x3bb4e1b7fe8a6969:0x6daeb87da9e27400!8m2!3d15.4808278!4d78.962409!10e5!14m1!1BCgIgARICCAI!16s%2Fm%2F051xw63"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin size={18} className="mr-2 group-hover:animate-bounce" />
                  {t('Explore 360° View', 'Explore 360° View')}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Views360;
