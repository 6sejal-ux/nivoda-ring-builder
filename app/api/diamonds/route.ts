import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const shape = searchParams.get("shape") || ""
    const lab = searchParams.get("lab") || "lab"

    const response = await fetch("https://integrations.nivoda.net/api/diamonds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NIVODA_KEY}`,
      },
      body: JSON.stringify({
        shape: shape,
        type: lab,
      }),
    })

    const data = await response.json()

    return NextResponse.json(data.diamonds || [])
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
