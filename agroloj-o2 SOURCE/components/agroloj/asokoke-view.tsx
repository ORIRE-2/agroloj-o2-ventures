"use client"

import { useState } from "react"
import { ShoppingCart, CheckCircle2 } from "lucide-react"
import { PRODUCT_MAP } from "@/lib/agroloj/data"
import { ProductImage, EmptyState } from "./ui-bits"
import { useAgroloj } from "@/lib/agroloj/store"
import { AsoKokeKurePaymentButton } from "./asokoke-kure-payment-button"
import { AsoKokeEleyaPaymentButton } from "./asokoke-eleya-payment-button"

export function AsoOkeView({
  onBack,
}: {
  onBack: () => void
}) {
  const { addToCart, showToast } = useAgroloj()
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const asoOkeKure = PRODUCT_MAP["aso-oke-kure"]
  const asoOkeEleya = PRODUCT_MAP["aso-oke-eleya"]

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId)
    setAddedToCart(productId)
    showToast(`${productName} added to cart`)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  const handlePaymentSuccess = (result: any) => {
    showToast("Payment successful! Thank you for your purchase.")
  }

  const handlePaymentError = (error: any) => {
    showToast(`Payment failed: ${error?.message || "Please try again"}`)
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="active-press -ml-2 p-2 text-muted-foreground"
          aria-label="Go back"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-foreground">Aso-Oke Fabrics</h1>
      </div>

      <div className="space-y-4">
        {/* Aso-Oke Kure */}
        {asoOkeKure && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={asoOkeKure.name}
                icon="Shirt"
                hue={280}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {asoOkeKure.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {asoOkeKure.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    0.25 Pi
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {asoOkeKure.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <button
                onClick={() => handleAddToCart(asoOkeKure.id, asoOkeKure.name)}
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === asoOkeKure.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === asoOkeKure.id ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <div className="text-xs text-muted-foreground text-center py-2">
                Or pay directly with Pi
              </div>

              <AsoKokeKurePaymentButton
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        )}

        {/* Aso-Oke Eleya */}
        {asoOkeEleya && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={asoOkeEleya.name}
                icon="Shirt"
                hue={280}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {asoOkeEleya.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {asoOkeEleya.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    0.25 Pi
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {asoOkeEleya.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <button
                onClick={() => handleAddToCart(asoOkeEleya.id, asoOkeEleya.name)}
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === asoOkeEleya.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === asoOkeEleya.id ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <div className="text-xs text-muted-foreground text-center py-2">
                Or pay directly with Pi
              </div>

              <AsoKokeEleyaPaymentButton
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        )}

        {!asoOkeKure && !asoOkeEleya && (
          <EmptyState
            icon={ShoppingCart}
            title="No products available"
            subtitle="This category is currently empty."
          />
        )}
      </div>
    </div>
  )
}
