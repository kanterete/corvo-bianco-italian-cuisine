import { Button } from '@heroui/react'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 shadow-sm backdrop-blur-md md:bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="w-1/3">
          <h1 className="text-3xl font-bold text-[#7A2E22]">Corvo Bianco</h1>
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-6 text-xl font-semibold text-[#9E3B2E] md:flex">
          <li className="cursor-pointer transition hover:text-[#7A2E22]">
            Home
          </li>
          <li className="cursor-pointer transition hover:text-[#7A2E22]">
            Menu
          </li>
          <li className="cursor-pointer transition hover:text-[#7A2E22]">
            About
          </li>
        </ul>

        <div className="flex w-1/3 justify-end">
          <Button
            size="lg"
            className="rounded-xl bg-[#9E3B2E] p-2 text-white transition hover:bg-[#7a2e22]"
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
