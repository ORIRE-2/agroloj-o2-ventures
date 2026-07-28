"use client"

import { ChevronLeft, Sprout, Egg, Zap, Fish, Rabbit, Snail } from "lucide-react"
import { ConsultationPaymentButton } from "./consultation-payment-button"
import { FarmSetupPaymentButton } from "./farm-setup-payment-button"
import { PoultryConsultationPaymentButton } from "./poultry-consultation-payment-button"
import { CatfishConsultationPaymentButton } from "./catfish-consultation-payment-button"
import { CatfishFarmingTrainingPaymentButton } from "./catfish-farming-training-payment-button"
import { RabbitryTrainingPaymentButton } from "./rabbitry-training-payment-button"
import { SnailFarmingTrainingPaymentButton } from "./snail-farming-training-payment-button"
import { CropAdvisoryPaymentButton } from "./crop-advisory-payment-button"
import { CropAndLivestockAdvisoryPaymentButton } from "./crop-and-livestock-advisory-payment-button"
import { useAgroloj } from "@/lib/agroloj/store"

interface ConsultationService {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  features: string[]
}

const CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: "farm-setup",
    name: "Farm Setup",
    description: "Expert guidance for establishing and structuring your farm operations",
    icon: <Sprout className="h-6 w-6" />,
    features: [
      "Land assessment and planning",
      "Infrastructure setup",
      "Resource allocation",
      "Compliance guidance",
    ],
  },
  {
    id: "crop-advisory",
    name: "Crop & Livestock Advisory",
    description: "Professional advice on crop selection, planting, and livestock management",
    icon: <Sprout className="h-6 w-6" />,
    features: [
      "Crop selection guidance",
      "Planting schedules",
      "Pest management",
      "Yield optimization",
    ],
  },
  {
    id: "crop-and-livestock-advisory",
    name: "Crop and Livestock Advisory",
    description: "Receive professional advice on crop production, livestock management, disease prevention, nutrition, farm productivity and sustainable agricultural practices to improve your farming business.",
    icon: (
      <div className="flex gap-1">
        <Sprout className="h-3 w-3" />
        <Zap className="h-3 w-3" />
      </div>
    ),
    features: [
      "Crop production guidance",
      "Livestock management",
      "Disease prevention",
      "Nutrition planning",
      "Farm productivity optimization",
      "Sustainable practices",
    ],
  },
  {
    id: "poultry",
    name: "Poultry Consultation",
    description: "Specialized consultation for poultry farming and bird management",
    icon: <Egg className="h-6 w-6" />,
    features: [
      "Breed selection",
      "Housing design",
      "Health management",
      "Feed optimization",
    ],
  },
  {
    id: "catfish",
    name: "Catfish Farming Training",
    description: "Hands-on training covering pond construction, water management, feeding schedule, disease control, and harvest planning. For beginners + scale-up farmers.",
    icon: <Fish className="h-6 w-6" />,
    features: [
      "Pond construction",
      "Water management",
      "Feeding schedules",
      "Disease control & harvest planning",
    ],
  },
  {
    id: "rabbitry",
    name: "Rabbitry Training",
    description: "Comprehensive training on rabbit farming and management",
    icon: <Rabbit className="h-6 w-6" />,
    features: [
      "Breed selection",
      "Housing setup",
      "Nutrition management",
      "Market linkage",
    ],
  },
  {
    id: "snail-farming",
    name: "Snail Farming Training",
    description: "Complete training on snailery setup, housing, feeding, breeding cycles, disease management, and market sales",
    icon: <Snail className="h-6 w-6" />,
    features: [
      "Snailery setup and housing",
      "Feeding and breeding cycles",
      "Disease management",
      "Market sales and profitability",
    ],
  },
]

export function ConsultationView({
  onBack,
}: {
  onBack: () => void
}) {
  const { addToast } = useAgroloj()

  const handleConsultationSuccess = (result: any) => {
    addToast("Consultation booking successful! Check your account for details.")
  }

  const handleConsultationError = (error: any) => {
    addToast("Failed to book consultation. Please try again.")
  }

  return (
    <div className="ag-fade-in flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">Agro Consultation Services</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 px-4 py-4 pb-20">
        {/* Introduction */}
        <div className="rounded-2xl bg-primary/10 p-4 border border-primary/20">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            Book 1-on-1 Professional Consultation
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Get expert advice from AGROLOJ & O2 Ventures specialists covering farm setup, crop & livestock advisory, poultry consultation, catfish farming, and rabbitry training.
          </p>
        </div>

        {/* Services */}
        <div className="flex flex-col gap-3">
          {CONSULTATION_SERVICES.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-border bg-card p-4"
            >
              {/* Service Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Booking Button */}
              {service.id === "farm-setup" ? (
                <FarmSetupPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : service.id === "crop-advisory" ? (
                <CropAdvisoryPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : service.id === "crop-and-livestock-advisory" ? (
                <CropAndLivestockAdvisoryPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : service.id === "poultry" ? (
                <PoultryConsultationPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : service.id === "catfish" ? (
                <CatfishFarmingTrainingPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : service.id === "rabbitry" ? (
                <RabbitryTrainingPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : service.id === "snail-farming" ? (
                <SnailFarmingTrainingPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              ) : (
                <ConsultationPaymentButton
                  onSuccess={handleConsultationSuccess}
                  onError={handleConsultationError}
                  variant="compact"
                />
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="rounded-2xl bg-blue-500/10 p-4 border border-blue-500/20">
          <h3 className="text-xs font-semibold text-foreground mb-2">
            What's Included
          </h3>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            <li>• One-on-one session with experienced consultant</li>
            <li>• Personalized advice tailored to your farm</li>
            <li>• Follow-up support and resources</li>
            <li>• Expert recommendations and action plan</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
