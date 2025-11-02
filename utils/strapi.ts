// Strapi API client for fetching data from Strapi v5 backend
// Uses NEXT_PUBLIC_STRAPI_API_URL environment variable

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const isProd = process.env.NODE_ENV === 'production';

if (isProd && !process.env.NEXT_PUBLIC_STRAPI_API_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not set in production. Set it in Vercel to your Render Strapi URL.');
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
export async function fetchProducts() {
  const data = await fetchFromStrapi('products?populate=*');
  
  if (!data) {
    console.warn('[Strapi] Failed to fetch products, using empty array');
    return { data: [] };
  }
  
  return data;
}

// Fetch single product by slug with populated fields
export async function fetchProductBySlug(slug: string) {
  const data = await fetchFromStrapi(`products?filters[slug][$eq]=${slug}&populate=*`);
  
  if (!data || !data.data || data.data.length === 0) {
    console.warn('[Strapi] Product not found:', slug);
    return null;
  }
  
  // Return first matching product
  return { data: data.data[0] };
}

// Fetch all articles with populated fields
export async function fetchArticles() {
  const data = await fetchFromStrapi('articles?populate=*&sort=publishedAt:desc');
  
  if (!data) {
    console.warn('[Strapi] Failed to fetch articles, using empty array');
    return { data: [] };
  }
  
  return data;
}

// Fetch single article by slug with populated fields
export async function fetchArticleBySlug(slug: string) {
  const data = await fetchFromStrapi(`articles?filters[slug][$eq]=${slug}&populate=*`);
  
  if (!data || !data.data || data.data.length === 0) {
    console.warn('[Strapi] Article not found:', slug);
    return null;
  }
  
  // Return first matching article
  return { data: data.data[0] };
}
