"use client"

import { useMemo, useState } from "react"
import { Search, PackageX } from "lucide-react"
import type { Product, CategoryId } from "@/lib/agroloj/types"
import { CATEGORIES, PRODUCTS } from "@/lib/agroloj/data"
import { ProductCard } from "./product-card"
import { FoodstuffView } from "./foodstuff-view"
import { FarmProduceView } from "./farm-produce-view"
import { AsoOkeView } from "./asokoke-view"
import { EmptyState } from "./ui-bits"
import { useAgroloj } from "@/lib/agroloj/store"
import { cn } from "@/lib/utils"

export function ProductsView({
  initialCategory,
  onOpenProduct,
  onBack,
}: {
  initialCategory: CategoryId | "all"
  onOpenProduct: (p: Product) => void
  onBack?: () => void
}) {
  const { addToCart } = useAgroloj()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<CategoryId | "all">(initialCategory)

  // Show specialized Foodstuff view for foodstuff category
  if (initialCategory === "foodstuff") {
    return <FoodstuffView onBack={onBack || (() => {})} />
  }

  // Show specialized Farm Produce view for farm-produce category
  if (initialCategory === "farm-produce") {
    return <FarmProduceView onBack={onBack || (() => {})} />
  }

  // Show specialized Aso-Oke view for asokoke category
  if (initialCategory === "asokoke") {
    return <AsoOkeView onBack={onBack || (() => {})} />
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    })
  }, [query, filter])

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search products"
        />
      </div>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {(["all", ...CATEGORIES.map((c) => c.id)] as (CategoryId | "all")[]).map(
          (id) => {
            const label =
              id === "all"
                ? "All"
                : CATEGORIES.find((c) => c.id === id)?.name ?? id
            const isActive = filter === id
            return (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={cn(
                  "active-press shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground",
                )}
              >
                {label}
              </button>
            )
          },
        )}
      </div>

      {results.length === 0 ? (
        <EmptyState
          icon={PackageX}
          title="No products found"
          subtitle="Try a different search term or category."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {results.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={() => onOpenProduct(p)}
              onAdd={() => addToCart(p.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
