
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
    
    const playAudio = async () => {
      try {
        await audio.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.log('Auto-play prevented by browser');
      }
    };
    
    if (!loading) {
      playAudio();
    }
    
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled, loading]);

  return { audioRef, isAudioPlaying, setIsAudioPlaying };
};
