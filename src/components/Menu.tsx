'use client'
import React, { useEffect, useState } from 'react'
import Meals from '@/components/Meals'
import { Category, Dish } from '@/types/types'
import { useAuth } from '@/context/AuthContext'
import { Edit, Trash2 } from 'lucide-react'
import { useDishes } from '@/hooks/useDishes'
import AddCategoryDialog from './Modals/AddCategoryDialog'
import AddDishDialog from './Modals/AddDishDialog'
import EditCategoryDialog from './Modals/EditCategoryDialog'

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)

  const { categories, removeCategory, addCategory, addDish } = useDishes()
  const { isAdmin } = useAuth()

  const handleCategoryClick = (id: number) => {
    if (selectedCategory === id) {
      setSelectedCategory(0)
    } else setSelectedCategory(id)
  }

  return (
    <>
      <div className="mb-6 flex flex-col flex-wrap items-center justify-center gap-2">
        <h2 className="mb-8 text-4xl font-semibold text-[#7A2E22]">
          Our Dishes
        </h2>
        <ul className="mx-2 mb-8 flex flex-wrap gap-2">
          {categories ? (
            categories.map((category: Category) => (
              <li
                className={`flex items-center justify-between gap-2 rounded-xl px-2 py-2 text-lg font-semibold text-white transition ${
                  selectedCategory === category.id
                    ? 'bg-[#7a2e22] hover:bg-[#9E3B2E]'
                    : 'bg-[#9E3B2E] hover:bg-[#7a2e22]'
                }`}
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="cursor-pointer">{category.name}</span>

                {isAdmin && (
                  <>
                    <EditCategoryDialog category={category} />

                    <button
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeCategory(category.id)
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="text-lg text-gray-500">No categories found</p>
          )}
        </ul>
      </div>

      {isAdmin && (
        <div className="mb-6 flex gap-4">
          <AddCategoryDialog addCategory={addCategory} />
          <AddDishDialog addDish={addDish} categories={categories} />
        </div>
      )}

      <Meals selectedCategory={selectedCategory} />
    </>
  )
}
