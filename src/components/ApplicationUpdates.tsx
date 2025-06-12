
import { useState, useEffect } from "react";
import { AlertTriangle, Info, Clock, Users, CheckCircle, XCircle, AlertCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Update {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

const ApplicationUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      title: 'High Traffic Alert',
      message: 'Due to increased user activity during festival season, please limit photo downloads to ensure the app remains accessible for everyone. Thank you for your cooperation!',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: 'high'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-orange-500" size={20} />;
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'error': return <XCircle className="text-red-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <section id="app-updates" className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 to-red-100 dark:from-[#2a1810] dark:to-[#2a1a1a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="text-orange-500 mr-2" size={32} />
            <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16">
              Application News
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Important updates and alerts for your village app experience
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-xl border border-orange-200 dark:border-orange-800/30 overflow-hidden mb-6"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {getIcon(update.type)}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-[#000000] dark:text-white">
                      {update.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getBadgeColor(update.priority)}>
                      {update.priority.toUpperCase()}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {getTimeAgo(update.timestamp)}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {update.message}
                </p>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center text-orange-800 dark:text-orange-300">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm font-medium">
                      Current Status: High user activity detected - Please be mindful of usage
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <div className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-[#000000] dark:text-white">
                Stay Connected
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We'll keep you updated with the latest app improvements and important notices.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationUpdates;
