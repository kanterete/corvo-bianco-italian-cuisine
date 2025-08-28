'use client'
import React from 'react'
import Menu from '@/components/Menu'
import { useDishes } from '@/context/DishesContext'

export default function Order() {
  const { isLoadingGlobal, error } = useDishes()

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex h-fit flex-col items-center justify-center">
        {isLoadingGlobal ? (
          <p>loading dishes....</p>
        ) : error ? (
          <p className="text-lg text-gray-500">{error}</p>
        ) : (
          <Menu />
        )}
      </div>
    </section>
  )
}
