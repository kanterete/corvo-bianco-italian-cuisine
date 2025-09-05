'use client'
import type { CartItem } from '@/types/types'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'

type CartItemProps = {
  item: CartItem
}

const CartItem = ({ item }: CartItemProps) => {
  const { adjustQuantity } = useCart()
  return (
    <div className="mx-auto mb-4 flex w-full justify-between rounded-xl bg-gray-100 px-4 shadow-lg">
      <div className="flex items-center">
        <img
          src={item.image_url}
          alt={item.name}
          className="size-16 rounded-xl object-cover"
        />
        <div className="ml-4">
          <p className="font-semibold uppercase">{item.name}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 shrink-0 rounded-full"
            onClick={() => adjustQuantity(item.id!, -1)}
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-xl font-bold tracking-tighter">
              {item.quantity}
            </div>
            <div className="text-muted-foreground text-[0.70rem] uppercase">
              quantity
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 shrink-0 rounded-full"
            onClick={() => adjustQuantity(item.id!, 1)}
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
          x<span className="font-semibold">{item.price} zł</span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
