'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Setting, Diamond } from './product-service'

export interface RingSelection {
  settingHandle?: string
  settingData?: Setting
  diamondHandle?: string
  diamondData?: Diamond
  metal?: string
  settingPrice?: number
  diamondPrice?: number
  totalPrice: number
}

interface RingContextType {
  ring: RingSelection
  updateRing: (updates: Partial<RingSelection>) => void
  resetRing: () => void
}

const RingContext = createContext<RingContextType | undefined>(undefined)

const STORAGE_KEY = 'ring-builder-selection'

export function RingProvider({ children }: { children: React.ReactNode }) {
  const [ring, setRing] = useState<RingSelection>({
    settingHandle: undefined,
    settingData: undefined,
    diamondHandle: undefined,
    diamondData: undefined,
    metal: undefined,
    settingPrice: undefined,
    diamondPrice: undefined,
    totalPrice: 0,
  })

  const [isMounted, setIsMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setRing(parsed)
        } catch (e) {
          console.error('Failed to parse stored ring data:', e)
        }
      }
      setIsMounted(true)
    }
  }, [])

  // Save to localStorage whenever ring changes
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ring))
    }
  }, [ring, isMounted])

  const updateRing = (updates: Partial<RingSelection>) => {
    setRing((prev) => {
      const newRing = { ...prev, ...updates }
      // Calculate total price
      newRing.totalPrice = (newRing.settingPrice ?? 0) + (newRing.diamondPrice ?? 0)
      return newRing
    })
  }

  const resetRing = () => {
    setRing({
      settingHandle: undefined,
      settingData: undefined,
      diamondHandle: undefined,
      diamondData: undefined,
      metal: undefined,
      settingPrice: undefined,
      diamondPrice: undefined,
      totalPrice: 0,
    })
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <RingContext.Provider value={{ ring, updateRing, resetRing }}>
      {children}
    </RingContext.Provider>
  )
}

export function useRing() {
  const context = useContext(RingContext)
  if (!context) {
    throw new Error('useRing must be used within a RingProvider')
  }
  return context
}
