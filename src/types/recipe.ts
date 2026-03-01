export type IngredientUnit = 'piece' | 'grams' | 'tablespoon' | 'teaspoon' | 'pinch'

export interface Ingredient {
  name: string
  quantity: number
  unit: IngredientUnit
}

export interface Recipe {
  id: string
  title: string
  description: string | null
  ingredients: Ingredient[]
  calories: number | null
  created_at: string
}

export type RecipeInsert = Omit<Recipe, 'id' | 'created_at'>
export type RecipeUpdate = Partial<Omit<Recipe, 'id' | 'created_at'>>
