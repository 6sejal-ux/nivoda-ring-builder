'use client'

import Link from 'next/link'
import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getSettingByHandle, getAllMetals } from '@/lib/product-service'
import { useRing } from '@/lib/ring-context'
import { useParams, useRouter } from 'next/navigation'

export default function SettingProductDetail() {
  const router = useRouter()
  const params = useParams()
  const handle = params.handle as string
  const setting = getSettingByHandle(handle)
  const { ring, updateRing } = useRing()
  const [selectedMetal, setSelectedMetal] = useState<string>(ring.metal || setting?.metal[0] || '')
  const [galleryIndex, setGalleryIndex] = useState(0)

  const handleContinue = useCallback(() => {
    // If diamond is already selected, go to review
    // Otherwise, redirect to diamond selection
    if (ring.diamondHandle) {
      window.location.href = '/review'
    } else {
      window.location.href = '/diamond'
    }
  }, [ring.diamondHandle])

  if (!setting) {
    return (
      <main className="min-h-screen bg-background py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Setting Not Found</h1>
          <p className="text-foreground/70 mb-8">The setting you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/build-your-ring">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Back to Settings
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleSelectSetting = () => {
    updateRing({
      settingHandle: setting.handle,
      settingData: setting,
      metal: selectedMetal,
      settingPrice: setting.basePrice,
    })
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/build-your-ring" className="text-sm text-foreground/60 hover:text-foreground transition">
            Settings
          </Link>
          <ChevronRight size={16} className="text-foreground/40" />
          <span className="text-sm font-medium text-foreground">{setting.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden mb-6 relative">
              <img
                src={setting.gallery[galleryIndex]}
                alt={`${setting.name} view ${galleryIndex + 1}`}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-muted-foreground text-sm">[Setting Image]</span>'
                }}
                className="w-full h-full object-cover"
              />
              
              {/* Gallery Navigation */}
              {setting.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setGalleryIndex((prev) => (prev === 0 ? setting.gallery.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} className="text-primary" />
                  </button>
                  <button
                    onClick={() => setGalleryIndex((prev) => (prev === setting.gallery.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} className="text-primary" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {setting.gallery.length > 1 && (
              <div className="flex gap-4">
                {setting.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      galleryIndex === index ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.parentElement!.classList.add('bg-muted')
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-serif font-bold text-primary mb-4">{setting.name}</h1>
            <p className="text-lg text-foreground/70 mb-8">{setting.description}</p>

            {/* Details Section */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">About This Setting</h2>
              <p className="text-foreground/70 leading-relaxed mb-6">{setting.details}</p>
            </div>

            {/* Metal Selection */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">Choose Metal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {setting.metal.map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      selectedMetal === metal
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-medium text-foreground">{metal}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <Card className="p-6 border border-border mb-6">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-foreground/60">Starting from</span>
                <div className="text-3xl font-bold text-primary">${setting.basePrice.toLocaleString()}</div>
              </div>
              <Button
                onClick={handleSelectSetting}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg h-auto"
              >
                Select This Setting
              </Button>
              {ring.settingHandle === setting.handle && (
                <div className="mt-4 text-center text-sm font-medium text-primary">
                  ✓ This setting is selected
                </div>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between gap-4">
              <Link href="/build-your-ring" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Settings
                </Button>
              </Link>
              <Button onClick={handleContinue} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                Continue {ring.diamondHandle ? 'to Review' : 'to Diamond'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
