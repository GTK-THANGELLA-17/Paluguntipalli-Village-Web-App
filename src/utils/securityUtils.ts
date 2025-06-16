
import { config } from '@/config/environment';

// Security utility functions for production deployment
export const securityUtils = {
  // Content Security Policy configuration
  getCSPHeader: () => {
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self' data: blob:",
      "connect-src 'self' https://api.paluguntipalli.com https://www.google-analytics.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'"
    ];
    
    return cspDirectives.join('; ');
  },

  // Initialize security headers
  initializeSecurityHeaders: () => {
    if (!config.isProduction || typeof document === 'undefined') return;

    try {
      // Add CSP meta tag if not already present
      if (config.SECURITY.ENABLE_CSP && !document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const cspMeta = document.createElement('meta');
        cspMeta.httpEquiv = 'Content-Security-Policy';
        cspMeta.content = securityUtils.getCSPHeader();
        document.head.appendChild(cspMeta);
      }

      // Add X-Content-Type-Options
      const xContentTypeMeta = document.createElement('meta');
      xContentTypeMeta.httpEquiv = 'X-Content-Type-Options';
      xContentTypeMeta.content = 'nosniff';
      document.head.appendChild(xContentTypeMeta);

      // Add X-Frame-Options
      const xFrameMeta = document.createElement('meta');
      xFrameMeta.httpEquiv = 'X-Frame-Options';
      xFrameMeta.content = 'DENY';
      document.head.appendChild(xFrameMeta);

      // Add Referrer Policy
      const referrerMeta = document.createElement('meta');
      referrerMeta.name = 'referrer';
      referrerMeta.content = 'strict-origin-when-cross-origin';
      document.head.appendChild(referrerMeta);

    } catch (error) {
      console.warn('Failed to initialize security headers:', error);
    }
  },

  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  },

  // Validate URLs
  isValidUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }
};
