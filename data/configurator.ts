export const garmentTypes = [
  {
    id: "suit",
    name: "Traje Completo",
    description: "Traje de dos o tres piezas",
    basePrice: 1200,
    image: "suit",
  },
  {
    id: "blazer",
    name: "Blazer / Saco",
    description: "Saco sport o formal",
    basePrice: 680,
    image: "blazer",
  },
  {
    id: "shirt",
    name: "Camisa",
    description: "Camisa de vestir o casual",
    basePrice: 180,
    image: "shirt",
  },
  {
    id: "pants",
    name: "Pantalón",
    description: "Pantalón de vestir",
    basePrice: 280,
    image: "pants",
  },
  {
    id: "vest",
    name: "Chaleco",
    description: "Chaleco formal o casual",
    basePrice: 350,
    image: "vest",
  },
  {
    id: "coat",
    name: "Abrigo",
    description: "Abrigo o gabardina",
    basePrice: 1800,
    image: "coat",
  },
  {
    id: "tuxedo",
    name: "Smoking",
    description: "Para ocasiones especiales",
    basePrice: 1600,
    image: "tuxedo",
  },
];

// Suit styles
export const suitStyles = [
  {
    id: "classic",
    name: "Clásico",
    description: "Corte tradicional, atemporal",
    priceModifier: 0,
  },
  {
    id: "slim",
    name: "Slim Fit",
    description: "Corte ajustado moderno",
    priceModifier: 50,
  },
  {
    id: "modern",
    name: "Moderno",
    description: "Balance entre clásico y slim",
    priceModifier: 30,
  },
  {
    id: "relaxed",
    name: "Relajado",
    description: "Corte amplio y cómodo",
    priceModifier: 0,
  },
];

// Lapel styles (para trajes y blazers)
export const lapelStyles = [
  {
    id: "notch",
    name: "Muesca (Notch)",
    description: "Clásico y versátil",
  },
  {
    id: "peak",
    name: "Pico (Peak)",
    description: "Elegante y formal",
  },
  {
    id: "shawl",
    name: "Chal (Shawl)",
    description: "Para smoking y ocasiones especiales",
  },
];

// Button configurations
export const buttonConfigs = [
  { id: "1b", name: "1 Botón", description: "Moderno y elegante" },
  { id: "2b", name: "2 Botones", description: "El más versátil" },
  { id: "3b", name: "3 Botones", description: "Clásico tradicional" },
  { id: "db", name: "Cruzado", description: "Distintivo y sofisticado" },
];

// Vent styles
export const ventStyles = [
  { id: "none", name: "Sin Abertura", description: "Look limpio y moderno" },
  { id: "single", name: "Abertura Central", description: "Clásico americano" },
  { id: "double", name: "Doble Abertura", description: "Tradición británica" },
];

// Shirt collar styles
export const collarStyles = [
  { id: "spread", name: "Italiano (Spread)", description: "Apertura amplia" },
  { id: "cutaway", name: "Cutaway", description: "Muy abierto, moderno" },
  { id: "point", name: "Inglés (Point)", description: "Clásico y formal" },
  { id: "button-down", name: "Button Down", description: "Casual elegante" },
  { id: "mandarin", name: "Mao / Mandarín", description: "Sin solapas" },
  { id: "club", name: "Club (Redondeado)", description: "Vintage y distintivo" },
];

// Shirt cuff styles
export const cuffStyles = [
  { id: "barrel", name: "Simple (Barrel)", description: "Clásico con botón" },
  { id: "french", name: "Doble (Francés)", description: "Para gemelos" },
  { id: "convertible", name: "Convertible", description: "Botón o gemelos" },
];

