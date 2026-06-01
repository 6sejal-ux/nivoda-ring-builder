'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import type { ShopifyProduct, ShopifyMediaItem } from './shopify'

export type JourneyType = 'setting-first' | 'diamond-first' | null

export interface RingSelection {
  // Core product selections - full Shopify products as source of truth
  selectedSetting?: ShopifyProduct
  selectedDiamond?: ShopifyProduct
  selectedMetal?: string // variant ID or metal option name
  
  // Pricing (computed from Shopify products)
  settingPrice: number
  diamondPrice: number
  totalPrice: number
  
  // Routing & journey tracking
  settingHandle?: string
  diamondId?: string
  currentJourney: JourneyType
  
  // Media (from Shopify product)
  productImages: ShopifyMediaItem[]
  productVideos: ShopifyMediaItem[]
}

interface RingContextType {
  ring: RingSelection
  
  // Journey management
  startJourney: (journey: JourneyType) => void
  switchJourney: (journey: JourneyType) => void
  
  // Setting management
  setSetting: (product: ShopifyProduct, metal?: string) => void
  updateSettingMetal: (metal: string) => void
  
  // Diamond management
  setDiamond: (product: ShopifyProduct) => void
  
  // Pricing
  computeTotal: () => number
  
  // Reset & state management
  resetRing: () => void
  clearSetting: () => void
  clearDiamond: () => void
  
  // Status queries
  hasCompleteSetting: () => boolean
  hasCompleteDiamond: () => boolean
  canProceedToReview: () => boolean
}

const RingContext = createContext<RingContextType | undefined>(undefined)

const DEFAULT_RING: RingSelection = {
  selectedSetting: undefined,
  selectedDiamond: undefined,
  selectedMetal: undefined,
  settingPrice: 0,
  diamondPrice: 0,
  totalPrice: 0,
  settingHandle: undefined,
  diamondId: undefined,
  currentJourney: null,
  productImages: [],
  productVideos: [],
}

export function RingProvider({ children }: { children: React.ReactNode }) {
  const [ring, setRing] = useState<RingSelection>(DEFAULT_RING)

  // Journey management
  const startJourney = useCallback((journey: JourneyType) => {
    setRing((prev) => ({
      ...prev,
      currentJourney: journey,
    }))
  }, [])

  const switchJourney = useCallback((journey: JourneyType) => {
    // Preserve all selections when switching journeys
    setRing((prev) => ({
      ...prev,
      currentJourney: journey,
    }))
  }, [])

  // Setting management - store full product + metal selection
  const setSetting = useCallback((product: ShopifyProduct, metal?: string) => {
    const settingPrice = parseFloat(product.priceRange.minVariantPrice.amount) || 0

    // Extract images and videos from mixed media
    const productImages = product.media.filter((m) => m.type === 'image')
    const productVideos = product.media.filter((m) => m.type === 'video')

    setRing((prev) => ({
      ...prev,
      selectedSetting: product,
      selectedMetal: metal || prev.selectedMetal,
      settingHandle: product.handle,
      settingPrice,
      productImages,
      productVideos,
      totalPrice: (prev.diamondPrice || 0) + settingPrice,
    }))
  }, [])

  // Update metal selection for current setting
  const updateSettingMetal = useCallback((metal: string) => {
    setRing((prev) => ({
      ...prev,
      selectedMetal: metal,
    }))
  }, [])

  // Diamond management - store full product
  const setDiamond = useCallback((product: ShopifyProduct) => {
    const diamondPrice = parseFloat(product.priceRange.minVariantPrice.amount) || 0

    setRing((prev) => ({
      ...prev,
      selectedDiamond: product,
      diamondId: product.id,
      diamondPrice,
      totalPrice: (prev.settingPrice || 0) + diamondPrice,
    }))
  }, [])

  // Compute total price
  const computeTotal = useCallback(() => {
    return ring.settingPrice + ring.diamondPrice
  }, [ring.settingPrice, ring.diamondPrice])

  // Reset entire ring
  const resetRing = useCallback(() => {
    setRing(DEFAULT_RING)
  }, [])

  // Clear only setting (allows switching to different setting while preserving diamond)
  const clearSetting = useCallback(() => {
    setRing((prev) => ({
      ...prev,
      selectedSetting: undefined,
      selectedMetal: undefined,
      settingHandle: undefined,
      settingPrice: 0,
      productImages: [],
      productVideos: [],
      totalPrice: prev.diamondPrice,
    }))
  }, [])

  // Clear only diamond (allows switching to different diamond while preserving setting)
  const clearDiamond = useCallback(() => {
    setRing((prev) => ({
      ...prev,
      selectedDiamond: undefined,
      diamondId: undefined,
      diamondPrice: 0,
      totalPrice: prev.settingPrice,
    }))
  }, [])

  // Status queries for conditional rendering
  const hasCompleteSetting = useCallback(
    () => !!ring.selectedSetting && !!ring.selectedMetal,
    [ring.selectedSetting, ring.selectedMetal]
  )

  const hasCompleteDiamond = useCallback(
    () => !!ring.selectedDiamond,
    [ring.selectedDiamond]
  )

  // Can only proceed to review if both setting and diamond are selected
  const canProceedToReview = useCallback(
    () => hasCompleteSetting() && hasCompleteDiamond(),
    [hasCompleteSetting, hasCompleteDiamond]
  )

  const value = useMemo(
    () => ({
      ring,
      startJourney,
      switchJourney,
      setSetting,
      updateSettingMetal,
      setDiamond,
      computeTotal,
      resetRing,
      clearSetting,
      clearDiamond,
      hasCompleteSetting,
      hasCompleteDiamond,
      canProceedToReview,
    }),
    [
      ring,
      startJourney,
      switchJourney,
      setSetting,
      updateSettingMetal,
      setDiamond,
      computeTotal,
      resetRing,
      clearSetting,
      clearDiamond,
      hasCompleteSetting,
      hasCompleteDiamond,
      canProceedToReview,
    ]
  )

  return <RingContext.Provider value={value}>{children}</RingContext.Provider>
}

export function useRing() {
  const context = useContext(RingContext)
  if (!context) {
    throw new Error('useRing must be used within a RingProvider')
  }
  return context
}
