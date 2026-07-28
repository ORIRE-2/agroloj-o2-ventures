"use client"

import { useState } from "react"
import { usePiAuth } from "@/contexts/pi-auth-context"
import { useAgroloj } from "@/lib/agroloj/store"
import { PRODUCT_CONFIG } from "@/lib/product-config"
import { Loader2, Fish, Calendar, Clock, User, Phone, Mail, AlertCircle } from "lucide-react"

interface CatfishConsultationPaymentButtonProps {
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
  className?: string
  variant?: "full" | "compact"
}

interface BookingFormData {
  name: string
  phone: string
  email: string
  date: string
  time: string
  problemDescription: string
}

export function CatfishConsultationPaymentButton({
  onSuccess,
  onError,
  className = "",
  variant = "full",
}: CatfishConsultationPaymentButtonProps) {
  const { sdk, products } = usePiAuth()
  const { addBooking, customerName } = useAgroloj()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: customerName,
    phone: "",
    email: "",
    date: "",
    time: "",
    problemDescription: "",
  })

  const product = products?.find(
    (p) => p.id === PRODUCT_CONFIG.PRODUCT_6a465532749b3f15dbe18e1c
  )

  const isDisabled = !sdk || !product || isLoading
  const isBookingComplete =
    bookingData.name &&
    bookingData.phone &&
    bookingData.email &&
    bookingData.date &&
    bookingData.time &&
    bookingData.problemDescription

  const handleOpenBookingForm = () => {
    setShowBookingForm(true)
    setError(null)
  }

  const handleBookingChange = (field: keyof BookingFormData, value: string) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePayment = async () => {
    if (!isBookingComplete) {
      setError("Please fill in all required fields")
      return
    }

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
        addBooking({
          customerName: bookingData.name,
          customerPhone: bookingData.phone,
          customerEmail: bookingData.email,
          serviceId: product.id,
          serviceName: "Catfish Consultation",
          bookingDate: bookingData.date,
          bookingTime: bookingData.time,
          problemDescription: bookingData.problemDescription,
          status: "pending",
        })

        setIsLoading(false)
        setShowBookingForm(false)
        setBookingData({
          name: customerName,
          phone: "",
          email: "",
          date: "",
          time: "",
          problemDescription: "",
        })
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
        Booking unavailable
      </button>
    )
  }

  if (showBookingForm) {
    return (
      <div className="flex flex-col gap-3 rounded-xl bg-muted/50 p-3 max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <User className="h-4 w-4" />
            Full Name
          </label>
          <input
            type="text"
            value={bookingData.name}
            onChange={(e) => handleBookingChange("name", e.target.value)}
            placeholder="Your name"
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Phone className="h-4 w-4" />
            Phone Number
          </label>
          <input
            type="tel"
            value={bookingData.phone}
            onChange={(e) => handleBookingChange("phone", e.target.value)}
            placeholder="Your phone"
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Mail className="h-4 w-4" />
            Email
          </label>
          <input
            type="email"
            value={bookingData.email}
            onChange={(e) => handleBookingChange("email", e.target.value)}
            placeholder="your@email.com"
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Calendar className="h-4 w-4" />
            Select Date
          </label>
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) => handleBookingChange("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Clock className="h-4 w-4" />
            Select Time
          </label>
          <input
            type="time"
            value={bookingData.time}
            onChange={(e) => handleBookingChange("time", e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <AlertCircle className="h-4 w-4" />
            Describe Your Major Problem
          </label>
          <textarea
            value={bookingData.problemDescription}
            onChange={(e) => handleBookingChange("problemDescription", e.target.value)}
            placeholder="Please describe the problem you need help with..."
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none h-24"
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-3 mt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-semibold text-foreground">Catfish Consultation</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Price:</span>
            <span className="font-semibold text-primary">{product.price_in_pi} Pi</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowBookingForm(false)}
            className="flex-1 rounded-lg border border-border bg-background py-2 text-xs font-semibold text-foreground active-press disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={!isBookingComplete || isDisabled}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground active-press disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay {product.price_in_pi} Pi
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

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleOpenBookingForm}
        disabled={isDisabled}
        className={`flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground active-press disabled:opacity-50 disabled:cursor-not-allowed transition-all ${className} ${
          variant === "compact" ? "py-2 text-xs" : ""
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Fish className="h-4 w-4" />
            <span>Book Now</span>
            <span className="text-primary-foreground/80">· {product.price_in_pi} Pi</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}
    </div>
  )
}
