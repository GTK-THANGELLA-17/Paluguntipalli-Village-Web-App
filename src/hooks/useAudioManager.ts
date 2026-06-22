import { useEffect, useRef, useState } from 'react';

export const useAudioManager = (loading: boolean, isScrolled: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isScrolledRef = useRef(isScrolled);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    isScrolledRef.current = isScrolled;
    if (isScrolled && audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    const audio = new Audio('/Bgm Sounds.mp3');
    audio.loop = true;
    audio.volume = 0.1;
    audio.preload = 'none';
    audioRef.current = audio;

    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        if (isScrolledRef.current && audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsAudioPlaying(false);
        }
        ticking = false;
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      audio.pause();
      audioRef.current = null;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const playAudio = async () => {
    if (loading || !audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsAudioPlaying(true);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log('User interaction required to play audio or autoplay prevented.');
      }
    }
  };

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
    setIsAudioPlaying,
  };
};
