import { SettingFilter } from '@/components/setting-filter'
import { FilterProvider } from '@/lib/filter-context'

export const metadata = {
  title: 'Customize Your Ring - Setting Filter',
  description: 'Customize your engagement ring with our advanced filter options for settings, diamonds, and metals.',
}

export default function FilterPage() {
  return (
    <FilterProvider>
      <SettingFilter />
    </FilterProvider>
  )
}
