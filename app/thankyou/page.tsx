import { FloatingHearts } from "@/components/floating-hearts"
import { RomanticBackground } from "@/components/romantic-background"
import { ThankYouContent } from "@/components/thank-you-content"

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RomanticBackground />
      <FloatingHearts count={30} />
      <ThankYouContent />
    </main>
  )
}
