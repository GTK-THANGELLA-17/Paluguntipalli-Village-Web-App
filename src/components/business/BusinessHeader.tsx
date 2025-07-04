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
      className="text-center mb-12"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center">
          <Store className="text-heritage mr-3" size={36} />
          <h2 className="section-title text-[#000000] dark:text-white mb-0">
            Business Directory
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToFeatures}
            className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Features
          </button>

          <button
            onClick={onBackToFeatures}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close business directory"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Discover and support local businesses in Paluguntipalli
      </p>
    </motion.div>
  );
};

export default BusinessHeader;
