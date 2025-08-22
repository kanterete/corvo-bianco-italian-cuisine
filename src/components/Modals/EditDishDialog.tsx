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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { SquarePen } from 'lucide-react'
import { Dish } from '@/types/types'
import { useDishes } from '@/hooks/useDishes'

type EditDishDialogProps = {
  dish: Dish
}

const EditDishDialog = ({ dish }: EditDishDialogProps) => {
  const [dishName, setDishName] = useState(dish.name)
  const [dishPrice, setDishPrice] = useState<number>(dish.price)
  const [dishDescription, setDishDescription] = useState(dish.description)
  const [dishPrepTime, setDishPrepTime] = useState<number>(
    dish.prep_time_minutes,
  )
  const [dishPhoto, setDishPhoto] = useState(dish.image_url)
  const [dishCategory, setDishCategory] = useState<number>(dish.category_id!)

  const { dishes, categories } = useDishes()

  const dishCategoryName = dishes.find(
    (dish) => dish.category_id === dishCategory,
  )
  return (
    <div className="cursor-pointer rounded-xl bg-[#9E3B2E] p-1 text-white hover:bg-[#7a2e22]">
      <Dialog modal>
        <DialogTrigger className="flex items-center justify-between gap-2">
          <SquarePen size={20} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dish</DialogTitle>
            <DialogDescription>
              Edit here a <span className="font-bold">{dishName}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="dishName">Dish name</Label>
              <Input
                id="dishName"
                placeholder="Name"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
              />

              <Label htmlFor="dishCategory">Dish category</Label>
              <Select
                value={String(dish.category_id)}
                onValueChange={(val) => setDishCategory(Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
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
            <Button type="button">Add</Button>
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

export default EditDishDialog
