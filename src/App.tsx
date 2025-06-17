import { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import { initializeHeadingAnimations } from '@/utils/animationUtils';
import { useTheme } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

import { useAudioManager } from './hooks/useAudioManager'; // adjust path if needed

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  const location = useLocation();
  const { theme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const loading = false; // Set accordingly if you have real loading state

  // Detect scroll position for isScrolled state
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Use your audio manager hook
  const { isAudioPlaying, playAudio, pauseAudio } = useAudioManager(loading, isScrolled);

  // Initialize animations when the route changes or app loads
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      try {
        initializeHeadingAnimations();
      } catch (error) {
        console.warn('Animation initialization failed:', error);
      }
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [location.pathname]);

  // Preload critical resources
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(link);

    return () => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Audio control button */}
        <button
          onClick={isAudioPlaying ? pauseAudio : playAudio}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            color: theme === 'dark' ? '#f9fafb' : '#111827',
            zIndex: 9999,
          }}
        >
          {isAudioPlaying ? 'Pause Music' : 'Play Music'}
        </button>

        <Toaster
          position="top-right"
          theme={theme}
          richColors
          closeButton
          duration={4000}
          visibleToasts={5}
          toastOptions={{
            style: {
              background: theme === 'dark' ? '#1f2937' : '#ffffff',
              color: theme === 'dark' ? '#f9fafb' : '#111827',
              border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
            },
          }}
        />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
