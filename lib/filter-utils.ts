/**
 * Filter utilities for dynamic tag-based filtering
 * Generates filters from Shopify tags and handles multi-tag filtering
 */

import type { ShopifyProduct } from './shopify'

export interface FilterOption {
  id: string
  label: string
  category: string
  productCount: number
  isActive: boolean
}

export interface FilterGroup {
  category: string
  label: string
  options: FilterOption[]
}

/**
 * Extract unique filter groups from products based on tags
 * Tag format: "category:value" (e.g., "setting:solitaire", "shape:round", "metal:white-gold")
 */
export function extractFiltersFromProducts(products: ShopifyProduct[]): FilterGroup[] {
  const filterMap = new Map<string, Map<string, number>>()

  // Count occurrences of each tag
  products.forEach((product) => {
    product.tags.forEach((tag) => {
      const [category, value] = tag.split(':')
      if (!category || !value) return

      if (!filterMap.has(category)) {
        filterMap.set(category, new Map())
      }

      const categoryMap = filterMap.get(category)!
      categoryMap.set(value, (categoryMap.get(value) || 0) + 1)
    })
  })

  // Convert to FilterGroup structure
  return Array.from(filterMap.entries()).map(([category, values]) => ({
    category,
    label: formatCategoryLabel(category),
    options: Array.from(values.entries())
      .map(([value, count]) => ({
        id: `${category}:${value}`,
        label: formatValueLabel(value),
        category,
        productCount: count,
        isActive: false,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  }))
}

/**
 * Format category for display (e.g., "metal" -> "Metal")
 */
export function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Format value for display (e.g., "white-gold" -> "White Gold")
 */
export function formatValueLabel(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get products filtered by selected tags (AND logic - all tags must match)
 */
export function filterProductsBySelectedTags(
  products: ShopifyProduct[],
  selectedTags: string[]
): ShopifyProduct[] {
  if (selectedTags.length === 0) {
    return products
  }

  return products.filter((product) =>
    selectedTags.every((tag) => product.tags.includes(tag))
  )
}

/**
 * Get products by collection tag
 * Collections are typically tagged with "collection:name"
 */
export function getProductsByCollection(
  products: ShopifyProduct[],
  collection: string
): ShopifyProduct[] {
  return products.filter((product) => product.tags.includes(`collection:${collection}`))
}

/**
 * Get related products by tag
 * Useful for "Similar Settings" or "Pairs with" sections
 */
export function getRelatedProducts(
  currentProduct: ShopifyProduct,
  products: ShopifyProduct[],
  limit = 4
): ShopifyProduct[] {
  // Find products that share at least one tag with current product
  const related = products
    .filter((p) => p.id !== currentProduct.id)
    .filter((p) => p.tags.some((tag) => currentProduct.tags.includes(tag)))
    .slice(0, limit)

  return related
}

/**
 * Sort products by price (ascending or descending)
 */
export function sortProductsByPrice(
  products: ShopifyProduct[],
  order: 'asc' | 'desc' = 'asc'
): ShopifyProduct[] {
  return [...products].sort((a, b) => {
    const priceA = parseFloat(a.priceRange.minVariantPrice.amount)
    const priceB = parseFloat(b.priceRange.minVariantPrice.amount)

    return order === 'asc' ? priceA - priceB : priceB - priceA
  })
}

/**
 * Get price range for a product collection
 */
export function getPriceRange(products: ShopifyProduct[]): { min: number; max: number } {
  if (products.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = products.map((p) => parseFloat(p.priceRange.minVariantPrice.amount))
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

/**
 * Format price as currency
 */
export function formatPrice(amount: string | number, currency = 'USD'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num)
}

/**
 * Get display media (images + videos) from product
 */
export function getDisplayMedia(product: ShopifyProduct) {
  return {
    images: product.images || [],
    videos: product.videos || [],
    media: product.media || [],
  }
}

/**
 * Build variant selector for metal options
 * Extracts metal options from product variants
 */
export function extractMetalOptions(product: ShopifyProduct) {
  const metalOptions = new Map<string, string>()

  product.variants.forEach((variant) => {
    // Look for "Metal" option in selectedOptions
    const metalOption = variant.selectedOptions.find(
      (opt) => opt.name.toLowerCase() === 'metal'
    )

    if (metalOption) {
      metalOptions.set(metalOption.value, variant.id)
    }
  })

  return Array.from(metalOptions.entries()).map(([metal, variantId]) => ({
    name: metal,
    variantId,
  }))
}
