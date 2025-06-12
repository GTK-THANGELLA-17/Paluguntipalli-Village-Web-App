
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
        const text = title.innerText;
        title.innerHTML = `<span class="animate-heading">${text}</span>`;
        title.classList.add('processed-heading');
        
        // Add optimized hover animation event listeners
        const headingSpan = title.querySelector('.animate-heading');
        if (headingSpan) {
          let isAnimating = false;
          
          title.addEventListener('mouseenter', () => {
            if (!isAnimating) {
              headingSpan.classList.add('hover-animation');
              isAnimating = true;
            }
          });
          
          title.addEventListener('mouseleave', () => {
            headingSpan.classList.remove('hover-animation');
            setTimeout(() => {
              isAnimating = false;
            }, 300);
          });
        }
      }
    });

    // Add enhanced CSS for smooth animations if not already present
    if (!document.getElementById('heading-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'heading-animation-styles';
      style.textContent = `
        .animate-heading {
          display: inline-block;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                      text-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        
        .animate-heading.hover-animation {
          transform: scale(1.05) translateY(-2px);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          filter: brightness(1.1);
        }
        
        .animate-heading:hover {
          transform: scale(1.05) translateY(-2px);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          filter: brightness(1.1);
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
            const text = heading.innerText;
            heading.innerHTML = `<span class="animate-heading">${text}</span>`;
            heading.classList.add('processed-heading');
          }
        });
      });
    }
  });
};
