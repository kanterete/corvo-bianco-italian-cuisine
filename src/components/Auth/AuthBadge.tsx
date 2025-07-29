import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { LogOut } from 'lucide-react'

export default async function AuthBadge() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      {user ? (
        <div className="text-sm font-semibold text-[#7A2E22]">
          Zalogowany jako: {user.email}
          <button>
            <LogOut />
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Nie jesteś zalogowany</div>
      )}
    </>
  )
}
