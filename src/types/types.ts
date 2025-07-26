export interface Dish {
  id: number
  name: string
  description?: string
  price: number
  available: boolean
  image_url: string
  prep_time_minutes: string
  category_id?: number
}

export interface Category {
  id: number
  name: string
  slug: string
}
