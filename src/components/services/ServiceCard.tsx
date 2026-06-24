
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Star, MessageCircle } from "lucide-react";

interface ServiceProvider {
  id: number;
  name: string;
  service: string;
  phone: string;
  location: string;
  rating: number;
  availability: string;
  description: string;
  category: string;
  experience: string;
  icon: React.ReactNode;
  hasWhatsApp: boolean;
}

interface ServiceCardProps {
  provider: ServiceProvider;
  index: number;
  onCall: (phone: string) => void;
  onWhatsApp: (phone: string, name: string, service: string) => void;
}

const ServiceCard = ({ provider, index, onCall, onWhatsApp }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="feature-card bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
    >
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-md">
              {provider.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-800 dark:text-white">{provider.name}</h3>
              <p className="text-heritage font-semibold text-lg">{provider.service}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
            <Star className="text-yellow-500 fill-current" size={16} />
            <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">{provider.rating}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <MapPin size={18} className="text-heritage" />
            <span className="text-sm">{provider.location}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Clock size={18} className="text-heritage" />
            <span className="text-sm">{provider.availability}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{provider.description}</p>
          <div className="inline-block bg-heritage/10 text-heritage font-semibold text-xs px-3 py-1 rounded-full">
            Experience: {provider.experience}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onCall(provider.phone)}
            className="flex-1 bg-heritage text-white px-4 py-3 rounded-xl font-semibold hover:bg-heritage/90 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Phone size={18} />
            Call
          </button>
          
          {provider.hasWhatsApp && (
            <button
              onClick={() => onWhatsApp(provider.phone, provider.name, provider.service)}
              className="flex-1 bg-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>
          )}
        </div>
        
        {provider.hasWhatsApp && (
          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
              <MessageCircle size={12} />
              WhatsApp Available
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceCard;
