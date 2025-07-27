import type { Metadata } from 'next'
import './globals.css'
import { Playfair_Display } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'
import { CartProvider } from '@/context/CartContext'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
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
      <body className={`min-h-screen ${playfair.className}`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
