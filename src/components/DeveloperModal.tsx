import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Globe, Twitter, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface DeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const images = [
  "/Developer Model/GTK PIC.jpg",
  "/Developer Model/gtk 2.jpg",
  "/Developer Model/GTK.png",
  "/Developer Model/GTK-THANGELLA-1.JPG",
  "/Developer Model/GTK-THANGELLA.jpg",
];

const developerLinks = [
  { icon: <Github />, label: "GitHub", url: "https://github.com" },
  { icon: <Linkedin className="text-blue-600" />, label: "LinkedIn", url: "https://www.linkedin.com/in/gthangella/" },
  { icon: <Twitter className="text-blue-400" />, label: "Twitter", url: "https://twitter.com/g_thangella" },
  { icon: <Instagram className="text-pink-500" />, label: "Instagram", url: "https://www.instagram.com/g_thangella_k" },
  { icon: <Mail className="text-red-500" />, label: "Email", url: "mailto:imgtk17@gmail.com" },
  { icon: <Globe className="text-green-500" />, label: "Portfolio", url: "https://thangella-creaftech-solutions.vercel.app/" },
];

export function DeveloperModal({ open, onOpenChange }: DeveloperModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto rounded-lg p-4 bg-white dark:bg-[#1a1a1a] border dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-center text-black dark:text-white">
            Meet the Developer
          </DialogTitle>
          <DialogDescription className="text-xs text-center text-gray-600 dark:text-gray-300">
            Behind the Paluguntipalli Village application
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4 pt-4"
        >
          {/* Slideshow Avatar */}
          <div className="relative h-32 w-32 overflow-hidden rounded-lg border dark:border-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentImageIndex]}
                src={images[currentImageIndex]}
                alt="G. Thangella"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-base font-semibold text-black dark:text-white">
              Gadidamalla Thangella
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line leading-snug">
              Son of Gadidamalla Kasaiah{"\n"}
              This is my village — Paluguntipalli. I'm a village member.{"\n"}
              My grandparents, and my babai still live there.{"\n"}
              I currently live and work in Hyderabad.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 leading-snug">
              💼 Entrepreneur{"  "}
              🧠 Tech Explorer{"  "}
              🎨 Creative Thinker{"  "}
              🔭 Visionary
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 flex-wrap justify-center mt-2">
            {developerLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.1 }}
                className="h-8 w-8 flex items-center justify-center rounded-full border dark:border-white hover:bg-heritage hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                {React.cloneElement(link.icon, { className: "h-4 w-4" })}
              </motion.a>
            ))}
          </div>

          {/* Mission and Description */}
          <div className="w-full text-xs space-y-3 mt-4 text-gray-700 dark:text-gray-300 text-center sm:text-left">
            <p>
              This application was developed to keep our Paluguntipalli villagers informed and connected.
              You can explore festival highlights, download cultural and village media, and stay updated with local news, events, and traditions.
            </p>
            <div>
              <h4 className="font-medium text-sm mb-1 text-black dark:text-white">
                Mission
              </h4>
              <p>
                I'm focused on creating meaningful digital products that make a difference.
                With this app, I hope to preserve our village's culture and help every resident stay connected and informed through simple, effective technology.
              </p>
            </div>
          </div>
        </motion.div>

        <Separator className="my-4 dark:bg-gray-600" />

        <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-xs sm:text-sm bg-black text-white border-black hover:bg-gray-800 dark:border-white"
          >
            Close
          </Button>
          <Button
            variant="default"
            asChild
            className="text-xs sm:text-sm bg-black text-white hover:bg-gray-800"
          >
            <a href="mailto:imgtk17@gmail.com" target="_blank" rel="noopener noreferrer">
              Get in Touch
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeveloperModal;
