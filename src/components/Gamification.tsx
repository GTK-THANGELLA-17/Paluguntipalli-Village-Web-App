
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Users, Target, ArrowLeft, Gamepad2, Zap, Home } from "lucide-react";
import { Button } from "./ui/button";

interface GamificationProps {
  onClose?: () => void;
}

const Gamification: React.FC<GamificationProps> = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleBackClick = () => {
    if (onClose) {
      onClose();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlayMatchingGame = () => {
    // Simple matching game implementation
    alert("🎮 Village Matching Game Starting!\n\nMatch the following:\n• Temple ↔ Worship Place\n• Well ↔ Water Source\n• Farm ↔ Agriculture\n\nThis is a demo version. Full game coming soon!");
  };

  const handlePlaySnakeGame = () => {
    // Simple snake game implementation
    alert("🐍 Village Snake Game Starting!\n\nUse arrow keys to:\n• Guide snake through village paths\n• Collect mangoes and rice\n• Avoid hitting walls\n\nThis is a demo version. Full game coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] py-20">
      <div className="container mx-auto px-4">
        {/* Back Button positioned below navbar on the right */}
        <div className="fixed top-20 right-4 z-50">
          <Button
            onClick={handleBackClick}
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-800 shadow-lg"
          >
            <Home size={16} className="mr-2" />
            Back to Village
          </Button>
        </div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Trophy className="text-heritage dark:text-white mr-3" size={36} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-0 font-playfair text-[#000000] dark:text-white">
              Games & Challenges
            </h2>
          </motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Engage with your community through fun games and challenges
          </p>
        </div>

        {/* Village Games */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Matching Game */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Gamepad2 className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Village Matching Game</h3>
                <p className="text-gray-600 dark:text-gray-300">Match village landmarks and traditions</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">How to Play</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Match village landmarks with their names</li>
                  <li>• Connect traditional items with their uses</li>
                  <li>• Complete levels to unlock new challenges</li>
                </ul>
              </div>
              <Button 
                onClick={handlePlayMatchingGame}
                className="w-full bg-heritage hover:bg-heritage/90"
              >
                Play Matching Game
              </Button>
            </div>
          </motion.div>

          {/* Snake Game */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Village Snake Game</h3>
                <p className="text-gray-600 dark:text-gray-300">Navigate through village paths</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">How to Play</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Guide the snake through village streets</li>
                  <li>• Collect traditional food items</li>
                  <li>• Avoid obstacles and grow longer</li>
                </ul>
              </div>
              <Button 
                onClick={handlePlaySnakeGame}
                className="w-full bg-heritage hover:bg-heritage/90"
              >
                Play Snake Game
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
