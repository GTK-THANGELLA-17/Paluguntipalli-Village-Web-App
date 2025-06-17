import { useEffect, useRef, useState } from 'react';

export const useAudioManager = (loading: boolean, isScrolled: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/Bgm Sounds.mp3');
    audio.loop = true;
    audio.volume = 0.1;
    audio.preload = 'metadata';
    audioRef.current = audio;

    // Pause audio if user switches tab or app is hidden
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Scroll handler to pause audio if isScrolled is true
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (isScrolled && audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Manual play method
  const playAudio = async () => {
    if (loading) return; // Don't allow play if loading
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.log('User interaction required to play audio or autoplay prevented.');
    }
  };

  // Manual pause method
  const pauseAudio = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  };

  return {
    audioRef,
    isAudioPlaying,
    playAudio,
    pauseAudio,
  };
};
