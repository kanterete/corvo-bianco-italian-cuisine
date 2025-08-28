'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useDishes } from '@/context/DishesContext'
import { PlusIcon } from 'lucide-react'

const wait = () => new Promise((res) => setTimeout(res, 1000))

const AddCategoryDialog = () => {
  const [categoryName, setCategoryName] = useState('')
  const [open, setOpen] = useState(false)
  const { isLoadingGlobal, addCategory } = useDishes()

  return (
    <>
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogTrigger
          disabled={isLoadingGlobal}
          className="flex items-center justify-between gap-2 rounded-xl bg-[#9E3B2E] px-2 py-2 text-lg font-semibold text-white transition hover:bg-[#7a2e22]"
        >
          {isLoadingGlobal ? (
            'Adding...'
          ) : (
            <>
              Add category <PlusIcon size={16} />
            </>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Category name</DialogTitle>
            <DialogDescription>Add here a category!</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="name" className="sr-only">
                name
              </Label>
              <Input
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              onClick={() => {
                wait().then(() => setOpen(false))
                addCategory(categoryName)
              }}
            >
              Add
            </Button>
            <DialogClose asChild className="flex gap-2">
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddCategoryDialog
