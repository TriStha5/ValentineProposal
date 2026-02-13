"use client"

import { ImageIcon } from "lucide-react"
import Image from "next/image"

const photos = [
  { src: "/images/photo-1.jpg", alt: "A beautiful romantic sunset moment" },
  { src: "/images/photo-2.jpg", alt: "A cozy couple moment with flowers" },
  { src: "/images/photo-3.jpg", alt: "A romantic candlelit scene" },
  { src: "/images/photo-4.jpg", alt: "Love letters and roses" },
  { src: "/images/photo-5.jpg", alt: "A beautiful garden of roses" },
  { src: "/images/photo-6.jpg", alt: "Heart-shaped nature and scenery" },
]

const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-1"]

export function PhotoCollageModal() {
  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <ImageIcon className="h-10 w-10 text-primary" />
      <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
        Photo Memories
      </h2>
      <p className="text-center text-muted-foreground">
        Each picture tells our story
      </p>
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`group relative aspect-square overflow-hidden rounded-xl border-4 border-card bg-card shadow-lg transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-xl ${rotations[index]}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {/* Polaroid bottom label */}
            <div className="absolute bottom-0 left-0 right-0 bg-card/90 py-2 text-center">
              <p className="text-xs font-medium text-muted-foreground">
                {photo.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
