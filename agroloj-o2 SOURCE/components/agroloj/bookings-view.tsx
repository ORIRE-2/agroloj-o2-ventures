"use client"

import { useAgroloj } from "@/lib/agroloj/store"
import { Calendar, Clock, Phone, Mail, CheckCircle2, Clock3, AlertCircle, Lock } from "lucide-react"
import type { Booking } from "@/lib/agroloj/types"
import { BUSINESS } from "@/lib/agroloj/data"

export function BookingsView() {
  const { bookings, updateBookingStatus, customerName } = useAgroloj()
  
  // Only allow the business owner to access bookings management
  // The owner is identified by checking if they match the business contact
  const isOwner = customerName === "AGROLOJ & O2 Ventures Owner" || customerName === BUSINESS.ownerName

  const pendingCount = bookings.filter((b) => b.status === "pending").length
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length
  const completedCount = bookings.filter((b) => b.status === "completed").length

  const handleStatusChange = (bookingId: string, status: Booking["status"]) => {
    updateBookingStatus(bookingId, status)
  }

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 border-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return <Clock3 className="h-4 w-4" />
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateStr
    }
  }

  // If user is not the owner, show restricted access message
  if (!isOwner) {
    return (
      <div className="flex flex-col gap-4 pb-20 items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded-2xl text-center">
          <Lock className="h-12 w-12 text-muted-foreground opacity-50" />
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-foreground">Bookings Management</h3>
            <p className="text-sm text-muted-foreground">
              This section is only accessible to the business owner. Consultation bookings can only be managed by the AGROLOJ & O2 Ventures team.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 rounded-xl">
        <h2 className="text-lg font-bold text-foreground mb-4">Consultation Bookings</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
            <p className="text-xs text-yellow-600">Pending</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-700">{confirmedCount}</p>
            <p className="text-xs text-blue-600">Confirmed</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-700">{completedCount}</p>
            <p className="text-xs text-green-600">Completed</p>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <Clock3 className="h-12 w-12 text-muted-foreground opacity-30" />
          <p className="text-sm text-muted-foreground">No consultation bookings yet</p>
          <p className="text-xs text-muted-foreground">Bookings will appear here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-border rounded-xl p-4 bg-card hover:bg-muted/50 transition-colors"
            >
              {/* Header with ID and Status */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-mono text-muted-foreground">{booking.id}</p>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                    booking.status,
                  )}`}
                >
                  {getStatusIcon(booking.status)}
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex flex-col gap-2 mb-3 pb-3 border-b border-border">
                <p className="font-semibold text-foreground">{booking.customerName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <a
                    href={`tel:${booking.customerPhone}`}
                    className="text-primary hover:underline"
                  >
                    {booking.customerPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <a
                    href={`mailto:${booking.customerEmail}`}
                    className="text-primary hover:underline"
                  >
                    {booking.customerEmail}
                  </a>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex flex-col gap-2 mb-3 pb-3 border-b border-border">
                <p className="text-sm font-medium text-foreground">{booking.serviceName}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(booking.bookingDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {booking.bookingTime}
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              {booking.problemDescription && (
                <div className="flex flex-col gap-2 mb-3 pb-3 border-b border-border">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Problem Description
                  </p>
                  <p className="text-xs text-foreground bg-muted/50 p-2 rounded whitespace-pre-wrap">
                    {booking.problemDescription}
                  </p>
                </div>
              )}

              {/* Status Actions */}
              <div className="flex gap-2 flex-wrap">
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(booking.id, "confirmed")}
                      className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, "cancelled")}
                      className="flex-1 px-3 py-2 rounded-lg border border-red-300 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleStatusChange(booking.id, "completed")}
                    className="flex-1 px-3 py-2 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors"
                  >
                    Mark as Completed
                  </button>
                )}
                {(booking.status === "completed" || booking.status === "cancelled") && (
                  <button
                    onClick={() => handleStatusChange(booking.id, "pending")}
                    className="flex-1 px-3 py-2 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:bg-muted transition-colors"
                  >
                    Reset to Pending
                  </button>
                )}
              </div>

              {/* Notes */}
              {booking.notes && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                  <p className="text-xs text-foreground bg-muted/50 p-2 rounded">
                    {booking.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
