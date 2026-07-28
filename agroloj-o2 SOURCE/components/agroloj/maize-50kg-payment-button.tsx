"use client"

import { useState } from "react"
import { usePiAuth } from "@/contexts/pi-auth-context"
import { PRODUCT_CONFIG } from "@/lib/product-config"
import { Loader2 } from "lucide-react"

interface Maize50kgPaymentButtonProps {
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
  className?: string
  showPrice?: boolean
}

export function Maize50kgPaymentButton({
  onSuccess,
  onError,
  className = "",
  showPrice = true,
}: Maize50kgPaymentButtonProps) {
  const { sdk, products } = usePiAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_6a44ef088039078c89d8d6bb
  )

  const isDisabled = !sdk || !product || isLoading

  const handlePayment = async () => {
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

  if (!product) {
    return (
      <button disabled className={`opacity-50 cursor-not-allowed ${className}`}>
        Payment unavailable
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handlePayment}
        disabled={isDisabled}
        className={`flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground active-press disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <span>Pay with Pi</span>
            {showPrice && <span>· {product.price_in_pi} Pi</span>}
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}
    </div>
  )
}
