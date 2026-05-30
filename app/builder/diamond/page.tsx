'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { useRing } from '@/lib/ring-context'
import { ChevronRight, Filter } from 'lucide-react'

interface Diamond {
  id: string
  shape: string
  carat: number
  color: string
  clarity: string
  cut: string
  lab_grown: boolean
  price: number
  image_url?: string
  video_url?: string
  certificate_url?: string
  [key: string]: any
}

const SHAPES = ['Round', 'Princess', 'Cushion', 'Emerald', 'Oval', 'Pear', 'Radiant']
const COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J']
const CLARITY = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2']
const CUTS = ['Excellent', 'Very Good', 'Good', 'Fair']

// Mock diamond data - used as fallback if API fails
const MOCK_DIAMONDS: Diamond[] = [
  {
    id: '1',
    shape: 'Round',
    carat: 1.0,
    color: 'F',
    clarity: 'VS1',
    cut: 'Excellent',
    lab_grown: false,
    price: 5200,
  },
  {
    id: '2',
    shape: 'Round',
    carat: 1.5,
    color: 'G',
    clarity: 'VS2',
    cut: 'Very Good',
    lab_grown: false,
    price: 8500,
  },
  {
    id: '3',
    shape: 'Princess',
    carat: 1.0,
    color: 'F',
    clarity: 'VVS2',
    cut: 'Excellent',
    lab_grown: false,
    price: 5800,
  },
  {
    id: '4',
    shape: 'Cushion',
    carat: 1.2,
    color: 'E',
    clarity: 'VS1',
    cut: 'Excellent',
    lab_grown: false,
    price: 6200,
  },
  {
    id: '5',
    shape: 'Round',
    carat: 2.0,
    color: 'H',
    clarity: 'SI1',
    cut: 'Very Good',
    lab_grown: true,
    price: 8900,
  },
  {
    id: '6',
    shape: 'Oval',
    carat: 1.5,
    color: 'G',
    clarity: 'VVS1',
    cut: 'Excellent',
    lab_grown: false,
    price: 9200,
  },
]

export default function ChooseDiamond() {
  const { ring, updateRing } = useRing()
  const [diamonds, setDiamonds] = useState<typeof MOCK_DIAMONDS>([])
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

  // Fetch diamonds from API
  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (shape !== 'all-shapes') params.append('shape', shape)
        if (color !== 'all-colors') params.append('color', color)
        if (clarity !== 'all-clarities') params.append('clarity', clarity)
        if (cut !== 'all-cuts') params.append('cut', cut)
        params.append('caratMin', caratRange[0].toString())
        params.append('caratMax', caratRange[1].toString())
        params.append('priceMin', priceRange[0].toString())
        params.append('priceMax', priceRange[1].toString())
        if (labGrown) params.append('labGrown', 'true')

        const response = await fetch(`/api/diamonds?${params.toString()}`)
        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch diamonds')
        }

        console.log('[v0] Received diamonds:', data.diamonds?.length)
        setDiamonds(data.diamonds || [])
      } catch (err) {
        console.error('[v0] Error fetching diamonds:', err)
        setError(err instanceof Error ? err.message : 'Failed to load diamonds')
        // Fall back to mock data
        setDiamonds(MOCK_DIAMONDS)
      } finally {
        setLoading(false)
      }
    }

    fetchDiamonds()
  }, [shape, color, clarity, cut, priceRange, caratRange, labGrown])

  const handleSelectDiamond = (diamond: Diamond) => {
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

            {/* Diamonds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                  <p className="text-foreground/70 mt-4">Loading diamonds...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-red-600 mb-4">{error}</p>
                  <p className="text-foreground/70 text-sm">Showing cached diamonds. Please try again.</p>
                </div>
              ) : diamonds.length > 0 ? (
                diamonds.map((diamond) => (
                  <Card
                    key={diamond.id}
                    className={`p-6 cursor-pointer transition border-2 ${
                      selectedDiamond === diamond.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectDiamond(diamond)}
                  >
                    {/* Diamond Image/Video */}
                    <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                      {diamond.video_url ? (
                        <video 
                          src={diamond.video_url} 
                          className="w-full h-full object-cover" 
                          autoPlay 
                          muted 
                          loop 
                        />
                      ) : diamond.image_url ? (
                        <img 
                          src={diamond.image_url} 
                          alt={`${diamond.shape} diamond`}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">[Diamond Image]</span>
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

                      {/* Certificate */}
                      {diamond.certificate_url && (
                        <div className="pt-3 border-t border-border">
                          <a 
                            href={diamond.certificate_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Certificate
                          </a>
                        </div>
                      )}

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
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-foreground/70">No diamonds match your filters</p>
                </div>
              )}
            </div>

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
