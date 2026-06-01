export interface Ring {
  id: string;
  name: string;
  image: string;
  setting: string;
  height: string;
  bandType: string;
  shape: string;
  metal: {
    type: string; // 9KT, 14KT, 18KT
    color: string; // White, Yellow, Rose
  };
  price: number;
}

export const SETTINGS = [
  { id: 'twisted', name: 'Twisted', image: '/rings/twisted.png' },
  { id: 'bezel', name: 'Bezel', image: '/rings/bezel.png' },
  { id: 'side-stone', name: 'Side Stone', image: '/rings/side-stone.png' },
  { id: 'solitaire', name: 'Solitaire', image: '/rings/solitaire.png' },
  { id: 'toi-et-moi', name: 'Toi Et Moi', image: '/rings/toi-et-moi.png' },
  { id: 'nature-inspired', name: 'Nature Inspired', image: '/rings/nature-inspired.png' },
  { id: 'pave', name: 'Pave', image: '/rings/pave.png' },
  { id: 'hidden-halo', name: 'Hidden Halo', image: '/rings/hidden-halo.png' },
];

export const SETTING_HEIGHTS = [
  { id: 'high-set', name: 'High Set', image: '/rings/high-set.png' },
  { id: 'low-set', name: 'Low Set', image: '/rings/low-set.png' },
  { id: 'twisted-height', name: 'Twisted', image: '/rings/twisted-height.png' },
];

export const BAND_TYPES = [
  { id: 'twisted-band', name: 'Twisted', image: '/rings/twisted-band.png' },
  { id: 'plain', name: 'Plain', image: '/rings/plain.png' },
  { id: 'pave-band', name: 'Pave', image: '/rings/pave-band.png' },
];

export const SHAPES = [
  { id: 'round', name: 'Round', image: '/rings/round.png' },
  { id: 'princess', name: 'Princess', image: '/rings/princess.png' },
  { id: 'oval', name: 'Oval', image: '/rings/oval.png' },
  { id: 'emerald', name: 'Emerald', image: '/rings/emerald.png' },
  { id: 'pear', name: 'Pear', image: '/rings/pear.png' },
  { id: 'cushion', name: 'Cushion', image: '/rings/cushion.png' },
];

export const METALS = [
  { id: '9kt-white', name: '9KT White', type: '9KT', color: 'White', bgColor: '#E8E8E8' },
  { id: '14kt-white', name: '14KT White', type: '14KT', color: 'White', bgColor: '#D4D4D4' },
  { id: '18kt-white', name: '18KT White', type: '18KT', color: 'White', bgColor: '#C0C0C0' },
  { id: '9kt-yellow', name: '9KT Yellow', type: '9KT', color: 'Yellow', bgColor: '#FFD700' },
  { id: '14kt-yellow', name: '14KT Yellow', type: '14KT', color: 'Yellow', bgColor: '#FFC700' },
  { id: '18kt-yellow', name: '18KT Yellow', type: '18KT', color: 'Yellow', bgColor: '#FFB700' },
  { id: '9kt-rose', name: '9KT Rose', type: '9KT', color: 'Rose', bgColor: '#F4A460' },
];

export const mockRings: Ring[] = [
  // Solitaire + High Set + Plain + Round + 9KT White
  {
    id: 'ring-1',
    name: 'Classic Round Solitaire',
    image: '/rings/ring-1.png',
    setting: 'solitaire',
    height: 'high-set',
    bandType: 'plain',
    shape: 'round',
    metal: { type: '9KT', color: 'White' },
    price: 2500,
  },
  // Solitaire + High Set + Plain + Round + 14KT White
  {
    id: 'ring-2',
    name: 'Elegant Round Solitaire',
    image: '/rings/ring-2.png',
    setting: 'solitaire',
    height: 'high-set',
    bandType: 'plain',
    shape: 'round',
    metal: { type: '14KT', color: 'White' },
    price: 3000,
  },
  // Solitaire + High Set + Plain + Round + 18KT White
  {
    id: 'ring-3',
    name: 'Premium Round Solitaire',
    image: '/rings/ring-3.png',
    setting: 'solitaire',
    height: 'high-set',
    bandType: 'plain',
    shape: 'round',
    metal: { type: '18KT', color: 'White' },
    price: 3500,
  },
  // Solitaire + High Set + Plain + Round + 9KT Yellow
  {
    id: 'ring-4',
    name: 'Warm Round Solitaire',
    image: '/rings/ring-4.png',
    setting: 'solitaire',
    height: 'high-set',
    bandType: 'plain',
    shape: 'round',
    metal: { type: '9KT', color: 'Yellow' },
    price: 2600,
  },
  // Solitaire + Low Set + Plain + Oval + 14KT Yellow
  {
    id: 'ring-5',
    name: 'Graceful Oval Solitaire',
    image: '/rings/ring-5.png',
    setting: 'solitaire',
    height: 'low-set',
    bandType: 'plain',
    shape: 'oval',
    metal: { type: '14KT', color: 'Yellow' },
    price: 3100,
  },
  // Bezel + High Set + Plain + Round + 18KT Yellow
  {
    id: 'ring-6',
    name: 'Modern Bezel Round',
    image: '/rings/ring-6.png',
    setting: 'bezel',
    height: 'high-set',
    bandType: 'plain',
    shape: 'round',
    metal: { type: '18KT', color: 'Yellow' },
    price: 3400,
  },
  // Pave + High Set + Twisted + Round + 9KT Rose
  {
    id: 'ring-7',
    name: 'Romantic Rose Pave',
    image: '/rings/ring-7.png',
    setting: 'pave',
    height: 'high-set',
    bandType: 'twisted-band',
    shape: 'round',
    metal: { type: '9KT', color: 'Rose' },
    price: 2800,
  },
  // Pave + Low Set + Pave + Cushion + 14KT White
  {
    id: 'ring-8',
    name: 'Vintage Cushion Pave',
    image: '/rings/ring-8.png',
    setting: 'pave',
    height: 'low-set',
    bandType: 'pave-band',
    shape: 'cushion',
    metal: { type: '14KT', color: 'White' },
    price: 3200,
  },
  // Hidden Halo + High Set + Plain + Princess + 18KT White
  {
    id: 'ring-9',
    name: 'Contemporary Princess',
    image: '/rings/ring-9.png',
    setting: 'hidden-halo',
    height: 'high-set',
    bandType: 'plain',
    shape: 'princess',
    metal: { type: '18KT', color: 'White' },
    price: 3600,
  },
  // Twisted + High Set + Twisted + Emerald + 9KT White
  {
    id: 'ring-10',
    name: 'Artistic Emerald Twisted',
    image: '/rings/ring-10.png',
    setting: 'twisted',
    height: 'high-set',
    bandType: 'twisted-band',
    shape: 'emerald',
    metal: { type: '9KT', color: 'White' },
    price: 2700,
  },
  // Nature Inspired + Low Set + Plain + Pear + 14KT Yellow
  {
    id: 'ring-11',
    name: 'Nature Inspired Pear',
    image: '/rings/ring-11.png',
    setting: 'nature-inspired',
    height: 'low-set',
    bandType: 'plain',
    shape: 'pear',
    metal: { type: '14KT', color: 'Yellow' },
    price: 3300,
  },
  // Side Stone + High Set + Twisted + Round + 18KT Rose
  {
    id: 'ring-12',
    name: 'Luxury Side Stone',
    image: '/rings/ring-12.png',
    setting: 'side-stone',
    height: 'high-set',
    bandType: 'twisted-band',
    shape: 'round',
    metal: { type: '18KT', color: 'Rose' },
    price: 3800,
  },
];
