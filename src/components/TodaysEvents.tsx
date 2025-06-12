import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Keep Village Clean and Green",
    description:
      "Join us in keeping the village clean and green by participating in regular cleaning drives and planting trees.",
    time: "All-DAY ",
    location: "Village Green",
    image: "/VILLAGE START.jpg"
  },
  {
    id: 2,
    title: "Stay Safe, Drink Water",
    description:
      "As the summer temperatures rise, stay hydrated by drinking enough water throughout the day and maintaining your health.",
    time: "All-Day ",
    location: "Across the Village",
    image: "/Village.jpg"
  }
];

const TodaysEvents = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEventIndex(prevIndex =>
        prevIndex === eventsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = format(currentDate, "EEEE, MMMM d, yyyy");

  return (
    <section id="events-today" className="py-20 bg-white dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        {/* Static Title without motion or data-aos */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#000000] dark:text-white">
  Events Today in The Village
</h2>


        {/* Static date without animation */}
        <p className="text-center mb-8 font-medium text-lg text-[#000000] dark:text-white">
          <Calendar className="inline-block mr-2 mb-1" />
          {formattedDate}
        </p>

        <div className="relative h-[500px] md:h-[400px] overflow-hidden rounded-xl shadow-xl">
          <AnimatePresence mode="wait">
            {eventsData.map((event, index) => (
              activeEventIndex === index && (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 h-[200px] md:h-full">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-6 md:p-8 bg-white dark:bg-[#252525] flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2 font-playfair text-[#000000] dark:text-white">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="inline-block bg-heritage/20 dark:bg-white/20 px-3 py-1 text-sm font-medium rounded-full text-[#000000] dark:text-white">
                            {event.time}
                          </span>
                          <span className="inline-block bg-heritage/20 dark:bg-white/20 px-3 py-1 text-sm font-medium rounded-full text-[#000000] dark:text-white">
                            {event.location}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-200 mb-6">{event.description}</p>
                      </div>
                      <Button className="self-start hero-button">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Event pagination dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {eventsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveEventIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeEventIndex === index
                    ? 'bg-heritage scale-125 dark:bg-white'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaysEvents;
