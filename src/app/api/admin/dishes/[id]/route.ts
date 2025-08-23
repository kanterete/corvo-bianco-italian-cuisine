import { requireAdmin } from '@/utils/requireAdmin'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: number }> },
) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const { id } = await params

  const supabase = await createClient()
  const { error } = await supabase.from('dishes').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: number } },
) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const { id } = params
  const dish = await req.json()

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('dishes')
    .update(dish)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, success: true }, { status: 200 })
}
