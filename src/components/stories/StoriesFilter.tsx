
interface StoriesFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const StoriesFilter = ({ categories, selectedCategory, onCategoryChange }: StoriesFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
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
