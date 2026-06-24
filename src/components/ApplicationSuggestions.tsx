import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuggestionHeader from "./suggestions/SuggestionHeader";
import SuggestionForm from "./suggestions/SuggestionForm";
import SuggestionInfo from "./suggestions/SuggestionInfo";

interface ApplicationSuggestionsProps {
  onClose?: () => void;
}

const ApplicationSuggestions = ({ onClose }: ApplicationSuggestionsProps) => {
  const handleFormSuccess = () => {
    if (onClose) {
      setTimeout(() => onClose(), 1000);
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525] min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="feature-section-header mb-8">
          <div className="feature-section-title-wrap justify-center sm:justify-start">
            <motion.h2
              className="section-title text-[#000000] dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Application Suggestions
            </motion.h2>
          </div>

          {onClose && (
            <div className="feature-section-actions">
              <Button
                variant="ghost"
                onClick={onClose}
                className="feature-back-button text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft size={20} aria-hidden="true" />
                <span>Back to Features</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="feature-close-button text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close application suggestions"
              >
                <X size={24} aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-heritage/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SuggestionHeader />
            <SuggestionForm onSuccess={handleFormSuccess} />
            <SuggestionInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationSuggestions;