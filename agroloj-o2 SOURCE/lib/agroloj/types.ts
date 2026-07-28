export type CategoryId =
  | "foodstuff"
  | "poultry"
  | "agro-inputs"
  | "farm-produce"
  | "services"
  | "technology"

export interface Category {
  id: CategoryId
  name: string
  description: string
  icon: string
  hue: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: CategoryId
  unit: string
  image_url?: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export type OrderStatus =
  | "Pending Payment"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"

export interface OrderLine {
  productId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  lines: OrderLine[]
  total: number
  date: number
  status: OrderStatus
  customerName: string
}

export type Tab = "home" | "products" | "categories" | "cart" | "orders" | "account" | "consultation" | "bookings"

export interface Booking {
  id: string
  customerName: string
  customerPhone: string
  customerEmail: string
  serviceId: string
  serviceName: string
  bookingDate: string
  bookingTime: string
  problemDescription: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: number
  notes?: string
}

export interface BookingsState {
  bookings: Booking[]
}
