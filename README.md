# Casa Nieve Lab – Ice Cream Recipe Tracker

A web application for saving, viewing, and managing ice cream recipes. Each recipe includes a name, date, list of ingredients with quantities, optional notes, a rating, and tags.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js v5 (Auth.js) with Credentials provider
- **UI**: React 19, Tailwind CSS 4, shadcn/ui
- **Database**: Prisma ORM + Supabase PostgreSQL
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## Features

- Create, read, update, and delete ice cream recipes
- Manage ingredients with quantities and units per recipe
- Add optional notes, ratings, and tags
- Upload multiple images per recipe with gallery view
- Responsive, clean UI with neutral tones
- **Authentication** – email/password login, admin-managed users
- **Admin panel** – create, edit, and delete users at `/admin`

## Project Structure

```
app/
  (auth)/login/page.tsx       # Login page
  page.tsx                    # Dashboard – list all recipes
  recetas/
    nueva/page.tsx             # Create recipe form
    [id]/page.tsx              # Recipe detail view
    [id]/editar/page.tsx       # Edit recipe form
  admin/
    page.tsx                   # Admin user management panel
  api/
    auth/[...nextauth]/route.ts # NextAuth API route
    recetas/route.ts            # REST endpoints (auth required)
    recetas/[id]/route.ts       # Single recipe CRUD (auth required)
    recetas/[id]/duplicar/route.ts # Duplicate recipe (auth required)
    users/route.ts              # Admin user list + create
    users/[id]/route.ts         # Admin user update + delete
  components/
    ui/                         # shadcn components
    recipes/                    # Domain-specific components
    auth/
      SessionProviderWrapper.tsx # Client session provider
      UserNav.tsx               # Header user menu + sign out
  lib/
    prisma.ts                   # Prisma client singleton
    utils.ts                    # cn() and helpers
auth.ts                         # NextAuth configuration
proxy.ts                        # Route protection proxy
prisma/
  schema.prisma                 # Database schema
  seed.ts                       # Seed script (creates admin user)
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase connection strings and auth secret:

```bash
cp .env.example .env
```

Get your connection strings from the Supabase Dashboard → Project Settings → Database → Connection string.

Generate an auth secret:
```bash
openssl rand -base64 32
```

### 3. Apply database migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Seed the admin user

```bash
npx prisma db seed
```

Default admin credentials: `admin@casanieve.com` / `admin123`

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the login page.

## Authentication

- **Login**: `/login` — email and password
- **Admin panel**: `/admin` — only users with `ADMIN` role can access
- **API protection**: All `/api/recetas/*` endpoints require authentication
- **User management**: Only admins can create, edit, and delete users

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Apply schema migrations |
| `npx prisma db seed` | Seed the admin user |
| `npx prisma studio` | Open Prisma database GUI |
| `npx shadcn add <component>` | Add shadcn/ui component |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase pooled connection (port 6543) for Next.js runtime |
| `DIRECT_URL` | Supabase direct connection (port 5432) for Prisma migrations |
| `AUTH_SECRET` | NextAuth.js secret key (generate with `openssl rand -base64 32`) |
| `AUTH_URL` | App URL (`http://localhost:3000` for dev) |

## Deployment

This app is deployed on Vercel. Ensure these environment variables are set in your Vercel project settings:

- `DATABASE_URL` — Supabase pooled connection (port 6543)
- `DIRECT_URL` — Supabase direct connection (port 5432)
- `AUTH_SECRET` — Generate a new secret for production
- `AUTH_URL` — Your production URL

## License

MIT