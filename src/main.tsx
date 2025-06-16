
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import './i18n';
import { config, validateEnvironment } from './config/environment';
import { productionUtils } from './utils/productionUtils';
import { initPerformanceMonitoring } from './config/performance';
import { registerServiceWorker } from './config/serviceWorker';
import { setupGlobalErrorHandling } from './config/errorHandling';
import { initializeProductionFeatures } from './config/initialization';
import { createFallbackErrorDisplay } from './config/fallback';

// Production environment validation
try {
  validateEnvironment();
} catch (error) {
  console.error('Environment validation failed:', error);
  if (config.isProduction) {
    throw error; // Fail fast in production
  }
}

// Initialize all features
initPerformanceMonitoring();
registerServiceWorker();
setupGlobalErrorHandling();
initializeProductionFeatures();

// Root element validation
const rootElement = document.getElementById("root");
if (!rootElement) {
  const error = new Error('Root element not found. Please ensure index.html contains a div with id="root"');
  productionUtils.reportError(error, { context: 'app-initialization' });
  throw error;
}

// Enhanced root rendering with comprehensive error handling
try {
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
  
  console.log(`🚀 ${config.APP_NAME} v${config.APP_VERSION} initialized successfully`);
  
} catch (error) {
  console.error('Failed to render application:', error);
  productionUtils.reportError(error as Error, { context: 'app-render' });
  
  // Enhanced fallback error display
  createFallbackErrorDisplay(rootElement);
}
