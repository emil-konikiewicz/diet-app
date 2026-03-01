import { Link } from 'react-router-dom'
import type { Recipe } from '../types/recipe'

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="min-h-[44px] min-w-[44px] flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-gray-300 hover:shadow md:min-h-0"
    >
      <h2 className="text-lg font-semibold text-gray-900">{recipe.title}</h2>
      <p className="text-sm font-medium text-gray-700">{recipe.calories} kcal</p>
    </Link>
  )
}
