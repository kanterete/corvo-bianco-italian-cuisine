import { CartItem } from '@/types/types'
import React from 'react'

type CartItemProps = {
  item: CartItem
}

const CartItem = ({ item }: CartItemProps) => {
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
        <p className="">
          {item.quantity} x{' '}
          <span className="font-semibold">{item.price} zł</span>
        </p>
      </div>
    </div>
  )
}

export default CartItem
