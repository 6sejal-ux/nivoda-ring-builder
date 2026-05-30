'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Sparkles, Shield, Award } from 'lucide-react'

export default function Home() {
  return (
    <main className="bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-primary">
            Southern Star Diamonds
          </div>
          <div className="flex gap-6 items-center">
            <Link href="#education" className="text-foreground/70 hover:text-foreground transition">
              Learn
            </Link>
            <Link href="/builder/setting">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Build Ring
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-b from-white via-white to-muted/30 flex items-center justify-center py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                LUXURY DIAMOND JEWELRY
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary tracking-tight">
              Design Your Perfect Engagement Ring
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Create a custom engagement ring with premium certified diamonds and exquisite handcrafted settings. Your dream ring awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/builder/setting">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg h-auto">
                  <Sparkles className="mr-2" size={20} />
                  Start Building Your Ring
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary/5 h-auto">
                Explore Collection
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
              <p className="text-sm text-foreground/60 mt-2">All diamonds certified by reputable labs including GIA and AGS</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-lg mb-4">
                <Award className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground">Expert Crafted</h3>
              <p className="text-sm text-foreground/60 mt-2">Handcrafted by master jewelers with decades of experience</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-lg mb-4">
                <CheckCircle2 className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground">Lifetime Warranty</h3>
              <p className="text-sm text-foreground/60 mt-2">Full warranty and lifetime care on all custom rings</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-primary/10 rounded-lg mb-4">
                <Sparkles className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground">Custom Design</h3>
              <p className="text-sm text-foreground/60 mt-2">Unlimited design possibilities to match your vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-28 bg-muted/30">
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
              { 
                title: 'Carat', 
                desc: 'Weight of the diamond. Higher carat typically means higher price. Measured in carats (1 carat = 200mg).' 
              },
              { 
                title: 'Color', 
                desc: 'Grades from D (colorless) to Z. Colorless and near-colorless diamonds (D-F) are the most valuable.' 
              },
              { 
                title: 'Clarity', 
                desc: 'Measure of inclusions. FL (Flawless) is the highest grade. Most inclusions are not visible to the naked eye.' 
              },
              { 
                title: 'Cut', 
                desc: 'Quality of the diamond cut affects brilliance and sparkle. Excellent cuts maximize light reflection.' 
              },
            ].map((item) => (
              <Card key={item.title} className="p-6 bg-white border border-border hover:border-primary/50 transition">
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
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg h-auto">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif font-bold text-primary mb-4">Southern Star Diamonds</h3>
              <p className="text-sm text-foreground/60">Luxury custom engagement rings crafted with precision and care.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="#" className="hover:text-primary transition">About</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="#" className="hover:text-primary transition">FAQ</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Shipping</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><Link href="#" className="hover:text-primary transition">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2024 Southern Star Diamonds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
