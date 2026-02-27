import { createClient } from '@supabase/supabase-js'
import type { Recipe } from '../types/recipe'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in .env for Supabase to work.')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

export type RecipeRow = Recipe
