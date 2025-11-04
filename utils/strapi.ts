// Strapi API client for fetching data from Strapi v5 backend
// Uses NEXT_PUBLIC_STRAPI_API_URL environment variable

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://eurobot-hub-strapi.onrender.com';
const isProd = process.env.NODE_ENV === 'production';

// Warning only - don't block build (Vercel injects env vars at runtime)
if (isProd && !process.env.NEXT_PUBLIC_STRAPI_API_URL) {
  console.warn('[Strapi] Warning: NEXT_PUBLIC_STRAPI_API_URL not set, using default Render URL');
}

// Generic fetch function for Strapi API v5
export async function fetchFromStrapi(endpoint: string) {
  try {
    const url = `${STRAPI_URL}/api/${endpoint}`;
    console.log('[Strapi] Fetching from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Enable caching for production
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`Strapi fetch failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[Strapi] Error fetching:', endpoint, error);
    return null;
  }
}

// Fetch all products with populated fields
export async function fetchProducts(locale?: string) {
  // Temporarily disable locale filtering until Strapi backend is rebuilt with i18n plugin
  let endpoint = 'products?populate=*';
  // TODO: Re-enable locale filtering after Strapi rebuild:
  // if (locale) {
  //   endpoint += `&locale=${locale}`;
  // }
  
  const data = await fetchFromStrapi(endpoint);
  
  if (!data) {
    console.warn('[Strapi] Failed to fetch products, using empty array');
    return { data: [] };
  }
  
  return data;
}

// Fetch single product by slug with populated fields
export async function fetchProductBySlug(slug: string, locale?: string) {
  // Temporarily disable locale filtering until Strapi backend is rebuilt with i18n plugin
  let endpoint = `products?filters[slug][$eq]=${slug}&populate=*`;
  // TODO: Re-enable locale filtering after Strapi rebuild:
  // if (locale) {
  //   endpoint += `&locale=${locale}`;
  // }
  
  const data = await fetchFromStrapi(endpoint);
  
  if (!data || !data.data || data.data.length === 0) {
    console.warn('[Strapi] Product not found:', slug);
    return null;
  }
  
  // Return first matching product
  return { data: data.data[0] };
}

// Fetch all articles with populated fields
export async function fetchArticles(locale?: string) {
  // Temporarily disable locale filtering until Strapi backend is rebuilt with i18n plugin
  let endpoint = 'articles?populate=*&sort=publishedAt:desc';
  // TODO: Re-enable locale filtering after Strapi rebuild:
  // if (locale) {
  //   endpoint += `&locale=${locale}`;
  // }
  
  const data = await fetchFromStrapi(endpoint);
  
  if (!data) {
    console.warn('[Strapi] Failed to fetch articles, using empty array');
    return { data: [] };
  }
  
  // Client-side filtering by locale based on article ID pattern
  // Articles 1,3,5 are Polish, 2,4,6 are English
  if (data.data && locale) {
    const filtered = data.data.filter((article: any) => {
      const isPolish = article.id % 2 === 1; // Odd IDs are Polish
      const isEnglish = article.id % 2 === 0; // Even IDs are English
      
      if (locale === 'pl') return isPolish;
      if (locale === 'en') return isEnglish;
      if (locale === 'de') return isEnglish; // Use English for German until we have DE translations
      return true;
    });
    return { ...data, data: filtered };
  }
  
  return data;
}

// Fetch single article by slug with populated fields
export async function fetchArticleBySlug(slug: string, locale?: string) {
  // Temporarily disable locale filtering until Strapi backend is rebuilt with i18n plugin
  let endpoint = `articles?filters[slug][$eq]=${slug}&populate=*`;
  // TODO: Re-enable locale filtering after Strapi rebuild:
  // if (locale) {
  //   endpoint += `&locale=${locale}`;
  // }
  
  const data = await fetchFromStrapi(endpoint);
  
  if (!data || !data.data || data.data.length === 0) {
    console.warn('[Strapi] Article not found:', slug);
    return null;
  }
  
  // Return first matching article
  return { data: data.data[0] };
}
