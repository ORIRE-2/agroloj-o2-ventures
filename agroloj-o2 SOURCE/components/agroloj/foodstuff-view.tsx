"use client"

import { useState } from "react"
import { ShoppingCart, CheckCircle2, AlertCircle } from "lucide-react"
import { PRODUCT_MAP } from "@/lib/agroloj/data"
import { ProductImage, EmptyState } from "./ui-bits"
import { useAgroloj } from "@/lib/agroloj/store"
import { CrateEggsPaymentButton } from "./crate-eggs-payment-button"
import { Sugar25kgPaymentButton } from "./sugar-25kg-payment-button"
import { WhiteGarriPaymentButton } from "./white-garri-payment-button"

export function FoodstuffView({
  onBack,
}: {
  onBack: () => void
}) {
  const { addToCart, showToast } = useAgroloj()
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const crateOfEggs = PRODUCT_MAP["crate-of-eggs"]
  const roastedGroundnut = PRODUCT_MAP["roasted-groundnut"]

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
        <h1 className="text-lg font-bold text-foreground">Foodstuff</h1>
      </div>

      <div className="space-y-4">
        {/* Crate of Eggs */}
        {crateOfEggs && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={crateOfEggs.name}
                icon="Egg"
                hue={40}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {crateOfEggs.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {crateOfEggs.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    {crateOfEggs.piPrice ? `${crateOfEggs.piPrice} π` : "Pi Only"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {crateOfEggs.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-border pt-4">
              <button
                onClick={() => handleAddToCart(crateOfEggs.id, crateOfEggs.name)}
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === crateOfEggs.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === crateOfEggs.id ? (
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

              <CrateEggsPaymentButton
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                showPrice={true}
                variant="primary"
              />
            </div>
          </div>
        )}

        {/* Roasted Groundnut */}
        {roastedGroundnut && (
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex gap-4">
              <ProductImage
                name={roastedGroundnut.name}
                icon="Wheat"
                hue={75}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-semibold text-foreground">
                  {roastedGroundnut.name}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {roastedGroundnut.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-base font-bold text-primary">
                    {roastedGroundnut.piPrice ? `${roastedGroundnut.piPrice} π` : "Pi Only"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {roastedGroundnut.unit}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <button
                onClick={() =>
                  handleAddToCart(roastedGroundnut.id, roastedGroundnut.name)
                }
                className={`active-press w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  addedToCart === roastedGroundnut.id
                    ? "bg-success/15 text-success flex items-center justify-center gap-2"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {addedToCart === roastedGroundnut.id ? (
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
            </div>
          </div>
        )}

        {/* White Garri */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex gap-4">
            <ProductImage
              name="White Garri"
              icon="Wheat"
              hue={60}
              className="h-24 w-24 shrink-0 rounded-xl"
            />
            <div className="flex flex-1 flex-col">
              <h2 className="text-sm font-semibold text-foreground">
                White Garri
              </h2>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                Premium dry, clean, tasty. Everyday meals. Fast delivery. Brand: AGROLOJ & O2 Ventures.
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-base font-bold text-primary">
                  0.25 Pi
                </span>
                <span className="text-xs text-muted-foreground">
                  Pi Only
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <WhiteGarriPaymentButton
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>

        {/* Sugar */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex gap-4">
            <ProductImage
              name="Sugar"
              icon="Sparkles"
              hue={0}
              className="h-24 w-24 shrink-0 rounded-xl"
            />
            <div className="flex flex-1 flex-col">
              <h2 className="text-sm font-semibold text-foreground">
                Sugar
              </h2>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                Granulated white sugar, clean and dry. Household or resell. Brand: AGROLOJ & O2 Ventures.
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-base font-bold text-primary">
                  0.25 Pi
                </span>
                <span className="text-xs text-muted-foreground">
                  Pi Only
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <Sugar25kgPaymentButton
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
