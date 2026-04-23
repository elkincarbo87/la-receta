# Casa Nieve Lab – Ice Cream Recipe Tracker

A web application for saving, viewing, and managing ice cream recipes. Each recipe includes a name, date, list of ingredients with quantities, optional notes, a rating, and tags.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4, shadcn/ui
- **Database**: Prisma ORM + Supabase PostgreSQL
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## Features

- Create, read, update, and delete ice cream recipes
- Manage ingredients with quantities and units per recipe
- Add optional notes, ratings, and tags
- Responsive, clean UI with neutral tones

## Project Structure

```
app/
  (routes)/
    page.tsx              # Dashboard – list all recipes
    recetas/
      nueva/page.tsx      # Create recipe form
      [id]/page.tsx       # Recipe detail view
      [id]/editar/page.tsx # Edit recipe form
  api/
    recetas/route.ts      # REST endpoints for recipes
    recetas/[id]/route.ts # Single recipe CRUD
    recetas/[id]/duplicar/route.ts # Duplicate recipe
  components/
    ui/                   # shadcn components
    recipes/              # Domain-specific components
  lib/
    prisma.ts             # Prisma client singleton
    utils.ts              # cn() and helpers
prisma/
  schema.prisma           # Database schema
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env` and fill in your Supabase connection strings:

```bash
cp .env.example .env
```

Get your connection strings from the Supabase Dashboard → Project Settings → Database → Connection string.

### 3. Apply database migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma migrate dev` | Apply schema migrations |
| `npx prisma studio` | Open Prisma database GUI |
| `npx shadcn add <component>` | Add shadcn/ui component |

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Supabase pooled connection (port 6543) for Next.js runtime |
| `DIRECT_URL` | Supabase direct connection (port 5432) for Prisma migrations |

## Database Schema

```prisma
model Recipe {
  id          String       @id @default(cuid())
  name        String       @unique
  date        DateTime     @default(now())
  notes       String?
  rating      Int?
  imageUrl    String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  ingredients Ingredient[]
  tags        Tag[]
}

model Ingredient {
  id       String @id @default(cuid())
  name     String
  quantity String
  unit     String
  recipeId String
  recipe   Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)
}

model Tag {
  id      String @id @default(cuid())
  name    String @unique
  recipes Recipe[]
}
```

## Deployment

This app is deployed on Vercel. Ensure these environment variables are set in your Vercel project settings:

- `DATABASE_URL` — Supabase pooled connection (port 6543)
- `DIRECT_URL` — Supabase direct connection (port 5432)

## License

MIT
