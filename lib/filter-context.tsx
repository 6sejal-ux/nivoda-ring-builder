'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

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

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters, toggleFilter }}>
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
