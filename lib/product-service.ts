// Product data service for Settings and Diamonds
// This centralizes all product data and can be replaced with Shopify/Nivoda integration later

export interface Setting {
  id: string
  handle: string
  name: string
  description: string
  details: string
  basePrice: number
  metal: string[]
  image: string
  gallery: string[]
}

export interface Diamond {
  id: string
  handle: string
  name: string
  shape: string
  carat: number
  color: string
  clarity: string
  cut: string
  lab_grown: boolean
  price: number
  certificate?: string
  description: string
  image: string
}

// Mock Settings Data
export const SETTINGS: Setting[] = [
  {
    id: 'solitaire',
    handle: 'solitaire',
    name: 'Solitaire',
    description: 'Classic single stone setting, emphasizing the beauty of your diamond',
    details: 'The timeless solitaire setting puts all the focus on your diamond. Its elegant simplicity makes it a favorite choice for those who want their diamond to be the star.',
    basePrice: 1200,
    metal: ['14k White Gold', '14k Yellow Gold', '18k Platinum'],
    image: '/settings/solitaire.jpg',
    gallery: ['/settings/solitaire.jpg', '/settings/solitaire-2.jpg', '/settings/solitaire-3.jpg'],
  },
  {
    id: 'halo',
    handle: 'halo',
    name: 'Halo',
    description: 'Diamond surrounded by smaller stones for added brilliance',
    details: 'A halo of smaller diamonds surrounds your center stone, creating extra sparkle and making your diamond appear larger. Perfect for those who want maximum brilliance.',
    basePrice: 1800,
    metal: ['14k White Gold', '14k Yellow Gold', '18k Platinum'],
    image: '/settings/halo.jpg',
    gallery: ['/settings/halo.jpg', '/settings/halo-2.jpg', '/settings/halo-3.jpg'],
  },
  {
    id: 'hidden-halo',
    handle: 'hidden-halo',
    name: 'Hidden Halo',
    description: 'Subtle halo beneath the center stone for understated elegance',
    details: 'Experience understated elegance with our hidden halo design. The halo sits under the center stone, adding depth and brilliance while maintaining a clean, sophisticated look.',
    basePrice: 1600,
    metal: ['14k White Gold', '14k Yellow Gold', '18k Platinum'],
    image: '/settings/hidden-halo.jpg',
    gallery: ['/settings/hidden-halo.jpg', '/settings/hidden-halo-2.jpg', '/settings/hidden-halo-3.jpg'],
  },
  {
    id: 'trilogy',
    handle: 'trilogy',
    name: 'Trilogy',
    description: 'Three stone design symbolizing past, present, and future',
    details: 'The trilogy setting features three stones that symbolize your love story. The center diamond is flanked by two side stones, creating a sophisticated and meaningful design.',
    basePrice: 2000,
    metal: ['14k White Gold', '14k Yellow Gold', '18k Platinum'],
    image: '/settings/trilogy.jpg',
    gallery: ['/settings/trilogy.jpg', '/settings/trilogy-2.jpg', '/settings/trilogy-3.jpg'],
  },
  {
    id: 'vintage',
    handle: 'vintage',
    name: 'Vintage',
    description: 'Ornate vintage-inspired setting with intricate details',
    details: 'Inspired by the elegance of bygone eras, our vintage setting features ornate details and intricate craftsmanship. Perfect for those who appreciate timeless beauty with a touch of nostalgia.',
    basePrice: 2200,
    metal: ['14k White Gold', '14k Yellow Gold', '18k Platinum'],
    image: '/settings/vintage.jpg',
    gallery: ['/settings/vintage.jpg', '/settings/vintage-2.jpg', '/settings/vintage-3.jpg'],
  },
  {
    id: 'three-stone',
    handle: 'three-stone',
    name: 'Three Stone',
    description: 'Classic three-stone setting with equal-sized stones',
    details: 'A variation of the trilogy with three stones of equal prominence. This design offers balanced beauty and can be customized with various stone combinations.',
    basePrice: 1950,
    metal: ['14k White Gold', '14k Yellow Gold', '18k Platinum'],
    image: '/settings/three-stone.jpg',
    gallery: ['/settings/three-stone.jpg', '/settings/three-stone-2.jpg', '/settings/three-stone-3.jpg'],
  },
]

