
import { Bell, Download, MapPin, Users, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

const features = [
  {
    icon: Bell,
    title: "Stay Updated",
    description: "Receive the latest updates about village news, events, and important announcements directly through the app.",
    image: "/BUS STAND.jpg"
  },
  {
    icon: Download,
    title: "Festival Memories",
    description: "During festivals like Peerla Panguda, access and download the latest photos and videos to preserve precious memories.",
    image: "/VILLAGE START.jpg"
  },
  {
    icon: MapPin,
    title: "Explore & Discover",
    description: "Learn about Paluguntipalli's rich culture, historical places, traditions, and hidden gems whether you're local or visiting.",
    image: "/Hanuman Statue.jpg"
  },
  {
    icon: Users,
    title: "Community Connection",
    description: "Connect with fellow villagers, stay informed about community activities, and be part of our growing digital family.",
    image: "/Peerla chavidi 1.jpg"
  }
];


const WhyUseApp = () => {
  return (
    <section id="why-use-app" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-heritage/10 to-white dark:from-[#1a1a1a] dark:to-[#252525]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-4"
          >
            <Star className="text-heritage dark:text-white mr-2" size={32} />
            <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white mb-16">Why Use Our Web App?</h2>
            <Heart className="text-red-500 ml-2" size={32} />
          </motion.div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the many benefits of staying connected with Paluguntipalli through our comprehensive village app. 
            From real-time updates to cultural exploration, we bring the heart of our village to your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={100 * index}
            >
              <div className="relative h-48 sm:h-56">
                <OptimizedImage
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  aspectRatio="aspect-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-heritage/90 dark:bg-white/90 rounded-full flex items-center justify-center">
                  <feature.icon size={24} className="text-white dark:text-[#000000]" />
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-playfair text-[#000000] dark:text-white group-hover:text-heritage dark:group-hover:text-heritage transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl shadow-xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 font-playfair text-[#000000] dark:text-white">
              Join Our Digital Village Community
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Whether you're a lifelong resident, someone who moved away but wants to stay connected, 
              or a curious visitor wanting to learn about our beautiful village, this app is your gateway 
              to experiencing the warmth and heritage of Paluguntipalli.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              <div className="flex items-center text-heritage dark:text-white">
                <Users size={20} className="mr-2" />
                <span className="font-medium text-sm sm:text-base">Community Driven</span>
              </div>
              <div className="flex items-center text-heritage dark:text-white">
                <Star size={20} className="mr-2" />
                <span className="font-medium text-sm sm:text-base">Always Updated</span>
              </div>
              <div className="flex items-center text-heritage dark:text-white">
                <Heart size={20} className="mr-2" />
                <span className="font-medium text-sm sm:text-base">Made with Love</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUseApp;
