// SEO optimization utilities for production
const CREATOR_ID = 'https://www.paluguntipalli.com/#gadidamalla-thangella';
const ORGANIZATION_ID = 'https://www.paluguntipalli.com/#organization';
const PLACE_ID = 'https://www.paluguntipalli.com/#place';
const WEBSITE_ID = 'https://www.paluguntipalli.com/#website';

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

    if (title) {
      document.title = `${title} | Paluguntipalli Village`;
    }

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

    updateMeta('creator', 'Gadidamalla Thangella');
    updateMeta('developer', 'Gadidamalla Thangella');
    updateMeta('og:image', metaImage, true);
    updateMeta('twitter:image', metaImage);
    updateMeta('og:url', currentUrl, true);
    updateMeta('twitter:url', currentUrl);

    seoUtils.addStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': WEBSITE_ID,
          name: 'Paluguntipalli Village',
          alternateName: ['Paluguntipalli', 'Paluguntipalli Village Community', 'Paluguntipalli Community Website'],
          url: 'https://www.paluguntipalli.com/',
          inLanguage: ['en-IN', 'te-IN', 'hi-IN'],
          description: description || 'Community website for Paluguntipalli village in Racherla Mandal, Prakasam district, Andhra Pradesh.',
          publisher: { '@id': ORGANIZATION_ID },
          creator: { '@id': CREATOR_ID },
          copyrightHolder: { '@id': ORGANIZATION_ID },
          about: { '@id': PLACE_ID },
          mainEntity: { '@id': PLACE_ID },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.paluguntipalli.com/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'Organization',
          '@id': ORGANIZATION_ID,
          name: 'Paluguntipalli Community',
          url: 'https://www.paluguntipalli.com/',
          logo: 'https://www.paluguntipalli.com/favicon.jpg',
          sameAs: ['https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/']
        },
        {
          '@type': 'Person',
          '@id': CREATOR_ID,
          name: 'Gadidamalla Thangella',
          alternateName: 'g_thangella_k',
          description: 'Builder and developer of the Paluguntipalli village web application.',
          jobTitle: 'Website builder and developer',
          sameAs: ['https://www.instagram.com/g_thangella_k/'],
          knowsAbout: ['Web development', 'Village community websites', 'Paluguntipalli']
        },
        {
          '@type': 'Place',
          '@id': PLACE_ID,
          name: 'Paluguntipalli',
          alternateName: ['Palugutipalli', 'Paluguntipalli Village'],
          description: 'Village in Racherla Mandal, Prakasam district, Andhra Pradesh, India.',
          url: 'https://www.paluguntipalli.com/',
          subjectOf: { '@id': WEBSITE_ID },
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
          },
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: 'Prakasam district, Andhra Pradesh'
          },
          sameAs: ['https://www.google.com/maps/place/Paluguntipalli,+Andhra+Pradesh+523368/']
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

  // Generate sitemap data for the current SPA. Add real route URLs here when the app gains routed pages.
  generateSitemapData: () => {
    const routes = [
      { url: '/', priority: 1.0, changefreq: 'weekly' }
    ];

    return routes.map(route => ({
      ...route,
      lastmod: new Date().toISOString().split('T')[0]
    }));
  }
};