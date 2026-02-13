"use client"

import { useEffect, useState } from "react"

interface Bokeh {
  id: number
  left: number
  top: number
  size: number
  opacity: number
  color: string
  delay: number
  duration: number
}

const COLORS = [
  "rgba(255, 77, 109, 0.12)",
  "rgba(255, 143, 163, 0.15)",
  "rgba(255, 194, 209, 0.18)",
  "rgba(201, 24, 74, 0.08)",
  "rgba(255, 240, 243, 0.25)",
]

export function RomanticBackground() {
  const [bokehCircles, setBokehCircles] = useState<Bokeh[]>([])

  useEffect(() => {
    const circles: Bokeh[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 200 + 60,
      opacity: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 10,
    }))
    setBokehCircles(circles)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(255, 143, 163, 0.2) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 80%, rgba(255, 77, 109, 0.15) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 50% 50%, rgba(255, 194, 209, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Large soft glows */}
      <div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 77, 109, 0.15) 0%, transparent 70%)",
          animation: "romantic-drift 15s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 143, 163, 0.18) 0%, transparent 70%)",
          animation: "romantic-drift 18s ease-in-out 3s infinite alternate-reverse",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201, 24, 74, 0.08) 0%, transparent 70%)",
          animation: "romantic-drift 20s ease-in-out 6s infinite alternate",
        }}
      />

      {/* Bokeh circles */}
      {bokehCircles.map((circle) => (
        <div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            left: `${circle.left}%`,
            top: `${circle.top}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            background: `radial-gradient(circle, ${circle.color} 0%, transparent 70%)`,
            animation: `bokeh-float ${circle.duration}s ease-in-out ${circle.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(255, 240, 243, 0.4) 100%)",
        }}
      />
    </div>
  )
}
