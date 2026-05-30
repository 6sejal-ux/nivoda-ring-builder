'use client'

import { RingProvider } from '@/lib/ring-context'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <RingProvider>
      {children}
    </RingProvider>
  )
}
