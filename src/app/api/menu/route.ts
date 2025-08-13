import { Category, Dish } from '@/types/types'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: categories, error: categoryError } = await supabase
    .from('categories')
    .select()
    .overrideTypes<Category[]>()

  const { data: dishes, error: dishError } = await supabase
    .from('dishes')
    .select('*')
    .overrideTypes<Dish[]>()

  if (categoryError || dishError) {
    return NextResponse.json(
      { message: 'Error downloading data' },
      { status: 500 },
    )
  }
  return NextResponse.json({ categories, dishes })
}
