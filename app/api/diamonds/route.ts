import { NextRequest, NextResponse } from "next/server"
import { getNivodaClient } from "@/lib/nivoda"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // Parse query parameters into filters
    const filters = {
      shape: searchParams.get("shape") || undefined,
      color: searchParams.get("color") || undefined,
      clarity: searchParams.get("clarity") || undefined,
      cut: searchParams.get("cut") || undefined,
      caratMin: searchParams.get("caratMin") ? Number(searchParams.get("caratMin")) : undefined,
      caratMax: searchParams.get("caratMax") ? Number(searchParams.get("caratMax")) : undefined,
      priceMin: searchParams.get("priceMin") ? Number(searchParams.get("priceMin")) : undefined,
      priceMax: searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : undefined,
      labGrown: searchParams.get("labGrown") === "true" ? true : undefined,
    }

    // Remove undefined filters
    Object.keys(filters).forEach(
      key => filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
    )

    console.log("[API] Fetching diamonds with filters:", filters)

    const client = getNivodaClient()
    const diamonds = await client.getDiamonds(filters)

    return NextResponse.json({
      success: true,
      count: diamonds.length,
      diamonds,
    })
  } catch (error) {
    console.error("[API] Error fetching diamonds:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
