import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import QuizHeader from "./quiz/QuizHeader";
import QuizCompletion from "./quiz/QuizCompletion";
import QuizQuestion from "./quiz/QuizQuestion";
import { dailyQuestions } from "./quiz/quizData";

const DailyQuiz = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleBackToFeatures = () => {
    onClose();
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === dailyQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < dailyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <QuizCompletion
        score={score}
        totalQuestions={dailyQuestions.length}
        onResetQuiz={resetQuiz}
        onBackToFeatures={handleBackToFeatures}
      />
    );
  }

  const currentQ = dailyQuestions[currentQuestion];

  return (
    <section className="feature-section-shell py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-purple-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] min-h-screen">
      <div className="feature-container container mx-auto px-3 sm:px-4 lg:px-6">
        <QuizHeader onBackToFeatures={handleBackToFeatures} />

        <div className="w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-heritage to-heritage-dark text-white p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm opacity-75">Question {currentQuestion + 1} of {dailyQuestions.length}</div>
                  <div className="text-sm opacity-75">{currentQ.category}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-sm opacity-75">Score</div>
                  <div className="text-xl font-bold">{score}</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-white/20 rounded-full h-2">
                <motion.div
                  className="bg-white rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / dailyQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <QuizQuestion
              question={currentQ}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              onAnswerSelect={handleAnswerSelect}
              onSubmitAnswer={handleSubmitAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={currentQuestion >= dailyQuestions.length - 1}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DailyQuiz;