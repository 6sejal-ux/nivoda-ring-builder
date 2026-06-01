'use client'

import { RingProvider } from '@/lib/ring-context'
import { FilterProvider } from '@/lib/filter-context'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <RingProvider>
      <FilterProvider>
        {children}
      </FilterProvider>
    </RingProvider>
  )
}
