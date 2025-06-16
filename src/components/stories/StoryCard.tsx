
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, User, Calendar } from "lucide-react";

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  category: string;
}

interface StoryCardProps {
  story: Story;
  index: number;
  isLiked: boolean;
  onLike: (storyId: number) => void;
}

const StoryCard = ({ story, index, isLiked, onLike }: StoryCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-heritage rounded-full flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div className="ml-3">
            <h4 className="font-semibold text-gray-800 dark:text-white">{story.author}</h4>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} className="mr-1" />
              {new Date(story.date).toLocaleDateString()}
            </div>
          </div>
          <span className="ml-auto px-3 py-1 bg-heritage/10 text-heritage text-sm font-medium rounded-full">
            {story.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
          {story.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {story.content}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(story.id)}
              className={`flex items-center space-x-2 transition-colors duration-300 ${
                isLiked
                  ? 'text-red-500'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart 
                size={18} 
                className={isLiked ? 'fill-current' : ''} 
              />
              <span className="text-sm">
                {story.likes + (isLiked ? 1 : 0)}
              </span>
            </button>

            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle size={18} />
              <span className="text-sm">{story.comments}</span>
            </div>
          </div>

          <button className="flex items-center space-x-2 text-gray-500 hover:text-heritage transition-colors duration-300">
            <Share2 size={18} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default StoryCard;
