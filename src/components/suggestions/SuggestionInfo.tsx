
import { Send } from "lucide-react";

const SuggestionInfo = () => {
  return (
    <>
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
          <Send className="w-4 h-4 mr-2" />
          How it works
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          When you click "Submit Suggestion", your default email client will open with a pre-filled message 
          containing your suggestion details. You can review and send it directly to our development team at imgtk17@gmail.com.
        </p>
      </div>

      <div className="mt-8 p-4 bg-heritage/5 rounded-lg border border-heritage/20">
        <h4 className="font-semibold text-heritage mb-2">What happens next?</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Your suggestion will be sent directly to our development team</li>
          <li>• We review all suggestions and prioritize based on community needs</li>
          <li>• You may receive a follow-up email if we need more details</li>
          <li>• Implemented suggestions will be announced in app updates</li>
        </ul>
      </div>
    </>
  );
};

export default SuggestionInfo;
