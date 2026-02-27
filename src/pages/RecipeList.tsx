import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RecipeCard } from '../components/RecipeCard'
import { supabase } from '../lib/supabase'
import type { Recipe } from '../types/recipe'

export function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const { data, error: err } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false })
        if (err) throw err
        setRecipes((data as Recipe[]) ?? [])
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load recipes')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-gray-500">Loading recipes…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p>{error}</p>
        <p className="mt-2 text-sm">Check your Supabase URL and anon key in .env</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
        <Link
          to="/recipe/new"
          className="tap-target rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Add recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-600">
          No recipes yet. Add your first one.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
