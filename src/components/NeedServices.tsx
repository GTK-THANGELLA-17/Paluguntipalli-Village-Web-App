
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ServicesHeader from "./services/ServicesHeader";
import ServicesSearch from "./services/ServicesSearch";
import ServiceCard from "./services/ServiceCard";
import { serviceProviders } from "./services/servicesData";

interface NeedServicesProps {
  onClose: () => void;
}

const NeedServices: React.FC<NeedServicesProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services", count: serviceProviders.length },
    { id: "electrical", name: "Electrical", count: serviceProviders.filter(p => p.category === "electrical").length },
    { id: "automotive", name: "Automotive", count: serviceProviders.filter(p => p.category === "automotive").length },
    { id: "construction", name: "Construction", count: serviceProviders.filter(p => p.category === "construction").length },
    { id: "agriculture", name: "Agriculture", count: serviceProviders.filter(p => p.category === "agriculture").length },
    { id: "events", name: "Events", count: serviceProviders.filter(p => p.category === "events").length },
    { id: "utilities", name: "Utilities", count: serviceProviders.filter(p => p.category === "utilities").length },
    { id: "personal", name: "Personal Care", count: serviceProviders.filter(p => p.category === "personal").length },
  ];

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string, name: string, service: string) => {
    const message = encodeURIComponent(`Hi ${name}, I need help with ${service}. Are you available?`);
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBackToFeatures = () => {
    onClose();
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-[#1a1a2e] dark:via-[#16213e] dark:to-[#0f3460] min-h-screen">
      <div className="container mx-auto px-4">
        <ServicesHeader onBackToFeatures={handleBackToFeatures} />

        <ServicesSearch
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProviders.map((provider, index) => (
            <ServiceCard
              key={provider.id}
              provider={provider}
              index={index}
              onCall={handleCall}
              onWhatsApp={handleWhatsApp}
            />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">No services found</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Try adjusting your search or category filter</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NeedServices;
