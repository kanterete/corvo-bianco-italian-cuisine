import { requireAdmin } from '@/utils/requireAdmin'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const supabase = await createClient()

  const dish = await req.json()

  if (!dish?.name) {
    return NextResponse.json(
      { error: 'Dish must have a name' },
      {
        status: 400,
      },
    )
  }

  const { data, error } = await supabase.from('dishes').insert([dish]).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data[0])
}