// Fabrics
export const fabrics = [
  {
    id: "wool-super120",
    name: "Lana Super 120's",
    origin: "Italia",
    description: "Suave y resistente",
    priceModifier: 0,
    category: "wool",
    weight: "260g/m",
  },
  {
    id: "wool-super150",
    name: "Lana Super 150's",
    origin: "Italia",
    description: "Ultra fina, lujosa",
    priceModifier: 200,
    category: "wool",
    weight: "240g/m",
  },
  {
    id: "wool-super180",
    name: "Lana Super 180's",
    origin: "Italia",
    description: "La más exclusiva",
    priceModifier: 400,
    category: "wool",
    weight: "220g/m",
  },
  {
    id: "wool-merino",
    name: "Lana Merino",
    origin: "Australia",
    description: "Termorreguladora",
    priceModifier: 150,
    category: "wool",
    weight: "280g/m",
  },
  {
    id: "cashmere",
    name: "Cachemira",
    origin: "Mongolia",
    description: "Máximo lujo y suavidad",
    priceModifier: 600,
    category: "luxury",
    weight: "320g/m",
  },
  {
    id: "cashmere-blend",
    name: "Lana/Cachemira",
    origin: "Italia",
    description: "Lo mejor de ambos",
    priceModifier: 350,
    category: "luxury",
    weight: "300g/m",
  },
  {
    id: "cotton-egyptian",
    name: "Algodón Egipcio",
    origin: "Egipto",
    description: "Suave y duradero",
    priceModifier: 50,
    category: "cotton",
    weight: "120g/m",
  },
  {
    id: "cotton-sea-island",
    name: "Sea Island Cotton",
    origin: "Caribe",
    description: "El algodón más fino",
    priceModifier: 150,
    category: "cotton",
    weight: "100g/m",
  },
  {
    id: "linen",
    name: "Lino Irlandés",
    origin: "Irlanda",
    description: "Fresco para verano",
    priceModifier: 100,
    category: "linen",
    weight: "180g/m",
  },
  {
    id: "linen-wool",
    name: "Lino/Lana",
    origin: "Italia",
    description: "Textura única",
    priceModifier: 180,
    category: "blend",
    weight: "220g/m",
  },
  {
    id: "silk-wool",
    name: "Seda/Lana",
    origin: "Italia",
    description: "Brillo elegante",
    priceModifier: 280,
    category: "luxury",
    weight: "260g/m",
  },
  {
    id: "tweed",
    name: "Tweed Harris",
    origin: "Escocia",
    description: "Robusto y tradicional",
    priceModifier: 180,
    category: "wool",
    weight: "380g/m",
  },
];

// Colores
export const colors = [
  // Blues
  { id: "navy", name: "Azul Marino", hex: "#1a2744", category: "blue" },
  { id: "midnight", name: "Azul Medianoche", hex: "#0f1626", category: "blue" },
  { id: "royal", name: "Azul Royal", hex: "#2c4a8c", category: "blue" },
  { id: "light-blue", name: "Azul Claro", hex: "#6b8cae", category: "blue" },
  { id: "steel", name: "Azul Acero", hex: "#4a6583", category: "blue" },
  // Grays
  { id: "charcoal", name: "Gris Carbón", hex: "#36454f", category: "gray" },
  { id: "medium-gray", name: "Gris Medio", hex: "#6b7280", category: "gray" },
  { id: "light-gray", name: "Gris Claro", hex: "#9ca3af", category: "gray" },
  { id: "silver", name: "Plata", hex: "#c0c0c0", category: "gray" },
  // Browns
  { id: "brown", name: "Marrón", hex: "#5c4033", category: "brown" },
  { id: "tan", name: "Camel", hex: "#d2b48c", category: "brown" },
  { id: "cognac", name: "Cognac", hex: "#9a463d", category: "brown" },
  { id: "chocolate", name: "Chocolate", hex: "#3d2314", category: "brown" },
  // Blacks
  { id: "black", name: "Negro", hex: "#1a1a1a", category: "black" },
  { id: "jet-black", name: "Negro Intenso", hex: "#0a0a0a", category: "black" },
  // Greens
  { id: "olive", name: "Oliva", hex: "#556b2f", category: "green" },
  { id: "forest", name: "Verde Bosque", hex: "#228b22", category: "green" },
  { id: "hunter", name: "Verde Cazador", hex: "#355e3b", category: "green" },
  // Reds/Burgundy
  { id: "burgundy", name: "Borgoña", hex: "#722f37", category: "red" },
  { id: "wine", name: "Vino", hex: "#5e2129", category: "red" },
  // Whites (para camisas)
  { id: "white", name: "Blanco", hex: "#ffffff", category: "white" },
  { id: "cream", name: "Crema", hex: "#fffdd0", category: "white" },
  { id: "ivory", name: "Marfil", hex: "#fffff0", category: "white" },
  // Pinks (para camisas)
  { id: "pink", name: "Rosa", hex: "#ffc0cb", category: "pink" },
  { id: "salmon", name: "Salmón", hex: "#fa8072", category: "pink" },
];

