'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRing } from '@/lib/ring-context'
import { ShoppingCart, Edit2 } from 'lucide-react'

export default function ReviewRing() {
  const { ring, resetRing } = useRing()

  if (!ring.selectedSetting || !ring.selectedDiamond) {
    return (
      <main className="min-h-screen bg-background py-12 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-primary mb-4">Incomplete Selection</h1>
          <p className="text-lg text-foreground/70 mb-6">Please select both a setting and a diamond to continue.</p>
          <Link href="/builder/setting">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              Back to Builder
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality with Shopify
    console.log('Adding to cart:', { 
      setting: ring.selectedSetting?.handle, 
      diamond: ring.selectedDiamond?.handle,
      metal: ring.selectedMetal,
      total: ring.totalPrice
    })
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Your Custom Ring
          </h1>
          <p className="text-lg text-foreground/70">
            Review your selections and complete your order
          </p>
        </div>

        {/* Ring Visualization */}
        <Card className="p-8 md:p-12 bg-white border border-border mb-12">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
            <span className="text-muted-foreground text-lg">[Custom Ring Visualization]</span>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-foreground/60 uppercase mb-2">Your Selection</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
              {ring.selectedSetting?.title}
            </h2>
            <p className="text-lg text-foreground/70">
              in {ring.selectedMetal} with {ring.selectedDiamond?.title}
            </p>
          </div>
        </Card>

        {/* Details Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Setting Card */}
          <Card className="p-8 bg-white border border-border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-foreground/60 uppercase mb-1">Setting</p>
                <h3 className="text-2xl font-serif font-bold text-primary">
                  {ring.selectedSetting?.title}
                </h3>
              </div>
              <Link href="/builder/setting">
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </Button>
              </Link>
            </div>

            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center mb-6">
              <span className="text-muted-foreground text-sm">[Setting Image]</span>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-foreground/60 uppercase mb-2">Price</p>
              <p className="text-3xl font-bold text-primary">${ring.settingPrice.toLocaleString()}</p>
            </div>
          </Card>

          {/* Diamond Card */}
          <Card className="p-8 bg-white border border-border">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-foreground/60 uppercase mb-1">Diamond</p>
                <h3 className="text-2xl font-serif font-bold text-primary">
                  {ring.selectedDiamond?.title}
                </h3>
              </div>
              <Link href="/builder/diamond">
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">
                  <Edit2 size={16} className="mr-2" />
                  Edit
                </Button>
              </Link>
            </div>

            <div className="bg-muted rounded-lg aspect-square flex items-center justify-center mb-6">
              <span className="text-muted-foreground text-sm">[Diamond Image]</span>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-foreground/60 uppercase mb-2">Price</p>
              <p className="text-3xl font-bold text-primary">${ring.diamondPrice.toLocaleString()}</p>
            </div>
          </Card>
        </div>

        {/* Price Breakdown */}
        <Card className="p-8 bg-white border border-border mb-8">
          <h3 className="text-xl font-serif font-bold text-primary mb-6">Price Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground/70">{ring.selectedSetting?.title}</span>
              <span className="font-semibold">${ring.settingPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-foreground/70">{ring.selectedDiamond?.title}</span>
              <span className="font-semibold">${ring.diamondPrice.toLocaleString()}</span>
            </div>

            <div className="border-t-2 border-primary pt-4 mt-4 flex justify-between items-center">
              <span className="text-lg font-serif font-bold text-primary">Total</span>
              <span className="text-3xl font-bold text-primary">${ring.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Additional Information */}
        <Card className="p-6 bg-primary/5 border border-primary/20 mb-8">
          <p className="text-sm text-foreground/70">
            Your custom engagement ring will be crafted to perfection by our expert jewelers. Estimated delivery is 4-6 weeks. All rings come with a lifetime warranty and complimentary sizing adjustments for one year.
          </p>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/builder/diamond">
            <Button variant="outline" className="w-full px-6 py-3 text-lg">
              Back to Diamonds
            </Button>
          </Link>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 text-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </Button>
        </div>

        {/* New Ring CTA */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-foreground/70 mb-4">Want to create another ring?</p>
          <Button
            onClick={() => {
              resetRing()
              window.location.href = '/builder/setting'
            }}
            variant="outline"
            className="px-6 py-2"
          >
            Start New Design
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-12 justify-center">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
      </div>
    </main>
  )
}
