'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingCart, Trash, X } from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useCart } from '@/context/CartContext'
import CartItem from './CartItem'

const CartDrawer = () => {
  const { cart, clearCart, getTotal, getCartLength } = useCart()
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative rounded-xl bg-[#9E3B2E] p-3 text-white transition hover:bg-[#7a2e22]">
          <p className="absolute top-0 right-1 rounded-4xl text-sm font-semibold">
            {getCartLength() > 0 ? getCartLength() : ''}
          </p>
          <ShoppingCart size={20} />
        </div>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your Shopping List</DrawerTitle>
        </DrawerHeader>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <div className="mx-4">
          <p>
            You have <span className="font-semibold">{cart.length}</span>{' '}
            {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
          <p>
            <span className="font-semibold">Total:</span> {getTotal()} zł
          </p>
        </div>
        <DrawerFooter>
          <Button>
            Payment <ArrowRight />
          </Button>

          <div className="justify-end">
            <Button onClick={clearCart}>
              Clear Cart <Trash />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
