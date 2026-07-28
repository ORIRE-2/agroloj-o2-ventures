"use client"

import type { ReactNode } from "react"
import {
  Wheat,
  Egg,
  Sprout,
  Leaf,
  Briefcase,
  Cpu,
  Package,
  type LucideIcon,
} from "lucide-react"
import type { OrderStatus } from "@/lib/agroloj/types"
import { cn } from "@/lib/utils"

const ICONS: Record<string, LucideIcon> = {
  Wheat,
  Egg,
  Sprout,
  Leaf,
  Briefcase,
  Cpu,
}

export function CategoryIcon({
  icon,
  className,
  style,
}: {
  icon: string
  className?: string
  style?: React.CSSProperties
}) {
  const Icon = ICONS[icon] ?? Package
  return <Icon className={className} style={style} />
}

export function ProductImage({
  name,
  icon,
  hue,
  className,
  imageUrl,
}: {
  name: string
  icon: string
  hue: number
  className?: string
  imageUrl?: string
}) {
  // Show real image if available, otherwise show gray placeholder
  if (imageUrl) {
    return (
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden bg-gray-200",
          className,
        )}
        role="img"
        aria-label={name}
      >
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback to gray if image fails to load
            e.currentTarget.style.display = "none"
          }}
        />
      </div>
    )
  }

  // Gray placeholder when no image_url
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden bg-gray-300",
        className,
      )}
      role="img"
      aria-label={name}
    >
      <span className="text-xs font-medium text-gray-500">No Image</span>
    </div>
  )
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  "Pending Payment": "bg-warning/15 text-warning-foreground border-warning/40",
  Processing: "bg-info/15 text-info border-info/40",
  Shipped: "bg-info/15 text-info border-info/40",
  Delivered: "bg-success/15 text-success border-success/40",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/30",
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
      )}
      style={
        status === "Pending Payment"
          ? { color: "oklch(0.45 0.12 75)" }
          : undefined
      }
    >
      {status}
    </span>
  )
}

export function SectionTitle({
  title,
  action,
}: {
  title: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {action}
    </div>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <p className="font-medium text-foreground">{title}</p>
      {subtitle && (
        <p className="max-w-xs text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
