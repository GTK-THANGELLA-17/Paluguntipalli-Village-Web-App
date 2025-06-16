
import { productionUtils } from '@/utils/productionUtils';
import { config } from './environment';

// Enhanced global error handling with production reporting
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = new Error(`Unhandled promise rejection: ${event.reason}`);
    productionUtils.reportError(error, { 
      type: 'unhandled-promise-rejection',
      reason: event.reason 
    });
    
    // Prevent default error logging in production
    if (config.isProduction) {
      event.preventDefault();
    }
  });

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    const error = new Error(event.message);
    error.stack = `${event.filename}:${event.lineno}:${event.colno}`;
    
    productionUtils.reportError(error, {
      type: 'javascript-error',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  // Handle resource loading errors (images, videos, etc.) - silently in production
  window.addEventListener('error', (event) => {
    if (event.target && event.target !== window) {
      const target = event.target as HTMLElement;
      
      // Only log resource errors in development
      if (config.isDevelopment) {
        const error = new Error(`Resource failed to load: ${target.tagName}`);
        productionUtils.reportError(error, {
          type: 'resource-error',
          tagName: target.tagName,
          src: (target as any).src || (target as any).href
        });
      }
    }
  }, true);
};
