import { FloatingHearts } from "@/components/floating-hearts"
import { RomanticBackground } from "@/components/romantic-background"
import { ValentineProposal } from "@/components/valentine-proposal"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <RomanticBackground />
      <FloatingHearts count={20} />
      <ValentineProposal />
    </main>
  )
}
