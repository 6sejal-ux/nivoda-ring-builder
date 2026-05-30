'use client'

import React, { createContext, useContext, useState } from 'react'

export interface RingSelection {
  setting?: string
  diamond?: {
    id: string
    shape: string
    carat: number
    color: string
    clarity: string
    cut: string
    lab_grown: boolean
    price: number
  }
  totalPrice: number
}

interface RingContextType {
  ring: RingSelection
  updateRing: (updates: Partial<RingSelection>) => void
  resetRing: () => void
}

const RingContext = createContext<RingContextType | undefined>(undefined)

export function RingProvider({ children }: { children: React.ReactNode }) {
  const [ring, setRing] = useState<RingSelection>({
    setting: undefined,
    diamond: undefined,
    totalPrice: 0,
  })

  const updateRing = (updates: Partial<RingSelection>) => {
    setRing((prev) => ({ ...prev, ...updates }))
  }

  const resetRing = () => {
    setRing({
      setting: undefined,
      diamond: undefined,
      totalPrice: 0,
    })
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
