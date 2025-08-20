'use client'
import React, { useState } from 'react'
import Meals from '@/components/Meals'
import { Category, Dish } from '@/types/types'
import { useAuth } from '@/context/AuthContext'
import { PlusIcon, Trash2 } from 'lucide-react'
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
import { error } from 'console'

type MenuProps = {
  categories: Category[]
  dishes: Dish[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>
}

export default function Menu({
  categories,
  dishes,
  setCategories,
  setDishes,
}: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>()
  const [categoryName, setCategoryName] = useState('')

  const [dishName, setDishName] = useState('')
  const [dishPrice, setDishPrice] = useState<number>(0)
  const [dishDescription, setDishDescription] = useState('')
  const [dishPrepTime, setDishPrepTime] = useState<number>(0)
  const [dishPhoto, setDishPhoto] = useState('')

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

  const addDish = async () => {
    setIsLoading(true)
    try {
      const newDish = {
        name: dishName,
        description: dishDescription,
        price: dishPrice,
        prep_time_minutes: dishPrepTime,
        image_url: dishPhoto,
        available: true,
      }
      const res = await fetch('/api/admin/dishes', {
        method: 'POST',
        body: JSON.stringify(newDish),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.message || 'Error adding dish')
        return
      }

      const savedDish = await res.json()
      console.log('savedDish:', savedDish)
      setDishes((prev) => [...prev, savedDish])
      toast.success('Dish added')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
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
      setCategories((prev) => [...prev, ...newCategories])

      toast.success('Category added')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  const removeCategory = async (id: number) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        toast.error('Deleting failed')
        return
      }

      setCategories((prev) => prev.filter((cat) => cat.id !== id))
      toast.success('Category deleted')
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
              className={`flex items-center gap-2 rounded-xl px-2 py-2 text-lg font-semibold text-white transition ${
                selectedCategory === category.id
                  ? 'bg-[#7a2e22] hover:bg-[#9E3B2E]'
                  : 'bg-[#9E3B2E] hover:bg-[#7a2e22]'
              }`}
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}{' '}
              <Trash2 onClick={() => removeCategory(category.id)} size={16} />
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
                      value={categoryName}
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
                  Add dish <PlusIcon size={16} />
                </>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Dish</DialogTitle>
                <DialogDescription>Add here a dish</DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="dishName">Dish name</Label>
                  <Input
                    id="dishName"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                  />
                  <Label htmlFor="desc">Dish short description</Label>
                  <Input
                    id="desc"
                    value={dishDescription}
                    onChange={(e) => setDishDescription(e.target.value)}
                  />
                  <Label htmlFor="price">Dish price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={dishPrice}
                    onChange={(e) => setDishPrice(Number(e.target.value))}
                  />
                  <Label htmlFor="prepTime">Dish prep time</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    value={dishPrepTime}
                    onChange={(e) => setDishPrepTime(Number(e.target.value))}
                  />
                  <Label htmlFor="url">Dish url</Label>
                  <Input
                    id="url"
                    type="text"
                    value={dishPhoto}
                    onChange={(e) => setDishPhoto(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-end">
                <Button type="button" onClick={addDish}>
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
      </ul>

      <Meals dishes={filteredDishes} setDishes={setDishes} />
    </>
  )
}
