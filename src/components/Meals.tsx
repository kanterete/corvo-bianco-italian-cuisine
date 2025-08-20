'use client'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Dish } from '@/types/types'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type MealsProps = {
  dishes: Dish[]
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>
}

const Meals = ({ dishes, setDishes }: MealsProps) => {
  const { addToCart } = useCart()
  const { isAdmin } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const removeDish = async (id: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/dishes/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const error = await res.json().catch(() => {})
        toast.error(error.message || 'Error removing a dish')
        return
      }

      setDishes((prev) => prev.filter((dish) => dish.id !== id))
      toast.success('Dish removed')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="relative h-fit w-72 rounded-md text-black shadow-lg"
        >
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full rounded-t-lg object-contain shadow-md"
          />
          {isAdmin && (
            <div
              onClick={() => removeDish(dish.id)}
              className="absolute top-1 right-1 cursor-pointer rounded-xl bg-[#9E3B2E] p-1 text-white"
            >
              <Trash2 size={24} />
            </div>
          )}

          <div className="p-4">
            <h2 className="mb-4 text-2xl font-semibold uppercase">
              {dish.name}
            </h2>
            <p className="text-md mb-4 text-gray-800">{dish.description}</p>
            <div className="flex justify-between">
              <p className="font-semibold">Price</p>
              <p className="font-semibold">{dish.price} zł</p>
            </div>
            <p className="font-bold">{dish.available}</p>
            <div className="mb-4 flex items-center gap-2 text-sm italic">
              <p>Prep time: </p>
              <p>{dish.prep_time_minutes} min</p>
            </div>

            <button
              className="rounded-xl bg-[#9E3B2E] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#7a2e22]"
              onClick={() => addToCart(dish)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Meals
