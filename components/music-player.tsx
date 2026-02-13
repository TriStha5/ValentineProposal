"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react"

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [showVolume, setShowVolume] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(
        "https://cdn.pixabay.com/audio/2024/11/29/audio_f0c4e4ff0e.mp3"
      )
      audio.loop = true
      audio.volume = volume
      audio.preload = "auto"
      audioRef.current = audio

      audio.addEventListener("play", () => setIsPlaying(true))
      audio.addEventListener("pause", () => setIsPlaying(false))
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return

    if (!hasInteracted) {
      setHasInteracted(true)
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Browser may block autoplay
      })
    }
  }, [isPlaying, hasInteracted])

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value))
    },
    []
  )

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Volume Slider */}
      {showVolume && (
        <div
          className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2.5 shadow-lg backdrop-blur-md"
          style={{
            animation: "fade-in-up 0.3s ease-out",
          }}
        >
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.4)}
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={volume > 0 ? "Mute" : "Unmute"}
          >
            {volume > 0 ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-secondary accent-primary [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
            aria-label="Volume"
          />

          <span className="min-w-[2ch] text-xs text-muted-foreground">
            {Math.round(volume * 100)}
          </span>
        </div>
      )}

      {/* Volume Toggle */}
      <button
        onClick={() => setShowVolume(!showVolume)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-lg backdrop-blur-md transition-all hover:bg-secondary hover:text-primary"
        aria-label="Toggle volume controls"
      >
        {volume > 0 ? (
          <Volume2 className="h-4 w-4" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </button>

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className={`group flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${
          isPlaying
            ? "bg-primary text-primary-foreground animate-pulse-glow"
            : "bg-card/90 text-primary hover:bg-primary/10"
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {!hasInteracted ? (
          <Music className="h-5 w-5" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="ml-0.5 h-5 w-5" />
        )}
      </button>
    </div>
  )
}
