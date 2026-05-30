'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRing } from '@/lib/ring-context'
import { ChevronRight } from 'lucide-react'

const SETTINGS = [
  {
    id: 'solitaire',
    name: 'Solitaire',
    description: 'Classic single stone setting, emphasizing the beauty of your diamond',
    basePrice: 1200,
  },
  {
    id: 'halo',
    name: 'Halo',
    description: 'Diamond surrounded by smaller stones for added brilliance',
    basePrice: 1800,
  },
  {
    id: 'hidden-halo',
    name: 'Hidden Halo',
    description: 'Subtle halo beneath the center stone for understated elegance',
    basePrice: 1600,
  },
  {
    id: 'trilogy',
    name: 'Trilogy',
    description: 'Three stone design symbolizing past, present, and future',
    basePrice: 2000,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Ornate vintage-inspired setting with intricate details',
    basePrice: 2200,
  },
]

export default function ChooseSetting() {
  const { ring, updateRing } = useRing()

  const handleSelectSetting = (setting: typeof SETTINGS[0]) => {
    updateRing({
      setting: setting.id,
      totalPrice: (ring.diamond?.price ?? 0) + setting.basePrice,
    })
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
                ring.setting === setting.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectSetting(setting)}
            >
              <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">[Setting Image]</span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                {setting.name}
              </h3>
              <p className="text-foreground/70 text-sm mb-6 min-h-[3rem]">
                {setting.description}
              </p>
              
              <div className="border-t border-border pt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-foreground/60 mb-1">Starting from</p>
                  <p className="text-2xl font-bold text-primary">${setting.basePrice.toLocaleString()}</p>
                </div>
                {ring.setting === setting.id && (
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
          
          <Link href={ring.setting ? '/builder/diamond' : '#'}>
            <Button
              disabled={!ring.setting}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 flex items-center gap-2"
            >
              Next: Choose Diamond
              <ChevronRight size={20} />
            </Button>
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-12 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className={`w-2 h-2 rounded-full ${ring.setting ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className="w-2 h-2 rounded-full bg-muted"></div>
          <div className="w-2 h-2 rounded-full bg-muted"></div>
        </div>
      </div>
    </main>
  )
}
