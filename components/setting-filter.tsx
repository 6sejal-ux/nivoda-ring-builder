'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useFilters } from '@/lib/filter-context'
import { 
  SETTINGS, 
  SETTING_HEIGHTS, 
  BAND_TYPES, 
  SHAPES, 
  METALS,
} from '@/lib/ring-data'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface CarouselSection {
  label: string
  items: Array<{ id: string; name: string; image: string; bgColor?: string }>
  filterKey: 'settings' | 'settingHeights' | 'bandTypes' | 'shapes' | 'metals'
  isMetal?: boolean
}

export function SettingFilter() {
  const { filters, toggleFilter, resetFilters, getFilteredRings, hasActiveFilters } = useFilters()
  const filteredRings = getFilteredRings()
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({})

  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const sections: CarouselSection[] = [
    { label: 'SETTING', items: SETTINGS, filterKey: 'settings', isMetal: false },
    { label: 'SETTING HEIGHT', items: SETTING_HEIGHTS, filterKey: 'settingHeights', isMetal: false },
    { label: 'BAND TYPE', items: BAND_TYPES, filterKey: 'bandTypes', isMetal: false },
    { label: 'SHAPE', items: SHAPES, filterKey: 'shapes', isMetal: false },
    { label: 'METAL', items: METALS.map(m => ({ id: m.id, name: `${m.type} ${m.color}`, image: '', bgColor: m.bgColor })), filterKey: 'metals', isMetal: true },
  ]

  const scroll = (sectionKey: string, direction: 'left' | 'right') => {
    const ref = carouselRefs.current[sectionKey]
    if (!ref) return

    const scrollAmount = 300
    const newPosition = (scrollPositions[sectionKey] || 0) + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    ref.scrollTo({
      left: Math.max(0, newPosition),
      behavior: 'smooth',
    })
    
    setScrollPositions((prev) => ({
      ...prev,
      [sectionKey]: Math.max(0, newPosition),
    }))
  }

  const isSelected = (category: CarouselSection['filterKey'], id: string): boolean => {
    return filters[category].includes(id)
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header with Reset Button */}
      <div className="flex justify-end items-center px-4 md:px-8 py-6 border-b border-gray-200">
        <button
          onClick={resetFilters}
          disabled={!hasActiveFilters()}
          className="flex items-center gap-2 px-4 md:px-6 py-2 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <X size={18} />
          <span className="text-sm md:text-base font-medium">Reset Filters</span>
        </button>
      </div>

      {/* Filter Sections */}
      <div className="px-4 md:px-8 py-8 space-y-12">
        {sections.map((section) => (
          <div key={section.filterKey} className="space-y-4">
            {/* Section Title */}
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-gray-800">
              {section.label}
            </h3>

            {/* Carousel Container */}
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => scroll(section.filterKey, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-14 z-10 p-2 rounded-full bg-white border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>

              {/* Carousel Items */}
              <div
                ref={(el) => {
                  if (el) carouselRefs.current[section.filterKey] = el
                }}
                className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-2"
                style={{ scrollBehavior: 'smooth' }}
              >
                {section.items.map((item) => {
                  const selected = isSelected(section.filterKey, item.id)

                  if (section.isMetal) {
                    // Metal Option - Circular Button
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleFilter(section.filterKey, item.id)}
                        className="flex flex-col items-center gap-2 flex-shrink-0 group/item"
                      >
                        <div
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 transition-all ${
                            selected
                              ? 'border-gray-800 shadow-lg scale-110'
                              : 'border-gray-300 hover:border-gray-600'
                          }`}
                          style={{ backgroundColor: item.bgColor }}
                        />
                        <span className="text-xs md:text-sm text-center text-gray-700 font-medium w-20">
                          {item.name}
                        </span>
                      </button>
                    )
                  } else {
                    // Regular Filter Option - Image with Text
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleFilter(section.filterKey, item.id)}
                        className="flex flex-col items-center gap-2 flex-shrink-0 group/item"
                      >
                        <div
                          className={`relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
                            selected
                              ? 'border-gray-800 shadow-lg scale-105'
                              : 'border-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              {/* Placeholder */}
                            </div>
                          )}
                        </div>
                        <span className="text-xs md:text-sm text-center text-gray-700 font-medium w-24 md:w-32 line-clamp-2">
                          {item.name}
                        </span>
                      </button>
                    )
                  }
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scroll(section.filterKey, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-14 z-10 p-2 rounded-full bg-white border border-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Filtered Rings Grid */}
      <div className="px-4 md:px-8 py-12 border-t border-gray-200">
        <div className="mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
            {hasActiveFilters() ? `Available Rings (${filteredRings.length})` : `All Rings (${filteredRings.length})`}
          </h2>
        </div>

        {filteredRings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredRings.map((ring) => (
              <div
                key={ring.id}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3 hover:shadow-lg transition-shadow">
                  {ring.image ? (
                    <Image
                      src={ring.image}
                      alt={ring.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      {ring.name}
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{ring.name}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {ring.metal.type} {ring.metal.color}
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-2">${ring.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No rings match your filters. Try adjusting your selection.</p>
          </div>
        )}
      </div>
    </div>
  )
}
