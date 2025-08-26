import { requireAdmin } from '@/utils/requireAdmin'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const { id } = await params

  const supabase = await createClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', Number(id))

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const supabase = await createClient()

  const { id } = await params
  const { name } = await req.json()

  const { data, error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', Number(id))
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, success: true }, { status: 201 })
}
