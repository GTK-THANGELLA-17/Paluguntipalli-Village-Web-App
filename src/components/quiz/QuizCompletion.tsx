
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, X, RotateCcw, Home } from "lucide-react";

interface QuizCompletionProps {
  score: number;
  totalQuestions: number;
  onResetQuiz: () => void;
  onBackToFeatures: () => void;
}

const QuizCompletion = ({ score, totalQuestions, onResetQuiz, onBackToFeatures }: QuizCompletionProps) => {
  return (
    <section className="feature-section-shell py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-green-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] min-h-screen">
      <div className="feature-container container mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-8 shadow-xl relative">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
              <button
                onClick={onBackToFeatures}
                className="min-h-11 justify-center rounded-full px-3 flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Features
              </button>
              <button
                onClick={onBackToFeatures}
                className="min-h-11 min-w-11 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            <Trophy className="text-yellow-500 mx-auto mb-4" size={64} />
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              Quiz Complete!
            </h3>
            <div className="text-5xl sm:text-6xl font-bold text-heritage mb-4">{score}</div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              out of {totalQuestions} correct
            </p>
            
            <div className="space-y-3">
              <button
                onClick={onResetQuiz}
                className="w-full min-h-11 bg-heritage text-white px-6 py-3 rounded-lg font-semibold hover:bg-heritage-dark transition-colors duration-300 flex items-center justify-center"
              >
                <RotateCcw size={16} className="mr-2" />
                Play Again
              </button>
              <button
                onClick={onBackToFeatures}
                className="w-full min-h-11 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
              >
                <Home size={16} className="mr-2" />
                Back to Features
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuizCompletion;
