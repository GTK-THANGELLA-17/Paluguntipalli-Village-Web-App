
import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-heritage" />,
      number: "500+",
      label: t('Members', 'Population'),
      description: t('Community members living in our village', 'Proud residents of our beautiful village')
    },
    {
      icon: <Calendar className="w-8 h-8 text-heritage" />,
      number: "200+",
      label: t('Years', 'Years of Heritage'),
      description: t('Rich cultural history spanning centuries', 'Years of rich cultural heritage')
    },
    {
      icon: <MapPin className="w-8 h-8 text-heritage" />,
      number: "5+",
      label: t('Places to Visit', 'Sacred Places'),
      description: t('Temples and historic landmarks to explore', 'Beautiful temples and landmarks')
    },
    {
      icon: <Award className="w-8 h-8 text-heritage" />,
      number: "2+",
      label: t('Festivals', 'Annual Festivals'),
      description: t('Traditional celebrations throughout the year', 'Vibrant festivals celebrated annually')
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-heritage rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-heritage rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-playfair text-[#000000] dark:text-white">
            {t('About Our Village', 'About Our Village')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('Discover the rich cultural heritage of our beautiful village in Andhra Pradesh. Experience traditions that have been preserved for generations.')}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-heritage mb-2 font-playfair">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/VILLAGE START.jpg"
              alt={t('Paluguntipalli Village', 'Village landscape')}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              loading="lazy"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#000000] dark:text-white">
              {t('The Cultural Heritage', 'Our Rich Heritage')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('Paluguntipalli is a vibrant village nestled in the heart of Andhra Pradesh, where ancient traditions blend seamlessly with modern life. Our community takes pride in preserving the cultural heritage that has been passed down through generations.', 'Paluguntipalli is a vibrant village nestled in the heart of Andhra Pradesh, where ancient traditions blend seamlessly with modern life.')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('From our magnificent temples to our colorful festivals, every aspect of village life reflects the deep-rooted values and customs that define our identity. We welcome visitors to experience the warmth of our hospitality and the beauty of our traditions.', 'From our magnificent temples to our colorful festivals, every aspect of village life reflects our deep-rooted values and customs.')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
