'use client'
import React, { useState } from 'react'
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
import { Button } from '../ui/button'

import { SquarePen } from 'lucide-react'
import { Category } from '@/types/types'
import { useDishes } from '@/context/DishesContext'

type EditCategoryDialogProps = {
  category: Category
}

const wait = () => new Promise((res) => setTimeout(res, 1000))

export default function EditCategoryDialog({
  category,
}: EditCategoryDialogProps) {
  {
    const [categoryName, setCategoryName] = useState(category.name)
    const [open, setOpen] = useState(false)
    const { updateCategory } = useDishes()

    return (
      <div className="cursor-pointer rounded-xl bg-[#9E3B2E] p-1 text-white hover:bg-[#7a2e22]">
        <Dialog modal open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex items-center justify-between gap-2">
            <SquarePen size={16} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Category</DialogTitle>
              <DialogDescription>Edit here a category</DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="categoryName">Category name</Label>
                <Input
                  id="categoryName"
                  placeholder="Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  wait().then(() => setOpen(false))
                  updateCategory(category.id, categoryName)
                }}
              >
                Save
              </Button>
              <DialogClose asChild className="flex gap-2">
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
