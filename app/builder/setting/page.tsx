'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRing } from '@/lib/ring-context'
import { ChevronRight } from 'lucide-react'
import type { ShopifyProduct } from '@/lib/shopify'

const SETTINGS: ShopifyProduct[] = [
  {
    id: 'solitaire',
    handle: 'solitaire-setting',
    title: 'Solitaire',
    description: 'Classic single stone setting, emphasizing the beauty of your diamond',
    vendor: 'Ring Settings',
    tags: ['setting:solitaire', 'collection:settings'],
    priceRange: {
      minVariantPrice: { amount: '1200', currencyCode: 'USD' },
      maxVariantPrice: { amount: '2200', currencyCode: 'USD' },
    },
    media: [],
    variants: [],
  },
  {
    id: 'halo',
    handle: 'halo-setting',
    title: 'Halo',
    description: 'Diamond surrounded by smaller stones for added brilliance',
    vendor: 'Ring Settings',
    tags: ['setting:halo', 'collection:settings'],
    priceRange: {
      minVariantPrice: { amount: '1800', currencyCode: 'USD' },
      maxVariantPrice: { amount: '2800', currencyCode: 'USD' },
    },
    media: [],
    variants: [],
  },
  {
    id: 'hidden-halo',
    handle: 'hidden-halo-setting',
    title: 'Hidden Halo',
    description: 'Subtle halo beneath the center stone for understated elegance',
    vendor: 'Ring Settings',
    tags: ['setting:hidden-halo', 'collection:settings'],
    priceRange: {
      minVariantPrice: { amount: '1600', currencyCode: 'USD' },
      maxVariantPrice: { amount: '2600', currencyCode: 'USD' },
    },
    media: [],
    variants: [],
  },
  {
    id: 'trilogy',
    handle: 'trilogy-setting',
    title: 'Trilogy',
    description: 'Three stone design symbolizing past, present, and future',
    vendor: 'Ring Settings',
    tags: ['setting:trilogy', 'collection:settings'],
    priceRange: {
      minVariantPrice: { amount: '2000', currencyCode: 'USD' },
      maxVariantPrice: { amount: '3000', currencyCode: 'USD' },
    },
    media: [],
    variants: [],
  },
  {
    id: 'vintage',
    handle: 'vintage-setting',
    title: 'Vintage',
    description: 'Ornate vintage-inspired setting with intricate details',
    vendor: 'Ring Settings',
    tags: ['setting:vintage', 'collection:settings'],
    priceRange: {
      minVariantPrice: { amount: '2200', currencyCode: 'USD' },
      maxVariantPrice: { amount: '3200', currencyCode: 'USD' },
    },
    media: [],
    variants: [],
  },
]

export default function ChooseSetting() {
  const { ring, setSetting } = useRing()

  const handleSelectSetting = (setting: ShopifyProduct) => {
    setSetting(setting)
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Choose Your Setting
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Select the perfect setting for your engagement ring. Each setting can be customized to your preferences.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SETTINGS.map((setting) => (
            <Card
              key={setting.id}
              className={`p-8 border-2 cursor-pointer transition transform hover:scale-105 ${
                ring.selectedSetting?.id === setting.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectSetting(setting)}
            >
              <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">[Setting Image]</span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                {setting.title}
              </h3>
              <p className="text-foreground/70 text-sm mb-6 min-h-[3rem]">
                {setting.description}
              </p>
              
              <div className="border-t border-border pt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Starting from</p>
                  <p className="text-2xl font-bold text-primary">
                    ${parseInt(setting.priceRange.minVariantPrice.amount).toLocaleString()}
                  </p>
                </div>
                {ring.selectedSetting?.id === setting.id && (
                  <div className="text-primary">✓ Selected</div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link href="/">
            <Button variant="outline" className="px-6 py-2">
              Back to Home
            </Button>
          </Link>
          
          {ring.selectedSetting ? (
            <Link href="/builder/diamond">
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
              Next: Choose Diamond
              <ChevronRight size={20} />
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-12 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className={`w-2 h-2 rounded-full ${ring.selectedSetting ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className="w-2 h-2 rounded-full bg-muted"></div>
          <div className="w-2 h-2 rounded-full bg-muted"></div>
        </div>
      </div>
    </main>
  )
}
