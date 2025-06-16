
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download, Share2, Heart, X, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import OptimizedImage from "../OptimizedImage";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface MediaViewerProps {
  selectedItem: any;
  onClose: () => void;
  isLoading?: boolean;
}

const MediaViewer: React.FC<MediaViewerProps> = ({ selectedItem, onClose, isLoading = false }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setZoom(1);
      setRotation(0);
      setImageLoaded(false);
    }
  }, [selectedItem]);

  // Keyboard navigation
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
          setZoom(prev => Math.min(3, prev + 0.25));
          break;
        case '-':
          e.preventDefault();
          setZoom(prev => Math.max(0.5, prev - 0.25));
          break;
        case 'r':
        case 'R':
          setRotation(prev => (prev + 90) % 360);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, onClose]);

  const handleDownload = useCallback(async () => {
    if (!selectedItem?.src) return;
    
    try {
      const response = await fetch(selectedItem.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = selectedItem.alt || 'media';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed. Please try again.');
    }
  }, [selectedItem]);

  const handleShare = useCallback(async () => {
    if (!selectedItem) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedItem.alt,
          text: 'Check out this amazing image from Paluguntipalli Heritage Collection',
          url: window.location.href,
        });
        toast.success('Shared successfully!');
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        toast.error('Sharing not supported on this browser');
      }
    }
  }, [selectedItem]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setRotation(0);
  }, []);

  return (
    <AnimatePresence>
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={onClose}>
          <DialogContent className={`${
            isFullscreen 
              ? 'max-w-[100vw] w-[100vw] h-[100vh] p-0' 
              : 'max-w-[95vw] sm:max-w-7xl w-[95vw] h-[85vh] sm:h-[90vh] p-0'
          } bg-black/95 backdrop-blur-xl overflow-hidden border-0 shadow-2xl transition-all duration-300`}>
            
            {/* Header with mobile-optimized controls */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-0 left-0 right-0 z-30 p-2 sm:p-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent"
            >
              <DialogHeader className="flex flex-row items-start justify-between text-white gap-2">
                <div className="flex items-start gap-2 sm:gap-4 flex-1 min-w-0">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                    title="Back to Gallery"
                  >
                    <ArrowLeft size={isMobile ? 16 : 20} />
                  </Button>
                  
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="text-sm sm:text-xl font-bold text-white mb-1 truncate">
                      {selectedItem?.alt}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-xs sm:text-sm hidden sm:block">
                      {t('Paluguntipalli Heritage Collection', 'Paluguntipalli Heritage Collection')}
                    </DialogDescription>
                    {selectedItem?.tags && !isMobile && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedItem.tags.slice(0, 4).map((tag: string, index: number) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/20"
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mobile and Desktop controls */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Mobile dropdown menu for all controls */}
                  {isMobile ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8"
                          title="More options"
                          disabled={isLoading}
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black/90 border-white/20 text-white">
                        {selectedItem?.type === 'image' && (
                          <>
                            <DropdownMenuItem 
                              onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                              className="hover:bg-white/20"
                            >
                              <ZoomOut size={14} className="mr-2" />
                              Zoom Out
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                              className="hover:bg-white/20"
                            >
                              <ZoomIn size={14} className="mr-2" />
                              Zoom In
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setRotation((rotation + 90) % 360)}
                              className="hover:bg-white/20"
                            >
                              <RotateCw size={14} className="mr-2" />
                              Rotate
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={toggleFullscreen}
                              className="hover:bg-white/20"
                            >
                              {isFullscreen ? <Minimize2 size={14} className="mr-2" /> : <Maximize2 size={14} className="mr-2" />}
                              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem 
                          onClick={() => setIsLiked(!isLiked)}
                          className="hover:bg-white/20"
                        >
                          <Heart size={14} className="mr-2" fill={isLiked ? 'currentColor' : 'none'} />
                          {isLiked ? 'Unlike' : 'Like'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleShare}
                          className="hover:bg-white/20"
                        >
                          <Share2 size={14} className="mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={handleDownload}
                          className="hover:bg-white/20"
                        >
                          <Download size={14} className="mr-2" />
                          Download
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    /* Desktop controls - keep existing inline buttons */
                    <>
                      {selectedItem?.type === 'image' && (
                        <>
                          <Button
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9"
                            title="Zoom Out (-)"
                            disabled={isLoading}
                          >
                            <ZoomOut size={14} />
                          </Button>
                          <Button
                            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9"
                            title="Zoom In (+)"
                            disabled={isLoading}
                          >
                            <ZoomIn size={14} />
                          </Button>
                          <Button
                            onClick={() => setRotation((rotation + 90) % 360)}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9"
                            title="Rotate (R)"
                            disabled={isLoading}
                          >
                            <RotateCw size={14} />
                          </Button>
                          <Button
                            onClick={toggleFullscreen}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9"
                            title="Toggle Fullscreen (F)"
                            disabled={isLoading}
                          >
                            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                          </Button>
                          <Button
                            onClick={() => setIsLiked(!isLiked)}
                            variant="ghost"
                            size="sm"
                            className={`text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9 ${isLiked ? 'text-red-400' : ''}`}
                            title="Like"
                            disabled={isLoading}
                          >
                            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
                          </Button>
                        </>
                      )}
                      
                      <Button
                        onClick={handleShare}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9"
                        title="Share"
                        disabled={isLoading}
                      >
                        <Share2 size={14} />
                      </Button>
                      
                      <Button
                        onClick={handleDownload}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9"
                        title="Download"
                        disabled={isLoading}
                      >
                        <Download size={14} />
                      </Button>
                    </>
                  )}
                  
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 backdrop-blur-sm p-2 h-8 w-8 sm:h-9 sm:w-9 ml-1 sm:ml-2"
                    title="Close (Esc)"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </DialogHeader>
            </motion.div>
            
            {/* Media content */}
            <div className={`relative w-full h-full flex items-center justify-center p-2 sm:p-4 ${
              isMobile ? 'pt-16 pb-16' : 'pt-20 sm:pt-24 pb-16 sm:pb-20'
            }`}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
                </div>
              )}

              {selectedItem?.type === 'image' ? (
                <motion.div 
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="relative max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl"
                    style={{ 
                      transform: `scale(${zoom}) rotate(${rotation}deg)`, 
                      transition: 'transform 0.3s ease-out',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  >
                    <OptimizedImage
                      src={selectedItem.src}
                      alt={selectedItem.alt}
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                      loading="eager"
                      priority={true}
                    />
                  </div>
                </motion.div>
              ) : selectedItem?.type === 'video' ? (
                <motion.div 
                  className="w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <video 
                    src={selectedItem.src} 
                    controls
                    autoPlay={false}
                    className="w-full h-full max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ maxHeight: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 140px)' }}
                    onLoadedData={() => setImageLoaded(true)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              ) : null}
            </div>

            {/* Desktop bottom info bar */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/90 to-transparent"
              >
                <div className="flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-4">
                    {selectedItem?.type === 'image' && (
                      <>
                        {zoom !== 1 && (
                          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs border border-white/20">
                            {Math.round(zoom * 100)}%
                          </span>
                        )}
                        {rotation !== 0 && (
                          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs border border-white/20">
                            {rotation}°
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-300 flex items-center gap-4">
                    <span>Press ESC to close</span>
                    {selectedItem?.type === 'image' && (
                      <span className="hidden lg:inline">Use +/- to zoom, R to rotate, F for fullscreen</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MediaViewer;
