
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Store, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  Trophy,
  Award,
  Gift,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  earned: boolean;
}

interface GameStats {
  points: number;
  level: string;
  achievements: Achievement[];
}

const BusinessSubmissionForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    description: "",
    phone: "",
    address: "",
    hours: "",
    services: "",
    ownerName: "",
    email: ""
  });

  const [gameStats, setGameStats] = useState<GameStats>({
    points: 0,
    level: "Newcomer",
    achievements: [
      { id: "first_step", title: "First Step", description: "Started business registration", icon: Star, earned: false },
      { id: "detail_master", title: "Detail Master", description: "Filled all required fields", icon: Award, earned: false },
      { id: "community_builder", title: "Community Builder", description: "Submitted business details", icon: Trophy, earned: false }
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Award points for filling fields
    if (value.trim() && !formData[field as keyof typeof formData]) {
      awardPoints(10);
    }
    
    // Check for achievements
    checkAchievements();
  };

  const awardPoints = (points: number) => {
    setGameStats(prev => {
      const newPoints = prev.points + points;
      let newLevel = prev.level;
      
      if (newPoints >= 100) newLevel = "Business Expert";
      else if (newPoints >= 50) newLevel = "Entrepreneur";
      else if (newPoints >= 20) newLevel = "Starter";
      
      return { ...prev, points: newPoints, level: newLevel };
    });
  };

  const checkAchievements = () => {
    setGameStats(prev => {
      const newAchievements = [...prev.achievements];
      
      // First step achievement
      if (formData.businessName && !newAchievements[0].earned) {
        newAchievements[0].earned = true;
        awardPoints(20);
      }
      
      // Detail master achievement
      const filledFields = Object.values(formData).filter(val => val.trim()).length;
      if (filledFields >= 6 && !newAchievements[1].earned) {
        newAchievements[1].earned = true;
        awardPoints(30);
      }
      
      return { ...prev, achievements: newAchievements };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Award final achievement
    setGameStats(prev => {
      const newAchievements = [...prev.achievements];
      if (!newAchievements[2].earned) {
        newAchievements[2].earned = true;
      }
      return { ...prev, achievements: newAchievements };
    });
    
    awardPoints(50);
    
    // Prepare email content
    const emailSubject = `New Business Submission: ${formData.businessName}`;
    const emailBody = `
Business Registration Details:

Business Name: ${formData.businessName}
Category: ${formData.category}
Description: ${formData.description}
Phone: ${formData.phone}
Address: ${formData.address}
Hours: ${formData.hours}
Services: ${formData.services}
Owner Name: ${formData.ownerName}
Contact Email: ${formData.email}

Submitted on: ${new Date().toLocaleString()}
From: Paluguntipalli Village App
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:imgtk17@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
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
          <Trophy className="text-yellow-500 mx-auto mb-4" size={64} />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your business has been submitted successfully!
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-heritage to-heritage-dark rounded-lg p-4 text-white mb-6">
          <div className="flex items-center justify-between mb-2">
            <span>Final Level:</span>
            <Badge variant="secondary">{gameStats.level}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Points:</span>
            <span className="font-bold">{gameStats.points}</span>
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
        className="bg-gradient-to-r from-heritage to-heritage-dark rounded-lg p-4 text-white mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Level: {gameStats.level}</h3>
            <p className="text-sm opacity-90">Points: {gameStats.points}</p>
          </div>
          <div className="flex items-center space-x-2">
            {gameStats.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-yellow-400 text-gray-800' : 'bg-white/20'
                }`}
                title={achievement.earned ? achievement.title : '???'}
              >
                <achievement.icon size={20} />
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
            <Store className="mr-2 text-heritage" />
            Register Your Business
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Enter your business name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="e.g., Restaurant, Store, Service"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your business and services"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="hours">Business Hours</Label>
                <Input
                  id="hours"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', e.target.value)}
                  placeholder="9:00 AM - 6:00 PM"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Your business address"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="services">Services Offered</Label>
              <Input
                id="services"
                value={formData.services}
                onChange={(e) => handleInputChange('services', e.target.value)}
                placeholder="List your main services (comma separated)"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit Business"}
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

        {/* Achievements & Rewards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <Trophy className="mr-2 text-yellow-500" />
              Achievements
            </h4>
            <div className="space-y-3">
              {gameStats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-center p-3 rounded-lg ${
                    achievement.earned 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-700/20'
                  }`}
                >
                  <div className={`p-2 rounded-full mr-3 ${
                    achievement.earned ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'
                  }`}>
                    {achievement.earned ? (
                      <Check className="text-green-600 dark:text-green-400" size={16} />
                    ) : (
                      <achievement.icon className="text-gray-400" size={16} />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      achievement.earned ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.earned ? achievement.title : '???'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.earned ? achievement.description : 'Keep going to unlock!'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center">
              <Gift className="mr-2 text-purple-500" />
              Session Rewards
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                <span className="text-sm">Business Registration</span>
                <Badge variant="secondary">+50 pts</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                <span className="text-sm">Complete Profile</span>
                <Badge variant="secondary">+30 pts</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                <span className="text-sm">Each Field Filled</span>
                <Badge variant="secondary">+10 pts</Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessSubmissionForm;
