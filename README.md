# Recipe App

Mobile-first app to add, edit, and delete recipes. Each recipe has title, description, ingredients (name + quantity in piece or grams), and calories.

- **Stack**: React (Vite) + TypeScript + Tailwind CSS + Supabase + GitHub Pages
- **Hosting**: Static frontend on GitHub Pages; database and API on Supabase (free tier)

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com) (free tier).
2. In the SQL Editor, run the script in [`supabase/schema.sql`](supabase/schema.sql) to create the `recipes` table and RLS policies.

### 2. Local env

Copy `env.example` to `.env` and set your Supabase project URL and anon key:

```bash
cp env.example .env
```

Edit `.env`:

- `VITE_SUPABASE_URL` — project URL (Settings → API)
- `VITE_SUPABASE_ANON_KEY` — anon/public key (Settings → API)

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. In repo **Settings → Pages**, set source to **GitHub Actions**.
3. Add repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Push to `main`; the workflow [`.github/workflows/deploy-gh-pages.yml`](.github/workflows/deploy-gh-pages.yml) will build and deploy.

The app will be at `https://<username>.github.io/diet-app/`.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build (local base path `/`)
- `npm run build:gh` — build for GitHub Pages (base `/diet-app/`) and copy `index.html` to `404.html` for SPA routing
- `npm run preview` — preview production build locally
