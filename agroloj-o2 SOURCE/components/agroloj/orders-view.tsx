"use client"

import { useState } from "react"
import { ClipboardList, ChevronDown } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/agroloj/types"
import { ORDER_STATUSES, formatPi, formatDate } from "@/lib/agroloj/data"
import { StatusBadge, EmptyState } from "./ui-bits"
import { useAgroloj } from "@/lib/agroloj/store"
import { cn } from "@/lib/utils"

function OrderCard({ order }: { order: Order }) {
  const { updateOrderStatus } = useAgroloj()
  const [open, setOpen] = useState(false)
  const itemCount = order.lines.reduce((s, l) => s + l.quantity, 0)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 p-4 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              {order.id}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(order.date)} · {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">
            {order.piTotal ? formatPi(order.piTotal) : "Pi Only"}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </div>
      </button>

      {open && (
        <div className="ag-fade-in border-t border-border px-4 pb-4 pt-3">
          <div className="space-y-1.5">
            {order.lines.map((l) => (
              <div
                key={l.productId}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  {l.name} × {l.quantity}
                </span>
                <span className="font-medium text-foreground">
                  {l.piPrice ? formatPi(l.piPrice * l.quantity) : "Pi Only"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">
              Update Status
            </p>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => updateOrderStatus(order.id, s as OrderStatus)}
                  className={cn(
                    "active-press rounded-full border px-3 py-1 text-xs font-medium",
                    order.status === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function OrdersView({ onBrowse }: { onBrowse: () => void }) {
  const { orders } = useAgroloj()

  if (orders.length === 0) {
    return (
      <div className="flex flex-col">
        <EmptyState
          icon={ClipboardList}
          title="No orders yet"
          subtitle="Your placed orders will appear here for tracking."
        />
        <div className="px-6">
          <button
            onClick={onBrowse}
            className="active-press w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <h1 className="text-lg font-bold text-foreground">My Orders</h1>
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} />
      ))}
    </div>
  )
}
