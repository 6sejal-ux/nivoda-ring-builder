'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, X } from 'lucide-react'
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

  const hasActiveFilters = selectedMetal !== null || priceRange[0] !== 0 || priceRange[1] !== 3000

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

        {/* Horizontal Filters */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="space-y-4">
            {/* Metal Filter - Horizontal */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-foreground">Metal:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedMetal(null)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      selectedMetal === null
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    All
                  </button>
                  {allMetals.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        selectedMetal === metal
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Filter - Horizontal */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-foreground">Price:</span>
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-foreground/70">From</label>
                    <input
                      type="number"
                      min="0"
                      max="3000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 border border-border rounded text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-foreground/70">To</label>
                    <input
                      type="number"
                      min="0"
                      max="3000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-20 px-2 py-1 border border-border rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedMetal(null)
                    setPriceRange([0, 3000])
                  }}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition"
                >
                  <X size={16} />
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Settings Grid - 4-3-2 Responsive */}
        {filteredSettings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/60">No settings match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredSettings.map((setting) => (
              <Link key={setting.id} href={`/build-your-ring/${setting.handle}`}>
                <Card
                  className={`overflow-hidden cursor-pointer transition transform hover:shadow-lg h-full flex flex-col ${
                    ring.settingHandle === setting.handle
                      ? 'border-2 border-primary bg-primary/5'
                      : 'border border-border hover:border-primary/50'
                  }`}
                >
                  {/* Image - Photography Focused */}
                  <div className="aspect-square bg-muted overflow-hidden flex items-center justify-center flex-shrink-0">
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

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">
                      {setting.name}
                    </h3>

                    {/* Price at bottom */}
                    <div className="mt-auto pt-4 border-t border-border/50">
                      <p className="text-xs text-foreground/60 mb-1">Starting from</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-primary">${setting.basePrice.toLocaleString()}</p>
                        {ring.settingHandle === setting.handle && (
                          <div className="text-primary text-sm font-medium">✓</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Navigation */}
        {filteredSettings.length > 0 && (
          <div className="flex justify-between items-center pt-12 border-t border-border">
            <Link href="/">
              <Button variant="outline" className="px-6 py-2">
                Back to Home
              </Button>
            </Link>

            {ring.settingHandle ? (
              <Link href="/diamond">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 flex items-center gap-2">
                  Next: Choose Diamond
                  <ChevronRight size={20} />
                </Button>
              </Link>
            ) : (
              <Button
                disabled
                className="bg-primary/50 text-white px-6 py-2 flex items-center gap-2"
              >
                Select a Setting First
                <ChevronRight size={20} />
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
