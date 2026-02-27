import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const ingredientsSummary =
    recipe.ingredients?.length > 0
      ? recipe.ingredients
          .slice(0, 3)
          .map((i) => `${i.name} ${i.quantity}${i.unit === 'grams' ? 'g' : ' pc'}`)
          .join(', ') + (recipe.ingredients.length > 3 ? '…' : '')
      : 'No ingredients'

  return (
    <Link
      to={`/recipe/${recipe.id}/edit`}
      className="tap-target block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow md:min-h-0"
    >
      <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
      {recipe.description && (
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{recipe.description}</p>
      )}
      <p className="mt-2 text-xs text-gray-500">{ingredientsSummary}</p>
      {recipe.calories != null && (
        <p className="mt-1 text-sm font-medium text-gray-700">{recipe.calories} cal</p>
      )}
    </Link>
  )
}
