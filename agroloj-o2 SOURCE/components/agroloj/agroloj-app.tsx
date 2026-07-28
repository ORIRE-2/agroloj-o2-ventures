"use client"

import { useState } from "react"
import { Leaf } from "lucide-react"
import type { Product, CategoryId, Tab } from "@/lib/agroloj/types"
import { AgrolojProvider, useAgroloj } from "@/lib/agroloj/store"
import { BUSINESS } from "@/lib/agroloj/data"
import { BottomNav } from "./bottom-nav"
import { HomeView } from "./home-view"
import { ProductsView } from "./products-view"
import { CategoriesView } from "./categories-view"
import { ProductDetailView } from "./product-detail-view"
import { CartView } from "./cart-view"
import { OrdersView } from "./orders-view"
import { AccountView } from "./account-view"
import { ContactView } from "./contact-view"
import { ConsultationView } from "./consultation-view"
import { BookingsView } from "./bookings-view"

function ToastHost() {
  const { toasts } = useAgroloj()
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 mx-auto flex max-w-md flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="ag-pop-in pointer-events-auto rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg"
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}

function Shell() {
  const { ready, cartCount, bookings, customerName } = useAgroloj()
  const [tab, setTab] = useState<Tab>("home")
  const pendingBookingsCount = bookings.filter((b) => b.status === "pending").length
  const [productFilter, setProductFilter] = useState<CategoryId | "all">("all")
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)
  const [showContact, setShowContact] = useState(false)
  
  // Check if current user is the business owner
  const isOwner = customerName === BUSINESS.ownerName

  function goTo(t: Tab) {
    setActiveProduct(null)
    setShowContact(false)
    setTab(t)
  }

  function openProduct(p: Product) {
    setActiveProduct(p)
  }

  function selectCategory(id: CategoryId) {
    setProductFilter(id)
    setActiveProduct(null)
    setShowContact(false)
    setTab("products")
  }

  if (!ready) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-primary">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col bg-background">
      <ToastHost />

      {/* Header */}
      {!activeProduct && !showContact && (
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-foreground">
              {BUSINESS.name}
            </h1>
            <p className="text-[10px] text-muted-foreground">
              {BUSINESS.location}
            </p>
          </div>
        </header>
      )}

      <main className="flex-1">
        {activeProduct ? (
          <ProductDetailView
            product={activeProduct}
            onBack={() => setActiveProduct(null)}
            onOpenProduct={openProduct}
          />
        ) : showContact ? (
          <ContactView onBack={() => setShowContact(false)} />
        ) : (
          <>
            {tab === "home" && (
              <HomeView
                onOpenProduct={openProduct}
                onSelectCategory={selectCategory}
                goTo={goTo}
                onContact={() => setShowContact(true)}
              />
            )}
            {tab === "products" && (
              <ProductsView
                key={productFilter}
                initialCategory={productFilter}
                onOpenProduct={openProduct}
                onBack={() => goTo("categories")}
              />
            )}
            {tab === "categories" && (
              <CategoriesView onSelectCategory={selectCategory} />
            )}
            {tab === "cart" && (
              <CartView
                onBrowse={() => goTo("products")}
                onViewOrders={() => goTo("orders")}
              />
            )}
            {tab === "orders" && (
              <OrdersView onBrowse={() => goTo("products")} />
            )}
            {tab === "account" && (
              <AccountView
                onViewOrders={() => goTo("orders")}
                onContact={() => setShowContact(true)}
              />
            )}
            {tab === "consultation" && (
              <ConsultationView onBack={() => goTo("home")} />
            )}
            {tab === "bookings" && (
              <BookingsView />
            )}
          </>
        )}
      </main>

      {!activeProduct && !showContact && (
        <BottomNav 
          active={tab} 
          onChange={goTo} 
          cartCount={cartCount}
          bookingCount={pendingBookingsCount}
          isOwner={isOwner}
        />
      )}
    </div>
  )
}

export function AgrolojApp() {
  return (
    <AgrolojProvider>
      <Shell />
    </AgrolojProvider>
  )
}
