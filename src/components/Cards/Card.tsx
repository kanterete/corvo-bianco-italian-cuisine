import React from 'react'

const Card = () => {
  return (
    <div className="flex h-fit w-64 flex-col rounded-xl">
      <img
        src="https://www.allrecipes.com/thmb/jiV_4f8vXFle1RdFLgd8-_31J3M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229960-shrimp-scampi-with-pasta-DDMFS-4x3-e065ddef4e6d44479d37b4523808cc23.jpg"
        alt="shrimps"
        className="mb-2 rounded-xl object-cover"
      />
      <div className="p-2 text-center">
        <h1 className="mb-2 text-xl font-semibold text-[#7A2E22]">
          Shrimp Pasta
        </h1>
        <p className="text-sm">
          Shrimp scampi with linguine is the ultimate seafood pasta dish," says
          recipe creator JustJen. "Works with any pasta; angel hair is less
          filling
        </p>
      </div>
    </div>
  )
}

export default Card
