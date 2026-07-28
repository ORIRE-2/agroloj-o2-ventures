"use client"

import { useState } from "react"
import {
  User,
  MapPin,
  Phone,
  ClipboardList,
  Headphones,
  Pencil,
  Check,
  ShieldCheck,
} from "lucide-react"
import { BUSINESS } from "@/lib/agroloj/data"
import { useAgroloj } from "@/lib/agroloj/store"
import { usePiAuth } from "@/contexts/pi-auth-context"

export function AccountView({
  onViewOrders,
  onContact,
}: {
  onViewOrders: () => void
  onContact: () => void
}) {
  const { customerName, setCustomerName, orders } = useAgroloj()
  const { isAuthenticated } = usePiAuth()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(customerName)

  function save() {
    const name = draft.trim() || "Valued Customer"
    setCustomerName(name)
    setDraft(name)
    setEditing(false)
  }

  const isOwner = customerName === BUSINESS.ownerName
  
  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <h1 className="text-lg font-bold text-foreground">Account</h1>

      {/* Owner Access Info */}
      {isOwner && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-900">Owner Access Enabled</p>
              <p className="text-xs text-amber-800 mt-0.5">You have access to the Bookings Management section to view and manage all consultation requests.</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile card */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1 text-sm outline-none"
                  aria-label="Your name"
                  autoFocus
                />
                <button
                  onClick={save}
                  className="active-press flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Save name"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">
                  {customerName}
                </h2>
                <button
                  onClick={() => {
                    setDraft(customerName)
                    setEditing(true)
                  }}
                  className="active-press text-muted-foreground"
                  aria-label="Edit name"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {BUSINESS.location}
            </div>
          </div>
        </div>
        {isAuthenticated && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-xs text-success">
            <ShieldCheck className="h-4 w-4" />
            Authenticated via Pi Network
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onViewOrders}
          className="active-press flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left"
        >
          <ClipboardList className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Order History</p>
            <p className="text-xs text-muted-foreground">
              {orders.length} {orders.length === 1 ? "order" : "orders"} placed
            </p>
          </div>
        </button>
        <button
          onClick={onContact}
          className="active-press flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left"
        >
          <Headphones className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Customer Support
            </p>
            <p className="text-xs text-muted-foreground">
              Contact us for help and inquiries
            </p>
          </div>
        </button>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="active-press flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left"
        >
          <Phone className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Call Us</p>
            <p className="text-xs text-muted-foreground">{BUSINESS.phone}</p>
          </div>
        </a>
      </div>

      <div className="rounded-2xl bg-secondary p-4 text-center">
        <p className="text-sm font-semibold text-foreground">{BUSINESS.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {BUSINESS.location}
        </p>
      </div>
    </div>
  )
}
