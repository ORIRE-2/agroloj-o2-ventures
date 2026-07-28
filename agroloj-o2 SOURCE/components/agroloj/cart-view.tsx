"use client"

import { useState } from "react"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  Copy,
  CheckCircle2,
} from "lucide-react"
import type { Order } from "@/lib/agroloj/types"
import {
  BUSINESS,
  CATEGORY_MAP,
  PRODUCT_MAP,
  formatPi,
} from "@/lib/agroloj/data"
import { ProductImage, EmptyState } from "./ui-bits"
import { useAgroloj } from "@/lib/agroloj/store"
import { PiPaymentButton } from "./pi-payment-button"

type Stage = "cart" | "checkout" | "done"

export function CartView({
  onBrowse,
  onViewOrders,
}: {
  onBrowse: () => void
  onViewOrders: () => void
}) {
  const { cart, setQty, removeFromCart, cartTotal, placeOrder, showToast } =
    useAgroloj()
  const [stage, setStage] = useState<Stage>("cart")
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)

  function handlePlace() {
    const order = placeOrder()
    if (order) {
      setPlacedOrder(order)
      setStage("done")
    }
  }

  function copy(text: string, label: string) {
    navigator.clipboard?.writeText(text)
    showToast(`${label} copied`)
  }

  if (stage === "done" && placedOrder) {
    return (
      <div className="ag-fade-in flex flex-col items-center gap-4 px-6 py-12 text-center">
        <div className="ag-pop-in flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Order Placed!</h1>
        <p className="text-sm text-muted-foreground">
          Your order <span className="font-semibold">{placedOrder.id}</span> has
          been recorded with status{" "}
          <span className="font-semibold">Pending Payment</span>. Please complete
          your payment using the details below.
        </p>
        <div className="w-full rounded-2xl border border-border bg-card p-4 text-left">
          <h2 className="text-sm font-semibold text-foreground">
            Payment Details
          </h2>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">OPay Account</p>
              <p className="text-sm font-semibold text-foreground">
                {BUSINESS.opay}
              </p>
            </div>
            <button
              onClick={() => copy(BUSINESS.opay, "Account number")}
              className="active-press flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Account Name</p>
            <p className="text-sm font-semibold text-foreground">
              {BUSINESS.accountName}
            </p>
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-base font-bold text-primary">
                {placedOrder.piTotal ? formatPi(placedOrder.piTotal) : "Pi Only"}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-2">
            Or pay instantly with Pi
          </p>
          <PiPaymentButton 
            onSuccess={() => {
              showToast("Payment successful!")
            }}
            showPrice={true}
          />
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={() => {
              setStage("cart")
              onBrowse()
            }}
            className="active-press flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground"
          >
            Keep Shopping
          </button>
          <button
            onClick={() => {
              setStage("cart")
              onViewOrders()
            }}
            className="active-press flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            View Orders
          </button>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          subtitle="Browse our products and add items to your cart."
        />
        <div className="px-6">
          <button
            onClick={onBrowse}
            className="active-press w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  if (stage === "checkout") {
    return (
      <div className="ag-fade-in flex flex-col gap-4 px-4 py-4 pb-4">
        <h1 className="text-lg font-bold text-foreground">Checkout</h1>
        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold text-foreground">
            Payment Instructions
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Make a transfer to the account below, then place your order. Your
            order will be marked as Pending Payment.
          </p>
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-secondary p-3">
              <div>
                <p className="text-xs text-muted-foreground">OPay Account</p>
                <p className="text-sm font-semibold text-foreground">
                  {BUSINESS.opay}
                </p>
              </div>
              <button
                onClick={() => copy(BUSINESS.opay, "Account number")}
                className="active-press flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs"
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
            <div className="rounded-xl bg-secondary p-3">
              <p className="text-xs text-muted-foreground">Account Name</p>
              <p className="text-sm font-semibold text-foreground">
                {BUSINESS.accountName}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-sm font-semibold text-foreground">
            Order Summary
          </h2>
          <div className="mt-3 space-y-2">
            {cart.map((item) => {
              const p = PRODUCT_MAP[item.productId]
              if (!p) return null
              return (
                <div
                  key={item.productId}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {p.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    {p.piPrice ? formatPi(p.piPrice * item.quantity) : "Pi Only"}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-base font-bold text-primary">
              {cartTotal > 0 ? formatPi(cartTotal) : "0 π"}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStage("cart")}
            className="active-press flex-1 rounded-xl border border-border py-3 text-sm font-medium text-foreground"
          >
            Back
          </button>
          <button
            onClick={handlePlace}
            className="active-press flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            Place Order
          </button>
        </div>

        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-2 text-center">
            Or pay directly with Pi
          </p>
          <PiPaymentButton 
            onSuccess={() => {
              handlePlace()
            }}
            showPrice={true}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-4 pb-4">
      <h1 className="text-lg font-bold text-foreground">
        Cart ({cart.length})
      </h1>
      <div className="flex flex-col gap-3">
        {cart.map((item) => {
          const p = PRODUCT_MAP[item.productId]
          if (!p) return null
          const cat = CATEGORY_MAP[p.category]
          return (
            <div
              key={item.productId}
              className="flex gap-3 rounded-2xl border border-border bg-card p-3"
            >
              <ProductImage
                name={p.name}
                icon={cat.icon}
                hue={cat.hue}
                className="h-20 w-20 shrink-0 rounded-xl"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {p.name}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="active-press text-muted-foreground"
                    aria-label={`Remove ${p.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{p.unit}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">
                    {p.piPrice ? formatPi(p.piPrice * item.quantity) : "Pi Only"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(item.productId, item.quantity - 1)}
                      className="active-press flex h-7 w-7 items-center justify-center rounded-full border border-border"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setQty(item.productId, item.quantity + 1)}
                      className="active-press flex h-7 w-7 items-center justify-center rounded-full border border-border"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-2 rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="text-base font-bold text-primary">
            {cartTotal > 0 ? formatPi(cartTotal) : "0 π"}
          </span>
        </div>
        <button
          onClick={() => setStage("checkout")}
          className="active-press mt-3 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
