import { motion } from "framer-motion";
import { Store, X, ArrowLeft } from "lucide-react";

interface BusinessHeaderProps {
  onBackToFeatures: () => void;
}

const BusinessHeader = ({ onBackToFeatures }: BusinessHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 sm:mb-12"
    >
      <div className="feature-section-header">
        <div className="feature-section-title-wrap">
          <Store className="text-heritage shrink-0" size={34} aria-hidden="true" />
          <h2 className="section-title text-[#000000] dark:text-white">
            Business Directory
          </h2>
        </div>

        <div className="feature-section-actions">
          <button
            type="button"
            onClick={onBackToFeatures}
            className="feature-back-button text-gray-600 transition-colors duration-300 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-heritage/30 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Back to Features</span>
          </button>

          <button
            type="button"
            onClick={onBackToFeatures}
            className="feature-close-button text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-heritage/30 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close business directory"
          >
            <X size={26} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Discover and support local businesses in Paluguntipalli
      </p>
    </motion.div>
  );
};

export default BusinessHeader;