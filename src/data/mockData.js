const svgDataUrl = (label, colors) => {
  const [base, accent] = colors;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${base}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="28" fill="url(#g)" />
      <circle cx="315" cy="82" r="44" fill="rgba(255,255,255,0.18)" />
      <circle cx="92" cy="220" r="58" fill="rgba(255,255,255,0.12)" />
      <text x="36" y="146" fill="white" font-size="28" font-family="Arial, sans-serif" font-weight="700">${label}</text>
      <text x="36" y="184" fill="rgba(255,255,255,0.85)" font-size="18" font-family="Arial, sans-serif">Warehouse item</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const PLACEHOLDER_IMAGE = svgDataUrl('No Image', ['#6c757d', '#adb5bd']);

export const mockCategories = [
  { id: 1, name: 'Электроника' },
  { id: 2, name: 'Бытовая техника' },
  { id: 3, name: 'Мебель' },
  { id: 4, name: 'Упаковка' },
];

export const mockCells = [
  { id: 1, row: 'A', number: 1 },
  { id: 2, row: 'A', number: 2 },
  { id: 3, row: 'A', number: 3 },
  { id: 4, row: 'B', number: 1 },
  { id: 5, row: 'B', number: 2 },
  { id: 6, row: 'C', number: 1 },
];

export const mockProducts = [
  {
    id: 1,
    name: 'Сканер штрихкодов Zebra DS2278',
    categoryId: 1,
    cellId: 1,
    quantity: 14,
    image: svgDataUrl('Barcode Scanner', ['#167c80', '#2f9e44']),
  },
  {
    id: 2,
    name: 'Промышленный пылесос Karcher',
    categoryId: 2,
    cellId: 4,
    quantity: 6,
    image: svgDataUrl('Vacuum Unit', ['#f59f00', '#ff922b']),
  },
  {
    id: 3,
    name: 'Складской стул оператора',
    categoryId: 3,
    cellId: 5,
    quantity: 9,
    image: svgDataUrl('Operator Chair', ['#5f3dc4', '#9775fa']),
  },
  {
    id: 4,
    name: 'Короб архивный 600х400',
    categoryId: 4,
    cellId: 2,
    quantity: 120,
    image: '',
  },
];

export const createDemoState = () => ({
  categories: structuredClone(mockCategories),
  cells: structuredClone(mockCells),
  products: structuredClone(mockProducts),
});
