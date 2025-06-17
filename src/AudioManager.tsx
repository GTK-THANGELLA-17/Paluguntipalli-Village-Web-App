import React, { useState, useEffect } from 'react';
import { useAudioManager } from './useAudioManager'; // adjust path

const AudioManager = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const loading = false;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { isAudioPlaying, playAudio, pauseAudio } = useAudioManager(loading, isScrolled);

  return (
    <button
      onClick={isAudioPlaying ? pauseAudio : playAudio}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        padding: '10px 20px',
        borderRadius: 8,
        border: 'none',
        backgroundColor: isAudioPlaying ? '#ef4444' : '#10b981',
        color: '#fff',
        cursor: 'pointer',
        zIndex: 9999,
      }}
    >
      {isAudioPlaying ? 'Stop Music' : 'Play Music'}
    </button>
  );
};

export default AudioManager;
