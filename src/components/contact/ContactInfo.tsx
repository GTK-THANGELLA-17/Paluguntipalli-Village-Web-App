
import { motion } from "framer-motion";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="bg-white/80 dark:bg-[#2a2a2a]/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-heritage/20">
        <div className="space-y-6">
          <motion.div 
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-[#333] rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="text-heritage mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-[#000000] dark:text-white">
                {t('Address', 'Address')}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Paluguntipalli, Andhra Pradesh, India
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-[#333] rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="text-heritage mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-[#000000] dark:text-white">
                {t('Email', 'Email')}
              </h4>
              <a 
                href="mailto:thangellagadidamalla@gmail.com"
                className="text-heritage hover:text-heritage/80 transition-colors duration-300"
              >
                thangellagadidamalla@gmail.com
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-[#333] rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink className="text-heritage mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-[#000000] dark:text-white">
                {t('Location', 'Location')}
              </h4>
              <a 
                href="https://www.google.com/maps/place/Paluguntipalli"
                target="_blank"
                rel="noopener noreferrer"
                className="text-heritage hover:text-heritage/80 transition-colors duration-300"
              >
                {t('View on Google Maps', 'View on Google Maps')}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 p-6 bg-gradient-to-r from-heritage/10 to-heritage/5 rounded-lg border border-heritage/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="font-semibold text-[#000000] dark:text-white mb-2">
            {t('Get in Touch', 'Get in Touch')}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t('We would love to hear from you. Send us a message and we will respond as soon as possible.', 
              'We would love to hear from you. Send us a message and we will respond as soon as possible.')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
