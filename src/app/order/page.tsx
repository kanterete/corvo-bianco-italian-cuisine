import React from 'react'
import Menu from '@/components/Menu'
import { Category, Dish } from '@/types/types'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Order() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: categories, error: categoryError } = await supabase
    .from('categories')
    .select()
    .overrideTypes<Category[]>()

  const { data: dishes, error: dishError } = await supabase
    .from('dishes')
    .select('*')
    .overrideTypes<Dish[]>()

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto flex h-fit flex-col items-center justify-center">
        {!categoryError && !dishError ? (
          <Menu categories={categories} dishes={dishes} />
        ) : (
          <p className="text-lg text-gray-500">No dishes found</p>
        )}
      </div>
    </section>
  )
}
