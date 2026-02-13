import { FloatingHearts } from "@/components/floating-hearts"
import { RomanticBackground } from "@/components/romantic-background"
import { SurprisesContent } from "@/components/surprises-content"

export default function SurprisesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RomanticBackground />
      <FloatingHearts count={12} />
      <SurprisesContent />
    </main>
  )
}
