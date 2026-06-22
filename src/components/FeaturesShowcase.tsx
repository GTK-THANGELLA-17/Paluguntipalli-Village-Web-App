import React from "react";
import { motion } from "framer-motion";
import { Brain, Users, Building2, Wrench, ArrowRight, Star, Bell, MapPin, MessageSquare, Lightbulb, Video } from "lucide-react";
import { useTranslation } from "react-i18next";
interface FeatureShowcaseProps {
  onSectionChange: (
    section:
      | 'quiz'
      | 'community'
      | 'business'
      | 'services'
      | 'why-use-app'
      | 'stay-updated'
      | 'village-map'
      | 'app-suggestions'
      | 'live-streaming'
      | null
  ) => void;
  onAIAssistantOpen?: () => void;
}


const FeaturesShowcase: React.FC<FeatureShowcaseProps> = ({ onSectionChange, onAIAssistantOpen }) => {
  const { t } = useTranslation();

  const handleSectionClick = (sectionId: string) => {
    
    if (sectionId === 'ai-assistant') {
      if (onAIAssistantOpen) {
        onAIAssistantOpen();
      } else {
        console.warn('onAIAssistantOpen function not provided');
      }
      return;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSectionChange(sectionId as any);
  };

  const features = [
  {
    id: 'village-map',
    title: 'Village Map',
    description: 'Explore Paluguntipalli through interactive maps with road and satellite views.',
    icon: MapPin,
    color: 'from-emerald-500 to-green-600',
    stats: 'Interactive Map'
  },
  {
    id: 'ai-assistant',
    title: 'Chat Assistant',
    description: 'Get instant help and navigate through the app with our smart Chat Assistant.',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-600',
    stats: 'Chat Support'
  },
  {
    id: 'app-suggestions',
    title: 'App Suggestions',
    description: 'Share your ideas to help improve our village app with new features and enhancements.',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-600',
    stats: 'Share Ideas'
  },
  {
    id: 'quiz',
    title: 'Daily Quiz',
    description: 'Test your knowledge about our village heritage and culture with fun daily quizzes.',
    icon: Brain,
    color: 'from-purple-500 to-indigo-600',
    stats: '5 Questions Daily'
  },
  {
    id: 'community',
    title: 'Community Stories',
    description: 'Share and discover heartwarming stories from our village community members.',
    icon: Users,
    color: 'from-orange-500 to-red-600',
    stats: '20+ Stories'
  },
  {
    id: 'business',
    title: 'Local Business',
    description: 'Discover local businesses, services, and support our village economy.',
    icon: Building2,
    color: 'from-blue-500 to-cyan-600',
    stats: '15+ Businesses'
  },
  {
    id: 'services',
    title: 'Service Directory',
    description: 'Find essential services, government offices, and important contacts in our village.',
    icon: Wrench,
    color: 'from-teal-500 to-blue-600',
    stats: '25+ Services'
  },
  {
    id: 'stay-updated',
    title: 'Stay Updated',
    description: 'Access real-time information through various APIs including weather, news, health tips, and market prices.',
    icon: Bell,
    color: 'from-green-500 to-emerald-600',
    stats: '5+ Categories'
  },
  {
    id: 'live-streaming',
    title: 'Live Streaming',
    description: 'Watch live events, festivals, and important updates directly from our village.',
    icon: Video,
    color: 'from-red-500 to-pink-500',
    stats: 'Live Now'
  },
  {
    id: 'why-use-app',
    title: 'Why Use Our App?',
    description: 'Discover the many benefits and features that make our village app special.',
    icon: Star,
    color: 'from-pink-500 to-rose-600',
    stats: 'Learn More'
  }
];


  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 font-playfair text-[#000000] dark:text-white">
            Explore Village Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover interactive features designed to connect you with our village community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleSectionClick(feature.id)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 p-6 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-heritage transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-heritage bg-heritage/10 px-3 py-1 rounded-full">
                      {feature.stats}
                    </span>
                    <ArrowRight 
                      size={20} 
                      className="text-gray-400 group-hover:text-heritage group-hover:translate-x-1 transition-all duration-300" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
