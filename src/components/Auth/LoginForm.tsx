'use client'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ScanFace } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginForm() {
  const supabase = createClient()

  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async (e: React.FormEvent) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: mail,
      password: password,
    })
    window.location.reload()
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <ScanFace
            size={28}
            className="rounded-lg bg-[#9E3B2E] p-0.5 text-white transition hover:bg-[#7a2e22]"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log into your account</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="mail">Name</Label>
              <Input
                id="mail"
                name="mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleLogin}>
              Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
