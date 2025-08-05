'use client'
import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AuthBadge() {
  const { user, signOut } = useAuth()

  return (
    <>
      {user ? (
        <div className="flex flex-row gap-2 text-sm font-semibold text-[#7A2E22]">
          logged as: {user.email}
          <button>
            <LogOut onClick={signOut} />
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">You're not logged in</div>
      )}
    </>
  )
}
