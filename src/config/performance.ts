
import { config } from './environment';
import { productionUtils } from '@/utils/productionUtils';

// Enhanced performance monitoring with production thresholds
export const initPerformanceMonitoring = () => {
  if (!config.ENABLE_PERFORMANCE_MONITORING || typeof window === 'undefined' || !window.PerformanceObserver) {
    console.warn('Performance monitoring not available');
    return;
  }
  
  try {
    const metrics: Record<string, number> = {};

    // Measure First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
          
          if (entry.startTime > config.PERFORMANCE_THRESHOLDS.FCP) {
            console.warn(`FCP exceeds threshold: ${entry.startTime.toFixed(2)}ms > ${config.PERFORMANCE_THRESHOLDS.FCP}ms`);
          }
        }
      }
    });
    paintObserver.observe({ entryTypes: ['paint'] });

    // Measure Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      
      if (lastEntry.startTime > config.PERFORMANCE_THRESHOLDS.LCP) {
        console.warn(`LCP exceeds threshold: ${lastEntry.startTime.toFixed(2)}ms > ${config.PERFORMANCE_THRESHOLDS.LCP}ms`);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Measure Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as any;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
      metrics.cls = clsValue;
      
      if (clsValue > config.PERFORMANCE_THRESHOLDS.CLS) {
        console.warn(`High CLS detected: ${clsValue.toFixed(6)} > ${config.PERFORMANCE_THRESHOLDS.CLS}`);
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Measure First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEventTiming;
        if (fidEntry.processingStart) {
          const fidValue = fidEntry.processingStart - fidEntry.startTime;
          metrics.fid = fidValue;
          
          if (fidValue > config.PERFORMANCE_THRESHOLDS.FID) {
            console.warn(`High FID detected: ${fidValue.toFixed(2)}ms > ${config.PERFORMANCE_THRESHOLDS.FID}ms`);
          }
        }
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        productionUtils.reportPerformanceMetrics(metrics);
      }, 5000);
    });

  } catch (error) {
    console.warn('Performance monitoring setup failed:', error);
    productionUtils.reportError(error as Error, { context: 'performance-monitoring' });
  }
};

