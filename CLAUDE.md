# Casa Nieve Lab – Ice Cream Recipe Tracker

## Project Overview
A web application for saving, viewing, and managing ice cream recipes during testing/development. Each recipe includes a name, date, list of ingredients with quantities, and optional notes.

See `ROADMAP.md` for upcoming features and priorities.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth.js v5 (Auth.js) with Credentials provider
- **UI**: React 19, Tailwind CSS, shadcn/ui
- **Database**: Prisma ORM + Supabase PostgreSQL
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Project Structure
```
app/
  (auth)/
    login/page.tsx          # Login page
  (routes)/
    page.tsx                # Dashboard – list all recipes
    recetas/
      nueva/page.tsx        # Create recipe form
      [id]/page.tsx         # Recipe detail view
      [id]/editar/page.tsx # Edit recipe form
  admin/
    page.tsx                # Admin user management panel
    AdminPanel.tsx          # Admin client component
  api/
    auth/[...nextauth]/route.ts # NextAuth API route
    recetas/route.ts        # REST endpoints for recipes (auth required)
    recetas/[id]/route.ts   # Single recipe CRUD (auth required)
    recetas/[id]/duplicar/route.ts # Duplicate recipe (auth required)
    users/route.ts          # Admin user list + create
    users/[id]/route.ts     # Admin user update + delete
  components/
    ui/                     # shadcn components
    recipes/                # Domain-specific components
    auth/
      SessionProviderWrapper.tsx # Client session provider
      UserNav.tsx           # Header user menu + sign out
  lib/
    prisma.ts               # Prisma client singleton
    utils.ts                # cn() and helpers
auth.ts                     # NextAuth configuration
middleware.ts               # Route protection middleware
prisma/
  schema.prisma             # Database schema
  seed.ts                   # Seed script (creates admin user)
```

## Database Schema
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String
  role          String    @default("USER") // "ADMIN" or "USER"
  image         String?
  accounts      Account[]
  sessions      Session[]
  recipes       Recipe[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
}

model Recipe {
  id          String   @id @default(cuid())
  name        String   @unique
  date        DateTime @default(now())
  notes       String?
  rating      Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  ingredients Ingredient[]
  tags        Tag[]
  photos      Photo[]
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

model Photo {
  id        String   @id @default(cuid())
  url       String
  order     Int      @default(0)
  recipeId  String
  recipe    Recipe   @relation(fields: [recipeId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}
```

## Authentication

### Overview
- **Provider**: Credentials (email + password) via NextAuth.js v5
- **Roles**: `ADMIN` and `USER`
- **Admin creates users**: Only admins can create, edit, and delete users via `/admin`
- **Default admin**: Seeded with `admin@casanieve.com` / `admin123`

### Auth Patterns
- **Middleware** (`middleware.ts`): Protects all routes except `/login` and `/api/auth/*`. Unauthenticated users are redirected to `/login`.
- **API routes**: All `/api/recetas/*` routes call `auth()` and return 401 if not authenticated.
- **Admin routes**: `/api/users/*` routes check `session.user.role === "ADMIN"` and return 403 for non-admins.
- **Admin panel**: `/admin` page redirects non-admins to `/`.

### Key Files
- `auth.ts` — NextAuth config (Credentials provider, JWT strategy, role callbacks)
- `middleware.ts` — Route protection
- `app/api/auth/[...nextauth]/route.ts` — Auth API handlers
- `types/next-auth.d.ts` — Extended NextAuth types (role, id on session)

## Key Patterns
- Use **Server Components** for list/detail pages (fetch directly via Prisma).
- Use **Client Components** only for forms (interactivity + React Hook Form).
- Use `revalidatePath` after mutations to keep server-rendered pages fresh.
- Keep styling minimal and clean — neutral tones, plenty of whitespace.

## Commands
- `npm run dev` – start dev server
- `npx prisma migrate dev` – apply schema changes
- `npx prisma db seed` – seed the admin user
- `npx prisma studio` – open DB GUI
- `npx shadcn add <component>` – add UI components

## Environment Variables

### Local Development (`.env`)
```
DIRECT_URL="postgresql://postgres:[PASS]@db.[REF].supabase.co:5432/postgres"
DATABASE_URL="postgresql://postgres:[PASS]@db.[REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"
```

### Vercel Production
Set the same variables in your Vercel project settings. Use the **Pooled Connection** (port 6543) for `DATABASE_URL`. Generate a new `AUTH_SECRET` for production.

### Why Two URLs?
Supabase uses a connection pooler for serverless compatibility. `DATABASE_URL` (port 6543) is pooled and used by the running app. `DIRECT_URL` (port 5432) is direct and used by Prisma for migrations.

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

### Mobile-First Design
- **Always design for mobile first.** Every UI change must work on screens as small as 375px wide.
- **Use responsive Tailwind classes.** Stack elements vertically on mobile (`flex-col`) and side-by-side on desktop (`sm:flex-row`). Use `grid-cols-1` as the default and add breakpoints (`sm:`, `lg:`) for larger screens.
- **Minimum touch target is 44×44px.** Buttons, links, and interactive elements must be easy to tap. Add padding or increase size when necessary.
- **Avoid fixed widths on mobile.** Use `w-full` by default and constrain on larger screens with responsive prefixes (`sm:w-[180px]`).
- **Handle text overflow.** Use `break-words`, `truncate`, or `line-clamp` for long text. Add `min-w-0` to flex containers so children can shrink.
- **Test tables on small screens.** Wrap tables in `overflow-x-auto` or switch to card-based layouts on mobile.
- **Images must be responsive.** Use relative heights (`h-64 sm:h-80 lg:h-96`) instead of fixed tall values. Gallery navigation arrows need larger touch targets on mobile.

### Next.js Best Practices
- **Always use `<Image />` from `next/image` instead of raw `<img>` tags.** This is required for automatic image optimization, proper lazy loading, and avoiding layout shift. For external or dynamic images (including base64 data URLs), use the `unoptimized` prop when Next.js image optimization is not applicable.

### Documentation
- **Always update the docs before making changes.** If a PR, feature, or refactor affects architecture, requirements, or APIs, update `CLAUDE.md`, `docs/tech-spec.md`, `docs/progress.md`, or `ROADMAP.md` accordingly before committing code.
- **Always keep `README.md` in sync.** After any change that affects the tech stack, project structure, environment variables, database schema, or setup instructions, update `README.md` immediately. It should always reflect the current state of the project for a new contributor.
- **Keep the SQLite dev database in sync with PostgreSQL schema changes.** If a schema change is made for PostgreSQL (new tables, columns, or relations), apply the equivalent change to the local `prisma/dev.db` SQLite file so that `DATABASE_URL="file:./dev.db"` remains a valid fallback for local development without Supabase. Ensure both SQLite and PostgreSQL migrations are kept up to date.
