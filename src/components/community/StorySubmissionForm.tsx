import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Quote, 
  Send, 
  Star,
  Trophy,
  Award,
  Heart,
  Check,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface StoryGameStats {
  points: number;
  level: string;
  badges: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    earned: boolean;
  }>;
}

const StorySubmissionForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    authorName: "",
    title: "",
    content: "",
    category: "",
    email: ""
  });

  const [gameStats, setGameStats] = useState<StoryGameStats>({
    points: 0,
    level: "Story Seeker",
    badges: [
      { id: "storyteller", title: "Storyteller", description: "Started writing your first story", icon: BookOpen, earned: false },
      { id: "wordsmith", title: "Wordsmith", description: "Wrote a detailed story (200+ words)", icon: Quote, earned: false },
      { id: "heritage_keeper", title: "Heritage Keeper", description: "Shared a story about village traditions", icon: Award, earned: false },
      { id: "community_voice", title: "Community Voice", description: "Successfully submitted your story", icon: Trophy, earned: false }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const categories = [
    "History & Traditions",
    "Agriculture & Farming",
    "Festivals & Celebrations", 
    "Community Stories",
    "Personal Memories",
    "Village Changes",
    "Local Heroes"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'content') {
      const words = value.trim().split(/\s+/).length;
      setWordCount(value.trim() ? words : 0);
    }
    
    // Award points for progress
    if (value.trim() && !formData[field as keyof typeof formData]) {
      awardPoints(10);
    }
    
    checkBadges();
  };

  const awardPoints = (points: number) => {
    setGameStats(prev => {
      const newPoints = prev.points + points;
      let newLevel = prev.level;
      
      if (newPoints >= 100) newLevel = "Village Chronicler";
      else if (newPoints >= 60) newLevel = "Story Master";
      else if (newPoints >= 30) newLevel = "Tale Weaver";
      
      return { ...prev, points: newPoints, level: newLevel };
    });
  };

  const checkBadges = () => {
    setGameStats(prev => {
      const newBadges = [...prev.badges];
      
      // Storyteller badge
      if (formData.title && !newBadges[0].earned) {
        newBadges[0].earned = true;
        awardPoints(15);
      }
      
      // Wordsmith badge
      if (wordCount >= 200 && !newBadges[1].earned) {
        newBadges[1].earned = true;
        awardPoints(25);
      }
      
      // Heritage Keeper badge
      if ((formData.category === "History & Traditions" || formData.category === "Festivals & Celebrations") && 
          formData.content.length > 100 && !newBadges[2].earned) {
        newBadges[2].earned = true;
        awardPoints(30);
      }
      
      return { ...prev, badges: newBadges };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Award final badge
    setGameStats(prev => {
      const newBadges = [...prev.badges];
      if (!newBadges[3].earned) {
        newBadges[3].earned = true;
      }
      return { ...prev, badges: newBadges };
    });
    
    awardPoints(40);
    
    // Prepare email content
    const emailSubject = `New Community Story: ${formData.title}`;
    const emailBody = `
Community Story Submission:

Author: ${formData.authorName}
Title: ${formData.title}
Category: ${formData.category}
Word Count: ${wordCount}
Contact Email: ${formData.email}

Story Content:
${formData.content}

Submitted on: ${new Date().toLocaleString()}
From: Paluguntipalli Village App - Community Stories
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:paluguntipalli@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center max-w-md mx-auto"
      >
        <div className="mb-6">
          <Heart className="text-red-500 mx-auto mb-4" size={64} />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Story Shared!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for sharing your story with our community!
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white mb-6">
          <div className="flex items-center justify-between mb-2">
            <span>Final Level:</span>
            <Badge variant="secondary">{gameStats.level}</Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Total Points:</span>
            <span className="font-bold">{gameStats.points}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Badges Earned:</span>
            <span className="font-bold">{gameStats.badges.filter(b => b.earned).length}/4</span>
          </div>
        </div>
        
        <Button onClick={onClose} className="w-full">
          Continue Exploring
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Stats Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Level: {gameStats.level}</h3>
            <p className="text-sm opacity-90">Points: {gameStats.points} | Words: {wordCount}</p>
          </div>
          <div className="flex items-center space-x-2">
            {gameStats.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-2 rounded-full ${
                  badge.earned ? 'bg-yellow-400 text-gray-800' : 'bg-white/20'
                }`}
                title={badge.earned ? badge.title : '???'}
              >
                <badge.icon size={16} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <Quote className="mr-2 text-heritage" />
            Share Your Story
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="authorName">Your Name *</Label>
              <Input
                id="authorName"
                value={formData.authorName}
                onChange={(e) => handleInputChange('authorName', e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="title">Story Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Give your story a compelling title"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-heritage/50 dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="content">Your Story *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Share your story, memory, or experience... (aim for 200+ words for the Wordsmith badge!)"
                className="min-h-[200px]"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Words: {wordCount} {wordCount >= 200 && "🏆"}
              </p>
            </div>
            
            <div>
              <Label htmlFor="email">Contact Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Sharing..." : "Share Story"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Badges & Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <Star className="mr-2 text-yellow-500" />
              Story Badges
            </h4>
            <div className="space-y-3">
              {gameStats.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex items-center p-3 rounded-lg ${
                    badge.earned 
                      ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' 
                      : 'bg-gray-50 dark:bg-gray-700/20'
                  }`}
                >
                  <div className={`p-2 rounded-full mr-3 ${
                    badge.earned ? 'bg-purple-100 dark:bg-purple-800' : 'bg-gray-200 dark:bg-gray-600'
                  }`}>
                    {badge.earned ? (
                      <Check className="text-purple-600 dark:text-purple-400" size={16} />
                    ) : (
                      <badge.icon className="text-gray-400" size={16} />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      badge.earned ? 'text-purple-800 dark:text-purple-200' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {badge.earned ? badge.title : '???'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {badge.earned ? badge.description : 'Keep writing to unlock!'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold mb-4 text-gray-800 dark:text-white">
              Writing Tips
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>• Share personal experiences and memories</p>
              <p>• Include specific details that make your story unique</p>
              <p>• Write about village traditions, changes, or people</p>
              <p>• Aim for 200+ words to earn the Wordsmith badge</p>
              <p>• Choose the most fitting category for your story</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StorySubmissionForm;
