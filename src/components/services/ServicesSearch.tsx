
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface ServicesSearchProps {
  searchTerm: string;
  selectedCategory: string;
  categories: Array<{ id: string; name: string; count: number }>;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
}

const ServicesSearch = ({ 
  searchTerm, 
  selectedCategory, 
  categories, 
  onSearchChange, 
  onCategoryChange 
}: ServicesSearchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12 space-y-6"
    >
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for services or providers..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-heritage/50 shadow-lg text-lg"
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-heritage text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-heritage/10 hover:scale-105 border border-gray-200 dark:border-gray-700 shadow-md'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesSearch;
