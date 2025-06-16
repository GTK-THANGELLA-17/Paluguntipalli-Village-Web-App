
import { Lightbulb } from "lucide-react";

const SuggestionHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-heritage/10 rounded-full mb-4">
        <Lightbulb className="w-8 h-8 text-heritage" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-[#000000] dark:text-white">
        Share Your Ideas
      </h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Help us improve the Paluguntipalli Village App! Share your suggestions for new features, 
        improvements, or any ideas that could make our community platform better.
      </p>
    </div>
  );
};

export default SuggestionHeader;
