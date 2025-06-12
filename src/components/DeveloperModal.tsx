
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Globe, Twitter } from "lucide-react";

export interface DeveloperModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeveloperModal({ open, onOpenChange }: DeveloperModalProps) {
  const developerLinks = [
    { icon: <Github className="h-3 w-3 sm:h-4 sm:w-4" />, label: "GitHub", url: "https://github.com" },
    { icon: <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />, label: "LinkedIn", url: "https://www.linkedin.com/in/gthangella/" },
    { icon: <Twitter className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />, label: "Twitter", url: "https://twitter.com/g_thangella" },
    { icon: <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />, label: "Email", url: "mailto:imgtk17@gmail.com" },
    { icon: <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />, label: "Portfolio", url: "https://thangella-creaftech-solutions.vercel.app/" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto rounded-lg p-3 sm:p-4 bg-white dark:bg-[#1a1a1a] border dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-base lg:text-lg text-center text-[#000000] dark:text-white">
            Meet the Developer
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-gray-600 dark:text-gray-300">
            Behind the Paluguntipalli Village application
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
          {/* Avatar & Info */}
          <div className="flex flex-col items-center text-center w-full">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border border-heritage dark:border-white mb-2 sm:mb-3">
              <AvatarImage src="/GTK.JPG" alt="G. Thangella" />
              <AvatarFallback className="text-xs sm:text-sm">GT</AvatarFallback>
            </Avatar>
            <h3 className="text-xs sm:text-sm font-semibold text-[#000000] dark:text-white">G. Thangella</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line leading-snug">
              💼 Entrepreneur{"\n"}
              🧠 Tech Explorer{"\n"}
              🎨 Creative Thinker{"\n"}
              🔭 Visionary
            </p>

            <div className="flex gap-1 mt-2 flex-wrap justify-center">
              {developerLinks.map((link, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  size="icon" 
                  asChild 
                  className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-heritage dark:border-white hover:bg-heritage hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs w-full">
            <p className="text-gray-700 dark:text-gray-300 text-center sm:text-left">
              I build impactful digital tools to simplify complex systems. The Paluguntipalli Village app reflects my passion for cultural preservation and accessible design.
            </p>

            <div>
              <h4 className="font-medium text-xs sm:text-sm mb-1 text-[#000000] dark:text-white">Tech Stack of This Application</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                React, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Vite
              </p>
            </div>

            <div>
              <h4 className="font-medium text-xs sm:text-sm mb-1 text-[#000000] dark:text-white">Mission</h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                I'm driven to create meaningful digital products that solve real-world problems. My focus is building tools that inspire, innovate, and leave a lasting impact through technology and design.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-2 sm:my-3 dark:bg-gray-600" />

        <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-end">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="text-xs sm:text-sm bg-[#000000] text-white border-[#000000] hover:bg-[#333333] dark:bg-[#000000] dark:text-white dark:border-white dark:hover:bg-[#333333]"
          >
            Close
          </Button>
          <Button 
            variant="default" 
            asChild
            className="text-xs sm:text-sm bg-[#000000] hover:bg-[#333333] text-white dark:bg-[#000000] dark:hover:bg-[#333333]"
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
