# Integration Guide: Shopify & Nivoda

This document explains how to integrate Shopify and Nivoda APIs into the ring builder once you're ready to connect real data sources.

## Current State

The ring builder currently uses mock data defined in `lib/product-service.ts`:
- **Settings**: 6 predefined engagement ring settings with pricing and metal options
- **Diamonds**: 8 sample diamonds with 4Cs data and pricing

The app is fully functional for demonstration purposes with all core features working:
- Setting collection page with filtering (metal, price)
- Setting detail pages with image galleries
- Diamond collection page with filtering (shape, carat, price, type)
- Diamond detail pages with 4Cs specifications
- Review page with order summary
- State persistence via localStorage

## Integration Architecture

The app uses a service-based architecture that makes it easy to swap data sources:

```
lib/product-service.ts
├── SETTINGS & DIAMONDS arrays (mock data)
├── Helper functions:
│   ├── getSettingByHandle()
│   ├── getDiamondByHandle()
│   ├── filterDiamonds()
│   ├── filterSettings()
│   ├── getAllShapes()
│   └── getAllMetals()
└── Type definitions (Setting, Diamond)
```

To integrate real data sources, you'll update the helper functions in `product-service.ts` to fetch from APIs instead of returning local arrays.

## Shopify Integration

### Overview

Shopify will serve as the source for **Settings (Engagement Ring Settings)** products.

### Setup Steps

1. **Create Shopify Collection**: Create a collection called "Ring Settings" in your Shopify store
2. **Create Setting Products**: Add your engagement ring settings as products with:
   - Product name (e.g., "Solitaire", "Halo")
   - Description (2-3 sentences)
   - Multiple images for gallery
   - Price (basePrice)
   - Variants for metal options (e.g., "14k White Gold", "18k Platinum")
   - Custom metafield for setting type/details

3. **Get Credentials**: From Shopify Admin:
   - Store domain (e.g., `your-store.myshopify.com`)
   - Access token (create custom app with `read_products` scope)

### Implementation

Update `lib/product-service.ts`:

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: `https://${SHOPIFY_STORE}.myshopify.com/api/2024-01/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
  },
});

export async function getSettingByHandle(handle: string): Promise<Setting | undefined> {
  const query = gql`
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        priceRange {
          minVariantPrice { amount }
        }
        images(first: 10) {
          edges { node { url } }
        }
        variants(first: 5) {
          edges { node { title } }
        }
      }
    }
  `;

  const { data } = await client.query({ query, variables: { handle } });
  return transformShopifyProduct(data.productByHandle);
}

export async function filterSettings(filters: FilterOptions): Promise<Setting[]> {
  // Fetch from Shopify with filters
}
```

**Environment Variables**:
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

## Nivoda Integration

### Overview

Nivoda will serve as the source for **Diamonds**. Nivoda provides a comprehensive diamond inventory API with real-time pricing and GIA/AGS certification data.

### Setup Steps

1. **Sign up for Nivoda API**: https://www.nivoda.com/api
2. **Get API Credentials**: 
   - API Key
   - API URL (staging or production)
3. **Explore Available Diamonds**: Use Nivoda's diamond search endpoint

### Implementation

Update `lib/product-service.ts`:

```typescript
interface NivodaDiamond {
  stock_id: string
  carat_weight: number
  color: string
  clarity: string
  cut: string
  shape: string
  lab: string
  price_usd: number
  cert_num?: string
  image_url?: string
}

export async function getDiamondByHandle(handle: string): Promise<Diamond | undefined> {
  const response = await fetch('https://api.nivoda.com/diamonds/stock_id', {
    headers: {
      'Authorization': `Bearer ${NIVODA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stock_id: handle }),
  });

  const nivodaDiamond = await response.json();
  return transformNivodaDiamond(nivodaDiamond);
}

export async function filterDiamonds(filters: DiamondFilters): Promise<Diamond[]> {
  const searchParams = {
    carat_min: filters.minCarat,
    carat_max: filters.maxCarat,
    color: filters.color,
    clarity: filters.clarity,
    shape: filters.shape,
    price_min: filters.minPrice,
    price_max: filters.maxPrice,
    per_page: 50,
  };

  const response = await fetch('https://api.nivoda.com/diamonds/search', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NIVODA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });

  const { diamonds } = await response.json();
  return diamonds.map(transformNivodaDiamond);
}

