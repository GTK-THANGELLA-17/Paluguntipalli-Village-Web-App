
import { motion } from "framer-motion";
import GalleryItem from './GalleryItem';
import { useState } from "react";
import { Grid, List, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GalleryGridProps {
  items: any[];
  onItemSelect: (item: any) => void;
  isLoading?: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items, onItemSelect, isLoading = false }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'type'>('default');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedItems = items
    .filter(item => 
      item.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.alt.localeCompare(b.alt);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return 0;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-4 w-full">
      <motion.div 
        className="flex flex-col gap-4 p-3 sm:p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile-first layout with stacked elements */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filteredAndSortedItems.length} of {items.length} items
            </span>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                disabled={isLoading}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                } disabled:opacity-50`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                disabled={isLoading}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'masonry' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                } disabled:opacity-50`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-48 bg-white dark:bg-gray-700"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500 flex-shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                disabled={isLoading}
                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 w-full sm:w-auto"
              >
                <option value="default">Default Order</option>
                <option value="name">Sort by Name</option>
                <option value="type">Sort by Type</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {filteredAndSortedItems.length > 0 ? (
        <motion.div 
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              : 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6'
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAndSortedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              variants={itemVariants}
              className={viewMode === 'masonry' ? 'break-inside-avoid mb-4 sm:mb-6' : ''}
            >
              <GalleryItem 
                item={item} 
                index={index} 
                onSelect={onItemSelect}
                disabled={isLoading}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-12 sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg px-4">
            {searchTerm ? `No items found for "${searchTerm}"` : 'No items available'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryGrid;
