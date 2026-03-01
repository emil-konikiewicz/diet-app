import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RecipeForm } from '../components/RecipeForm'
import { supabase } from '../lib/supabase'
import type { Recipe, IngredientUnit } from '../types/recipe'

export function EditRecipe() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    async function fetchRecipe() {
      try {
        const { data, error: err } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .single()
        if (err) throw err
        setRecipe(data as Recipe)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Nie udało się załadować przepisu')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipe()
  }, [id])

  async function handleSubmit(data: {
    title: string
    description: string
    ingredients: { name: string; quantity: number; unit: IngredientUnit }[]
    calories: number | null
  }) {
    if (!id) return
    const { error: err } = await supabase
      .from('recipes')
      .update({
        title: data.title,
        description: data.description || null,
        ingredients: data.ingredients,
        calories: data.calories,
      })
      .eq('id', id)
    if (err) throw err
    navigate('/')
  }

  async function handleDelete() {
    if (!id) return
    if (!window.confirm('Usunąć ten przepis?')) return
    const { error: err } = await supabase.from('recipes').delete().eq('id', id)
    if (err) throw err
    navigate('/')
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-gray-500">Ładowanie…</p>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p>{error ?? 'Nie znaleziono przepisu'}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-2 text-sm font-medium text-blue-600 hover:underline"
        >
          Wróć do listy
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Edytuj przepis</h1>
        <button
          type="button"
          onClick={handleDelete}
          className="tap-target flex items-center justify-center rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-xl font-medium text-red-700 hover:bg-red-100"
          aria-label="Usuń przepis"
        >
          ×
        </button>
      </div>
      <RecipeForm
        initial={recipe}
        onSubmit={handleSubmit}
        submitLabel="Zaktualizuj przepis"
      />
    </div>
  )
}
