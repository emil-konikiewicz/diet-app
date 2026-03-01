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
          Tytuł *
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
          Opis
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
          <label className="block text-sm font-medium text-gray-700">Składniki</label>
          <button
            type="button"
            onClick={addIngredient}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            + Dodaj wiersz
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {ingredients.map((ing, index) => (
            <div
              key={index}
              className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2 sm:flex-nowrap"
            >
              <input
                type="text"
                placeholder="Nazwa"
                value={ing.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                className="flex-1 min-w-0 rounded border border-gray-300 px-2 py-2 text-base"
              />
              <input
                type="number"
                min={0}
                step={1}
                placeholder="Ilość"
                value={ing.quantity || ''}
                onChange={(e) =>
                  updateIngredient(index, 'quantity', e.target.value === '' ? 0 : Number(e.target.value))
                }
                className="w-16 rounded border border-gray-300 px-2 py-2 text-base flex-shrink-0"
              />
              <select
                value={ing.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value as IngredientUnit)}
                className="w-28 rounded border border-gray-300 px-2 py-2 text-base flex-shrink-0"
              >
                <option value="grams">gramy</option>
                <option value="piece">szt.</option>
                <option value="tablespoon">łyżka</option>
                <option value="teaspoon">łyżeczka</option>
                <option value="pinch">szczypta</option>
              </select>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="tap-target flex min-h-[44px] min-w-[44px] items-center justify-center rounded border border-red-200 bg-red-50 px-2 py-2 text-lg font-medium text-red-700 hover:bg-red-100 flex-shrink-0"
                aria-label="Usuń składnik"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
          Kalorie
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
