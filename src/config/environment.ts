
// Environment configuration for production deployment
export const config = {
  // App Configuration
  APP_NAME: 'Paluguntipalli Village Community App',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'A comprehensive digital platform for Paluguntipalli village community',
  
  // Environment Detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.paluguntipalli.com',
  
  // External Services
  ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
  
  // Performance Thresholds
  PERFORMANCE_THRESHOLDS: {
    FCP: 1800, // First Contentful Paint - 1.8s
    LCP: 2500, // Largest Contentful Paint - 2.5s
    FID: 100,  // First Input Delay - 100ms
    CLS: 0.1   // Cumulative Layout Shift - 0.1
  },
  
  // Cache Configuration
  CACHE_VERSION: 'v1.0.0',
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  
  // Security Configuration
  SECURITY: {
    ENABLE_CSP: true,
    ENABLE_HSTS: true,
    ENABLE_XSS_PROTECTION: true
  }
};

// Validation function to ensure required environment variables
export const validateEnvironment = () => {
  const requiredEnvVars = [];
  
  if (config.isProduction) {
    if (config.ENABLE_ANALYTICS && !config.ANALYTICS_ID) {
      requiredEnvVars.push('VITE_ANALYTICS_ID');
    }
    
    if (config.ENABLE_ERROR_REPORTING && !config.SENTRY_DSN) {
      requiredEnvVars.push('VITE_SENTRY_DSN');
    }
  }
  
  if (requiredEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${requiredEnvVars.join(', ')}`);
  }
};
