"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export function FloatingHearts({ count = 15 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 12,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 5,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    setHearts(generated)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `float-heart ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          {"♥"}
        </span>
      ))}
    </div>
  )
}
