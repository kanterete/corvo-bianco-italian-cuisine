import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-md md:bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="w-1/3">
          <Link href="/" className="text-3xl font-bold text-[#7A2E22]">
            Corvo Bianco
          </Link>
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-6 text-xl font-semibold text-[#9E3B2E] md:flex">
          <li className="cursor-pointer transition hover:text-[#7A2E22]">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer transition hover:text-[#7A2E22]">
            <Link href="/order">Order</Link>
          </li>
          <li className="cursor-pointer transition hover:text-[#7A2E22]">
            <Link href="/About">About</Link>
          </li>
          <a
            href="#contact"
            className="cursor-pointer transition hover:text-[#7A2E22]"
          >
            Contact
          </a>
        </ul>

        <div className="flex w-1/3 justify-end">
          <button className="rounded-xl bg-[#9E3B2E] p-2 text-white transition hover:bg-[#7a2e22]">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
