# Ring Builder Architecture Documentation

## Phase 1-2: Shopify Product Data Layer + Enhanced RingContext

### Overview
The ring builder has been rebuilt as a **Shopify-first** application where all product data (settings, diamonds, images, videos, variants, tags, pricing, metafields) flows directly from Shopify products. No duplicate product structures are created.

### Architecture

#### 1. Shopify Integration (`lib/shopify.ts`)
- **Shopify Storefront GraphQL Client**: Fetches real-time product data from your Shopify store
- **Key Functions**:
  - `getProductByHandle(handle)` - Fetch single product by handle for dynamic routes
  - `getProductsByTag(tag)` - Fetch filtered products for collection pages
  - `getUniqueTags()` - Extract all available tags for dynamic filter generation
  - `filterProductsByTags(tags)` - Multi-tag filtering (AND logic)

- **Fallback Mock Data**: When `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN` are not set, the app uses built-in mock data for development/testing

- **Data Structure**:
  ```typescript
  interface ShopifyProduct {
    id: string
    handle: string
    title: string
    description: string
    priceRange: { minVariantPrice, maxVariantPrice }
    images: ShopifyImage[]
    videos: ShopifyVideo[]
    media: ShopifyMediaItem[] // Mixed images + videos
    variants: ShopifyVariant[]
    tags: string[]
    metafields?: Record<string, any> // Future: certificates, specs
  }
  ```

#### 2. Enhanced RingContext (`lib/ring-context.tsx`)
Manages the complete ring builder state with full support for dual journeys (Setting-First or Diamond-First).

- **State Fields**:
  - `selectedSetting`: Full ShopifyProduct object (not just a string)
  - `selectedDiamond`: Full ShopifyProduct object
  - `selectedMetal`: Selected metal variant/option
  - `settingPrice`, `diamondPrice`, `totalPrice`: Computed from products
  - `currentJourney`: Track "setting-first" or "diamond-first" workflow
  - `productImages`, `productVideos`: Media from Shopify

- **Key Methods**:
  - `setSetting(product, metal)` - Store setting + metal selection
  - `setDiamond(product)` - Store diamond selection
  - `updateSettingMetal(metal)` - Change metal without losing setting
  - `startJourney(type)` - Initiate journey
  - `switchJourney(type)` - Switch between journeys (preserves all selections)
  - `clearSetting()` - Clear only setting (keeps diamond)
  - `clearDiamond()` - Clear only diamond (keeps setting)
  - `canProceedToReview()` - Check if both setting + diamond selected

- **Preservation Across Navigation**:
  All selections persist across page navigations and journey switches. Users can:
  - Start with setting → switch to diamond first (Diamond still selected)
  - Start with diamond → switch to setting first (Setting still selected)
  - Change metal without losing setting/diamond

#### 3. Filter Utilities (`lib/filter-utils.ts`)
Dynamic filter generation from Shopify tags.

- **Key Functions**:
  - `extractFiltersFromProducts(products)` - Auto-generate filters from tags
  - `filterProductsBySelectedTags(products, tags)` - Apply filters (AND logic)
  - `formatCategoryLabel()`, `formatValueLabel()` - UI display formatting
  - `sortProductsByPrice()`, `getPriceRange()` - Collection utilities

- **Tag Format**:
  ```
  setting:solitaire      → Setting Filter: "Solitaire"
  setting:hidden-halo    → Setting Filter: "Hidden Halo"
  shape:round            → Shape Filter: "Round"
  shape:oval             → Shape Filter: "Oval"
  metal:white-gold       → Metal Filter: "White Gold"
  metal:platinum         → Metal Filter: "Platinum"
  collection:settings    → Collection identifier
  ```

### Data Flow

#### Setting-First Journey (Journey A)
```
1. /build-your-ring
   ↓ User selects setting
2. /build-your-ring/[handle]
   ↓ Selected setting + metal stored in RingContext
3. /build-your-ring/diamond
   ↓ User selects diamond
4. /build-your-ring/diamond/[id]
   ↓ Selected diamond stored in RingContext
5. /build-your-ring/review
   ↓ Both setting + diamond + metal in context
   → Add to Shopify cart
```

