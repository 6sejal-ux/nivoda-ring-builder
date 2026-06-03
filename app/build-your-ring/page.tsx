'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, Filter } from 'lucide-react'
import { SETTINGS, filterSettings, getAllMetals } from '@/lib/product-service'
import { useRing } from '@/lib/ring-context'

export default function SettingCollection() {
  const { ring } = useRing()
  const [selectedMetal, setSelectedMetal] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])
  const allMetals = getAllMetals()

  // Filter settings based on selected filters
  const filteredSettings = filterSettings({
    metal: selectedMetal || undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
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
            <span className="text-sm font-medium text-foreground">Settings</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Choose Your Setting
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Select the perfect setting for your engagement ring. Each setting can be customized to your preferences.
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

              {/* Metal Filter */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Metal</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedMetal(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedMetal === null
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    All Metals
                  </button>
                  {allMetals.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedMetal === metal
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
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
                      max="3000"
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
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedMetal(null)
                  setPriceRange([0, 3000])
                }}
                className="w-full px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="lg:col-span-3">
            {filteredSettings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-foreground/60">No settings match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSettings.map((setting) => (
                  <Link key={setting.id} href={`/build-your-ring/${setting.handle}`}>
                    <Card
                      className={`p-6 border-2 cursor-pointer transition transform hover:scale-105 h-full ${
                        ring.settingHandle === setting.handle
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                        <img
                          src={setting.image}
                          alt={setting.name}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.parentElement!.innerHTML = '<span class="text-muted-foreground text-sm">[Setting Image]</span>'
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                        {setting.name}
                      </h3>
                      <p className="text-foreground/70 text-sm mb-6 min-h-[3rem] line-clamp-3">
                        {setting.description}
                      </p>

                      <div className="border-t border-border pt-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-foreground/60 mb-1">Starting from</p>
                          <p className="text-2xl font-bold text-primary">${setting.basePrice.toLocaleString()}</p>
                        </div>
                        {ring.settingHandle === setting.handle && (
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
          <Link href="/">
            <Button variant="outline" className="px-6 py-2">
              Back to Home
            </Button>
          </Link>

          {ring.settingHandle ? (
            <Link href="/build-your-ring/review">
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

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-12 justify-center">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className={`w-3 h-3 rounded-full ${ring.settingHandle ? 'bg-primary' : 'bg-muted'}`}></div>
        </div>
      </div>
    </main>
  )
}