// Patrones
export const patterns = [
  { id: "solid", name: "Liso", description: "Color sólido sin patrones" },
  { id: "pinstripe", name: "Raya Diplomática", description: "Rayas finas elegantes" },
  { id: "chalk-stripe", name: "Raya Tiza", description: "Rayas más anchas y suaves" },
  { id: "herringbone", name: "Espiguilla", description: "Patrón clásico en V" },
  { id: "houndstooth", name: "Pata de Gallo", description: "Diseño geométrico tradicional" },
  { id: "prince-wales", name: "Príncipe de Gales", description: "Cuadros elegantes" },
  { id: "windowpane", name: "Cuadro Ventana", description: "Líneas que forman cuadros" },
  { id: "birdseye", name: "Ojo de Perdiz", description: "Textura sutil punteada" },
  { id: "check", name: "Cuadros", description: "Patrón de cuadros clásico" },
  { id: "glen-plaid", name: "Glen Plaid", description: "Cuadros escoceses" },
];

// Linings
export const linings = [
  { id: "full", name: "Completo", description: "Forro en todo el interior", priceModifier: 0 },
  { id: "half", name: "Medio Forro", description: "Solo en la parte superior", priceModifier: -30 },
  { id: "quarter", name: "Cuarto de Forro", description: "Mínimo, más fresco", priceModifier: -50 },
  { id: "unlined", name: "Sin Forro", description: "Ultra ligero", priceModifier: -80 },
];

// Lining colors
export const liningColors = [
  { id: "match", name: "A Juego", hex: "match", description: "Mismo tono que la prenda" },
  { id: "burgundy", name: "Borgoña", hex: "#722f37" },
  { id: "navy", name: "Azul Marino", hex: "#1a2744" },
  { id: "gold", name: "Dorado", hex: "#d4a574" },
  { id: "purple", name: "Púrpura", hex: "#4a235a" },
  { id: "paisley-blue", name: "Paisley Azul", hex: "#2c4a8c", pattern: true },
  { id: "paisley-red", name: "Paisley Rojo", hex: "#722f37", pattern: true },
];

// Monogram options
export const monogramStyles = [
  { id: "none", name: "Sin Monograma", priceModifier: 0 },
  { id: "initials", name: "Iniciales", priceModifier: 25 },
  { id: "name", name: "Nombre Completo", priceModifier: 40 },
];

export const monogramPlacements = [
  { id: "cuff", name: "Puño" },
  { id: "pocket", name: "Bolsillo" },
  { id: "inside", name: "Interior" },
];

// Button materials
export const buttonMaterials = [
  { id: "horn", name: "Cuerno Natural", priceModifier: 30 },
  { id: "mother-of-pearl", name: "Nácar", priceModifier: 50 },
  { id: "corozo", name: "Corozo", priceModifier: 20 },
  { id: "plastic", name: "Sintético", priceModifier: 0 },
  { id: "metal", name: "Metal (Blazer)", priceModifier: 40 },
];
