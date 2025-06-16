
import { config } from '@/config/environment';

// Production-specific utilities
export const productionUtils = {
  // Enhanced error reporting for production
  reportError: (error: Error, context?: Record<string, any>) => {
    if (!config.isProduction) {
      // In development, only log non-resource errors to avoid spam
      if (context?.type !== 'resource-error') {
        console.error('Development Error:', error, context);
      }
      return;
    }

    // Structure for real error monitoring service integration
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
      sessionId: sessionStorage.getItem('sessionId') || 'unknown',
      userId: localStorage.getItem('userId') || 'anonymous'
    };

    // Only log critical errors in production
    if (context?.type !== 'resource-error') {
      console.error('Production Error Report:', errorReport);
    }
    
    // Example Sentry integration (commented out):
    // if (config.SENTRY_DSN && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: context });
    // }
  },

  // Analytics event tracking
  trackEvent: (eventName: string, properties?: Record<string, any>) => {
    if (!config.ENABLE_ANALYTICS || !config.isProduction) return;

    const eventData = {
      event: eventName,
      timestamp: Date.now(),
      properties: {
        ...properties,
        page: window.location.pathname,
        referrer: document.referrer
      }
    };

    console.log('Analytics Event:', eventData);
    
    // Example Google Analytics integration (commented out):
    // if (window.gtag) {
    //   window.gtag('event', eventName, properties);
    // }
  },

  // Performance metrics reporting
  reportPerformanceMetrics: (metrics: Record<string, number>) => {
    if (!config.ENABLE_PERFORMANCE_MONITORING) return;

    const performanceReport = {
      ...metrics,
      timestamp: Date.now(),
      url: window.location.href,
      connection: (navigator as any).connection?.effectiveType || 'unknown'
    };

    console.log('Performance Metrics:', performanceReport);
    
    // This is where you'd send to your monitoring service
  },

  // Session management
  initializeSession: () => {
    if (!sessionStorage.getItem('sessionId')) {
      sessionStorage.setItem('sessionId', `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  },

  // Build-time optimizations checker
  validateBuildOptimizations: () => {
    if (config.isDevelopment) return;

    const optimizations = {
      minification: document.documentElement.innerHTML.length < 50000,
      compression: document.querySelector('script[src*=".js"]')?.getAttribute('src')?.includes('.min.'),
      caching: 'serviceWorker' in navigator,
      prefetch: document.querySelector('link[rel="prefetch"]') !== null
    };

    console.log('Build Optimizations Status:', optimizations);
    return optimizations;
  }
};
