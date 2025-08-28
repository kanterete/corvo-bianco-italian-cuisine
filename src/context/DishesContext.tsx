'use client'

import { Category, Dish } from '@/types/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

type DishesContextType = {
  categories: Category[]
  dishes: Dish[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
  setDishes: React.Dispatch<React.SetStateAction<Dish[]>>
  addCategory: (name: string) => Promise<void>
  addDish: (dish: Dish) => Promise<void>
  removeCategory: (id: number) => Promise<void>
  removeDish: (id: number) => Promise<void>
  updateCategory: (id: number, name: string) => Promise<void>
  updateDish: (id: number, dish: Dish) => Promise<void>
  isLoadingGlobal: boolean
  error: string | null
}

const DishesContext = createContext<DishesContextType | undefined>(undefined)

export function DishesProvider({ children }: { children: React.ReactNode }) {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addDish = async (dish: Dish) => {
    setIsLoadingGlobal(true)
    try {
      const res = await fetch('/api/admin/dishes', {
        method: 'POST',
        body: JSON.stringify(dish),
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
      setIsLoadingGlobal(false)
    }
  }

  const addCategory = async (name: string) => {
    setIsLoadingGlobal(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.message || 'Error adding category')
        return
      }

      const newCategories = await res.json()
      setCategories((prev) => [...prev, ...newCategories])

      toast.success('Category added')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoadingGlobal(false)
    }
  }
  const removeCategory = async (id: number) => {
    setIsLoadingGlobal(true)
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
      setIsLoadingGlobal(false)
    }
  }

  const removeDish = async (id: number) => {
    setIsLoadingGlobal(true)
    try {
      const res = await fetch(`/api/admin/dishes/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const error = await res.json().catch(() => {})
        toast.error(error.message || 'Error removing a dish')
        return
      }

      setDishes((prev) => prev.filter((dish) => dish.id !== id))
      toast.success('Dish removed')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoadingGlobal(false)
    }
  }

  const updateDish = async (id: number, updatedDish: Dish) => {
    setIsLoadingGlobal(true)
    try {
      const res = await fetch(`api/admin/dishes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDish),
      })
      if (!res.ok) {
        const error = await res.json().catch(() => {})
        toast.error(error.message || 'Error updating a dish')
        return
      }

      const newDishes = await res.json()
      setDishes((prev) =>
        prev.map((d) => (d.id === newDishes.id ? newDishes : d)),
      )

      toast.success('Dish updated')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoadingGlobal(false)
    }
  }

  const updateCategory = async (id: number, name: string) => {
    setIsLoadingGlobal(true)
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const error = await res.json()
        toast.error(error.message || 'Error updating a category')
        return
      }

      const newCat = await res.json()
      setCategories((prev) =>
        prev.map((cat) => (cat.id === newCat.id ? newCat : cat)),
      )
      toast.success('Category updated')
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoadingGlobal(false)
    }
  }

  useEffect(() => {
    const getMenu = async () => {
      setIsLoadingGlobal(true)
      setError(null)
      try {
        const res = await fetch('/api/restaurantMenu')
        if (!res.ok) throw new Error('Error downloading menu')

        const data = await res.json()

        setCategories(data.categories)
        setDishes(data.dishes)

        if (data.errors?.categoryError || data.errors?.dishError) {
          setError("Data wasn't fully downloaded")
        }
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoadingGlobal(false)
      }
    }

    getMenu()
  }, [])

  return (
    <DishesContext.Provider
      value={{
        categories,
        setCategories,
        dishes,
        setDishes,
        addCategory,
        addDish,
        removeCategory,
        removeDish,
        updateDish,
        updateCategory,
        isLoadingGlobal,
        error,
      }}
    >
      {children}
    </DishesContext.Provider>
  )
}

export function useDishes() {
  const ctx = useContext(DishesContext)
  if (!ctx) throw new Error('useDishes must be used within DishesProvider')
  return ctx
}
