import { Routes, Route, Link } from 'react-router-dom'
import { RecipeList } from './pages/RecipeList'
import { AddRecipe } from './pages/AddRecipe'
import { EditRecipe } from './pages/EditRecipe'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <Link to="/" className="text-xl font-bold text-gray-900">
            App
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/new" element={<AddRecipe />} />
          <Route path="/recipe/:id/edit" element={<EditRecipe />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
