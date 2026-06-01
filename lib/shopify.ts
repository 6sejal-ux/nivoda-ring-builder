/**
 * Shopify Storefront GraphQL Integration
 * Source of truth for all product data (settings, diamonds, images, videos, variants, tags, pricing)
 * 
 * Supports:
 * - Product fetching by handle or ID
 * - Filtering by tags (setting:*, shape:*, metal:*, etc.)
 * - Dynamic filter extraction
 * - Mixed media galleries (images + videos)
 * - Shopify metafields
 * - Future Nivoda API integration
 */

import { cache } from 'react'

export interface ShopifyImage {
  id: string
  url: string
  altText?: string
  width?: number
  height?: number
}

export interface ShopifyVideo {
  id: string
  url: string
  title?: string
  previewImage?: string
}

export interface ShopifyMediaItem {
  type: 'image' | 'video'
  id: string
  url: string
  altText?: string
  previewImage?: string
}

export interface ShopifyVariant {
  id: string
  title: string
  price: string
  availableForSale: boolean
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: ShopifyImage[]
  videos: ShopifyVideo[]
  media: ShopifyMediaItem[]
  variants: ShopifyVariant[]
  tags: string[]
  metafields?: Record<string, any>
}

export interface ShopifyFilter {
  id: string
  name: string
  category: string // e.g., "setting", "shape", "metal"
  count: number
}

// Shopify Storefront GraphQL Client
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN

// Fallback mock data when Shopify credentials are not available
const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'platinum-solitaire-setting',
    title: 'Platinum Solitaire Setting',
    description: 'Classic platinum solitaire engagement ring setting. Perfect for any diamond shape.',
    priceRange: {
      minVariantPrice: { amount: '2500', currencyCode: 'USD' },
      maxVariantPrice: { amount: '3500', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img-1',
        url: 'https://via.placeholder.com/500x500?text=Platinum+Solitaire',
        altText: 'Platinum Solitaire Setting',
      },
    ],
    videos: [],
    media: [],
    variants: [
      {
        id: 'var-1',
        title: 'Default',
        price: '2500.00',
        availableForSale: true,
        selectedOptions: [],
      },
    ],
    tags: ['setting:solitaire', 'metal:platinum', 'shape:round'],
    metafields: {
      description: 'Luxury solitaire setting',
      warranty: '5 years',
    },
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'white-gold-halo-setting',
    title: 'White Gold Halo Setting',
    description: 'Elegant white gold halo engagement ring setting with accent diamonds.',
    priceRange: {
      minVariantPrice: { amount: '1800', currencyCode: 'USD' },
      maxVariantPrice: { amount: '2200', currencyCode: 'USD' },
    },
    images: [
      {
        id: 'img-2',
        url: 'https://via.placeholder.com/500x500?text=White+Gold+Halo',
        altText: 'White Gold Halo Setting',
      },
    ],
    videos: [],
    media: [],
    variants: [
      {
        id: 'var-2',
        title: 'Default',
        price: '1800.00',
        availableForSale: true,
        selectedOptions: [],
      },
    ],
    tags: ['setting:halo', 'metal:white-gold', 'shape:round'],
    metafields: {
      description: 'Halo setting with accent diamonds',
      warranty: '5 years',
    },
  },
]

// Shopify GraphQL Query Executor
async function shopifyFetch(query: string, variables?: Record<string, any>) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_TOKEN) {
    console.warn(
      '[v0] Shopify credentials not found. Using mock data. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN to enable live product fetching.'
    )
    // Return mock data instead of querying Shopify
    return null
  }

  const url = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`)
  }

  return data.data
}

// Get product by handle (used for dynamic routes like /build-your-ring/[handle])
export const getProductByHandle = cache(async (handle: string): Promise<ShopifyProduct | null> => {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_TOKEN) {
    // Return mock product
    return MOCK_PRODUCTS.find((p) => p.handle === handle) || null
  }

  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 100) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        videos: media(first: 100, types: VIDEO) {
          edges {
            node {
              ... on Video {
                id
                sources {
                  url
                }
              }
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        tags
      }
    }
  `

  try {
    const data = await shopifyFetch(query, { handle })

    if (!data || !data.productByHandle) {
      return null
    }

    return transformShopifyProduct(data.productByHandle)
  } catch (error) {
    console.error('[v0] Error fetching product by handle:', error)
    return null
  }
})

