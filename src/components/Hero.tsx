import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <img
          src="https://img.chefkoch-cdn.de/rezepte/393031127655461/bilder/1585337/crop-960x720/spaghetti-bolognese.jpg"
          alt="spaghetti"
          className="mb-8 w-full max-w-[600px] rounded-2xl object-cover shadow-lg"
        />
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#7A2E22]">
            AUTHENTIC ITALIAN CUISINE
          </h1>
          <p className="mb-6 text-lg text-[#3E3E3E]">
            Savor the flavors of Italy with our traditional dishes made from the
            freshest ingredients
          </p>
          <Link
            href="/order"
            className="rounded-xl bg-[#9E3B2E] px-6 py-2 text-lg font-semibold text-white transition hover:bg-[#7a2e22]"
          >
            Order
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
