
import { Bell, Calendar, Sparkles, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface Announcement {
  title: string;
  date: string;
  description?: string;
  important?: boolean;
}

const announcements: Announcement[] = [
  {
    title: "Peerla Panduga",
    date: "July 2025",
    description: "Annual celebration with cultural performances and traditional rituals.",
    important: true
  },
  {
    title: "Pedda Sarigesu",
    date: "July 27, 2025",
    description: "Special ceremony at the village temple with community gathering.",
    important: true
  }
];

const Announcements = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 1.1, 1],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="important" className="py-20 bg-gradient-to-br from-heritage-bg via-purple-50 to-blue-50 dark:from-[#252525] dark:via-[#1a1a2e] dark:to-[#16213e] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-heritage/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-heritage text-white p-4 rounded-full shadow-xl mr-4"
            >
              <Sparkles size={32} />
            </motion.div>
            <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16">
              Important Announcements
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
          >
            Stay updated with the latest events and important notices from our village community
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-charcoal rounded-3xl shadow-2xl overflow-hidden border border-heritage/20 dark:border-white/10">
            {announcements.map((announcement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                className={`p-8 border-b border-gray-100 dark:border-gray-700 flex items-start relative overflow-hidden ${
                  announcement.important ? 'bg-gradient-to-r from-heritage-bg to-purple-50 dark:from-slate/10 dark:to-purple-900/10' : ''
                } ${index === announcements.length - 1 ? 'border-b-0' : ''}`}
              >
                {/* Animated background for important announcements */}
                {announcement.important && (
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-heritage/5 via-purple-500/5 to-blue-500/5"
                  />
                )}

                <motion.div
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`w-16 h-16 rounded-2xl ${
                    announcement.important 
                      ? 'bg-gradient-to-br from-heritage to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-white'
                  } flex items-center justify-center mr-6 shrink-0 relative z-10`}
                >
                  {announcement.important ? (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bell size={24} />
                    </motion.div>
                  ) : (
                    <Calendar size={24} />
                  )}
                  
                  {announcement.important && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <Star size={12} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
                
                <div className="flex-1 relative z-10">
                  <div className="flex items-center flex-wrap gap-3 mb-3">
                    <motion.h4
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-xl text-[#403E43] dark:text-white"
                    >
                      {announcement.title}
                    </motion.h4>
                    {announcement.important && (
                      <motion.span
                        animate={{ 
                          scale: [1, 1.1, 1],
                          boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="bg-gradient-to-r from-heritage to-red-500 text-white text-sm py-1 px-3 rounded-full font-medium shadow-lg flex items-center"
                      >
                        <Zap size={14} className="mr-1" />
                        Important
                      </motion.span>
                    )}
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    className="text-heritage font-semibold mt-2 dark:text-heritage-light text-lg"
                  >
                    {announcement.date}
                  </motion.p>
                  
                  {announcement.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {announcement.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 bg-gradient-to-r from-gray-50 to-heritage-bg dark:from-gray-800 dark:to-slate/20 text-center relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-heritage/5 via-purple-500/5 to-blue-500/5"
              />
              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 dark:text-gray-300 font-medium text-lg relative z-10"
              >
                Stay tuned for more upcoming events and announcements! 🎉
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Announcements;
