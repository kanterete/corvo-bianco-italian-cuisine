'use client'
import React, { useEffect, useState } from 'react'
import Menu from '@/components/Menu'
import { useDishes } from '@/hooks/useDishes'

export default function Order() {
  const { isLoading, error } = useDishes()

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex h-fit flex-col items-center justify-center">
        {isLoading ? (
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
