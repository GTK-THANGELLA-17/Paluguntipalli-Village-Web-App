
import { config } from './environment';
import { securityUtils } from '@/utils/securityUtils';
import { productionUtils } from '@/utils/productionUtils';
import { seoUtils } from '@/utils/seoUtils';

// Initialize production features
export const initializeProductionFeatures = () => {
  // Initialize security headers
  securityUtils.initializeSecurityHeaders();
  
  // Initialize session management
  productionUtils.initializeSession();
  
  // Set up SEO defaults
  seoUtils.updatePageMeta({
    title: 'Home',
    description: 'A comprehensive digital platform for Paluguntipalli village that connects residents, businesses, and visitors through interactive features and community services.',
    keywords: 'paluguntipalli, village, community, telangana, india, local business, services, culture',
    image: '/placeholder.svg',
    url: window.location.href
  });
  
  // Validate build optimizations in production
  if (config.isProduction) {
    productionUtils.validateBuildOptimizations();
  }
  
  // Track app initialization
  productionUtils.trackEvent('app_initialized', {
    version: config.APP_VERSION,
    environment: config.isProduction ? 'production' : 'development'
  });
};
