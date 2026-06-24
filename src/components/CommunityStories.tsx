
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import StoriesHeader from "./stories/StoriesHeader";
import StoriesFilter from "./stories/StoriesFilter";
import StoryCard from "./stories/StoryCard";
import { stories } from "./stories/storiesData";

interface CommunityStoriesProps {
  onClose: () => void;
}

const CommunityStories: React.FC<CommunityStoriesProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedStories, setLikedStories] = useState<number[]>([]);

  const categories = ["All", "Agriculture", "Childhood", "Festival", "Food"];

  const filteredStories = stories.filter(story => 
    selectedCategory === "All" || story.category === selectedCategory
  );

  const handleBackToFeatures = () => {
    onClose();
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLike = (storyId: number) => {
    setLikedStories(prev => 
      prev.includes(storyId) 
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  return (
    <section className="feature-section-shell py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] min-h-screen">
      <div className="feature-container container mx-auto px-3 sm:px-4 lg:px-6">
        <StoriesHeader onBackToFeatures={handleBackToFeatures} />

        <StoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {filteredStories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index}
              isLiked={likedStories.includes(story.id)}
              onLike={handleLike}
            />
          ))}
        </div>

        {filteredStories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500 dark:text-gray-400">No stories found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CommunityStories;
