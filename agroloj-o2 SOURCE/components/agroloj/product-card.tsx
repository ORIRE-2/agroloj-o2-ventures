"use client"

import { Plus } from "lucide-react"
import type { Product } from "@/lib/agroloj/types"
import { CATEGORY_MAP, formatPi } from "@/lib/agroloj/data"
import { ProductImage } from "./ui-bits"
import { SoybeanPaymentButton } from "./soybean-payment-button"
import { WhiteGsrriPaymentButton } from "./white-gsrri-payment-button"
import { SugarPaymentButton } from "./sugar-payment-button"
import { CastorBeanPaymentButton } from "./castor-bean-payment-button"
import { ChickMashPaymentButton } from "./chick-mash-payment-button"
import { GrowerMashPaymentButton } from "./grower-mash-payment-button"
import { LayerMashPaymentButton } from "./layer-mash-payment-button"
import { EggsPaymentButton } from "./eggs-payment-button"

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product
  onOpen: () => void
  onAdd: () => void
}) {
  const cat = CATEGORY_MAP[product.category]
  return (
    <div className="ag-fade-in overflow-hidden rounded-2xl border border-border bg-card">
      <button
        onClick={onOpen}
        className="active-press block w-full text-left"
        aria-label={`View ${product.name}`}
      >
        <ProductImage
          name={product.name}
          icon={cat.icon}
          hue={cat.hue}
          className="aspect-square w-full"
          imageUrl={product.image_url}
        />
      </button>
      <div className="flex flex-col gap-1.5 p-3">
        <span
          className="w-fit rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{
            background: `oklch(0.95 0.04 ${cat.hue})`,
            color: `oklch(0.4 0.12 ${cat.hue})`,
          }}
        >
          {cat.name}
        </span>
        <button onClick={onOpen} className="text-left">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
            {product.name}
          </h3>
        </button>
        <p className="text-xs text-muted-foreground">{product.unit}</p>
        
        {/* Show Pi payment button for White Gsrri */}
        {product.id === "white-gsrri" && (
          <div className="mt-2 flex flex-col gap-2">
            <WhiteGsrriPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Soybean */}
        {product.id === "fp-soybeans" && (
          <div className="mt-2 flex flex-col gap-2">
            <SoybeanPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Sugar */}
        {product.id === "fs-sugar" && (
          <div className="mt-2 flex flex-col gap-2">
            <SugarPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Castor Bean Seed */}
        {product.id === "fs-castor-bean" && (
          <div className="mt-2 flex flex-col gap-2">
            <CastorBeanPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Chick Mash */}
        {product.id === "ai-chick-mash" && (
          <div className="mt-2 flex flex-col gap-2">
            <ChickMashPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Grower Mash */}
        {product.id === "ai-grower-mash" && (
          <div className="mt-2 flex flex-col gap-2">
            <GrowerMashPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Layer Mash */}
        {product.id === "ai-layer-mash" && (
          <div className="mt-2 flex flex-col gap-2">
            <LayerMashPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show Pi payment button for Eggs */}
        {product.id === "fs-eggs" && (
          <div className="mt-2 flex flex-col gap-2">
            <EggsPaymentButton className="w-full" />
          </div>
        )}
        
        {/* Show regular add to cart for other products */}
        {product.id !== "fp-soybeans" && product.id !== "white-gsrri" && product.id !== "fs-sugar" && product.id !== "fs-castor-bean" && product.id !== "ai-chick-mash" && product.id !== "ai-grower-mash" && product.id !== "ai-layer-mash" && product.id !== "fs-eggs" && (
          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-primary">
              {product.piPrice ? formatPi(product.piPrice) : "Pi Only"}
            </span>
            <button
              onClick={onAdd}
              className="active-press flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
