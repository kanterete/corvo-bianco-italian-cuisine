import { requireAdmin } from '@/utils/requireAdmin'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const supabase = await createClient()
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json(
      {
        error: 'Category name is required',
      },
      {
        status: 400,
      },
    )
  }

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name }])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
