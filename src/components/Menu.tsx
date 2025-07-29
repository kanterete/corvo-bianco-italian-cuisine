'use client'

import React, { useState } from 'react'
import Meals from '@/components/Meals'
import { Category, Dish } from '@/types/types'

type MenuProps = {
  categories: Category[]
  dishes: Dish[]
}

export default function Menu({ categories, dishes }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>()

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category_id === selectedCategory)
    : dishes

  const handleCategoryClick = (id: number) => {
    if (selectedCategory === id) {
      setSelectedCategory(0)
    } else setSelectedCategory(id)
  }

  return (
    <>
      <h2 className="mb-8 text-4xl font-semibold text-[#7A2E22]">Our Dishes</h2>

      <ul className="mx-2 mb-8 flex flex-wrap gap-2">
        {categories ? (
          categories.map((category: Category) => (
            <li
              className={`rounded-xl px-2 py-2 text-lg font-semibold text-white transition ${
                selectedCategory === category.id
                  ? 'bg-[#7a2e22] hover:bg-[#9E3B2E]'
                  : 'bg-[#9E3B2E] hover:bg-[#7a2e22]'
              }`}
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))
        ) : (
          <p className="text-lg text-gray-500">No categories found</p>
        )}
      </ul>

      <Meals dishes={filteredDishes} />
    </>
  )
}
