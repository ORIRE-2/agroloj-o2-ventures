"use client"

import { ChevronRight } from "lucide-react"
import type { CategoryId } from "@/lib/agroloj/types"
import { CATEGORIES, PRODUCTS } from "@/lib/agroloj/data"
import { CategoryIcon } from "./ui-bits"

export function CategoriesView({
  onSelectCategory,
}: {
  onSelectCategory: (id: CategoryId) => void
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <h1 className="text-lg font-bold text-foreground">All Categories</h1>
      <div className="grid grid-cols-1 gap-3">
        {CATEGORIES.map((cat) => {
          const count = PRODUCTS.filter((p) => p.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="active-press flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: `oklch(0.94 0.05 ${cat.hue})`,
                  color: `oklch(0.4 0.12 ${cat.hue})`,
                }}
              >
                <CategoryIcon icon={cat.icon} className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {cat.description} · {count} items
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
