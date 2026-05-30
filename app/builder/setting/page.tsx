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
    image: '/rings/solitaire.jpg',
    basePrice: 1200,
  },
  {
    id: 'halo',
    name: 'Halo',
    image: '/rings/halo.jpg',
    basePrice: 1800,
  },
  {
    id: 'hidden-halo',
    name: 'Hidden Halo',
    image: '/rings/hidden-halo.jpg',
    basePrice: 1600,
  },
  {
    id: 'trilogy',
    name: 'Three Stone',
    image: '/rings/trilogy.jpg',
    basePrice: 2000,
  },
  {
    id: 'vintage',
    name: 'Vintage',
    image: '/rings/vintage.jpg',
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
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* PAGE TITLE */}

        <div className="mb-16">
          <h1 className="text-5xl lg:text-7xl font-serif text-primary mb-4">
            Engagement Rings
          </h1>

          <p className="text-lg text-gray-500 max-w-3xl">
            Explore our handcrafted engagement ring settings and
            customise your perfect ring with a certified diamond.
          </p>
        </div>

        {/* FILTERS */}

        <div className="space-y-12 mb-16 border-b pb-12">

          {/* SETTING STYLE */}

          <div>
            <h3 className="uppercase tracking-[0.25em] text-xs mb-6 font-semibold">
              Setting Style
            </h3>

            <div className="flex flex-wrap gap-3">
              {SETTINGS.map((setting) => (
                <button
                  key={setting.id}
                  onClick={() => handleSelectSetting(setting)}
                  className={`px-5 py-2 border rounded-full text-sm transition ${
                    ring.setting === setting.id
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {setting.name}
                </button>
              ))}
            </div>
          </div>

          {/* SHAPE */}

          <div>
            <h3 className="uppercase tracking-[0.25em] text-xs mb-6 font-semibold">
              Shape
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                'Round',
                'Oval',
                'Pear',
                'Emerald',
                'Princess',
                'Cushion',
              ].map((shape) => (
                <div
                  key={shape}
                  className="px-5 py-2 border border-gray-300 rounded-full text-sm"
                >
                  {shape}
                </div>
              ))}
            </div>
          </div>

          {/* METAL */}

          <div>
            <h3 className="uppercase tracking-[0.25em] text-xs mb-6 font-semibold">
              Metal
            </h3>

            <div className="flex flex-wrap gap-3">
              {[
                'White Gold',
                'Yellow Gold',
                'Rose Gold',
                'Platinum',
              ].map((metal) => (
                <div
                  key={metal}
                  className="px-5 py-2 border border-gray-300 rounded-full text-sm"
                >
                  {metal}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {SETTINGS.map((setting) => (
            <Card
              key={setting.id}
              onClick={() => handleSelectSetting(setting)}
              className={`border-0 shadow-none cursor-pointer group ${
                ring.setting === setting.id
                  ? 'ring-2 ring-black'
                  : ''
              }`}
            >
              <div className="aspect-square bg-gray-100 mb-5 overflow-hidden">
                <img
                  src={setting.image}
                  alt={setting.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://placehold.co/600x600?text=Ring'
                  }}
                />
              </div>

              <h3 className="font-serif text-2xl mb-2">
                {setting.name}
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                From AUD ${setting.basePrice.toLocaleString()}
              </p>

              <div className="text-sm font-medium">
                View Ring →
              </div>
            </Card>
          ))}
        </div>

        {/* CONTINUE */}

        <div className="mt-20 border-t pt-10 flex justify-end">
          {ring.setting ? (
            <Link href="/builder/diamond">
              <Button className="bg-black hover:bg-black/90 text-white px-8 py-6">
                Continue To Diamonds
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </Link>
          ) : (
            <Button
              disabled
              className="px-8 py-6"
            >
              Select A Setting
            </Button>
          )}
        </div>

      </div>
    </main>
  )
}