// Mock Diamonds Data
export const DIAMONDS: Diamond[] = [
  {
    id: 'diamond-1',
    handle: 'round-1-5-carat-d-vs1',
    name: 'Round Diamond 1.5ct D VS1',
    shape: 'Round',
    carat: 1.5,
    color: 'D',
    clarity: 'VS1',
    cut: 'Excellent',
    lab_grown: false,
    price: 5400,
    certificate: 'GIA',
    description: 'A stunning 1.5 carat round diamond with exceptional color and clarity. This GIA-certified diamond exhibits excellent cut quality and exceptional light performance.',
    image: '/diamonds/round-1-5-d-vs1.jpg',
  },
  {
    id: 'diamond-2',
    handle: 'cushion-1-2-carat-e-vs2',
    name: 'Cushion Diamond 1.2ct E VS2',
    shape: 'Cushion',
    carat: 1.2,
    color: 'E',
    clarity: 'VS2',
    cut: 'Very Good',
    lab_grown: false,
    price: 3800,
    certificate: 'AGS',
    description: 'An elegant cushion cut diamond with warm color and excellent proportions. AGS-certified for quality assurance.',
    image: '/diamonds/cushion-1-2-e-vs2.jpg',
  },
  {
    id: 'diamond-3',
    handle: 'oval-2-0-carat-f-si1',
    name: 'Oval Diamond 2.0ct F SI1',
    shape: 'Oval',
    carat: 2.0,
    color: 'F',
    clarity: 'SI1',
    cut: 'Excellent',
    lab_grown: false,
    price: 7200,
    certificate: 'GIA',
    description: 'A breathtaking 2.0 carat oval diamond that combines size and elegance. Excellent cut ensures maximum sparkle.',
    image: '/diamonds/oval-2-0-f-si1.jpg',
  },
  {
    id: 'diamond-4',
    handle: 'emerald-1-8-carat-d-vvs2',
    name: 'Emerald Diamond 1.8ct D VVS2',
    shape: 'Emerald',
    carat: 1.8,
    color: 'D',
    clarity: 'VVS2',
    cut: 'Excellent',
    lab_grown: false,
    price: 8100,
    certificate: 'GIA',
    description: 'A sophisticated emerald cut diamond with exceptional clarity and colorless appearance. The step cut showcases diamond transparency beautifully.',
    image: '/diamonds/emerald-1-8-d-vvs2.jpg',
  },
  {
    id: 'diamond-5',
    handle: 'radiant-0-9-carat-g-si1-lab',
    name: 'Radiant Diamond 0.9ct G SI1 (Lab)',
    shape: 'Radiant',
    carat: 0.9,
    color: 'G',
    clarity: 'SI1',
    cut: 'Very Good',
    lab_grown: true,
    price: 1800,
    certificate: 'IGI',
    description: 'A brilliant lab-grown radiant diamond offering excellent value without compromising on beauty. Environmentally conscious choice.',
    image: '/diamonds/radiant-0-9-g-si1-lab.jpg',
  },
  {
    id: 'diamond-6',
    handle: 'pear-1-3-carat-e-vs1',
    name: 'Pear Diamond 1.3ct E VS1',
    shape: 'Pear',
    carat: 1.3,
    color: 'E',
    clarity: 'VS1',
    cut: 'Excellent',
    lab_grown: false,
    price: 4200,
    certificate: 'GIA',
    description: 'An exquisite pear-shaped diamond combining elegance with distinctive style. The elongated shape flatters and creates visual interest.',
    image: '/diamonds/pear-1-3-e-vs1.jpg',
  },
  {
    id: 'diamond-7',
    handle: 'marquise-1-1-carat-f-vs2',
    name: 'Marquise Diamond 1.1ct F VS2',
    shape: 'Marquise',
    carat: 1.1,
    color: 'F',
    clarity: 'VS2',
    cut: 'Very Good',
    lab_grown: false,
    price: 3500,
    certificate: 'GIA',
    description: 'A regal marquise cut diamond with distinctive elongated shape. Perfect for those seeking a unique and attention-grabbing design.',
    image: '/diamonds/marquise-1-1-f-vs2.jpg',
  },
  {
    id: 'diamond-8',
    handle: 'asscher-1-5-carat-d-si1',
    name: 'Asscher Diamond 1.5ct D SI1',
    shape: 'Asscher',
    carat: 1.5,
    color: 'D',
    clarity: 'SI1',
    cut: 'Excellent',
    lab_grown: false,
    price: 6300,
    certificate: 'AGS',
    description: 'A striking asscher cut with its characteristic step pattern and hall-of-mirrors effect. Art deco inspired for vintage lovers.',
    image: '/diamonds/asscher-1-5-d-si1.jpg',
  },
]

// Helper functions
export function getSettingByHandle(handle: string): Setting | undefined {
  return SETTINGS.find(s => s.handle === handle)
}

export function getDiamondByHandle(handle: string): Diamond | undefined {
  return DIAMONDS.find(d => d.handle === handle)
}

export function getSettingById(id: string): Setting | undefined {
  return SETTINGS.find(s => s.id === id)
}

export function getDiamondById(id: string): Diamond | undefined {
  return DIAMONDS.find(d => d.id === id)
}

export function filterDiamonds(filters: {
  shape?: string
  minCarat?: number
  maxCarat?: number
  minPrice?: number
  maxPrice?: number
  labGrown?: boolean
}): Diamond[] {
  return DIAMONDS.filter(diamond => {
    if (filters.shape && diamond.shape !== filters.shape) return false
    if (filters.minCarat && diamond.carat < filters.minCarat) return false
    if (filters.maxCarat && diamond.carat > filters.maxCarat) return false
    if (filters.minPrice && diamond.price < filters.minPrice) return false
    if (filters.maxPrice && diamond.price > filters.maxPrice) return false
    if (filters.labGrown !== undefined && diamond.lab_grown !== filters.labGrown) return false
    return true
  })
}

export function filterSettings(filters: {
  metal?: string
  minPrice?: number
  maxPrice?: number
}): Setting[] {
  return SETTINGS.filter(setting => {
    if (filters.metal && !setting.metal.includes(filters.metal)) return false
    if (filters.minPrice && setting.basePrice < filters.minPrice) return false
    if (filters.maxPrice && setting.basePrice > filters.maxPrice) return false
    return true
  })
}

// Get all unique shapes for filtering
export function getAllShapes(): string[] {
  return [...new Set(DIAMONDS.map(d => d.shape))]
}

// Get all unique metals for filtering
export function getAllMetals(): string[] {
  return [...new Set(SETTINGS.flatMap(s => s.metal))]
}
