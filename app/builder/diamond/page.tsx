'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Spinner } from '@/components/ui/spinner'
import { useRing } from '@/lib/ring-context'
import { ChevronRight, Filter, AlertCircle } from 'lucide-react'
import type { NivodaDiamond } from '@/lib/nivoda'

const SHAPES = ['Round', 'Princess', 'Cushion', 'Emerald', 'Oval', 'Pear', 'Radiant']
const COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J']
const CLARITY = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2']
const CUTS = ['Excellent', 'Very Good', 'Good', 'Fair']

export default function ChooseDiamond() {
  const { ring, updateRing } = useRing()
  const [diamonds, setDiamonds] = useState<NivodaDiamond[]>([])
  const [filteredDiamonds, setFilteredDiamonds] = useState<NivodaDiamond[]>([])
  const [selectedDiamond, setSelectedDiamond] = useState<string | null>(ring.diamond?.id || null)
  const [showFilters, setShowFilters] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [shape, setShape] = useState<string>('all-shapes')
  const [color, setColor] = useState<string>('all-colors')
  const [clarity, setClarity] = useState<string>('all-clarities')
  const [cut, setCut] = useState<string>('all-cuts')
  const [priceRange, setPriceRange] = useState<[number, number]>([3000, 15000])
  const [caratRange, setCaratRange] = useState<[number, number]>([0.5, 3.0])
  const [labGrown, setLabGrown] = useState(false)

  // Fetch diamonds when filters change
  useEffect(() => {
    const fetchDiamonds = async () => {
      setLoading(true)
      setError(null)

      try {
        // Build query params
        const params = new URLSearchParams()
        if (shape !== 'all-shapes') params.append('shape', shape)
        if (color !== 'all-colors') params.append('color', color)
        if (clarity !== 'all-clarities') params.append('clarity', clarity)
        if (cut !== 'all-cuts') params.append('cut', cut)
        params.append('caratMin', String(caratRange[0]))
        params.append('caratMax', String(caratRange[1]))
        params.append('priceMin', String(priceRange[0]))
        params.append('priceMax', String(priceRange[1]))
        if (labGrown) params.append('labGrown', 'true')

        console.log('[UI] Fetching diamonds with query:', params.toString())

        const response = await fetch(`/api/diamonds?${params.toString()}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch diamonds')
        }

        console.log('[UI] Received diamonds:', data.count)
        setDiamonds(data.diamonds || [])
        setFilteredDiamonds(data.diamonds || [])
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error('[UI] Error fetching diamonds:', message)
        setError(message)
        setDiamonds([])
        setFilteredDiamonds([])
      } finally {
        setLoading(false)
      }
    }

    fetchDiamonds()
  }, [shape, color, clarity, cut, priceRange, caratRange, labGrown])

  const handleSelectDiamond = (diamond: NivodaDiamond) => {
    setSelectedDiamond(diamond.id)
    updateRing({
      diamond,
      totalPrice: diamond.price + (ring.setting ? 1200 : 0), // Base setting price
    })
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Choose Your Diamond
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Filter and select from our collection of premium diamonds. All certified and conflict-free.
          </p>
        </div>

        {/* Filters and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-muted-foreground">×</button>
              </div>

              <div className="space-y-6">
                {/* Shape */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Shape</Label>
                  <Select value={shape} onValueChange={setShape}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All shapes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-shapes">All shapes</SelectItem>
                      {SHAPES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Color</Label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All colors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-colors">All colors</SelectItem>
                      {COLORS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clarity */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Clarity</Label>
                  <Select value={clarity} onValueChange={setClarity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All clarities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-clarities">All clarities</SelectItem>
                      {CLARITY.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Cut */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Cut</Label>
                  <Select value={cut} onValueChange={setCut}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All cuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-cuts">All cuts</SelectItem>
                      {CUTS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Carat Range */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Carat Weight</Label>
                  <div className="space-y-2">
                    <Slider
                      value={caratRange}
                      onValueChange={setCaratRange}
                      min={0.5}
                      max={3.0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-sm text-foreground/70">
                      {caratRange[0].toFixed(1)} - {caratRange[1].toFixed(1)} carats
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Price Range</Label>
                  <div className="space-y-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={2000}
                      max={20000}
                      step={500}
                      className="w-full"
                    />
                    <div className="text-sm text-foreground/70">
                      ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Lab Grown */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lab-grown"
                    checked={labGrown}
                    onCheckedChange={(checked) => setLabGrown(checked as boolean)}
                  />
                  <Label htmlFor="lab-grown" className="font-normal cursor-pointer">
                    Lab Grown Only
                  </Label>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="w-full flex items-center gap-2"
              >
                <Filter size={20} />
                Show Filters
              </Button>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-900">Error loading diamonds</p>
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <Spinner className="mb-4" />
                <p className="text-foreground/70">Loading diamonds...</p>
              </div>
            )}

            {/* Diamonds Grid */}
            {!loading && filteredDiamonds.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDiamonds.map((diamond) => (
                  <Card
                    key={diamond.id}
                    className={`p-6 cursor-pointer transition border-2 ${
                      selectedDiamond === diamond.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectDiamond(diamond)}
                  >
                    {/* Diamond Image or Video Placeholder */}
                    <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                      {diamond.image_url ? (
                        <img
                          src={diamond.image_url}
                          alt={`${diamond.shape} diamond ${diamond.carat}ct`}
                          className="w-full h-full object-cover"
                        />
                      ) : diamond.video_url ? (
                        <div className="text-center">
                          <p className="text-muted-foreground text-sm mb-2">Video Available</p>
                          <a
                            href={diamond.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline text-xs"
                          >
                            View Video
                          </a>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">[Diamond {diamond.id}]</span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-foreground/60">Shape</p>
                          <p className="font-semibold text-primary">{diamond.shape}</p>
                        </div>
                        {diamond.lab_grown && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            Lab Grown
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                        <div>
                          <p className="text-xs text-foreground/60 uppercase">Carat</p>
                          <p className="font-semibold">{diamond.carat}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 uppercase">Color</p>
                          <p className="font-semibold">{diamond.color}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 uppercase">Clarity</p>
                          <p className="font-semibold">{diamond.clarity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/60 uppercase">Cut</p>
                          <p className="font-semibold text-sm">{diamond.cut}</p>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4 mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">${diamond.price.toLocaleString()}</p>
                        </div>
                        {selectedDiamond === diamond.id && (
                          <div className="text-primary font-semibold">✓ Selected</div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredDiamonds.length === 0 && !error && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-foreground/70">No diamonds match your filters</p>
                <p className="text-sm text-foreground/50 mt-2">Try adjusting your search criteria</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              <Link href="/builder/setting">
                <Button variant="outline" className="px-6 py-2">
                  Back to Setting
                </Button>
              </Link>

              {selectedDiamond ? (
                <Link href="/builder/review">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 flex items-center gap-2">
                    Continue to Review
                    <ChevronRight size={20} />
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="bg-primary/50 text-white px-6 py-2 flex items-center gap-2"
                >
                  Continue to Review
                  <ChevronRight size={20} />
                </Button>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="flex gap-2 mt-12 justify-center">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