function transformNivodaDiamond(nivodaDiamond: NivodaDiamond): Diamond {
  return {
    id: nivodaDiamond.stock_id,
    handle: nivodaDiamond.stock_id.toLowerCase().replace(/\s+/g, '-'),
    name: `${nivodaDiamond.shape} Diamond ${nivodaDiamond.carat_weight}ct ${nivodaDiamond.color} ${nivodaDiamond.clarity}`,
    shape: nivodaDiamond.shape,
    carat: nivodaDiamond.carat_weight,
    color: nivodaDiamond.color,
    clarity: nivodaDiamond.clarity,
    cut: nivodaDiamond.cut,
    lab_grown: nivodaDiamond.lab === 'LAB' || nivodaDiamond.lab.includes('Lab'),
    price: nivodaDiamond.price_usd,
    certificate: nivodaDiamond.lab,
    description: `${nivodaDiamond.carat_weight}ct ${nivodaDiamond.color} ${nivodaDiamond.clarity} ${nivodaDiamond.shape} - ${nivodaDiamond.lab} Certified`,
    image: nivodaDiamond.image_url || '/diamonds/placeholder.jpg',
  };
}
```

**Environment Variables**:
```
NIVODA_API_KEY=your-api-key
NIVODA_API_URL=https://api.nivoda.com
```

## Migration Path

### Phase 1 (Current): Mock Data Demo ✓
- Settings: Local mock data
- Diamonds: Local mock data
- Status: Fully functional demo

### Phase 2: Shopify Staging
1. Implement Shopify API integration
2. Fetch real settings from Shopify
3. Keep mock diamonds temporarily
4. Test setting pages with real Shopify data

### Phase 3: Nivoda Integration
1. Implement Nivoda API integration
2. Fetch real diamonds from Nivoda
3. Test diamond pages with real inventory
4. Implement real-time pricing

### Phase 4: Checkout Integration
1. Connect Stripe for payments
2. Implement order creation in Shopify
3. Add order fulfillment workflow

## Development Tips

### Testing Integrations

```bash
# Test Shopify API
curl -X POST https://your-store.myshopify.com/api/2024-01/graphql.json \
  -H "X-Shopify-Storefront-Access-Token: YOUR_TOKEN" \
  -d '{ "query": "{ products(first: 10) { edges { node { id title } } } }" }'

# Test Nivoda API
curl -X POST https://api.nivoda.com/diamonds/search \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "per_page": 10, "sort": "-carat" }'
```

### Error Handling

Add error handling for API failures in the page components:

```typescript
try {
  const settings = await filterSettings(filters);
  setFilteredSettings(settings);
} catch (error) {
  console.error('Failed to fetch settings:', error);
  // Show fallback UI or error message
}
```

### Performance Considerations

1. **Cache Diamond Searches**: Use `useSWR` with caching for frequently searched combinations
2. **Paginate Results**: Limit initial results to 20-30 items, load more on demand
3. **Lazy Load Images**: Use Next.js Image component with lazy loading
4. **API Caching**: Cache API responses at the edge using Vercel Edge Functions

## Database Setup (Optional)

If you need to store user selections or create orders:

```typescript
// lib/database.ts
import { sql } from '@vercel/postgres';

export async function saveRingSelection(userId: string, selection: RingSelection) {
  await sql`
    INSERT INTO ring_selections (user_id, setting_handle, diamond_id, metal, created_at)
    VALUES (${userId}, ${selection.settingHandle}, ${selection.diamondHandle}, ${selection.metal}, NOW())
  `;
}

export async function createOrder(userId: string, selection: RingSelection) {
  // Create order in database and trigger fulfillment workflow
}
```

Add Vercel Postgres integration in project settings.

## Resources

- [Shopify GraphQL API Docs](https://shopify.dev/api/admin-graphql)
- [Nivoda API Documentation](https://www.nivoda.com/api/documentation)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [SWR Documentation](https://swr.vercel.app/) for client-side data fetching

## Questions?

For integration support, refer to the component pages that use product-service:
- `/app/build-your-ring/page.tsx` - Settings collection
- `/app/build-your-ring/[handle]/page.tsx` - Setting detail
- `/app/diamond/page.tsx` - Diamond collection
- `/app/diamond/[id]/page.tsx` - Diamond detail
