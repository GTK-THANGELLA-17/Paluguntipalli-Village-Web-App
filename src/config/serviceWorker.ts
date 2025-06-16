
import { config } from './environment';
import { productionUtils } from '@/utils/productionUtils';

// Enhanced service worker registration with versioning
export const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported');
    return;
  }

  if (config.isProduction) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered successfully:', registration.scope);

        // Handle updates with user notification
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Show update notification
                console.log('New content available! Please refresh.');
                productionUtils.trackEvent('sw_update_available');
              }
            });
          }
        });

      } catch (error) {
        console.error('SW registration failed:', error);
        productionUtils.reportError(error as Error, { context: 'service-worker' });
      }
    });
  }
};
