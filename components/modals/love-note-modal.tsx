"use client"

import { Heart } from "lucide-react"

export function LoveNoteModal() {
  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <Heart className="h-10 w-10 fill-primary text-primary" />
      <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
        A Love Note
      </h2>
      <div className="w-full rounded-xl border border-border bg-background/60 p-6 sm:p-8">
        <div className="space-y-4 font-serif text-lg leading-relaxed text-foreground/90 sm:text-xl">
          <p>My Dearest Diya,</p>
          <p>
            Every moment with you feels like a dream I never want to wake up from. Your
            smile lights up even my darkest days, and your laughter is the sweetest melody
            I have ever heard.
          </p>
          <p>
            Thank you for being you, for every shared laugh, every gentle touch, and every
            quiet moment we have spent together. You make the ordinary feel extraordinary.
          </p>
          <p>
            I am grateful for your kindness, your warmth, and the way you make everything
            around you more beautiful. Here is to us, to love, and to countless more
            memories together.
          </p>
          <p className="text-right">
            Forever yours,<br />
            Sohan
          </p>
        </div>
      </div>
    </div>
  )
}
