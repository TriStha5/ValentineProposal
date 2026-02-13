"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  left: number
  color: string
  size: number
  delay: number
  duration: number
  rotation: number
}

const COLORS = ["#ff4d6d", "#ff8fa3", "#ffc2d1", "#ff85a1", "#fb6f92", "#ffccd5"]

export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!active) return
    const generated: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2 + 1.5,
      rotation: Math.random() * 360,
    }))
    setPieces(generated)
  }, [active])

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-0 block rounded-sm"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}
