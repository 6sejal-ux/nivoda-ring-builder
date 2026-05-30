import { NextRequest, NextResponse } from 'next/server'
import { getNivodaClient } from '@/lib/nivoda'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Extract filter parameters
    const shape = searchParams.get('shape') || undefined
    const color = searchParams.get('color') || undefined
    const clarity = searchParams.get('clarity') || undefined
    const cut = searchParams.get('cut') || undefined
    const caratMin = searchParams.get('caratMin') ? parseFloat(searchParams.get('caratMin')!) : undefined
    const caratMax = searchParams.get('caratMax') ? parseFloat(searchParams.get('caratMax')!) : undefined
    const priceMin = searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')!) : undefined
    const priceMax = searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')!) : undefined
    const labGrown = searchParams.get('labGrown') === 'true' ? true : undefined

    // Build filter object
    const filters = {
      ...(shape && shape !== 'all-shapes' && { shape }),
      ...(color && color !== 'all-colors' && { color }),
      ...(clarity && clarity !== 'all-clarities' && { clarity }),
      ...(cut && cut !== 'all-cuts' && { cut }),
      ...(caratMin !== undefined && { caratMin }),
      ...(caratMax !== undefined && { caratMax }),
      ...(priceMin !== undefined && { priceMin }),
      ...(priceMax !== undefined && { priceMax }),
      ...(labGrown && { labGrown }),
    }

    console.log('[v0] API route called with filters:', filters)

    // Get Nivoda client and fetch diamonds
    const client = getNivodaClient()
    const diamonds = await client.getDiamonds(filters)

    return NextResponse.json({
      success: true,
      count: diamonds.length,
      diamonds,
    })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch diamonds from Nivoda' 
      },
      { status: 500 }
    )
  }
}

