import React from 'react'
import Cards from './Cards/Cards'

const Featured = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex h-fit flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-semibold text-[#7A2E22]">
          Featured Dishes
        </h1>
        <Cards />
      </div>
    </section>
  )
}

export default Featured
