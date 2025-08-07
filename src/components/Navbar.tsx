'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import CartDrawer from './Cart/CartDrawer'
import AuthBadge from './Auth/AuthBadge'
import AuthForm from './Auth/AuthForm'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <header
      className={`md:bg-white" sticky top-0 z-10 overflow-hidden bg-white/80 shadow-sm backdrop-blur-md transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-[72px]'}`}
    >
      <div
        className={`container mx-auto flex items-center justify-between px-4 py-3 ${isOpen && 'flex-col gap-4'}`}
      >
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="text-3xl font-bold text-[#7A2E22]">
            Corvo Bianco
          </Link>
          <div
            className="flex rounded-xl bg-[#9E3B2E] p-3 text-white transition hover:bg-[#7a2e22] md:hidden"
            onClick={handleMenu}
          >
            {!isOpen ? <Menu /> : <X />}
          </div>
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

        {/* mobile menu */}
        {isOpen && (
          <section className="flex flex-col items-center justify-center">
            <ul className="flex-1 items-center justify-center gap-6 text-xl font-semibold text-[#9E3B2E] duration-150 md:hidden">
              <li
                className="cursor-pointer transition hover:text-[#7A2E22]"
                onClick={handleMenu}
              >
                <Link href="/" onClick={handleMenu}>
                  Home
                </Link>
              </li>
              <li className="cursor-pointer transition hover:text-[#7A2E22]">
                <Link href="/order" onClick={handleMenu}>
                  Order
                </Link>
              </li>
              <li className="cursor-pointer transition hover:text-[#7A2E22]">
                <Link href="/About" onClick={handleMenu}>
                  About
                </Link>
              </li>
              <a
                href="#contact"
                className="cursor-pointer transition hover:text-[#7A2E22]"
                onClick={handleMenu}
              >
                Contact
              </a>
            </ul>
            <div className="flex items-center justify-end gap-4">
              <AuthForm />
              <AuthBadge />
              <CartDrawer />
            </div>
          </section>
        )}
      </div>
    </header>
  )
}
