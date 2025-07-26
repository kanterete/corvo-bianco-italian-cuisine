import React from 'react'
import Card from './Card'

const Cards = () => {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card />
      <Card />
      <Card />
    </div>
  )
}

export default Cards
