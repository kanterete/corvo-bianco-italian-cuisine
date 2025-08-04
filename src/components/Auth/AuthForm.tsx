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
import { toast } from 'sonner'

export default function AuthForm() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [open, setOpen] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let res
    if (isLogin) {
      res = await supabase.auth.signInWithPassword({
        email: mail,
        password: password,
      })
    } else {
      res = await supabase.auth.signUp({
        email: mail,
        password: password,
      })
    }

    if (res.error) {
      toast.error(res.error.message)
      return
    }

    setOpen(false)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ScanFace
          size={28}
          className="rounded-lg bg-[#9E3B2E] p-0.5 text-white transition hover:bg-[#7a2e22]"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isLogin ? 'Log into your account' : 'Create an account'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col items-stretch gap-2">
            <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Login'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
