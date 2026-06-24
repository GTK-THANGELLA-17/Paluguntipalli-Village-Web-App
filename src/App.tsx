
import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import { initializeHeadingAnimations } from '@/utils/animationUtils';
import { useTheme } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

// Lazy load pages for better performance
const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  const location = useLocation();
  const { theme } = useTheme();

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

  // Warm up Google Fonts connections without incorrectly preloading CSS as a font file.
  useEffect(() => {
    const preconnects = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].map((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      if (href.includes('gstatic')) {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
      return link;
    });

    return () => {
      preconnects.forEach((link) => link.parentNode?.removeChild(link));
    };
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
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
