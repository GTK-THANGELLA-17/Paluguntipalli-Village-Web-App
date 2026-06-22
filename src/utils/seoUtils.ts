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
    const currentUrl = url || window.location.href;
    const metaImage = image || 'https://www.paluguntipalli.com/favicon.jpg';

    // Update document title
    if (title) {
      document.title = `${title} | Paluguntipalli Village`;
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

    updateMeta('og:image', metaImage, true);
    updateMeta('twitter:image', metaImage);
    updateMeta('og:url', currentUrl, true);
    updateMeta('twitter:url', currentUrl);

    // Add structured data aligned with the visible website entity.
    seoUtils.addStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://www.paluguntipalli.com/#website',
          name: 'Paluguntipalli Village',
          url: 'https://www.paluguntipalli.com/',
          inLanguage: ['en-IN', 'te-IN'],
          description: description || 'Community website for Paluguntipalli village in Racherla Mandal, Prakasam district, Andhra Pradesh.',
          publisher: { '@id': 'https://www.paluguntipalli.com/#organization' },
          about: { '@id': 'https://www.paluguntipalli.com/#place' }
        },
        {
          '@type': 'Organization',
          '@id': 'https://www.paluguntipalli.com/#organization',
          name: 'Paluguntipalli Community',
          url: 'https://www.paluguntipalli.com/',
          logo: 'https://www.paluguntipalli.com/favicon.jpg'
        },
        {
          '@type': 'Place',
          '@id': 'https://www.paluguntipalli.com/#place',
          name: 'Paluguntipalli',
          description: 'Village in Racherla Mandal, Prakasam district, Andhra Pradesh, India.',
          url: 'https://www.paluguntipalli.com/',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 15.4808278,
            longitude: 78.962409
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paluguntipalli',
            addressRegion: 'Andhra Pradesh',
            postalCode: '523368',
            addressCountry: 'IN'
          }
        }
      ]
    });
  },

  // Add structured data (JSON-LD)
  addStructuredData: (data: Record<string, unknown>) => {
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
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/#about', priority: 0.9, changefreq: 'monthly' },
      { url: '/#places', priority: 0.8, changefreq: 'monthly' },
      { url: '/#gallery', priority: 0.8, changefreq: 'monthly' },
      { url: '/#events', priority: 0.8, changefreq: 'weekly' },
      { url: '/#services', priority: 0.7, changefreq: 'monthly' },
      { url: '/#contact', priority: 0.7, changefreq: 'monthly' }
    ];

    return routes.map(route => ({
      ...route,
      lastmod: new Date().toISOString().split('T')[0]
    }));
  }
};
