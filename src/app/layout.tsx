import type { Metadata } from 'next'
import './globals.css'
import { HeroUIProvider } from '@heroui/react'

import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Corvo Bianco - Italian Cuisine',
  description: 'Premium Italian restaurant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${playfair.className}`}>{children}</body>
    </html>
  )
}
