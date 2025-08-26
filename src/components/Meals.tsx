'use client'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { useDishes } from '@/hooks/useDishes'
import EditDishDialog from './Modals/EditDishDialog'

type MealsProps = {
  selectedCategory: number
}

const Meals = ({ selectedCategory }: MealsProps) => {
  const { addToCart } = useCart()
  const { isAdmin } = useAuth()
  const { dishes, removeDish, isLoading } = useDishes()

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category_id === selectedCategory)
    : dishes

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {isLoading ? (
        <p className="text-lg text-gray-500">Loading dishes...</p>
      ) : filteredDishes.length > 0 ? (
        filteredDishes.map((dish) => (
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
              <div className="absolute top-1 right-1 flex gap-2">
                <EditDishDialog dish={dish} />
                <button
                  onClick={() => removeDish(dish.id!)}
                  className="cursor-pointer rounded-xl bg-[#9E3B2E] p-1 text-white hover:bg-[#7a2e22]"
                >
                  <Trash2 size={20} />
                </button>
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
        ))
      ) : (
        <p className="text-lg text-gray-500">No dishes found</p>
      )}
    </section>
  )
}

export default Meals
