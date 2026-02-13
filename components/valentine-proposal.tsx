"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Heart, HelpCircle, X } from "lucide-react"
import { Confetti } from "@/components/confetti"

const MAYBE_MESSAGES = [
  "Try Again",
  "Think More",
  "Are You Sure?",
  "Last Chance",
  "Pretty Please?",
  "Come On!",
]

export function ValentineProposal() {
  const router = useRouter()
  const [maybeCount, setMaybeCount] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [yesScale, setYesScale] = useState(1)
  const [maybeText, setMaybeText] = useState("Maybe")
  const [noPosition, setNoPosition] = useState<{ top: string; left: string } | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleYes = useCallback(() => {
    setShowConfetti(true)
    setIsRedirecting(true)
    setTimeout(() => {
      router.push("/thankyou")
    }, 1500)
  }, [router])

  const handleMaybe = useCallback(() => {
    const newCount = maybeCount + 1
    setMaybeCount(newCount)
    const msgIndex = Math.min(newCount - 1, MAYBE_MESSAGES.length - 1)
    setMaybeText(MAYBE_MESSAGES[msgIndex % MAYBE_MESSAGES.length])
    setYesScale(1 + newCount * 0.15)
  }, [maybeCount])

  const cardRef = useRef<HTMLDivElement>(null)

  const handleNoHover = useCallback(() => {
    if (!cardRef.current) return
    const card = cardRef.current
    const cardWidth = card.offsetWidth
    const cardHeight = card.offsetHeight
    const btnWidth = 100
    const btnHeight = 48
    const padding = 16
    const newTop = padding + Math.random() * (cardHeight - btnHeight - padding * 2)
    const newLeft = padding + Math.random() * (cardWidth - btnWidth - padding * 2)
    setNoPosition({ top: `${newTop}px`, left: `${newLeft}px` })
  }, [])

  // Reset no button position on mobile tap
  const handleNoClick = useCallback(() => {
    handleNoHover()
  }, [handleNoHover])

  // Entrance animation state
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <Confetti active={showConfetti} />

      <div
        ref={cardRef}
        className={`relative z-10 flex flex-col items-center gap-8 rounded-2xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-sm transition-all duration-700 sm:p-12 md:p-16 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isRedirecting ? "scale-110 opacity-0" : ""}`}
        style={{ maxWidth: "580px", width: "100%" }}
      >
        {/* Heart icon */}
        <div className="flex items-center justify-center">
          <div className="animate-pulse-glow rounded-full bg-primary/10 p-5">
            <Heart className="h-12 w-12 fill-primary text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl text-balance">
          Diya, will you be my Valentine?
        </h1>

        <p className="text-center text-muted-foreground">
          {'- Sohan'}<br />
          <span className="mt-1 inline-block text-sm">Choose wisely... or try to run away</span>
        </p>

        {/* Buttons */}
        <div className="relative flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* YES button */}
          <button
            onClick={handleYes}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{
              transform: `scale(${yesScale})`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            disabled={isRedirecting}
          >
            <Heart className="h-5 w-5 fill-primary-foreground transition-transform group-hover:scale-125" />
            <span>Yes</span>
          </button>

          {/* MAYBE button */}
          <button
            onClick={handleMaybe}
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 font-medium text-secondary-foreground shadow-md transition-all duration-300 hover:bg-secondary/80 hover:shadow-lg"
          >
            <HelpCircle className="h-4 w-4" />
            <span>{maybeText}</span>
          </button>

          {/* NO button - runs away on hover but stays inside the card */}
          <button
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoClick}
            className={`inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-6 py-3 font-medium text-muted-foreground shadow-md hover:border-primary/30 ${
              noPosition ? "absolute z-20" : ""
            }`}
            style={
              noPosition
                ? {
                    top: noPosition.top,
                    left: noPosition.left,
                    transition: "top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }
                : {}
            }
          >
            <X className="h-4 w-4" />
            <span>No</span>
          </button>
        </div>

        {/* Maybe counter hint */}
        {maybeCount > 0 && (
          <p
            className="text-sm text-muted-foreground transition-opacity"
            style={{ animation: "fade-in-up 0.3s ease-out" }}
          >
            {maybeCount < 3
              ? "The yes button is growing... just saying"
              : "It is getting harder to resist, isn't it?"}
          </p>
        )}
      </div>
    </div>
  )
}
