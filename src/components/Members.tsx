
import { Users, Award, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

const members = [
  {
    name: "Village Elder",
    position: "Community Leader", 
    avatar: "/smile.jpg",
    icon: Award,
    description: "Guiding the community with wisdom and experience"
  },
  {
    name: "Temple Priest",
    position: "Religious Guide",
    avatar: "/smile.jpg",
    icon: Heart,
    description: "Preserving spiritual traditions and customs"
  },
  {
    name: "Youth Leader", 
    position: "Community Organizer",
    avatar: "/smile.jpg",
    icon: Star,
    description: "Organizing events and youth activities"
  },
  {
    name: "School Principal",
    position: "Education Leader",
    avatar: "/smile.jpg",
    icon: Users,
    description: "Nurturing future generations through education"
  }
];

const Members = () => {
  return (
    <section id="members" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-[#1a1a1a] dark:to-[#2a2a3a]">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Village Members
        </motion.h2>
        
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-8 sm:mb-12" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-base sm:text-lg text-[#000000] dark:text-white">
            Paluguntipalli is home to a close-knit community with generations of heritage. 
            The residents are known for their warm hospitality and welcoming nature.
          </p>
        </motion.div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Enhanced Background Decorations */}
          <motion.div 
            className="absolute -top-8 -left-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full border-2 sm:border-4 border-heritage dark:border-white opacity-20"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute -bottom-8 -right-8 w-12 sm:w-16 h-12 sm:h-16 rounded-full border-2 border-heritage dark:border-white opacity-20"
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Enhanced Main Content */}
          <motion.div 
            className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-heritage to-blue-600 dark:from-white/20 dark:to-blue-400/20 flex items-center justify-center mr-3 sm:mr-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                animate={{ 
                  boxShadow: [
                    "0 4px 20px rgba(59, 130, 246, 0.3)",
                    "0 8px 30px rgba(59, 130, 246, 0.5)",
                    "0 4px 20px rgba(59, 130, 246, 0.3)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Users size={20} className="sm:w-7 sm:h-7 text-white dark:text-blue-300" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-playfair text-[#000000] dark:text-white">
                Community Leaders
              </h3>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {members.map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 + (index * 0.1) }}
                    whileHover={{ y: -10 }}
                  >
                    <motion.div 
                      className="relative mb-4 sm:mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden mx-auto border-4 border-heritage dark:border-white shadow-xl relative"
                        whileHover={{ 
                          borderColor: "#3B82F6",
                          boxShadow: "0 8px 30px rgba(59, 130, 246, 0.4)"
                        }}
                      >
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-heritage/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <IconComponent size={16} className="text-white" />
                        </motion.div>
                      </motion.div>
                      
                      {/* Floating Icon */}
                      <motion.div 
                        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-heritage to-blue-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <IconComponent size={14} className="text-white" />
                      </motion.div>
                    </motion.div>
                    
                    <motion.h4 
                      className="font-bold text-base sm:text-lg mb-2 text-[#000000] dark:text-white"
                      whileHover={{ color: "#3B82F6" }}
                      transition={{ duration: 0.2 }}
                    >
                      {member.name}
                    </motion.h4>
                    
                    <motion.p 
                      className="text-sm sm:text-base text-heritage dark:text-blue-300 font-medium mb-2"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                    >
                      {member.position}
                    </motion.p>
                    
                    <motion.p 
                      className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.description}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div 
              className="mt-10 sm:mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.p 
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                These representatives work together to preserve our village traditions and guide community activities.
                Each member brings unique skills and perspectives to help Paluguntipalli thrive as a harmonious community
                where heritage and modernity coexist beautifully.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Members;
