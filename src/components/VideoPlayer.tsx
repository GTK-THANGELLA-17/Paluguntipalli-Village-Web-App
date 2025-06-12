
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Loader2 } from 'lucide-react';
import ImageWithSpinner from './ImageWithSpinner';

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoSrc,
  thumbnailSrc,
  title,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsVideoLoading(true);
    }
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoading(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg shadow-lg">
        {!isPlaying ? (
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithSpinner 
              src={thumbnailSrc}
              alt={title}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <motion.button
                onClick={handlePlayPause}
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Play className="w-6 h-6 text-gray-800 ml-1" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="relative w-full h-full">
            <AnimatePresence>
              {isVideoLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/80 z-20"
                >
                  <Loader2 className="w-12 h-12 animate-spin text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              controls={showControls}
              onLoadedData={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
              onEnded={() => setIsPlaying(false)}
              preload="metadata"
            />
            
            <motion.div
              className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
            >
              <button
                onClick={handlePlayPause}
                className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <button
                onClick={handleMuteToggle}
                className="bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </motion.div>
          </div>
        )}
      </div>
      
      <motion.div 
        className="mt-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</h4>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
