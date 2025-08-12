'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type Profile = {
  id: string
  email?: string
  role?: string
}

export default function ProfilesList() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchProfiles = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: myProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (myProfile?.role === 'admin') {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, email, role')

        if (!error && data) setProfiles(data)
      }
    }

    fetchProfiles()
  }, [])

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">User role list</h2>
      {profiles.length === 0 && <p>No data</p>}
      <ul>
        {profiles.map((p) => (
          <li key={p.id}>
            {p.email} – {p.role}
          </li>
        ))}
      </ul>
    </div>
  )
}
