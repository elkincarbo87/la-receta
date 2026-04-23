# Tech Spec

## Architecture
Monolithic Next.js application with server-rendered pages and API routes for mutations.

### Data Flow
```
Browser → Next.js App Router → API Route → Prisma → SQLite/PostgreSQL
         ↓
    Server Component (direct Prisma query for reads)
    Client Component (fetch API for writes)
```

## Technology Choices

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 | Full-stack React, App Router, SSR support |
| Language | TypeScript | Type safety across frontend and backend |
| Styling | Tailwind CSS | Utility-first, rapid UI development |
| Components | shadcn/ui | Accessible, unstyled primitives that fit Tailwind |
| Forms | React Hook Form + Zod | Performant forms with schema validation |
| ORM | Prisma | Type-safe queries, great DX, migration support |
| Database | SQLite (dev) / PostgreSQL (prod) | Zero-config local dev, robust production option |

## API Design

### `GET /api/recetas`
Returns all recipes with ingredient counts.
```json
[
  {
    "id": "cuid",
    "name": "Vainilla Clásica",
    "date": "2026-04-22T00:00:00Z",
    "ingredientCount": 5
  }
]
```

### `POST /api/recetas`
Creates a new recipe.
```json
{
  "name": "Vainilla Clásica",
  "date": "2026-04-22",
  "notes": "Usar vainilla de Madagascar",
  "ingredients": [
    { "name": "Leche entera", "quantity": "500", "unit": "ml" },
    { "name": "Crema de leche", "quantity": "250", "unit": "ml" }
  ]
}
```

### `GET /api/recetas/:id`
Returns full recipe with ingredients.

### `PUT /api/recetas/:id`
Updates recipe and replaces ingredient list.

### `DELETE /api/recetas/:id`
Deletes recipe and cascades to ingredients.

## Component Inventory

### shadcn/ui (installed via CLI)
- `button` – actions
- `card` – recipe list items
- `dialog` – delete confirmation
- `form` – form wrapper with validation
- `input` – text inputs
- `label` – form labels
- `textarea` – notes field
- `table` – ingredient display

### Custom Components
- `IngredientRow` – client component for add/remove ingredient inputs
- `RecipeCard` – server component for dashboard grid
- `EmptyState` – illustration + CTA when no recipes

## State Management
No global state library needed. Server Components fetch fresh data. Forms use React Hook Form local state. Navigation uses Next.js router.

## Deployment
Target: Vercel
- Fluid Compute (default)
- Environment variables via `vercel env`
- Production database via Vercel Marketplace (PostgreSQL)
