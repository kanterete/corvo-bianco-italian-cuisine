'use client'

import { CartItem, Dish } from '@/types/types'
import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'sonner'

type CartContextType = {
  cart: CartItem[]
  setCart: (items: CartItem[]) => void
  addToCart: (dish: Dish) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  const removeFromCart = (id: number) => {
    setCart((cart) => cart.filter((item) => item.id !== id))
  }

  const addToCart = (dish: Dish) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === dish.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prev, { ...dish, quantity: 1 }]
      }
    })
    toast(dish.name + ' added to cart!')
  }

  return (
    <CartContext.Provider
      value={{ cart, setCart, clearCart, removeFromCart, addToCart, getTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