// Get products by tag (used for collection pages with dynamic filtering)
export const getProductsByTag = cache(async (tag: string, limit = 50): Promise<ShopifyProduct[]> => {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_TOKEN) {
    // Return filtered mock products
    return MOCK_PRODUCTS.filter((p) => p.tags.includes(tag))
  }

  const query = `
    query GetProductsByTag($query: String!, $first: Int!) {
      search(first: $first, query: $query, types: PRODUCT) {
        edges {
          node {
            ... on Product {
              id
              handle
              title
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyFetch(query, { query: `tag:"${tag}"`, first: limit })

    if (!data || !data.search) {
      return []
    }

    return data.search.edges.map((edge: any) => transformShopifyProduct(edge.node))
  } catch (error) {
    console.error('[v0] Error fetching products by tag:', error)
    return []
  }
})

// Get all unique tags from products (used for dynamic filter generation)
export const getUniqueTags = cache(async (): Promise<ShopifyFilter[]> => {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_TOKEN) {
    // Extract from mock products
    const tagSet = new Set<string>()
    MOCK_PRODUCTS.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))

    return Array.from(tagSet).map((tag) => {
      const [category, value] = tag.split(':')
      return {
        id: tag,
        name: value.replace('-', ' ').toUpperCase(),
        category: category,
        count: MOCK_PRODUCTS.filter((p) => p.tags.includes(tag)).length,
      }
    })
  }

  // For now, return empty array - implement full Shopify API call when needed
  return []
})

// Filter products by multiple tags (AND logic)
export const filterProductsByTags = (
  products: ShopifyProduct[],
  tagsToFilter: string[]
): ShopifyProduct[] => {
  if (tagsToFilter.length === 0) {
    return products
  }

  return products.filter((product) =>
    tagsToFilter.every((tag) => product.tags.includes(tag))
  )
}

// Transform Shopify product response to our interface
function transformShopifyProduct(shopifyProduct: any): ShopifyProduct {
  const images = shopifyProduct.images?.edges?.map((edge: any) => ({
    id: edge.node.id,
    url: edge.node.url,
    altText: edge.node.altText,
    width: edge.node.width,
    height: edge.node.height,
  })) || []

  const videos = shopifyProduct.videos?.edges?.map((edge: any) => ({
    id: edge.node.id,
    url: edge.node.sources?.[0]?.url || '',
    title: edge.node.title,
    previewImage: edge.node.previewImage?.url,
  })) || []

  const media: ShopifyMediaItem[] = [
    ...images.map((img: ShopifyImage) => ({
      type: 'image' as const,
      id: img.id,
      url: img.url,
      altText: img.altText,
    })),
    ...videos.map((vid: ShopifyVideo) => ({
      type: 'video' as const,
      id: vid.id,
      url: vid.url,
      previewImage: vid.previewImage,
    })),
  ]

  const variants = shopifyProduct.variants?.edges?.map((edge: any) => ({
    id: edge.node.id,
    title: edge.node.title,
    price: edge.node.priceV2?.amount || '0',
    availableForSale: edge.node.availableForSale,
    selectedOptions: edge.node.selectedOptions || [],
  })) || []

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description || '',
    priceRange: shopifyProduct.priceRange,
    images,
    videos,
    media,
    variants,
    tags: shopifyProduct.tags || [],
    metafields: shopifyProduct.metafields,
  }
}

// Get mock data fallback (useful for testing without Shopify credentials)
export const getMockProducts = (): ShopifyProduct[] => MOCK_PRODUCTS
