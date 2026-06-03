'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, CheckCircle2 } from 'lucide-react'
import { useRing } from '@/lib/ring-context'
import { useState } from 'react'

export default function ReviewPage() {
  const { ring, resetRing } = useRing()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    setIsProcessing(true)
    // Simulate checkout process
    setTimeout(() => {
      alert('Thank you for your order! Your custom ring will be crafted shortly.')
      resetRing()
      window.location.href = '/'
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-4">
            Review Your Ring
          </h1>
          <p className="text-lg text-foreground/70">
            Review your custom ring configuration before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            {/* Setting Summary */}
            <Card className="p-8 border border-border mb-6">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                Setting
              </h2>
              
              {ring.settingData ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {ring.settingData.name}
                      </h3>
                      <p className="text-foreground/70 mb-4">{ring.settingData.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-foreground/60">Metal:</span>
                          <span className="font-medium text-foreground">{ring.metal}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-foreground/60">Price:</span>
                          <span className="font-medium text-primary text-lg">
                            ${ring.settingPrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={ring.settingData.image}
                        alt={ring.settingData.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>

                  <Link href={`/build-your-ring/${ring.settingData.handle}`}>
                    <Button variant="outline" className="mt-6 w-full text-primary border-primary hover:bg-primary/5">
                      Change Setting
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-foreground/60 mb-4">No setting selected</p>
                  <Link href="/build-your-ring">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Choose a Setting
                    </Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Diamond Summary */}
            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                Diamond
              </h2>

              {ring.diamondData ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {ring.diamondData.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-foreground/60">Carat</span>
                          <p className="font-medium text-foreground">{ring.diamondData.carat}</p>
                        </div>
                        <div>
                          <span className="text-sm text-foreground/60">Color</span>
                          <p className="font-medium text-foreground">{ring.diamondData.color}</p>
                        </div>
                        <div>
                          <span className="text-sm text-foreground/60">Clarity</span>
                          <p className="font-medium text-foreground">{ring.diamondData.clarity}</p>
                        </div>
                        <div>
                          <span className="text-sm text-foreground/60">Cut</span>
                          <p className="font-medium text-foreground">{ring.diamondData.cut}</p>
                        </div>
                        <div>
                          <span className="text-sm text-foreground/60">Shape</span>
                          <p className="font-medium text-foreground">{ring.diamondData.shape}</p>
                        </div>
                        <div>
                          <span className="text-sm text-foreground/60">Type</span>
                          <p className="font-medium text-foreground">
                            {ring.diamondData.lab_grown ? 'Lab-Grown' : 'Natural'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                          <span className="text-foreground/60">Price:</span>
                          <span className="font-medium text-primary text-lg">
                            ${ring.diamondPrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={ring.diamondData.image}
                        alt={ring.diamondData.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>

                  <Link href="/diamond">
                    <Button variant="outline" className="mt-6 w-full text-primary border-primary hover:bg-primary/5">
                      Change Diamond
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-foreground/60 mb-4">No diamond selected</p>
                  <Link href="/diamond">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Choose a Diamond
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar - Price Summary */}
          <div className="lg:col-span-1">
            <Card className="p-8 border border-border sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-primary mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-foreground/70">Setting</span>
                  <span className="font-medium text-foreground">
                    ${ring.settingPrice?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Diamond</span>
                  <span className="font-medium text-foreground">
                    ${ring.diamondPrice?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${ring.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Certified Diamonds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Expert Crafted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/70">Lifetime Warranty</span>
                </div>
              </div>

              {ring.settingData && ring.diamondData ? (
                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg h-auto mb-4"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
              ) : (
                <Button
                  disabled
                  className="w-full bg-primary/50 text-white py-3 text-lg h-auto mb-4"
                >
                  Complete Selection First
                </Button>
              )}

              <Link href="/diamond" className="block">
                <Button variant="outline" className="w-full">
                  Select Diamond
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link href="/build-your-ring" className="flex items-center gap-2 text-primary hover:text-primary/80 transition">
            <ChevronLeft size={20} />
            Back to Settings
          </Link>
        </div>
      </div>
    </main>
  )
}
