"use client"

import { useState } from "react"
import { ShoppingCart, CheckCircle2 } from "lucide-react"
import { PRODUCT_MAP } from "@/lib/agroloj/data"
import { ProductImage, EmptyState } from "./ui-bits"
import { useAgroloj } from "@/lib/agroloj/store"
import { CastorBeanSeedsPaymentButton } from "./castor-bean-seeds-payment-button"
import { UnselledSoybeanSeedsPaymentButton } from "./unshelled-soybean-seeds-payment-button"
import { Maize50kgPaymentButton } from "./maize-50kg-payment-button"

export function FarmProduceView({
  onBack,
}: {
  onBack: () => void
}) {
  const { addToCart, showToast } = useAgroloj()
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const castorBeanSeeds = PRODUCT_MAP["castor-bean-seeds-2kg"]
  const unselledSoybeanSeeds = PRODUCT_MAP["unshelled-soybean-seeds-25kg"]
  const maize50kg = PRODUCT_MAP["maize-50kg"]

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
        <h1 className="text-lg font-bold text-foreground">Farm Produce</h1>
      </div>

      <div className="space-y-4">
        {/* Castor Bean Seeds 2kg */}
        {castorBeanSeeds ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={castorBeanSeeds.name}
                icon="Leaf"
                hue={130}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {castorBeanSeeds.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {castorBeanSeeds.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    0.25 Pi
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {castorBeanSeeds.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <button
                onClick={() =>
                  handleAddToCart(
                    castorBeanSeeds.id,
                    castorBeanSeeds.name
                  )
                }
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === castorBeanSeeds.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === castorBeanSeeds.id ? (
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
                or
              </div>

              <CastorBeanSeedsPaymentButton
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        ) : null}

        {/* Unshelled Soybean Seeds 25kg */}
        {unselledSoybeanSeeds ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={unselledSoybeanSeeds.name}
                icon="Leaf"
                hue={130}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {unselledSoybeanSeeds.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {unselledSoybeanSeeds.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    0.25 Pi
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {unselledSoybeanSeeds.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <button
                onClick={() =>
                  handleAddToCart(
                    unselledSoybeanSeeds.id,
                    unselledSoybeanSeeds.name
                  )
                }
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === unselledSoybeanSeeds.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === unselledSoybeanSeeds.id ? (
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
                or
              </div>

              <UnselledSoybeanSeedsPaymentButton
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        ) : null}

        {/* Maize 50kg */}
        {maize50kg ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={maize50kg.name}
                icon="Leaf"
                hue={45}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {maize50kg.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {maize50kg.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    0.25 Pi
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {maize50kg.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <button
                onClick={() =>
                  handleAddToCart(
                    maize50kg.id,
                    maize50kg.name
                  )
                }
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === maize50kg.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === maize50kg.id ? (
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
                or
              </div>

              <Maize50kgPaymentButton
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        ) : null}

        {!castorBeanSeeds && !unselledSoybeanSeeds && !maize50kg && (
          <EmptyState
            title="No products available"
            description="Farm produce items will be displayed here soon."
          />
        )}
      </div>
    </div>
  )
}
