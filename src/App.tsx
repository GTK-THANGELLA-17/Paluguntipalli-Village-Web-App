import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import { initializeHeadingAnimations } from '@/utils/animationUtils';
import { useTheme } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

// ✅ Lazy load pages
const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const VillageMap = lazy(() => import('@/components/VillageMap')); // ✅

function App() {
  const location = useLocation();
  const { theme } = useTheme();

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

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
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
          <Route path="/village-map" element={<VillageMap />} /> {/* ✅ */}
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
