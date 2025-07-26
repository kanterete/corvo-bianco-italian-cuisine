import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import React from 'react'
import Meals from '@/components/Meals'
import { Category, Dish } from '@/types/types'

export default async function Order() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: categories, error: categoryError } = await (await supabase)
    .from('categories')
    .select()

  const { data: dishes, error: dishError } = await (await supabase)
    .from('dishes')
    .select('*')

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex h-fit flex-col items-center justify-center">
        <h2 className="mb-8 text-4xl font-semibold text-[#7A2E22]">
          Our Dishes
        </h2>

        <ul className="mx-2 mb-8 flex flex-wrap gap-2">
          {!categoryError && categories ? (
            categories.map((category: Category) => (
              <li
                className="rounded-xl bg-[#9E3B2E] px-2 py-2 text-lg font-semibold text-white transition hover:bg-[#7a2e22]"
                key={category.id}
              >
                {category.name}
              </li>
            ))
          ) : (
            <p className="text-lg text-gray-500">No categories found</p>
          )}
        </ul>

        {!dishError && dishes ? (
          <Meals dishes={dishes} />
        ) : (
          <p className="text-lg text-gray-500">No dishes found</p>
        )}
      </div>
    </section>
  )
}
