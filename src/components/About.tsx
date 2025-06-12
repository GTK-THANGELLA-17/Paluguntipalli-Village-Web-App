
import { ArrowDown, Users, Heart, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const scrollToAppUpdates = () => {
    const element = document.getElementById('app-updates');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { icon: Users, number: "500+", label: "Villagers" },
    { icon: Heart, number: "100+", label: "Years of Heritage" },
    { icon: Star, number: "50+", label: "Cultural Events" }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-white dark:bg-[#252525] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-heritage rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16">
            {t('about.title', 'About Our Village')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.description', 'Paluguntipalli is a vibrant village nestled in the heart of Andhra Pradesh, rich with cultural heritage, traditional values, and a close-knit community that has thrived for generations.')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-8 bg-gradient-to-br from-heritage/10 to-blue-500/10 dark:from-heritage/20 dark:to-blue-500/20 rounded-2xl shadow-lg border border-heritage/20 dark:border-white/10"
            >
              <div className="w-16 h-16 bg-heritage text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold text-heritage dark:text-heritage-light mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Village Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-heritage-bg dark:from-[#1a1a2e] dark:to-[#16213e] rounded-3xl p-8 sm:p-12 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#000000] dark:text-white mb-6">
                {t('about.story.title', 'Our Story & Heritage')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {t('about.story.paragraph1', 'Our village has been a beacon of traditional Telugu culture, where ancient customs blend seamlessly with modern progress. Every corner tells a story of resilience, community spirit, and unwavering faith.')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {t('about.story.paragraph2', 'From our historic temple to the vibrant festivals that light up our streets, Paluguntipalli continues to be a place where traditions are not just preserved, but lived and celebrated daily.')}
              </p>
              
              {/* Call to Action - Application Updates */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToAppUpdates}
                className="cursor-pointer bg-white dark:bg-[#2a2a2a] rounded-2xl p-6 shadow-lg border border-heritage/20 dark:border-white/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-heritage to-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <ArrowDown className="text-white animate-bounce" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#000000] dark:text-white">
                        {t('about.updates.title', 'See Application Updates')}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {t('about.updates.subtitle', 'Stay informed about app news & alerts')}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="text-heritage dark:text-heritage-light" size={24} />
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/VILLAGE START.jpg"
                  alt="Village Heritage"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">{t('about.image.caption', 'Village Heritage')}</p>
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-heritage text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart size={20} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
