import type { Metadata } from 'next'
import { Poppins, Dancing_Script } from 'next/font/google'
import { MusicPlayer } from '@/components/music-player'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
})

export const metadata: Metadata = {
  title: 'Will You Be My Valentine?',
  description: 'A special Valentine proposal just for you',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
        <MusicPlayer />
      </body>
    </html>
  )
}
