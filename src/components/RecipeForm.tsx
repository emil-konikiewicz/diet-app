import { useState } from 'react'
import type { Recipe, Ingredient, IngredientUnit } from '../types/recipe'

interface RecipeFormProps {
  initial?: Partial<Recipe>
  onSubmit: (data: {
    title: string
    description: string
    ingredients: Ingredient[]
    calories: number | null
  }) => void
  submitLabel: string
}

const emptyIngredient: Ingredient = { name: '', quantity: 0, unit: 'grams' }

export function RecipeForm({ initial, onSubmit, submitLabel }: RecipeFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initial?.ingredients?.length ? [...initial.ingredients] : [{ ...emptyIngredient }]
  )
  const [calories, setCalories] = useState<string>(
    initial?.calories != null ? String(initial.calories) : ''
  )

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    )
  }

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { ...emptyIngredient }])
  }

  const removeIngredient = (index: number) => {
    setIngredients((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validIngredients = ingredients.filter((i) => i.name.trim() !== '')
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      ingredients: validIngredients.map((i) => ({
        ...i,
        name: i.name.trim(),
        quantity: Number(i.quantity) || 0,
      })),
      calories: calories.trim() === '' ? null : parseInt(calories, 10) || null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <button
            type="button"
            onClick={addIngredient}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            + Add row
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex flex-wrap items-end gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2 sm:flex-nowrap"
            >
              <input
                type="text"
                placeholder="Name"
                value={ing.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-2 text-base sm:flex-none sm:flex-1"
              />
              <input
                type="number"
                min={0}
                step={0.1}
                placeholder="Qty"
                value={ing.quantity || ''}
                onChange={(e) =>
                  updateIngredient(index, 'quantity', e.target.value === '' ? 0 : Number(e.target.value))
                }
                className="w-20 rounded border border-gray-300 px-2 py-2 text-base"
              />
              <select
                value={ing.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value as IngredientUnit)}
                className="rounded border border-gray-300 px-2 py-2 text-base"
              >
                <option value="grams">grams</option>
                <option value="piece">piece</option>
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="tap-target min-w-[44px] rounded border border-red-200 bg-red-50 px-2 py-2 text-red-700 hover:bg-red-100"
                aria-label="Remove ingredient"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
          Calories
        </label>
        <input
          id="calories"
          type="number"
          min={0}
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="mt-1 block w-full max-w-[120px] rounded-lg border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="tap-target w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {submitLabel}
      </button>
    </form>
  )
}
