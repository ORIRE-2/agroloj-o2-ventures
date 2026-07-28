"use client"

import { Search, Phone, MapPin, ChevronRight, BookOpen } from "lucide-react"
import type { Product, CategoryId, Tab } from "@/lib/agroloj/types"
import { BUSINESS, CATEGORIES, PRODUCTS } from "@/lib/agroloj/data"
import { CategoryIcon, SectionTitle } from "./ui-bits"
import { ProductCard } from "./product-card"
import { ConsultationPaymentButton } from "./consultation-payment-button"
import { useAgroloj } from "@/lib/agroloj/store"

export function HomeView({
  onOpenProduct,
  onSelectCategory,
  goTo,
  onContact,
}: {
  onOpenProduct: (p: Product) => void
  onSelectCategory: (id: CategoryId) => void
  goTo: (tab: Tab) => void
  onContact: () => void
}) {
  const { addToCart, addToast } = useAgroloj()
  const featured = PRODUCTS.filter((p) =>
    ["fp-rice", "pl-eggs", "ai-feed", "fs-garri", "tc-pos", "fp-maize"].includes(
      p.id,
    ),
  )

  const handleConsultationSuccess = (result: any) => {
    addToast("Consultation booking successful! Check your account for details.")
  }

  const handleConsultationError = (error: any) => {
    addToast("Failed to book consultation. Please try again.")
  }

  return (
    <div className="ag-fade-in flex flex-col gap-6 pb-6">
      {/* Hero */}
      <div className="bg-primary px-4 pb-6 pt-5 text-primary-foreground">
        <p className="text-xs font-medium opacity-80">Welcome to</p>
        <h1 className="text-pretty text-xl font-bold leading-tight">
          {BUSINESS.name}
        </h1>
        <p className="mt-1 text-sm opacity-90">
          Agriculture, foodstuff, poultry & business solutions.
        </p>
        <button
          onClick={() => goTo("products")}
          className="active-press mt-4 flex w-full items-center gap-2 rounded-xl bg-card px-4 py-3 text-left text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          Search products...
        </button>
        <button
          onClick={() => goTo("consultation")}
          className="active-press mt-3 flex w-full items-center gap-2 rounded-xl border border-primary-foreground/30 px-4 py-3 text-left text-sm text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Book Expert Consultation
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3 px-4">
        <SectionTitle
          title="Categories"
          action={
            <button
              onClick={() => goTo("categories")}
              className="flex items-center text-xs font-medium text-primary"
            >
              See all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          }
        />
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="active-press flex w-20 shrink-0 flex-col items-center gap-2"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: `oklch(0.94 0.05 ${cat.hue})`,
                  color: `oklch(0.4 0.12 ${cat.hue})`,
                }}
              >
                <CategoryIcon icon={cat.icon} className="h-6 w-6" />
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-foreground">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="flex flex-col gap-3 px-4">
        <SectionTitle
          title="Featured Products"
          action={
            <button
              onClick={() => goTo("products")}
              className="flex items-center text-xs font-medium text-primary"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </button>
          }
        />
        <div className="grid grid-cols-2 gap-3">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => onOpenProduct(p)}
              onAdd={() => addToCart(p.id)}
            />
          ))}
        </div>
      </div>

      {/* Contact footer */}
      <div className="mx-4 rounded-2xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground">Need help?</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Reach out to us for inquiries and orders.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <Phone className="h-4 w-4 text-primary" />
            {BUSINESS.phone}
          </a>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {BUSINESS.location}
          </div>
        </div>
        <button
          onClick={onContact}
          className="active-press mt-3 w-full rounded-xl border border-primary py-2 text-sm font-medium text-primary"
        >
          Contact Us
        </button>
      </div>
    </div>
  )
}
