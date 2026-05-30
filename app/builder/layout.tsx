import { Navigation } from '@/components/navigation'

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
