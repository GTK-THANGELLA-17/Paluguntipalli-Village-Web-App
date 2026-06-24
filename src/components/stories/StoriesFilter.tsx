interface StoriesFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const StoriesFilter = ({ categories, selectedCategory, onCategoryChange }: StoriesFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`min-h-11 px-4 sm:px-6 py-2 rounded-full font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-heritage/30 ${
            selectedCategory === category
              ? 'bg-heritage text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-heritage/10'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default StoriesFilter;