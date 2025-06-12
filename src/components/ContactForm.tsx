
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ContactFormMain from './contact/ContactFormMain';

const ContactForm = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <ContactFormMain />
    </motion.div>
  );
};

export default ContactForm;
