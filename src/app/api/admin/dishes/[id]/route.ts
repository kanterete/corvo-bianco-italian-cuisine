import { requireAdmin } from '@/utils/requireAdmin'
import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } },
) {
  const adminCheck = await requireAdmin()
  if (!adminCheck.ok) return adminCheck.response

  const supabase = await createClient()
  const { error } = await supabase.from('dishes').delete().eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
