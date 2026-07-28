"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type { CartItem, Order, OrderStatus, Booking } from "./types"
import { PRODUCT_MAP, uid } from "./data"

const STORAGE_KEY = "agroloj-o2-v1"

interface PersistShape {
  cart: CartItem[]
  orders: Order[]
  bookings: Booking[]
  customerName: string
}

interface Toast {
  id: string
  message: string
}

interface StoreValue {
  ready: boolean
  cart: CartItem[]
  orders: Order[]
  bookings: Booking[]
  customerName: string
  setCustomerName: (name: string) => void
  cartCount: number
  cartTotal: number
  addToCart: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  placeOrder: () => Order | null
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void
  toasts: Toast[]
  showToast: (message: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function AgrolojProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [customerName, setCustomerName] = useState("Valued Customer")
  const [toasts, setToasts] = useState<Toast[]>([])
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw) as PersistShape
        setCart(data.cart ?? [])
        setOrders(data.orders ?? [])
        setBookings(data.bookings ?? [])
        if (data.customerName) setCustomerName(data.customerName)
      }
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    if (persistTimer.current) clearTimeout(persistTimer.current)
    persistTimer.current = setTimeout(() => {
      try {
        const data: PersistShape = { cart, orders, bookings, customerName }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        // ignore
      }
    }, 250)
  }, [cart, orders, bookings, customerName, ready])

  function showToast(message: string) {
    const id = uid()
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 2200)
  }

  function addToCart(productId: string, qty = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + qty } : i,
        )
      }
      return [...prev, { productId, quantity: qty }]
    })
    const p = PRODUCT_MAP[productId]
    showToast(`${p ? p.name : "Item"} added to cart`)
  }

  function setQty(productId: string, qty: number) {
    if (qty <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
    )
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = cart.reduce((sum, i) => {
    const p = PRODUCT_MAP[i.productId]
    return sum + (p ? p.price * i.quantity : 0)
  }, 0)

  function placeOrder(): Order | null {
    if (cart.length === 0) return null
    const lines = cart
      .map((i) => {
        const p = PRODUCT_MAP[i.productId]
        if (!p) return null
        return {
          productId: p.id,
          name: p.name,
          price: p.price,
          quantity: i.quantity,
        }
      })
      .filter(Boolean) as Order["lines"]
    const order: Order = {
      id: "AGL-" + uid().toUpperCase().slice(0, 6),
      lines,
      total: cartTotal,
      date: Date.now(),
      status: "Pending Payment",
      customerName,
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
    return order
  }

  function updateOrderStatus(orderId: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    )
    showToast(`Order marked as ${status}`)
  }

  function addBooking(booking: Omit<Booking, "id" | "createdAt">) {
    const newBooking: Booking = {
      ...booking,
      id: "BKG-" + uid().toUpperCase().slice(0, 6),
      createdAt: Date.now(),
    }
    setBookings((prev) => [newBooking, ...prev])
    showToast(`Consultation booking received`)
  }

  function updateBookingStatus(bookingId: string, status: Booking["status"]) {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b)),
    )
    showToast(`Booking marked as ${status}`)
  }

  const value: StoreValue = {
    ready,
    cart,
    orders,
    bookings,
    customerName,
    setCustomerName,
    cartCount,
    cartTotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    placeOrder,
    updateOrderStatus,
    addBooking,
    updateBookingStatus,
    toasts,
    showToast,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useAgroloj() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useAgroloj must be used within AgrolojProvider")
  return ctx
}
