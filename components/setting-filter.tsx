'use client'

import React, { useState } from 'react'
import { useFilters } from '@/lib/filter-context'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const FILTER_DATA = {
  settings: [
    { id: 'twisted', name: 'Twisted', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'bezel', name: 'Bezel', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'side-stone', name: 'Side Stone', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'solitaire', name: 'Solitaire', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'toi-et-moi', name: 'Toi Et Moi', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'nature-inspired', name: 'Nature Inspired', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'pave', name: 'Pave', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
    { id: 'hidden-halo', name: 'Hidden Halo', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jDzLR8Oo6CGwrb35PxJ1DLY4lsQATu.png' },
  ],
  settingHeights: [
    { id: 'high-set', name: 'High Set' },
    { id: 'low-set', name: 'Low Set' },
    { id: 'twisted', name: 'Twisted' },
  ],
  bandTypes: [
    { id: 'twisted-band', name: 'Twisted' },
    { id: 'plain', name: 'Plain' },
    { id: 'pave-band', name: 'Pave' },
  ],
  shapes: [
    { id: 'round', name: 'Round' },
    { id: 'princess', name: 'Princess' },
    { id: 'oval', name: 'Oval' },
    { id: 'emerald', name: 'Emerald' },
    { id: 'pear', name: 'Pear' },
    { id: 'cushion', name: 'Cushion' },
  ],
  metals: [
    { id: '9kt-white', name: '9KT White', color: '#E8E8E8' },
    { id: '14kt-white', name: '14KT White', color: '#D3D3D3' },
    { id: '18kt-white', name: '18KT White', color: '#C0C0C0' },
    { id: '9kt-yellow', name: '9KT Yellow', color: '#FFD700' },
    { id: '14kt-yellow', name: '14KT Yellow', color: '#FFC700' },
    { id: '18kt-yellow', name: '18KT Yellow', color: '#FFB700' },
    { id: '9kt-rose', name: '9KT Rose', color: '#F0A8A8' },
  ],
}

interface CarouselProps {
  items: { id: string; name: string; image?: string; color?: string }[]
  category: 'settings' | 'settingHeights' | 'bandTypes' | 'shapes' | 'metals'
  selectedItems: string[]
  onToggle: (value: string) => void
}

function Carousel({ items, category, selectedItems, onToggle }: CarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300
      const newPosition = scrollPosition + (direction === 'left' ? -scrollAmount : scrollAmount)
      carouselRef.current.scrollLeft = newPosition
      setScrollPosition(newPosition)
    }
  }

  const isMetal = category === 'metals'
  const isShape = category === 'shapes'
  const isSettingHeight = category === 'settingHeights'
  const isBandType = category === 'bandTypes'

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id)
          
          if (isMetal) {
            return (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className="flex-shrink-0 flex flex-col items-center gap-2 transition-transform hover:scale-105"
              >
                <div
                  className={`w-20 h-20 rounded-full border-2 transition-all ${
                    isSelected ? 'border-primary scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: item.color }}
                />
                <span className={`text-sm text-center ${isSelected ? 'font-semibold' : ''}`}>
                  {item.name}
                </span>
              </button>
            )
          }

          if (isShape || isSettingHeight || isBandType) {
            return (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  [Icon]
                </div>
                <span className={`text-sm whitespace-nowrap ${isSelected ? 'font-semibold' : ''}`}>
                  {item.name}
                </span>
              </button>
            )
          }

          // Settings with images
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 transition-transform ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div
                className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  isSelected ? 'border-primary' : 'border-gray-300'
                }`}
              >
                {/* Placeholder for ring images */}
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  [Ring]
                </div>
              </div>
              <span className={`text-sm text-center ${isSelected ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} className="text-gray-700" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} className="text-gray-700" />
      </button>
    </div>
  )
}

export function SettingFilter() {
  const { filters, toggleFilter, resetFilters } = useFilters()

  return (
    <main className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Customize Your Ring
          </h1>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="border-2 border-gray-900 text-gray-900 hover:bg-gray-50 px-6 py-2 rounded-full flex items-center gap-2"
          >
            <X size={18} />
            Reset Filters
          </Button>
        </div>

        {/* Filters Sections */}
        <div className="space-y-16">
          {/* Setting */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl font-serif font-bold text-gray-900">SETTING</h2>
              <span className="text-xs text-gray-500">●</span>
            </div>
            <Carousel
              items={FILTER_DATA.settings}
              category="settings"
              selectedItems={filters.settings}
              onToggle={(value) => toggleFilter('settings', value)}
            />
          </section>

          {/* Middle Row: Setting Height and Band Type */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section>
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-xl font-serif font-bold text-gray-900">SETTING HEIGHT</h2>
                <span className="text-xs text-gray-500">●</span>
              </div>
              <Carousel
                items={FILTER_DATA.settingHeights}
                category="settingHeights"
                selectedItems={filters.settingHeights}
                onToggle={(value) => toggleFilter('settingHeights', value)}
              />
            </section>

            <section>
              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-xl font-serif font-bold text-gray-900">BAND TYPE</h2>
                <span className="text-xs text-gray-500">●</span>
              </div>
              <Carousel
                items={FILTER_DATA.bandTypes}
                category="bandTypes"
                selectedItems={filters.bandTypes}
                onToggle={(value) => toggleFilter('bandTypes', value)}
              />
            </section>
          </div>

          {/* Shape */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl font-serif font-bold text-gray-900">SHAPE</h2>
              <span className="text-xs text-gray-500">●</span>
            </div>
            <Carousel
              items={FILTER_DATA.shapes}
              category="shapes"
              selectedItems={filters.shapes}
              onToggle={(value) => toggleFilter('shapes', value)}
            />
          </section>

          {/* Metal */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-xl font-serif font-bold text-gray-900">METAL</h2>
              <span className="text-xs text-gray-500">●</span>
            </div>
            <Carousel
              items={FILTER_DATA.metals}
              category="metals"
              selectedItems={filters.metals}
              onToggle={(value) => toggleFilter('metals', value)}
            />
          </section>
        </div>

        {/* Summary */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-serif font-bold text-gray-900 mb-4">Selected Filters Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-semibold">Settings</p>
              <p className="text-gray-900">{filters.settings.length || 'None'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Heights</p>
              <p className="text-gray-900">{filters.settingHeights.length || 'None'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Band Types</p>
              <p className="text-gray-900">{filters.bandTypes.length || 'None'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Shapes</p>
              <p className="text-gray-900">{filters.shapes.length || 'None'}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Metals</p>
              <p className="text-gray-900">{filters.metals.length || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
