import { Routes, Route, Link } from 'react-router-dom'
import { RecipeList } from './pages/RecipeList'
import { RecipeDetail } from './pages/RecipeDetail'
import { AddRecipe } from './pages/AddRecipe'
import { EditRecipe } from './pages/EditRecipe'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2" aria-label="Strona główna">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="10" width="14" height="9" rx="2" stroke="currentColor" fill="white" />
              <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" fill="none" />
              <path d="M9 19V13h6v6" stroke="currentColor" fill="none" />
            </svg>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/new" element={<AddRecipe />} />
          <Route path="/recipe/:id/edit" element={<EditRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
