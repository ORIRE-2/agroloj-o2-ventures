"use client"

import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/agroloj/types"
import { CATEGORY_MAP, PRODUCTS, formatPi } from "@/lib/agroloj/data"
import { ProductImage } from "./ui-bits"
import { ProductCard } from "./product-card"
import { useAgroloj } from "@/lib/agroloj/store"
import { PiPaymentButton } from "./pi-payment-button"
import { AsoKokeKurePaymentButton } from "./asokoke-kure-payment-button"
import { AsoKokeEleyaPaymentButton } from "./asokoke-eleya-payment-button"
import { RoastedGroundnutPaymentButton } from "./roasted-groundnut-payment-button"
import { GrowerMashPaymentButton } from "./grower-mash-payment-button"

export function ProductDetailView({
  product,
  onBack,
  onOpenProduct,
}: {
  product: Product
  onBack: () => void
  onOpenProduct: (p: Product) => void
}) {
  const { addToCart } = useAgroloj()
  const [qty, setQty] = useState(1)
  const cat = CATEGORY_MAP[product.category]
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4)

  return (
    <div className="ag-fade-in flex min-h-full flex-col bg-background pb-28">
      <div className="relative">
        <ProductImage
          name={product.name}
          icon={cat.icon}
          hue={cat.hue}
          className="aspect-square w-full"
          imageUrl={product.image_url}
        />
        <button
          onClick={onBack}
          className="active-press absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <span
          className="w-fit rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            background: `oklch(0.95 0.04 ${cat.hue})`,
            color: `oklch(0.4 0.12 ${cat.hue})`,
          }}
        >
          {cat.name}
        </span>
        <h1 className="text-xl font-bold text-foreground">{product.name}</h1>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {product.piPrice ? formatPi(product.piPrice) : "Pi Only"}
          </span>
          <span className="text-sm text-muted-foreground">{product.unit}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-card p-3">
          <span className="text-sm font-medium text-foreground">Quantity</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="active-press flex h-8 w-8 items-center justify-center rounded-full border border-border"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="active-press flex h-8 w-8 items-center justify-center rounded-full border border-border"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-foreground">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpen={() => onOpenProduct(p)}
                  onAdd={() => addToCart(p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-border bg-card p-3 flex flex-col gap-2">
        <button
          onClick={() => addToCart(product.id, qty)}
          className="active-press flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart · {product.piPrice ? formatPi(product.piPrice * qty) : "Pi Only"}
        </button>
        {product.id === "asokoke-kure" ? (
          <AsoKokeKurePaymentButton 
            onSuccess={() => {
              addToCart(product.id, qty)
            }}
          />
        ) : product.id === "asokoke-eleya" ? (
          <AsoKokeEleyaPaymentButton 
            onSuccess={() => {
              addToCart(product.id, qty)
            }}
          />
        ) : product.id === "roasted-groundnut" ? (
          <RoastedGroundnutPaymentButton 
            onSuccess={() => {
              addToCart(product.id, qty)
            }}
            quantity={qty}
          />
        ) : product.id === "grower-mash" ? (
          <GrowerMashPaymentButton 
            onSuccess={() => {
              addToCart(product.id, qty)
            }}
            quantity={qty}
          />
        ) : (
          <PiPaymentButton 
            onSuccess={() => {
              addToCart(product.id, qty)
            }}
            showPrice={true}
          />
        )}
      </div>
    </div>
  )
}
