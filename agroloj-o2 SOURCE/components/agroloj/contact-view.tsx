"use client"

import { useState } from "react"
import { ArrowLeft, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"
import { BUSINESS } from "@/lib/agroloj/data"
import { useAgroloj } from "@/lib/agroloj/store"

export function ContactView({ onBack }: { onBack: () => void }) {
  const { showToast } = useAgroloj()
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSent(true)
    showToast("Message sent successfully")
  }

  return (
    <div className="ag-fade-in flex min-h-full flex-col bg-background pb-6">
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button
          onClick={onBack}
          className="active-press flex h-9 w-9 items-center justify-center rounded-full"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">Contact Us</h1>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
          <h2 className="text-base font-bold">{BUSINESS.name}</h2>
          <p className="mt-1 text-sm opacity-90">
            We&apos;re here to help with your orders and inquiries.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="active-press flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-semibold text-foreground">
                {BUSINESS.phone}
              </p>
            </div>
          </a>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <MapPin className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm font-semibold text-foreground">
                {BUSINESS.location}
              </p>
            </div>
          </div>
        </div>

        {sent ? (
          <div className="ag-pop-in flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-success" />
            <p className="font-semibold text-foreground">Thank you!</p>
            <p className="text-sm text-muted-foreground">
              Your message has been received. We&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => {
                setSent(false)
                setName("")
                setMessage("")
              }}
              className="active-press mt-1 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4"
          >
            <h3 className="text-sm font-semibold text-foreground">
              Send us a message
            </h3>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="contact-name"
                className="text-xs font-medium text-muted-foreground"
              >
                Your Name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="contact-message"
                className="text-xs font-medium text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={4}
                className="resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={!name.trim() || !message.trim()}
              className="active-press flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
