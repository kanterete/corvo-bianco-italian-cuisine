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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useDishes } from '@/context/DishesContext'
import { PlusIcon } from 'lucide-react'

const wait = () => new Promise((res) => setTimeout(res, 1000))

const AddDishDialog = () => {
  const [dishName, setDishName] = useState('')
  const [dishPrice, setDishPrice] = useState<number>()
  const [dishDescription, setDishDescription] = useState('')
  const [dishPrepTime, setDishPrepTime] = useState<number>()
  const [dishPhoto, setDishPhoto] = useState('')
  const [dishCategory, setDishCategory] = useState<number>()

  const { isLoadingGlobal, addDish, categories } = useDishes()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog modal>
        <DialogTrigger
          disabled={isLoadingGlobal}
          className="flex items-center justify-between gap-2 rounded-xl bg-[#9E3B2E] px-2 py-2 text-lg font-semibold text-white transition hover:bg-[#7a2e22]"
        >
          {isLoadingGlobal ? (
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
                placeholder="Name"
                onChange={(e) => setDishName(e.target.value)}
              />

              <Label htmlFor="dishCategory">Dish category</Label>
              <Select
                value={String(dishCategory)}
                onValueChange={(val) => setDishCategory(Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="desc">Dish short description</Label>
              <Input
                id="desc"
                value={dishDescription}
                placeholder="Tasty chicken with..."
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
                placeholder="https://"
                onChange={(e) => setDishPhoto(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              onClick={() => {
                wait().then(() => setOpen(false))

                addDish({
                  name: dishName,
                  description: dishDescription,
                  category_id: dishCategory,
                  price: dishPrice!,
                  prep_time_minutes: dishPrepTime!,
                  image_url: dishPhoto,
                  available: true,
                })
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

export default AddDishDialog
