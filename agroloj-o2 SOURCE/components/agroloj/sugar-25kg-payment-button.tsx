"use client"

import { useState } from "react"
import { usePiAuth } from "@/contexts/pi-auth-context"
import { PRODUCT_CONFIG } from "@/lib/product-config"
import { Loader2, ShoppingCart, Zap } from "lucide-react"
import { useAgroloj } from "@/lib/agroloj/store"

interface Sugar25kgPaymentButtonProps {
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
  className?: string
}

export function Sugar25kgPaymentButton({
  onSuccess,
  onError,
  className = "",
}: Sugar25kgPaymentButtonProps) {
  const { sdk, products } = usePiAuth()
  const { addToCart } = useAgroloj()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAddToCart, setShowAddToCart] = useState(true)

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_6a4515a4379806d7c3eb500f
  )

  const isDisabled = !sdk || !product || isLoading

  const handleBuyNow = async () => {
    if (!sdk || !product) {
      const err = "Payment system not ready"
      setError(err)
      onError?.(err)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await sdk.makePurchase(product.slug)

      if (result.ok) {
        setIsLoading(false)
        setError(null)
        onSuccess?.(result)
      } else {
        throw new Error("Purchase failed")
      }
    } catch (err) {
      setIsLoading(false)
      const errorMessage =
        err instanceof Error ? err.message : "Payment failed"
      setError(errorMessage)
      onError?.(err)
    }
  }

  const handleAddToCart = () => {
    // Add the product to cart using the local ID
    addToCart("sugar-25kg")
    setShowAddToCart(false)
    setTimeout(() => setShowAddToCart(true), 2000)
  }

  if (!product) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <button disabled className="opacity-50 cursor-not-allowed rounded-lg px-3 py-2 text-xs font-medium">
          Payment unavailable
        </button>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex gap-2">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex-1 active-press flex items-center justify-center gap-1 rounded-lg border border-primary/30 bg-primary/10 py-2 text-xs font-medium text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </button>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={isDisabled}
          className="flex-1 active-press flex items-center justify-center gap-1 rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Buy now with Pi"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="h-3.5 w-3.5" />
              {product.price_in_pi} Pi
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}
    </div>
  )
}
