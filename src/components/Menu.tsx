'use client'
import React, { useState } from 'react'
import Meals from '@/components/Meals'
import { Category, Dish } from '@/types/types'
import { useAuth } from '@/context/AuthContext'
import { PlusIcon } from 'lucide-react'
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
import { toast } from 'sonner'
import { DialogDescription } from '@radix-ui/react-dialog'

type MenuProps = {
  categories: Category[]
  dishes: Dish[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export default function Menu({ categories, dishes, setCategories }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [categoryName, setCategoryName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isAdmin } = useAuth()

  const filteredDishes = selectedCategory
    ? dishes.filter((dish) => dish.category_id === selectedCategory)
    : dishes

  const handleCategoryClick = (id: number) => {
    if (selectedCategory === id) {
      setSelectedCategory(0)
    } else setSelectedCategory(id)
  }

  const addCategory = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      })

      if (!res.ok) {
        toast.error('Error adding category')
        return
      }

      const newCategories = await res.json()
      setCategories((prev) => [...prev, ...newCategories[0]])

      toast.success('Category added')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h2 className="mb-8 text-4xl font-semibold text-[#7A2E22]">Our Dishes</h2>
      <ul className="mx-2 mb-8 flex flex-wrap gap-2">
        {categories ? (
          categories.map((category: Category) => (
            <li
              className={`rounded-xl px-2 py-2 text-lg font-semibold text-white transition ${
                selectedCategory === category.id
                  ? 'bg-[#7a2e22] hover:bg-[#9E3B2E]'
                  : 'bg-[#9E3B2E] hover:bg-[#7a2e22]'
              }`}
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </li>
          ))
        ) : (
          <p className="text-lg text-gray-500">No categories found</p>
        )}
        {isAdmin && (
          <li className="rounded-xl border border-dashed border-[#7a2e22] px-2 py-2 text-lg font-semibold text-black transition hover:bg-[#7a2e22] hover:text-white">
            <Dialog>
              <DialogTrigger
                disabled={isLoading}
                className="flex items-center justify-between gap-2"
              >
                {isLoading ? (
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
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-end">
                  <Button type="button" onClick={addCategory}>
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
          </li>
        )}
      </ul>

      <Meals dishes={filteredDishes} />
    </>
  )
}
