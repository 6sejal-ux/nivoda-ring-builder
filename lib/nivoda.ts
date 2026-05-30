/**
 * Nivoda API Client
 * Handles authentication and diamond retrieval from Nivoda API
 */

export interface DiamondFilters {
  shape?: string
  color?: string
  clarity?: string
  cut?: string
  caratMin?: number
  caratMax?: number
  priceMin?: number
  priceMax?: number
  labGrown?: boolean
}

export interface NivodaDiamond {
  id: string
  shape: string
  carat: number
  color: string
  clarity: string
  cut: string
  price: number
  lab_grown: boolean
  image_url?: string
  video_url?: string
  certificate_url?: string
}

/**
 * Get authenticated Nivoda API client
 */
export function getNivodaClient() {
  const apiKey = process.env.NIVODA_KEY
  
  if (!apiKey) {
    console.error('[Nivoda] NIVODA_KEY environment variable is not set')
    throw new Error('NIVODA_KEY is not configured')
  }

  return {
    /**
     * Fetch diamonds from Nivoda API with optional filters
     */
    async getDiamonds(filters: DiamondFilters = {}): Promise<NivodaDiamond[]> {
      try {
        console.log('[Nivoda] Fetching diamonds with filters:', filters)

        // Build request body with filters
        const requestBody: any = {
          shape: filters.shape || undefined,
          type: filters.labGrown ? 'lab' : 'natural',
        }

        // Remove undefined values
        Object.keys(requestBody).forEach(
          key => requestBody[key] === undefined && delete requestBody[key]
        )

        const response = await fetch('https://integrations.nivoda.net/api/diamonds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('[Nivoda] API error response:', response.status, errorText)
          throw new Error(
            `Nivoda API error: ${response.status} ${response.statusText}`
          )
        }

        const data = await response.json()
        console.log('[Nivoda] API response received, diamond count:', data.diamonds?.length || 0)

        // Normalize and filter diamonds
        const diamonds = (data.diamonds || [])
          .map((d: any) => normalizeDiamond(d))
          .filter((d: NivodaDiamond | null): d is NivodaDiamond => d !== null)

        // Apply client-side filters if needed
        return applyFilters(diamonds, filters)
      } catch (error) {
        console.error('[Nivoda] Error fetching diamonds:', error)
        throw error
      }
    },
  }
}

/**
 * Normalize Nivoda API diamond response into standard format
 */
function normalizeDiamond(raw: any): NivodaDiamond | null {
  try {
    // Ensure required fields exist
    if (!raw.id || !raw.carat || !raw.price) {
      console.warn('[Nivoda] Skipping diamond with missing required fields:', raw)
      return null
    }

    return {
      id: String(raw.id),
      shape: raw.shape || 'Round',
      carat: Number(raw.carat),
      color: raw.color || 'N/A',
      clarity: raw.clarity || 'N/A',
      cut: raw.cut || 'Good',
      price: Number(raw.price),
      lab_grown: raw.lab_grown === true || raw.type === 'lab',
      image_url: raw.image_url || raw.imageUrl || undefined,
      video_url: raw.video_url || raw.videoUrl || undefined,
      certificate_url: raw.certificate_url || raw.certificateUrl || undefined,
    }
  } catch (error) {
    console.warn('[Nivoda] Error normalizing diamond:', raw, error)
    return null
  }
}

/**
 * Apply client-side filters to diamonds
 */
function applyFilters(diamonds: NivodaDiamond[], filters: DiamondFilters): NivodaDiamond[] {
  return diamonds.filter(diamond => {
    if (filters.shape && diamond.shape !== filters.shape) return false
    if (filters.color && diamond.color !== filters.color) return false
    if (filters.clarity && diamond.clarity !== filters.clarity) return false
    if (filters.cut && diamond.cut !== filters.cut) return false
    if (filters.caratMin !== undefined && diamond.carat < filters.caratMin) return false
    if (filters.caratMax !== undefined && diamond.carat > filters.caratMax) return false
    if (filters.priceMin !== undefined && diamond.price < filters.priceMin) return false
    if (filters.priceMax !== undefined && diamond.price > filters.priceMax) return false
    if (filters.labGrown === true && !diamond.lab_grown) return false
    return true
  })
}
