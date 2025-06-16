import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Share2,
  Heart,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  ArrowLeft,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useState } from 'react';
import OptimizedImage from '../OptimizedImage';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MediaViewerProps {
  selectedItem: any;
  onClose: () => void;
  isLoading?: boolean;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  selectedItem,
  onClose,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setZoom(1);
      setRotation(0);
    }
  }, [selectedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          setZoom((prev) => Math.min(3, prev + 0.25));
          break;
        case '-':
          e.preventDefault();
          setZoom((prev) => Math.max(0.5, prev - 0.25));
          break;
        case 'r':
        case 'R':
          setRotation((prev) => (prev + 90) % 360);
          break;
        case 'f':
        case 'F':
          setIsFullscreen((prev) => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, onClose]);

  const handleDownload = useCallback(async () => {
    if (!selectedItem?.src) return;
    try {
      const res = await fetch(selectedItem.src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedItem.alt || 'image';
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Download started!');
    } catch {
      toast.error('Download failed.');
    }
  }, [selectedItem]);

  const handleShare = useCallback(async () => {
    if (!selectedItem) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: selectedItem.alt,
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Share failed or cancelled.');
    }
  }, [selectedItem]);

  return (
    <AnimatePresence>
      {selectedItem && (
        <Dialog open onOpenChange={onClose}>
          <DialogContent
            className={`${
              isFullscreen
                ? 'w-screen h-screen'
                : 'w-full max-w-full h-[90vh] sm:max-w-7xl'
            } bg-black/95 p-0 overflow-hidden border-0`}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 right-0 z-30 p-2 sm:p-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent"
            >
              <DialogHeader className="flex justify-between items-start text-white">
                <div className="flex items-start gap-2 flex-1">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-white p-2"
                  >
                    <ArrowLeft size={18} />
                  </Button>
                  <div>
                    <DialogTitle className="text-white text-sm sm:text-lg truncate">
                      {selectedItem?.alt}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-xs sm:text-sm hidden sm:block">
                      {t('Paluguntipalli Heritage Collection')}
                    </DialogDescription>
                  </div>
                </div>

                <div className="flex gap-1">
                  {isMobile ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white p-2">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black border-white/20 text-white">
                        <DropdownMenuItem onClick={() => setZoom(zoom - 0.25)}>
                          <ZoomOut size={14} className="mr-2" /> Zoom Out
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setZoom(zoom + 0.25)}>
                          <ZoomIn size={14} className="mr-2" /> Zoom In
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRotation((rotation + 90) % 360)}>
                          <RotateCw size={14} className="mr-2" /> Rotate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsFullscreen(!isFullscreen)}>
                          {isFullscreen ? (
                            <>
                              <Minimize2 size={14} className="mr-2" /> Exit Fullscreen
                            </>
                          ) : (
                            <>
                              <Maximize2 size={14} className="mr-2" /> Fullscreen
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleShare}>
                          <Share2 size={14} className="mr-2" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDownload}>
                          <Download size={14} className="mr-2" /> Download
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Button onClick={() => setZoom(zoom + 0.25)} variant="ghost" className="text-white p-2">
                        <ZoomIn size={14} />
                      </Button>
                      <Button onClick={() => setZoom(zoom - 0.25)} variant="ghost" className="text-white p-2">
                        <ZoomOut size={14} />
                      </Button>
                      <Button onClick={() => setRotation((rotation + 90) % 360)} variant="ghost" className="text-white p-2">
                        <RotateCw size={14} />
                      </Button>
                      <Button onClick={() => setIsFullscreen(!isFullscreen)} variant="ghost" className="text-white p-2">
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                      </Button>
                      <Button onClick={handleShare} variant="ghost" className="text-white p-2">
                        <Share2 size={14} />
                      </Button>
                      <Button onClick={handleDownload} variant="ghost" className="text-white p-2">
                        <Download size={14} />
                      </Button>
                    </>
                  )}
                  <Button onClick={onClose} variant="ghost" className="text-white p-2">
                    <X size={16} />
                  </Button>
                </div>
              </DialogHeader>
            </motion.div>

            {/* Main content */}
            <div className="w-full h-full flex items-center justify-center pt-16 pb-16 sm:pt-24 sm:pb-20">
              {selectedItem?.type === 'image' ? (
                <motion.div
                  className="max-w-full max-h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="relative min-h-[200px] sm:min-h-[300px] max-w-full max-h-full overflow-hidden"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transition: 'transform 0.3s ease-out',
                    }}
                  >
                    <OptimizedImage
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                      loading="eager"
                      priority
                    />
                  </div>
                </motion.div>
              ) : selectedItem?.type === 'video' ? (
                <video
                  src={selectedItem.src}
                  controls
                  className="w-full h-full max-w-full max-h-full object-contain rounded-lg"
                  style={{ maxHeight: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 140px)' }}
                />
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MediaViewer;
