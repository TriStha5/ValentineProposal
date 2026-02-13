"use client"

import { useState, useEffect } from "react"
import { BookHeart, ImageIcon, MessageCircleHeart, X } from "lucide-react"
import { LoveNoteModal } from "@/components/modals/love-note-modal"
import { PhotoCollageModal } from "@/components/modals/photo-collage-modal"
import { SpecialMessageModal } from "@/components/modals/special-message-modal"

type ModalType = "love-note" | "photos" | "message" | null

const surpriseButtons = [
  {
    id: "love-note" as const,
    label: "Love Note",
    description: "A letter from my heart",
    icon: BookHeart,
    gradient: "from-[#ff4d6d] to-[#ff8fa3]",
  },
  {
    id: "photos" as const,
    label: "Photo Memories",
    description: "Our beautiful moments",
    icon: ImageIcon,
    gradient: "from-[#ff8fa3] to-[#ffc2d1]",
  },
  {
    id: "message" as const,
    label: "Special Message",
    description: "Something from the heart",
    icon: MessageCircleHeart,
    gradient: "from-[#ff4d6d] to-[#c9184a]",
  },
]

export function SurprisesContent() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div
        className={`mb-12 text-center transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl md:text-6xl text-balance">
          These are for you, Diya
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {'From Sohan, with all the love in the world'}<br />
          <span className="text-sm">Click each one to reveal your surprise</span>
        </p>
      </div>

      {/* Surprise buttons grid */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {surpriseButtons.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveModal(item.id)}
            className={`group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: mounted ? `${300 + index * 150}ms` : "0ms",
            }}
          >
            <div
              className={`rounded-full bg-gradient-to-br ${item.gradient} p-4 shadow-md transition-transform duration-300 group-hover:scale-110`}
            >
              <item.icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modals */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-card p-6 shadow-2xl sm:p-8"
            style={{ animation: "fade-in-up 0.4s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {activeModal === "love-note" && <LoveNoteModal />}
            {activeModal === "photos" && <PhotoCollageModal />}
            {activeModal === "message" && <SpecialMessageModal />}
          </div>
        </div>
      )}
    </div>
  )
}
