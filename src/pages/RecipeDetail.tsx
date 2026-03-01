import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Recipe, Ingredient, IngredientUnit } from '../types/recipe'

const unitLabels: Record<IngredientUnit, string> = {
  grams: 'gramy',
  piece: 'szt.',
  tablespoon: 'łyżka',
  teaspoon: 'łyżeczka',
  pinch: 'szczypta',
}

function formatIngredient(ing: Ingredient): string {
  const unit = unitLabels[ing.unit]
  if (ing.unit === 'piece' || ing.unit === 'pinch') {
    const qty = ing.quantity
    if (qty === 1) return `${ing.name} (${unit})`
    return `${ing.name} – ${qty} ${unit}`
  }
  return `${ing.name} – ${ing.quantity} ${unit}`
}

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
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
        <Link
          to="/"
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          Wróć do listy
        </Link>
      </div>
    )
  }

  const hasIngredients = recipe.ingredients?.length > 0
  const validIngredients = (recipe.ingredients ?? []).filter((i) => i.name?.trim())

  return (
    <article className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{recipe.title}</h1>
          {recipe.calories != null && (
            <p className="mt-1 text-lg text-gray-600">{recipe.calories} kcal</p>
          )}
        </div>
        <Link
          to={`/recipe/${recipe.id}/edit`}
          className="tap-target flex shrink-0 items-center justify-center rounded-lg bg-blue-600 p-2.5 text-white hover:bg-blue-700"
          aria-label="Edytuj"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </Link>
      </div>

      {recipe.description?.trim() && (
        <section className="mb-8">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Opis
          </h2>
          <p className="whitespace-pre-wrap text-gray-700">{recipe.description}</p>
        </section>
      )}

      {hasIngredients && validIngredients.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Składniki
          </h2>
          <ul className="list-inside list-disc space-y-1.5 text-gray-700">
            {validIngredients.map((ing, index) => (
              <li key={index}>{formatIngredient(ing)}</li>
            ))}
          </ul>
        </section>
      )}

      {(!hasIngredients || validIngredients.length === 0) && !recipe.description?.trim() && (
        <p className="text-gray-500">Brak opisu i składników.</p>
      )}
    </article>
  )
}
