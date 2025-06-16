
// Performance optimization utilities

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image preloader
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Critical resource preloader
export const preloadCriticalResources = (resources: string[]) => {
  resources.forEach(src => {
    if (src.includes('.css')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = src;
      document.head.appendChild(link);
    } else if (src.includes('.js')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    } else {
      preloadImage(src);
    }
  });
};

// Lazy load images with Intersection Observer
export const createImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

// Performance metrics logging
export const logPerformanceMetrics = () => {
  if (typeof window === 'undefined') return;

  // Log navigation timing
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigation) {
    console.log('Performance Metrics:', {
      'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
      'TCP Connection': navigation.connectEnd - navigation.connectStart,
      'Request': navigation.responseStart - navigation.requestStart,
      'Response': navigation.responseEnd - navigation.responseStart,
      'DOM Loading': navigation.domContentLoadedEventStart - navigation.responseEnd,
      'DOM Ready': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      'Total Load Time': navigation.loadEventEnd - navigation.fetchStart
    });
  }

  // Log resource timing
  const resources = performance.getEntriesByType('resource');
  const imageResources = resources.filter(resource => 
    resource.name.includes('.jpg') || 
    resource.name.includes('.png') || 
    resource.name.includes('.webp')
  );
  
  if (imageResources.length > 0) {
    const avgImageLoadTime = imageResources.reduce((sum, resource) => {
      const resourceTiming = resource as PerformanceResourceTiming;
      return sum + (resourceTiming.responseEnd - resourceTiming.startTime);
    }, 0) / imageResources.length;
    
    console.log('Average Image Load Time:', avgImageLoadTime.toFixed(2) + 'ms');
  }
};

// Memory usage monitor
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory Usage:', {
      'Used JS Heap Size': (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      'Total JS Heap Size': (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      'JS Heap Size Limit': (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
    });
  }
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
};

// Resource hints helper
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//images.unsplash.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};
