'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { Ring, mockRings } from './ring-data'

export interface FilterSelection {
  settings: string[]
  settingHeights: string[]
  bandTypes: string[]
  shapes: string[]
  metals: string[]
}

interface FilterContextType {
  filters: FilterSelection
  updateFilters: (updates: Partial<FilterSelection>) => void
  resetFilters: () => void
  toggleFilter: (category: keyof FilterSelection, value: string) => void
  getFilteredRings: () => Ring[]
  hasActiveFilters: () => boolean
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const DEFAULT_FILTERS: FilterSelection = {
  settings: [],
  settingHeights: [],
  bandTypes: [],
  shapes: [],
  metals: [],
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterSelection>(DEFAULT_FILTERS)

  const updateFilters = useCallback((updates: Partial<FilterSelection>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const toggleFilter = useCallback((category: keyof FilterSelection, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category]
      const isSelected = currentValues.includes(value)
      
      return {
        ...prev,
        [category]: isSelected
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      }
    })
  }, [])

  const getFilteredRings = useCallback(() => {
    const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0)

    if (!hasActiveFilters) {
      return mockRings
    }

    return mockRings.filter((ring) => {
      // Check setting filter
      if (filters.settings.length > 0 && !filters.settings.includes(ring.setting)) {
        return false
      }

      // Check setting height filter
      if (filters.settingHeights.length > 0 && !filters.settingHeights.includes(ring.height)) {
        return false
      }

      // Check band type filter
      if (filters.bandTypes.length > 0 && !filters.bandTypes.includes(ring.bandType)) {
        return false
      }

      // Check shape filter
      if (filters.shapes.length > 0 && !filters.shapes.includes(ring.shape)) {
        return false
      }

      // Check metal filter - match both type and color
      if (filters.metals.length > 0) {
        const metalMatches = filters.metals.some((metalId) => {
          // metalId format: "9kt-white", "14kt-yellow", "18kt-rose"
          const parts = metalId.split('-')
          const typeStr = parts[0] // "9kt", "14kt", "18kt"
          const colorStr = parts[1] // "white", "yellow", "rose"
          
          // Extract the karat from type (e.g., "9kt" -> "9KT")
          const metalType = typeStr.toUpperCase()
          
          // Capitalize color (e.g., "white" -> "White")
          const metalColor = colorStr.charAt(0).toUpperCase() + colorStr.slice(1)
          
          return ring.metal.type === metalType && ring.metal.color === metalColor
        })
        if (!metalMatches) {
          return false
        }
      }

      return true
    })
  }, [filters])

  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some((arr) => arr.length > 0)
  }, [filters])

  return (
    <FilterContext.Provider 
      value={{ 
        filters, 
        updateFilters, 
        resetFilters, 
        toggleFilter,
        getFilteredRings,
        hasActiveFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}