#### Diamond-First Journey (Journey B)
```
1. /build-your-ring/diamond
   ↓ User selects diamond
2. /build-your-ring/diamond/[id]
   ↓ Selected diamond stored in RingContext
3. /build-your-ring
   ↓ User selects setting
4. /build-your-ring/[handle]
   ↓ Selected setting + metal stored in RingContext
5. /build-your-ring/review
   ↓ Both setting + diamond + metal in context
   → Add to Shopify cart
```

#### Mid-Journey Switching
- From setting page: "START WITH DIAMOND INSTEAD" → Navigate to /build-your-ring/diamond (keeps any existing diamond)
- From diamond page: "CHANGE SETTING" → Navigate to /build-your-ring (keeps current diamond)
- From any page: "EDIT [SELECTION]" → Return to collection page (preserves other selections)

### Environment Setup

#### With Shopify Credentials (Production)
```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN=your-storefront-token
```
Set these in `.env.local` to enable live Shopify product fetching.

#### Without Shopify Credentials (Development)
The app automatically uses **mock data** (defined in `lib/shopify.ts`):
- 2 sample settings with variants
- Full product structure with images, variants, tags
- Perfect for UI development before Shopify integration

### Shopify Product Requirements

Each product must have:
- **Title**: Display name (e.g., "Platinum Solitaire Setting")
- **Description**: Long-form content
- **Images**: Multiple product images (all will be included)
- **Videos**: Optional product videos (mixed media gallery)
- **Variants**: Define options like metal (White Gold, Yellow Gold, Rose Gold, Platinum)
- **Tags**: Filter tags in format "category:value"
  - Settings should have: `setting:*`, `shape:*`, `metal:*`
  - Diamonds should have: `shape:*`, `carat:*`, `colour:*`, `clarity:*`, `cut:*`
- **Price**: Variants should have prices
- **Metafields**: Optional (future) for certificates, specifications, warranty info

### Scaling Considerations

#### 400+ Ring Settings
- Uses dynamic routes `/build-your-ring/[handle]` - no hardcoded page limits
- Filters auto-generate from tags - no need to add new filter code
- Server-side caching prevents performance issues

#### 100,000+ Diamonds (Future)
- Architecture ready for Nivoda API integration
- Diamond collection page architected for pagination/virtualization
- Can swap mock diamond data for Nivoda API with minimal changes
- Preserves all selection logic across API source change

#### Future Metafields
- Product structure includes `metafields` field
- Can store certificates, dimensions, warranties, etc.
- UI can conditionally render based on metafield presence

### Usage Examples

#### Getting started with mock data:
```typescript
// Auto-fetch from mock data (if credentials not set)
const product = await getProductByHandle('platinum-solitaire-setting')

// Extract filters for UI
const filters = extractFiltersFromProducts(mockProducts)

// Apply user selections
const filtered = filterProductsBySelectedTags(mockProducts, ['setting:solitaire', 'metal:white-gold'])
```

#### Using RingContext for selections:
```typescript
'use client'
import { useRing } from '@/lib/ring-context'

export function SettingCard({ product }) {
  const { setSetting } = useRing()
  
  return (
    <button onClick={() => setSetting(product, 'white-gold')}>
      {product.title}
    </button>
  )
}
```

### Next Steps (Phases 3-9)

- **Phase 3**: Setting Collection Page - Dynamic filters, responsive grid
- **Phase 4**: Setting Product Page - Mixed media gallery, metal selector
- **Phase 5-6**: Diamond pages (Nivoda-ready architecture)
- **Phase 7**: Review page with Shopify cart integration
- **Phase 8-9**: Mobile optimization, Shopify embedded pages, Nivoda swap-in

### Key Principles

✅ **No Duplicate Data** - All product info comes from Shopify  
✅ **Dual Journey Support** - Users can start with setting OR diamond  
✅ **State Preservation** - All selections persist across navigation  
✅ **Scalable Filters** - Auto-generate from tags, no hardcoding  
✅ **SEO-Ready** - Dynamic routes, product handles in URLs  
✅ **Future-Proof** - Ready for Nivoda API, Shopify metafields, 100k+ products  
