"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

const fullMessage =
  "Diya, thank you for being with me. You are the best thing that has ever happened to me, and I promise to cherish every moment with you. Stay with me always. - Your Sohan"

export function SpecialMessageModal() {
  const [displayedText, setDisplayedText] = useState("")
  const [showHearts, setShowHearts] = useState(false)

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setShowHearts(true)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <div className="relative">
        <Heart className="h-10 w-10 fill-primary text-primary" />
        {showHearts &&
          [...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="absolute h-4 w-4 fill-accent text-accent"
              style={{
                top: `${-10 + 40 * Math.sin((i * 2 * Math.PI) / 5)}px`,
                left: `${12 + 40 * Math.cos((i * 2 * Math.PI) / 5)}px`,
                animation: `fade-in-up 0.5s ease-out ${i * 0.1}s both`,
              }}
            />
          ))}
      </div>
      <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
        Special Message
      </h2>
      <div className="w-full rounded-xl border border-border bg-background/60 p-6 sm:p-8">
        <p className="min-h-[120px] font-serif text-xl leading-relaxed text-foreground/90 sm:text-2xl">
          {displayedText}
          <span
            className="ml-1 inline-block h-6 w-0.5 bg-primary"
            style={{
              animation:
                displayedText.length < fullMessage.length
                  ? "blink-caret 0.75s step-end infinite"
                  : "none",
              opacity: displayedText.length < fullMessage.length ? 1 : 0,
            }}
          />
        </p>
      </div>
      {showHearts && (
        <p
          className="text-center text-muted-foreground"
          style={{ animation: "fade-in-up 0.5s ease-out" }}
        >
          With all my love, forever and always - Sohan
        </p>
      )}
    </div>
  )
}
