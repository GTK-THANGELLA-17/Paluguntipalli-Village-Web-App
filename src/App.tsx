
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { initializeHeadingAnimations } from '@/utils/animationUtils';
import { useTheme } from '@/providers/ThemeProvider';

function App() {
  const location = useLocation();
  const { theme } = useTheme();

  // Initialize animations when the route changes or app loads - with performance improvements
  useEffect(() => {
    // Use requestAnimationFrame for smoother animation initialization
    const animationFrame = requestAnimationFrame(() => {
      initializeHeadingAnimations();
    });
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
