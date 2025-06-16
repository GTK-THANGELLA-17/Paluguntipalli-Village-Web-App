
import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Star, ShoppingBag, Utensils, Stethoscope, Wrench, Store } from "lucide-react";

interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
  rating: number;
  image: string;
  featured: boolean;
  services: string[];
}

interface BusinessCardProps {
  business: Business;
  index: number;
  isFeatured?: boolean;
}

const categoryIcons = {
  "General Store": ShoppingBag,
  "Restaurant": Utensils,
  "Healthcare": Stethoscope,
  "Repair Shop": Wrench,
};

const BusinessCard = ({ business, index, isFeatured = false }: BusinessCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-heritage/20"
      >
        <div className="relative h-48">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-heritage text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white">
              {business.name}
            </h4>
            <div className="flex items-center">
              {renderStars(business.rating)}
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {business.rating}
              </span>
            </div>
          </div>
          
          <div className="flex items-center mb-2">
            {React.createElement(categoryIcons[business.category as keyof typeof categoryIcons] || Store, {
              size: 16,
              className: "text-heritage mr-2"
            })}
            <span className="text-sm font-medium text-heritage">{business.category}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">{business.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Phone size={16} className="mr-2 text-heritage" />
              {business.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <MapPin size={16} className="mr-2 text-heritage" />
              {business.address}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock size={16} className="mr-2 text-heritage" />
              {business.hours}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {business.services.slice(0, 3).map((service, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-32">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
            {business.name}
          </h4>
          <div className="flex items-center">
            {renderStars(business.rating)}
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          {React.createElement(categoryIcons[business.category as keyof typeof categoryIcons] || Store, {
            size: 14,
            className: "text-heritage mr-1"
          })}
          <span className="text-xs font-medium text-heritage">{business.category}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{business.description}</p>
        
        <div className="space-y-1">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
            <Phone size={12} className="mr-2 text-heritage" />
            {business.phone}
          </div>
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
            <Clock size={12} className="mr-2 text-heritage" />
            {business.hours}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCard;
