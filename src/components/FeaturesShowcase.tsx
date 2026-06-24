import React from "react";
import { motion } from "framer-motion";
import { Brain, Users, Building2, Wrench, ArrowRight, Star, Bell, MapPin, MessageSquare, Lightbulb, Video } from "lucide-react";
import { useTranslation } from "react-i18next";

type FeatureSection =
  | 'quiz'
  | 'community'
  | 'business'
  | 'services'
  | 'why-use-app'
  | 'stay-updated'
  | 'village-map'
  | 'app-suggestions'
  | 'live-streaming';

type FeatureId = FeatureSection | 'ai-assistant';

interface FeatureShowcaseProps {
  onSectionChange: (section: FeatureSection | null) => void;
  onAIAssistantOpen?: () => void;
}

const features: Array<{
  id: FeatureId;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  stats: string;
}> = [
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
    description: 'Access weather, news, health tips, market prices, and useful community updates.',
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
    description: 'Discover the benefits and features that make our village app useful.',
    icon: Star,
    color: 'from-pink-500 to-rose-600',
    stats: 'Learn More'
  }
];

const FeaturesShowcase: React.FC<FeatureShowcaseProps> = ({ onSectionChange, onAIAssistantOpen }) => {
  const { t } = useTranslation();

  const handleSectionClick = (sectionId: FeatureId) => {
    if (sectionId === 'ai-assistant') {
      onAIAssistantOpen?.();
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSectionChange(sectionId);
  };

  return (
    <section id="features" className="py-10 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-[#252525] dark:via-[#2a2a2a] dark:to-[#252525]">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 font-playfair text-[#000000] dark:text-white leading-tight">
            Explore Village Features
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-1">
            Discover interactive features designed to connect you with our village community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
              viewport={{ once: true }}
              className="min-w-0"
            >
              <button
                type="button"
                onClick={() => handleSectionClick(feature.id)}
                className="group relative h-full min-h-[180px] w-full overflow-hidden rounded-2xl bg-white p-4 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-heritage/40 active:scale-[0.99] dark:bg-gray-800 sm:p-5 lg:p-6 touch-manipulation"
                aria-label={`Open ${feature.title}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10 group-focus-visible:opacity-10`} />

                <div className="relative z-10 flex h-full min-w-0 flex-col">
                  <div className={`mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12`}>
                    <feature.icon className="text-white" size={22} aria-hidden="true" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold leading-snug text-gray-800 transition-colors duration-300 group-hover:text-heritage dark:text-white dark:group-hover:text-heritage-light sm:text-xl">
                    {feature.title}
                  </h3>

                  <p className="mb-4 min-w-0 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                    {feature.description}
                  </p>

                  <div className="mt-auto flex min-w-0 items-center justify-between gap-3">
                    <span className="min-w-0 rounded-full bg-heritage/10 px-3 py-1 text-xs font-medium text-heritage sm:text-sm">
                      {feature.stats}
                    </span>
                    <ArrowRight
                      size={20}
                      className="shrink-0 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-heritage"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;