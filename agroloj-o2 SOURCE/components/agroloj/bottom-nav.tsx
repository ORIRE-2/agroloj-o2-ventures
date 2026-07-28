"use client"

import {
  Home,
  ShoppingBag,
  LayoutGrid,
  ShoppingCart,
  ClipboardList,
  User,
  Calendar,
  type LucideIcon,
} from "lucide-react"
import type { Tab } from "@/lib/agroloj/types"
import { cn } from "@/lib/utils"

const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "categories", label: "Categories", icon: LayoutGrid },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "account", label: "Account", icon: User },
]

export function BottomNav({
  active,
  onChange,
  cartCount,
  bookingCount = 0,
  isOwner = false,
}: {
  active: Tab
  onChange: (tab: Tab) => void
  cartCount: number
  bookingCount?: number
  isOwner?: boolean
}) {
  // Filter tabs based on owner status
  const visibleTabs = isOwner ? TABS : TABS.filter((tab) => tab.id !== "bookings")

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "active-press relative flex flex-1 flex-col items-center gap-0.5 py-2",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {tab.id === "cart" && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                {tab.id === "bookings" && bookingCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                    {bookingCount > 99 ? "99+" : bookingCount}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
