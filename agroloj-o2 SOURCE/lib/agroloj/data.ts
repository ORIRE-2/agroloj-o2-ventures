import type { Category, Product, OrderStatus } from "./types"

export const BUSINESS = {
  name: "AGROLOJ & O2 Ventures",
  phone: "07038988805",
  location: "Ilorin, Kwara State, Nigeria",
  opay: "7038988805",
  accountName: "Sakariyah Saheed Aibinu",
  ownerName: "Sakariyah Saheed Aibinu",
}

export const CATEGORIES: Category[] = [
  {
    id: "foodstuff",
    name: "Foodstuff",
    description: "Everyday staples and provisions",
    icon: "Wheat",
    hue: 75,
  },
  {
    id: "farm-produce",
    name: "Farm Produce",
    description: "Fresh harvested crops",
    icon: "Leaf",
    hue: 130,
  },
  {
    id: "animal-feeds",
    name: "Animal feeds",
    description: "Quality poultry and livestock feed",
    icon: "Egg",
    hue: 40,
  },
  {
    id: "asokoke",
    name: "Aso-Oke Fabrics",
    description: "Traditional handwoven Nigerian textiles",
    icon: "Shirt",
    hue: 280,
  },
]

export const CATEGORY_MAP: Record<string, Category> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c
    return acc
  },
  {} as Record<string, Category>,
)

export const PRODUCTS: Product[] = [
  {
    id: "crate-of-eggs",
    name: "Crate of Eggs",
    description: "Fresh Farm Eggs Crate of 30pcs under AGROLOJ & O2 Ventures. Clean, unbroken, and well-packed. Ideal for home or resell. Fast delivery. Pay with Pi.",
    price: 7500,
    category: "foodstuff",
    unit: "Crate",
    image_url: "https://i.imgur.com/3s6Y5xw.png",
  },
  {
    id: "roasted-groundnut",
    name: "Roasted Groundnut - Cartoon Pack 12 x 35cl bottles",
    description: "Premium roasted groundnut in convenient cartoon pack. Contains 12 bottles of 35cl each. Perfect for snacking or commercial use.",
    price: 4500,
    category: "foodstuff",
    unit: "Box",
    image_url: "https://i.imgur.com/OBS1s0l.png",
  },
  {
    id: "castor-bean-seeds-2kg",
    name: "Castor Bean Seeds 2kg",
    description: "High-quality Castor Bean Seed 2kg pack under AGROLOJ & O2 Ventures. Clean, dried, and ready for oil extraction or resell. Sourced directly from farmers. Fast delivery. Pay with Pi.",
    price: 0,
    category: "farm-produce",
    unit: "Pack",
    image_url: "https://i.imgur.com/sHJODqD.jpeg",
  },
  {
    id: "unshelled-soybean-seeds-25kg",
    name: "Unshelled Soybean Seeds 25kg",
    description: "Premium unshelled Soybean Seeds 25kg bag under AGROLOJ & O2 Ventures. Clean, dry, and farmer-sourced. Ideal for oil processing, feed, or resell. Fast delivery. Pay with Pi.",
    price: 0,
    category: "farm-produce",
    unit: "25kg Bag",
    image_url: "https://i.imgur.com/E8wr69k.jpeg",
  },
  {
    id: "maize-50kg",
    name: "Maize 50kg",
    description: "Clean, dried Maize 50kg bag under AGROLOJ & O2 Ventures. Farmer-sourced and stone-free. Perfect for flour, feed, or bulk resell. Fast delivery. Pay with Pi.",
    price: 0,
    category: "farm-produce",
    unit: "50kg Bag",
    image_url: "https://i.imgur.com/XVIedAU.jpeg",
  },
  {
    id: "aso-oke-kure",
    name: "Aso-Oke Kure",
    description: "Authentic Aso-Oke Kure fabric 1 bundle under AGROLOJ & O2 Ventures. Rich, premium handwoven aso-oke perfect for traditional events, aso-ebi, and special occasions. Fast delivery. Pay with Pi.",
    price: 0,
    category: "asokoke",
    unit: "Bundle",
    image_url: "https://i.imgur.com/yNA3S8I.png",
  },
  {
    id: "aso-oke-eleya",
    name: "Aso-Oke Eleya",
    description: "Authentic Aso-Oke Eleya 1 Bundle under AGROLOJ & O2 Ventures. Rich, premium handwoven aso-oke perfect for traditional events, aso-ebi, and special occasions. Fast delivery. Pay with Pi.",
    price: 0,
    category: "asokoke",
    unit: "Bundle",
    image_url: "https://i.imgur.com/g72X3sI.png",
  },
  {
    id: "chick-mash",
    name: "Chick mash",
    description: "25kg bag. Nutrient-rich starter feed for healthy chick growth. Brand: AGROLOJ & O2 Ventures. Pi Only.",
    price: 0,
    category: "animal-feeds",
    unit: "25kg Bag",
    image_url: "https://i.imgur.com/Jbgwiop.jpeg",
  },
  {
    id: "grower-mash",
    name: "Grower mash",
    description: "25kg bag. Balanced feed for growing birds. Weight gain + vitality. Brand: AGROLOJ & O2 Ventures. Pi Only.",
    price: 0,
    category: "animal-feeds",
    unit: "25kg Bag",
    image_url: "https://i.imgur.com/oXFhvCO.jpeg",
  },
  {
    id: "layer-mash",
    name: "Layer mash",
    description: "25kg bag. High-calcium feed to boost egg production + shell strength. Brand: AGROLOJ & O2 Ventures. Pi Only.",
    price: 32500,
    category: "animal-feeds",
    unit: "25kg Bag",
    image_url: "https://i.imgur.com/DbjQNqx.png",
  },
  {
    id: "white-garri",
    name: "White Garri",
    description: "5kg bag. Premium quality white garri made from fresh cassava. Perfect for meals and soups. Brand: AGROLOJ & O2 Ventures.",
    price: 8000,
    category: "foodstuff",
    unit: "5kg Bag",
    image_url: "https://i.imgur.com/oJ7gGqI.png",
  },
  {
    id: "sugar",
    name: "Sugar",
    description: "1kg pack. Refined sugar for sweetening beverages, baking, and cooking. Brand: AGROLOJ & O2 Ventures.",
    price: 2500,
    category: "foodstuff",
    unit: "1kg",
    image_url: "https://i.imgur.com/HLA1JFx.png",
  },
]

export const PRODUCT_MAP: Record<string, Product> = PRODUCTS.reduce(
  (acc, p) => {
    acc[p.id] = p
    return acc
  },
  {} as Record<string, Product>,
)

export const ORDER_STATUSES: OrderStatus[] = [
  "Pending Payment",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
]

export function formatPi(amount: number): string {
  return `${amount} π`
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const min = Math.floor(diff / 60000)
  if (min < 1) return "Just now"
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  return `${day}d ago`
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
