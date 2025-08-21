'use client'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Dish } from '@/types/types'
import { SquarePen, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
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
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useDishes } from '@/hooks/useDishes'

type MealsProps = {
  dishes: Dish[]
}

const Meals = ({ dishes }: MealsProps) => {
  const { addToCart } = useCart()
  const { isAdmin } = useAuth()
  const { removeDish, isLoading } = useDishes()

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className="relative h-fit w-72 rounded-md text-black shadow-lg"
        >
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full rounded-t-lg object-contain shadow-md"
          />
          {isAdmin && (
            <div className="absolute top-1 right-1 flex gap-2">
              <div className="cursor-pointer rounded-xl bg-[#9E3B2E] p-1 text-white">
                <Dialog>
                  <DialogTrigger
                    disabled={isLoading}
                    className="flex items-center justify-between gap-2"
                  >
                    {isLoading ? (
                      'Adding...'
                    ) : (
                      <>
                        <SquarePen size={20} />
                      </>
                    )}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Dish</DialogTitle>
                      <DialogDescription>Edit here a dish</DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center gap-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="dishName">Dish name</Label>
                        <Input id="dishName" placeholder="Name" />

                        <Label htmlFor="dishCategory">Dish category</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent></SelectContent>
                        </Select>

                        <Label htmlFor="desc">Dish short description</Label>
                        <Input id="desc" placeholder="Tasty chicken with..." />
                        <Label htmlFor="price">Dish price</Label>
                        <Input id="price" type="number" />
                        <Label htmlFor="prepTime">Dish prep time</Label>
                        <Input id="prepTime" type="number" />
                        <Label htmlFor="url">Dish url</Label>
                        <Input id="url" type="text" placeholder="https://" />
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
              <div
                onClick={() => removeDish(dish.id!)}
                className="cursor-pointer rounded-xl bg-[#9E3B2E] p-1 text-white"
              >
                <Trash2 size={20} />
              </div>
            </div>
          )}

          <div className="p-4">
            <h2 className="mb-4 text-2xl font-semibold uppercase">
              {dish.name}
            </h2>
            <p className="text-md mb-4 text-gray-800">{dish.description}</p>
            <div className="flex justify-between">
              <p className="font-semibold">Price</p>
              <p className="font-semibold">{dish.price} zł</p>
            </div>
            <p className="font-bold">{dish.available}</p>
            <div className="mb-4 flex items-center gap-2 text-sm italic">
              <p>Prep time: </p>
              <p>{dish.prep_time_minutes} min</p>
            </div>

            <button
              className="rounded-xl bg-[#9E3B2E] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#7a2e22]"
              onClick={() => addToCart(dish)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Meals
