import { motion } from "framer-motion";
import { MapPin, Users, Calendar, Award, ThermometerSun, School, Train } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-heritage" />,
      number: "5645",
      label: "Population",
      description: "Residents living in Palugutipalli village"
    },
    {
      icon: <Calendar className="w-8 h-8 text-heritage" />,
      number: "200+",
      label: "Years of Heritage",
      description: "A culturally rich village with historic traditions"
    },
    {
      icon: <MapPin className="w-8 h-8 text-heritage" />,
      number: "5+",
      label: "Sacred Sites",
      description: "Temples and historical places to visit"
    },
    {
      icon: <Award className="w-8 h-8 text-heritage" />,
      number: "2+",
      label: "Major Festivals",
      description: "Peerla Panduga and traditional village celebrations"
    }
  ];

  const villageInfo = [
    { icon: <MapPin className="w-5 h-5 text-heritage" />, label: "Location", value: "Palugutipalli, Racherla Mandal, Prakasam, Andhra Pradesh" },
    { icon: <ThermometerSun className="w-5 h-5 text-heritage" />, label: "Elevation", value: "231 meters above sea level" },
    { icon: <Train className="w-5 h-5 text-heritage" />, label: "Nearest Railway", value: "Gudimetta & Somidevipalle Stations" },
    { icon: <School className="w-5 h-5 text-heritage" />, label: "Nearby Colleges", value: "St. Ann's College, Govt Jr College, Pidathala Polytechnic" },
    { icon: <Calendar className="w-5 h-5 text-heritage" />, label: "Weather", value: "Temp: 31.2°C | Humidity: 51% | Overcast clouds" },
    { icon: <Users className="w-5 h-5 text-heritage" />, label: "Language", value: "Telugu (Official)" },
    { icon: <MapPin className="w-5 h-5 text-heritage" />, label: "PIN Code", value: "523368 (Post Office: Racherla)" },
    { icon: <Award className="w-5 h-5 text-heritage" />, label: "Assembly MLA", value: "Anna Rambabu" },
    { icon: <Award className="w-5 h-5 text-heritage" />, label: "Parliament MP", value: "Magunta Sreenivasulu Reddy" }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-orange-50 to-white dark:from-[#1a1a1a] dark:to-[#252525] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-heritage rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-heritage rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-playfair text-[#000000] dark:text-white">
            {t('About Our Village')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the cultural roots, traditions, and unique lifestyle of Palugutipalli – a village that reflects the soul of Andhra Pradesh.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-heritage mb-2 font-playfair">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Heritage Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/VILLAGE START.jpg"
              alt="Palugutipalli Landscape"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-[#000000] dark:text-white">
              Our Rich Heritage
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Palugutipalli is a peaceful village in Racherla Mandal of Prakasam district, surrounded by hills, rivers, and fertile lands. It proudly maintains age-old traditions, celebrates vibrant festivals, and thrives with community warmth.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you're here for the sacred temples, the scenic nature, or the hospitality, Palugutipalli offers a glimpse into Andhra’s timeless rural charm.
            </p>
          </motion.div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {villageInfo.map((info, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white dark:bg-[#2a2a2a] p-4 rounded-lg shadow-md">
              <div>{info.icon}</div>
              <div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">{info.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
