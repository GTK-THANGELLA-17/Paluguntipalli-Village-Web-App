
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Store, Plus, ArrowLeft, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import BusinessSubmissionForm from "./business/BusinessSubmissionForm";
import StorySubmissionForm from "./community/StorySubmissionForm";
import BusinessHeader from "./business/BusinessHeader";
import BusinessSearch from "./business/BusinessSearch";
import BusinessCard from "./business/BusinessCard";
import { businesses, categories } from "./business/businessData";

interface LocalBusinessProps {
  onClose: () => void;
}

const LocalBusiness: React.FC<LocalBusinessProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);

  const filteredBusinesses = businesses.filter(business => {
    const matchesCategory = selectedCategory === "All" || business.category === selectedCategory;
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBackToFeatures = () => {
    onClose();
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (showBusinessForm) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowBusinessForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Directory
              </button>
              <button
                onClick={handleBackToFeatures}
                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <Home size={20} className="mr-2" />
                Back to Features
              </button>
            </div>
            <h2 className="section-title text-[#000000] dark:text-white">
              Register Your Business
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join our local business directory and reach more customers
            </p>
          </motion.div>
          <BusinessSubmissionForm onClose={() => setShowBusinessForm(false)} />
        </div>
      </section>
    );
  }

  if (showStoryForm) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowStoryForm(false)}
                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Hub
              </button>
              <button
                onClick={handleBackToFeatures}
                className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <Home size={20} className="mr-2" />
                Back to Features
              </button>
            </div>
            <h2 className="section-title text-[#000000] dark:text-white">
              Share Your Story
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tell the community about your experiences and memories
            </p>
          </motion.div>
          <StorySubmissionForm onClose={() => setShowStoryForm(false)} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <BusinessHeader onBackToFeatures={handleBackToFeatures} />

        <div className="text-center mb-8">
          <Button
            onClick={() => setShowBusinessForm(true)}
            className="bg-heritage hover:bg-heritage-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <Plus size={16} className="mr-2" />
            Add Your Business
          </Button>
        </div>

        <BusinessSearch
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Featured Businesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {businesses
              .filter(business => business.featured)
              .map((business, index) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  index={index}
                  isFeatured={true}
                />
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            All Businesses ({filteredBusinesses.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business, index) => (
              <BusinessCard
                key={business.id}
                business={business}
                index={index}
              />
            ))}
          </div>
        </div>

        {filteredBusinesses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Store className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No businesses found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LocalBusiness;
