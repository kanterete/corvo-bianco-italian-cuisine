'use client'
import React, { useEffect, useState } from 'react'
import Menu from '@/components/Menu'
import { Category, Dish } from '@/types/types'
import { Skeleton } from '@/components/ui/skeleton'

export default function Order() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getMenu = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/menu')
        if (!res.ok) throw new Error('Error downloading menu')
        const data = await res.json()

        setCategories(data.categories)
        setDishes(data.dishes)

        if (data.errors?.categoryError || data.errors?.dishError) {
          setError("Data wasn't fully downloaded")
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getMenu()
  }, [])

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex h-fit flex-col items-center justify-center">
        {isLoading ? (
          <p>loading dishes....</p>
        ) : error ? (
          <p className="text-lg text-gray-500">{error}</p>
        ) : (
          <Menu categories={categories} dishes={dishes} />
        )}
      </div>
    </section>
  )
}
