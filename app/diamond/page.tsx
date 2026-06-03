'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, Filter } from 'lucide-react'
import { DIAMONDS, filterDiamonds, getAllShapes } from '@/lib/product-service'
import { useRing } from '@/lib/ring-context'

export default function DiamondCollection() {
  const { ring } = useRing()
  const [selectedShape, setSelectedShape] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [caratRange, setCaratRange] = useState<[number, number]>([0, 2.5])
  const [labGrown, setLabGrown] = useState<boolean | null>(null)
  const allShapes = getAllShapes()

  // Filter diamonds based on selected filters
  const filteredDiamonds = filterDiamonds({
    shape: selectedShape || undefined,
    minCarat: caratRange[0],
    maxCarat: caratRange[1],
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    labGrown: labGrown !== null ? labGrown : undefined,
  })

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-sm text-foreground/60 hover:text-foreground transition">
              Home
            </Link>
            <ChevronRight size={16} className="text-foreground/40" />
            <span className="text-sm font-medium text-foreground">Diamonds</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Choose Your Diamond
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Browse our collection of premium certified diamonds. All diamonds are GIA, AGS, or IGI certified.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              </div>

              {/* Shape Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Shape</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedShape(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedShape === null
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    All Shapes
                  </button>
                  {allShapes.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedShape === shape
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carat Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Carat Weight</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground/70">Min: {caratRange[0].toFixed(2)}</label>
                    <input
                      type="range"
                      min="0"
                      max="2.5"
                      step="0.1"
                      value={caratRange[0]}
                      onChange={(e) => setCaratRange([parseFloat(e.target.value), caratRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70">Max: {caratRange[1].toFixed(2)}</label>
                    <input
                      type="range"
                      min="0"
                      max="2.5"
                      step="0.1"
                      value={caratRange[1]}
                      onChange={(e) => setCaratRange([caratRange[0], parseFloat(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-foreground/70">Min: ${priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-foreground/70">Max: ${priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Lab-Grown Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Diamond Type</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setLabGrown(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      labGrown === null
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setLabGrown(false)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      labGrown === false
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    Natural
                  </button>
                  <button
                    onClick={() => setLabGrown(true)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      labGrown === true
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    Lab-Grown
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedShape(null)
                  setPriceRange([0, 10000])
                  setCaratRange([0, 2.5])
                  setLabGrown(null)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Diamonds Grid */}
          <div className="lg:col-span-3">
            {filteredDiamonds.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-foreground/60">No diamonds match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDiamonds.map((diamond) => (
                  <Link key={diamond.id} href={`/diamond/${diamond.handle}`}>
                    <Card
                      className={`p-6 border-2 cursor-pointer transition transform hover:scale-105 h-full ${
                        ring.diamondHandle === diamond.handle
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
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

                      <h3 className="text-lg font-serif font-bold text-primary mb-3">
                        {diamond.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div>
                          <p className="text-xs text-foreground/60">Carat</p>
                          <p className="font-medium text-foreground">{diamond.carat}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Color</p>
                          <p className="font-medium text-foreground">{diamond.color}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Clarity</p>
                          <p className="font-medium text-foreground">{diamond.clarity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60">Cut</p>
                          <p className="font-medium text-foreground">{diamond.cut}</p>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">${diamond.price.toLocaleString()}</p>
                          {diamond.lab_grown && (
                            <p className="text-xs text-foreground/60 mt-1">Lab-Grown</p>
                          )}
                        </div>
                        {ring.diamondHandle === diamond.handle && (
                          <div className="text-primary font-medium">✓ Selected</div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-12 border-t border-border mt-12">
          <Link href="/build-your-ring">
            <Button variant="outline" className="px-6 py-2">
              Back to Settings
            </Button>
          </Link>

          {ring.diamondHandle ? (
            <Link href="/review">
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 flex items-center gap-2">
                Next: Review & Checkout
                <ChevronRight size={20} />
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="bg-primary/50 text-white px-6 py-2 flex items-center gap-2"
            >
              Next: Review & Checkout
              <ChevronRight size={20} />
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
