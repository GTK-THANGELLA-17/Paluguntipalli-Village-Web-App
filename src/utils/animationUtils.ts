
/**
 * Enhanced utility to apply heading animations with performance optimizations
 */
export const initializeHeadingAnimations = () => {
  // Use requestIdleCallback for non-critical animations when available
  const scheduleWork = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      requestAnimationFrame(callback);
    }
  };

  scheduleWork(() => {
    // Target all section titles with improved performance
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Apply animation class to each title with optimized DOM manipulation
    sectionTitles.forEach(title => {
      if (title instanceof HTMLElement && !title.classList.contains('processed-heading')) {
        title.classList.add('processed-heading', 'visible-heading');
      }
    });

    // Add enhanced CSS for smooth animations if not already present
    if (!document.getElementById('heading-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'heading-animation-styles';
      style.textContent = `
        .visible-heading {
          opacity: 1 !important;
          visibility: visible !important;
          display: block !important;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                      color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        
        .visible-heading:hover {
          transform: translateY(-2px);
          color: #c19a6b;
        }
        
        /* Smooth scroll optimization */
        * {
          scroll-behavior: smooth;
        }
        
        /* Performance optimizations */
        .will-change-scroll {
          will-change: scroll-position;
        }
        
        /* Enhanced icon hover effects */
        .icon-hover {
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        
        .icon-hover:hover {
          transform: scale(1.1);
        }
        
        /* Ensure all headings are visible */
        h1, h2, h3, h4, h5, h6 {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        /* Remove any text hiding effects */
        .animate-heading {
          opacity: 1 !important;
          visibility: visible !important;
          display: inline-block !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Target all headings inside sections with batch processing
    const headings = document.querySelectorAll('section h1:not(.processed-heading), section h2:not(.processed-heading), section h3:not(.processed-heading)');
    
    // Process headings in batches for better performance
    const batchSize = 10;
    for (let i = 0; i < headings.length; i += batchSize) {
      const batch = Array.from(headings).slice(i, i + batchSize);
      
      scheduleWork(() => {
        batch.forEach(heading => {
          if (heading instanceof HTMLElement && !heading.classList.contains('section-title')) {
            heading.classList.add('processed-heading', 'visible-heading');
          }
        });
      });
    }
  });
};
