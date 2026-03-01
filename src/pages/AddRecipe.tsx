import { useNavigate } from 'react-router-dom'
import { RecipeForm } from '../components/RecipeForm'
import { supabase } from '../lib/supabase'
import type { IngredientUnit } from '../types/recipe'

export function AddRecipe() {
  const navigate = useNavigate()

  async function handleSubmit(data: {
    title: string
    description: string
    ingredients: { name: string; quantity: number; unit: IngredientUnit }[]
    calories: number | null
  }) {
    const { error } = await supabase.from('recipes').insert({
      title: data.title,
      description: data.description || null,
      ingredients: data.ingredients,
      calories: data.calories,
    })
    if (error) throw error
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Dodaj przepis</h1>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Zapisz przepis" />
    </div>
  )
}
