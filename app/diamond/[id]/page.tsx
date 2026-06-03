'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getDiamondByHandle } from '@/lib/product-service'
import { useRing } from '@/lib/ring-context'
import { useParams } from 'next/navigation'

export default function DiamondDetail() {
  const params = useParams()
  const handle = params.id as string
  const diamond = getDiamondByHandle(handle)
  const { ring, updateRing } = useRing()

  if (!diamond) {
    return (
      <main className="min-h-screen bg-background py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Diamond Not Found</h1>
          <p className="text-foreground/70 mb-8">The diamond you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/diamond">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Back to Diamonds
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleSelectDiamond = () => {
    updateRing({
      diamondHandle: diamond.handle,
      diamondData: diamond,
      diamondPrice: diamond.price,
    })
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/diamond" className="text-sm text-foreground/60 hover:text-foreground transition">
            Diamonds
          </Link>
          <ChevronRight size={16} className="text-foreground/40" />
          <span className="text-sm font-medium text-foreground">{diamond.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
              <img
                src={diamond.image}
                alt={diamond.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-muted-foreground text-sm">[Diamond Image]</span>'
                }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Diamond Details */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-serif font-bold text-primary mb-4">{diamond.name}</h1>
            <p className="text-lg text-foreground/70 mb-8">{diamond.description}</p>

            {/* 4Cs Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Diamond Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-muted/50 border-0">
                  <p className="text-sm text-foreground/60 mb-2">Carat Weight</p>
                  <p className="text-3xl font-bold text-primary">{diamond.carat}</p>
                </Card>

                <Card className="p-6 bg-muted/50 border-0">
                  <p className="text-sm text-foreground/60 mb-2">Color Grade</p>
                  <p className="text-3xl font-bold text-primary">{diamond.color}</p>
                  <p className="text-xs text-foreground/60 mt-1">Colorless</p>
                </Card>

                <Card className="p-6 bg-muted/50 border-0">
                  <p className="text-sm text-foreground/60 mb-2">Clarity Grade</p>
                  <p className="text-3xl font-bold text-primary">{diamond.clarity}</p>
                  <p className="text-xs text-foreground/60 mt-1">Very Slightly Included</p>
                </Card>

                <Card className="p-6 bg-muted/50 border-0">
                  <p className="text-sm text-foreground/60 mb-2">Cut Quality</p>
                  <p className="text-3xl font-bold text-primary">{diamond.cut}</p>
                  <p className="text-xs text-foreground/60 mt-1">Maximum Sparkle</p>
                </Card>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-6 mb-12 pb-12 border-b border-border">
              <div>
                <p className="text-foreground/60 text-sm mb-1">Shape</p>
                <p className="text-lg font-semibold text-foreground">{diamond.shape}</p>
              </div>
              <div>
                <p className="text-foreground/60 text-sm mb-1">Type</p>
                <p className="text-lg font-semibold text-foreground">
                  {diamond.lab_grown ? 'Lab-Grown' : 'Natural'}
                </p>
              </div>
              <div>
                <p className="text-foreground/60 text-sm mb-1">Certification</p>
                <p className="text-lg font-semibold text-foreground">{diamond.certificate}</p>
              </div>
              {diamond.certificate && (
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Certificate ID</p>
                  <p className="text-lg font-semibold text-foreground">Available upon purchase</p>
                </div>
              )}
            </div>

            {/* Price and CTA */}
            <Card className="p-6 border border-border mb-6">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-foreground/60">Price</span>
                <div className="text-3xl font-bold text-primary">${diamond.price.toLocaleString()}</div>
              </div>
              <Button
                onClick={handleSelectDiamond}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg h-auto"
              >
                Select This Diamond
              </Button>
              {ring.diamondHandle === diamond.handle && (
                <div className="mt-4 text-center text-sm font-medium text-primary">
                  ✓ This diamond is selected
                </div>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between gap-4">
              <Link href="/diamond" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Diamonds
                </Button>
              </Link>
              <Link href="/review" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  Continue to Review
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
