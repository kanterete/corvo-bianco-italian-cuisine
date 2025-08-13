import { useState } from 'react'
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
import { useAuth } from '@/context/AuthContext'

export default function RegisterForm() {
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [open, setOpen] = useState(false)
  const { signUp } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    signUp(mail, password)
    setOpen(false)
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
