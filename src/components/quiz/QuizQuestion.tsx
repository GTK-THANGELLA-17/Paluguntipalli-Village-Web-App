
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestionData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion
}: QuizQuestionProps) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 dark:text-white leading-relaxed">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={showResult}
            whileHover={{ scale: showResult ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
              showResult
                ? index === question.correctAnswer
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : index === selectedAnswer && index !== question.correctAnswer
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  : 'border-gray-200 dark:border-gray-600'
                : selectedAnswer === index
                ? 'border-heritage bg-heritage/10 dark:bg-heritage/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-heritage hover:bg-heritage/5'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-base sm:text-lg">{option}</span>
              {showResult && (
                <div>
                  {index === question.correctAnswer && (
                    <CheckCircle className="text-green-500" size={24} />
                  )}
                  {index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
        >
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Did you know?</h4>
          <p className="text-blue-700 dark:text-blue-300">{question.explanation}</p>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center">
        {!showResult ? (
          <button
            onClick={onSubmitAnswer}
            disabled={selectedAnswer === null}
            className="min-h-11 bg-heritage text-white px-5 sm:px-8 py-3 rounded-lg font-semibold hover:bg-heritage-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={onNextQuestion}
            className="min-h-11 bg-heritage text-white px-5 sm:px-8 py-3 rounded-lg font-semibold hover:bg-heritage-dark transition-colors duration-300"
          >
            {isLastQuestion ? 'View Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
