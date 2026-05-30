'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Sparkles, Shield, Award } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-b from-white via-white to-muted/30 flex items-center justify-center py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary tracking-tight">
                Design Your Perfect Engagement Ring
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Create a custom engagement ring with premium diamonds and exquisite settings. Your dream ring awaits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href="/builder/setting">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                    <Sparkles className="mr-2" size={20} />
                    Build Your Ring
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/5">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-white border-t border-b border-border py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <Shield className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground">Certified Diamonds</h3>
                <p className="text-sm text-foreground/60 mt-2">All diamonds certified by reputable labs</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <Award className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground">Expert Crafted</h3>
                <p className="text-sm text-foreground/60 mt-2">Handcrafted by master jewelers</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <CheckCircle2 className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground">Lifetime Warranty</h3>
                <p className="text-sm text-foreground/60 mt-2">Full warranty on all custom rings</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-lg mb-4">
                  <Sparkles className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold text-foreground">Custom Design</h3>
                <p className="text-sm text-foreground/60 mt-2">Unlimited design possibilities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                Diamond Education
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Learn about the 4 Cs and make an informed choice for your perfect diamond
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Carat', desc: 'Weight of the diamond. Higher carat typically means higher price.' },
                { title: 'Color', desc: 'Grades from D (colorless) to Z. Colorless diamonds are rarest.' },
                { title: 'Clarity', desc: 'Measure of inclusions. FL (Flawless) is the highest grade.' },
                { title: 'Cut', desc: 'Quality of the diamond cut. Affects brilliance and sparkle.' },
              ].map((item) => (
                <Card key={item.title} className="p-6 bg-white border border-border hover:border-primary transition">
                  <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-primary py-16 md:py-24 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Create Your Ring?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start your custom ring journey now. Choose your setting, select your diamond, and see your design come to life.
            </p>
            <Link href="/builder/setting">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg">
                Start Building
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
