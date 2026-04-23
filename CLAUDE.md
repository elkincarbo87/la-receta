# Heladera – Ice Cream Recipe Tracker

## Project Overview
A web application for saving, viewing, and managing ice cream recipes during testing/development. Each recipe includes a name, date, list of ingredients with quantities, and optional notes.

See `ROADMAP.md` for upcoming features and priorities.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **Database**: Prisma ORM + SQLite (local dev) / PostgreSQL (production via Vercel Marketplace)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

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
  components/
    ui/                   # shadcn components
    recipes/              # Domain-specific components
  lib/
    prisma.ts             # Prisma client singleton
    utils.ts              # cn() and helpers
prisma/
  schema.prisma           # Database schema
```

## Database Schema
```prisma
model Recipe {
  id        String   @id @default(cuid())
  name      String
  date      DateTime @default(now())
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ingredients Ingredient[]
}

model Ingredient {
  id       String @id @default(cuid())
  name     String
  quantity String
  unit     String
  recipeId String
  recipe   Recipe @relation(fields: [recipeId], references: [id], onDelete: Cascade)
}
```

## Key Patterns
- Use **Server Components** for list/detail pages (fetch directly via Prisma).
- Use **Client Components** only for forms (interactivity + React Hook Form).
- Use `revalidatePath` after mutations to keep server-rendered pages fresh.
- Keep styling minimal and clean — neutral tones, plenty of whitespace.

## Commands
- `npm run dev` – start dev server
- `npx prisma migrate dev` – apply schema changes
- `npx prisma studio` – open DB GUI
- `npx shadcn add <component>` – add UI components

## Environment Variables
```
DATABASE_URL="file:./dev.db"
```

## Rules for Claude Code

### Authorization & Safety
- **Never deploy to Vercel on my behalf.** Always ask for explicit authorization before pushing to remote.
- **Never make remote database changes without my explicit authorization.** This includes running migrations, seeding, or schema changes on production or shared databases.

### Code Quality & Standards
- **Follow best development practices.** Write clean, maintainable, and idiomatic code.
- **Respect ECMAScript standards.** Use modern JavaScript/TypeScript features appropriately and avoid deprecated patterns.
- **DRY (Don't Repeat Yourself).** Extract repeated logic into reusable functions, hooks, or components.
- **Componentize everything.** Prefer small, focused, reusable components over monolithic files.
- **Think reusable.** Before writing code, ask: "Will I need this logic or UI elsewhere?" If yes, make it reusable.
- **Run `npm run lint` after making changes.** Ensure the codebase passes linting before considering the task complete.
- **Run `npm run build` after making changes.** Ensure the build completes successfully without errors before considering the task complete.

### Next.js Best Practices
- **Always use `<Image />` from `next/image` instead of raw `<img>` tags.** This is required for automatic image optimization, proper lazy loading, and avoiding layout shift. For external or dynamic images (including base64 data URLs), use the `unoptimized` prop when Next.js image optimization is not applicable.

### Documentation
- **Always update the docs before making changes.** If a PR, feature, or refactor affects architecture, requirements, or APIs, update `CLAUDE.md`, `docs/tech-spec.md`, `docs/progress.md`, or `ROADMAP.md` accordingly before committing code.
