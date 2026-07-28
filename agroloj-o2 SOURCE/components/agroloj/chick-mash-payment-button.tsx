"use client"

import { useState } from "react"
import { useAgroloj } from "@/lib/agroloj/store"
import { PRODUCT_CONFIG } from "@/lib/product-config"
import { ShoppingCart, Check } from "lucide-react"

interface ChickMashPaymentButtonProps {
  className?: string
}

export function ChickMashPaymentButton({
  className = "",
}: ChickMashPaymentButtonProps) {
  const { addToCart, cart } = useAgroloj()
  const [isAdded, setIsAdded] = useState(false)

  // Check if product is already in cart
  const productId = "chick-mash"
  const isInCart = cart.some((item) => item.productId === productId)

  const handleAddToCart = () => {
    addToCart(productId, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded || isInCart}
      className={`flex items-center justify-center gap-2 rounded-xl bg-primary py-3 px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active-press disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4" />
          <span>Added to Cart</span>
        </>
      ) : isInCart ? (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span>In Cart</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  )
}
