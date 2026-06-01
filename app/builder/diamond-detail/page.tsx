'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRing } from '@/lib/ring-context'
import { ChevronRight } from 'lucide-react'

export default function DiamondDetail() {
  const { ring } = useRing()

  if (!ring.selectedDiamond) {
    return (
      <main className="min-h-screen bg-background py-12 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-foreground/70 mb-4">No diamond selected</p>
          <Link href="/builder/diamond">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Select a Diamond
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const diamond = ring.selectedDiamond

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/builder/diamond" className="text-primary hover:text-primary/80 mb-6 inline-flex items-center">
          ← Back to Diamonds
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Diamond Image */}
          <div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-8">
              <span className="text-muted-foreground text-lg">[Diamond 360° View]</span>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80">
                  <span className="text-xs text-muted-foreground">View {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                {diamond.title}
              </h1>
              <p className="text-lg text-foreground/70">
                Premium certified diamond
              </p>
            </div>

            {/* 4Cs Specifications */}
            <Card className="p-8 bg-white border border-border">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Diamond Specifications</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/60 uppercase mb-2">Product</p>
                  <p className="text-lg font-semibold">{diamond.title}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 uppercase mb-2">Description</p>
                  <p className="text-foreground/70">{diamond.description}</p>
                </div>
              </div>

              {diamond.tags.includes('lab-grown') && (
                <div className="border-t border-border mt-6 pt-6">
                  <p className="text-sm text-foreground/60 uppercase mb-2">Type</p>
                  <p className="text-lg font-semibold">Lab Grown Diamond</p>
                </div>
              )}
            </Card>

            {/* Certificate Section */}
            <Card className="p-8 bg-white border border-border">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Certification</h2>
              <p className="text-foreground/70 mb-4">
                This diamond is certified by a reputable gemological laboratory and comes with a complete certification report detailing all specifications and characteristics.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                View Certificate
              </Button>
            </Card>

            {/* Video */}
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">[Video Player]</span>
            </div>

            {/* Add to Ring Button */}
            <Link href="/builder/review">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg flex items-center justify-center gap-2">
                Add to Ring
                <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </div>

        {/* Price Summary */}
        <Card className="mt-12 p-8 bg-white border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-foreground/60 uppercase mb-2">Diamond Price</p>
              <p className="text-3xl font-bold text-primary">${ring.diamondPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/60 uppercase mb-2">Setting Price</p>
              <p className="text-3xl font-bold text-primary">${ring.settingPrice.toLocaleString()}</p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6">
              <p className="text-sm text-foreground/60 uppercase mb-2">Estimated Total</p>
              <p className="text-3xl font-bold text-primary">${ring.totalPrice.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-12 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-muted"></div>
        </div>
      </div>
    </main>
  )
}
