import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-label'
import { Button, Input } from '@heroui/react'
import { ScanFace } from 'lucide-react'

export default function RegisterForm() {
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    const supabase = createClient()

    let { data, error } = await supabase.auth.signUp({
      email: mail,
      password: password,
    })

    if (error) return setError(error.message)

    setOpen(false)
    toast('register successfully')
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <ScanFace
            size={28}
            className="rounded-lg bg-[#9E3B2E] p-0.5 text-white transition hover:bg-[#7a2e22]"
            onClick={() => setOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Signup into your account</DialogTitle>
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
            <Button type="submit" onClick={handleRegister}>
              Signup
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
