
import { motion } from "framer-motion";
import { X } from "lucide-react";
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
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Application Suggestions
          </motion.h2>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={24} />
            </Button>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl p-6 sm:p-8 border border-heritage/20"
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
