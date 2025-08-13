'use client'
import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function AuthBadge() {
  const { user, signOut, isAdmin } = useAuth()

  return (
    <>
      {user && (
        <div className="flex flex-row gap-2 text-sm font-semibold text-[#7A2E22]">
          {user && <span>logged as: {user.email}</span>}
          {isAdmin ? <span>Admin</span> : <span>User</span>}

          <button>
            <LogOut onClick={signOut} />
          </button>
        </div>
      )}
    </>
  )
}
