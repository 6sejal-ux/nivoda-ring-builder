'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-primary">Southern Star</h1>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="/builder/setting" className="text-foreground hover:text-primary transition">
              Build Ring
            </Link>
            <Link href="/" className="text-foreground hover:text-primary transition">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition">
              <ShoppingCart size={20} className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
