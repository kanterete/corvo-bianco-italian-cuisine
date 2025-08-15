import { NextResponse } from 'next/server'
import { createClient } from './supabase/server'

export async function requireAdmin() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 500 },
      ),
    }
  }

  if (profile?.role !== 'admin') {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  return { ok: true }
}
