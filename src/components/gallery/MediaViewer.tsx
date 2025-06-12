
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "../OptimizedImage";

interface MediaViewerProps {
  selectedItem: any;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({ selectedItem, onClose }) => {
  const { t } = useTranslation();

  const handleDownload = async () => {
    if (!selectedItem?.src) return;
    
    try {
      const response = await fetch(selectedItem.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedItem.alt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Dialog open={!!selectedItem} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-0 bg-white dark:bg-[#2a2a2a] overflow-hidden border-0 shadow-2xl">
        <DialogHeader className="p-6 bg-gradient-to-r from-heritage/10 to-blue-500/10 border-b border-heritage/20 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-[#000000] dark:text-white text-xl font-bold">
              {selectedItem?.alt}
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300 text-base">
              {t('Paluguntipalli Heritage Collection', 'Paluguntipalli Heritage Collection')}
            </DialogDescription>
          </div>
          {selectedItem?.type === 'image' && (
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="ml-4 bg-white text-black border-gray-300 hover:bg-gray-100 hover:text-black dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-black transition-colors duration-200"
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          )}
        </DialogHeader>
        <div className="relative w-full h-full flex items-center justify-center p-6">
          {selectedItem?.type === 'image' ? (
            <motion.div className="w-full h-auto max-h-[70vh] flex items-center justify-center">
              <OptimizedImage
                src={selectedItem.src}
                alt={selectedItem.alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"
                loading="eager"
                priority={true}
              />
            </motion.div>
          ) : selectedItem?.type === 'video' ? (
            <motion.video 
              src={selectedItem.src} 
              controls
              autoPlay
              className="w-full max-h-[70vh] rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              Your browser does not support the video tag.
            </motion.video>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaViewer;
