# Project Progress

## Phase 1: Foundation
- [x] Create `CLAUDE.md` with project context
- [x] Create `docs/requirements.md`
- [x] Create `docs/tech-spec.md`
- [x] Bootstrap Next.js project with shadcn/ui
- [x] Configure Tailwind and base styles
- [x] Set up Prisma with SQLite schema
- [x] Run initial migration

## Phase 2: Core Features
- [x] Build recipe list page (`/`)
- [x] Build recipe detail page (`/recetas/:id`)
- [x] Build create recipe page (`/recetas/nueva`)
- [x] Build edit recipe page (`/recetas/:id/editar`)
- [x] Implement delete with confirmation dialog
- [x] Add empty state

## Phase 3: Polish
- [x] Responsive testing (mobile / desktop)
- [x] Form validation feedback
- [x] Loading states
- [x] Error handling (404, API errors)
- [x] Accessibility pass (keyboard nav, labels)

## Phase 5: v0.2 Features
- [x] Search & Filter – find recipes by name from the dashboard
- [x] Tags / Categories – label recipes
- [x] Ratings – star rating per recipe
- [x] Sorting – sort by date, name, or rating
- [x] Duplicate Recipe – clone an existing recipe

## Phase 6: v0.3 Features
- [x] Batch / Scaling – auto-calculate ingredient quantities when scaling a recipe
- [ ] Image Upload – attach a photo of the finished batch (Vercel Blob)
- [ ] Export to PDF – printable recipe card for the kitchen
- [ ] Shared Collections – public or invite-only recipe collections

## Current Status
**Phase 6 in progress** – building v0.3 features (Image Upload next).

For upcoming features and long-term priorities, see `ROADMAP.md`.

## Decisions Log
| Date | Decision | Reason |
|---|---|---|
| 2026-04-22 | SQLite for local dev, PostgreSQL for prod | Zero-config development, robust production |
| 2026-04-22 | App Router with Server Components | Simpler data fetching, less client JS |
| 2026-04-22 | shadcn/ui for components | Accessible, composable, no runtime overhead |
| 2026-04-22 | Downgrade Prisma from v7 to v5 | Prisma v7 requires a driver adapter for SQLite which does not yet have a stable package. v5 works out of the box. |
