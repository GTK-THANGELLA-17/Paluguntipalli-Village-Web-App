
// SEO optimization utilities for production
export const seoUtils = {
  // Update page meta tags dynamically
  updatePageMeta: (pageData: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
  }) => {
    const { title, description, keywords, image, url } = pageData;

    // Update document title
    if (title) {
      document.title = `${title} | Paluguntipalli Village Community`;
    }

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    if (description) {
      updateMeta('description', description);
      updateMeta('og:description', description, true);
      updateMeta('twitter:description', description);
    }

    if (keywords) {
      updateMeta('keywords', keywords);
    }

    if (image) {
      updateMeta('og:image', image, true);
      updateMeta('twitter:image', image);
    }

    if (url) {
      updateMeta('og:url', url, true);
      updateMeta('twitter:url', url);
    }

    // Add structured data
    seoUtils.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Paluguntipalli Village Community App',
      description: description || 'A comprehensive digital platform for Paluguntipalli village community',
      url: url || window.location.href,
      applicationCategory: 'Community',
      operatingSystem: 'Web'
    });
  },

  // Add structured data (JSON-LD)
  addStructuredData: (data: Record<string, any>) => {
    const existingScript = document.querySelector('#structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  },

  // Generate sitemap data (for build process)
  generateSitemapData: () => {
    const routes = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/#about', priority: 0.9, changefreq: 'weekly' },
      { url: '/#gallery', priority: 0.8, changefreq: 'weekly' },
      { url: '/#services', priority: 0.8, changefreq: 'weekly' },
      { url: '/#business', priority: 0.8, changefreq: 'weekly' },
      { url: '/#contact', priority: 0.7, changefreq: 'monthly' }
    ];

    return routes.map(route => ({
      ...route,
      lastmod: new Date().toISOString().split('T')[0]
    }));
  }
};
