"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ArrowRight } from "lucide-react"

const HEART_POSITIONS = Array.from({ length: 6 }, (_, i) => ({
  top: `${50 + 60 * Math.sin((i * 2 * Math.PI) / 6) - 12}px`,
  left: `${48 + 60 * Math.cos((i * 2 * Math.PI) / 6) - 12}px`,
  delay: `${i * 0.15}s`,
  animation: `fade-in-up 0.5s ease-out ${0.5 + i * 0.1}s both`,
}))

export function ThankYouContent() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
      {/* Heart burst */}
      <div
        className={`mb-8 transition-all duration-1000 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="relative">
          <Heart className="h-24 w-24 fill-primary text-primary animate-pulse-glow rounded-full" />
          {/* Surrounding smaller hearts */}
          {HEART_POSITIONS.map((pos, i) => (
            <Heart
              key={i}
              className="absolute h-6 w-6 fill-accent text-accent"
              style={{
                top: pos.top,
                left: pos.left,
                animationDelay: pos.delay,
                animation: pos.animation,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main text */}
      <div
        className={`flex flex-col items-center gap-4 text-center transition-all duration-700 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="font-serif text-5xl font-bold text-foreground sm:text-6xl md:text-7xl text-balance">
          Thank You, Diya!
        </h1>
        <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
          You just made Sohan the happiest person alive! I have some special surprises waiting for you...
        </p>
      </div>

      {/* Continue button */}
      <button
        onClick={() => router.push("/surprises")}
        className={`group mt-12 inline-flex items-center gap-3 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all duration-700 delay-700 hover:shadow-xl hover:gap-4 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span>Continue to your surprises</span>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  )
}
