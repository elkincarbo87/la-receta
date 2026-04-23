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

## Phase 4: Deployment
- [ ] Create production build
- [ ] Set up Vercel project
- [ ] Configure production database
- [ ] Deploy

## Current Status
**Phase 3 complete** – core features built, tested, and polished. Ready for deployment.

For upcoming features and long-term priorities, see `ROADMAP.md`.

## Decisions Log
| Date | Decision | Reason |
|---|---|---|
| 2026-04-22 | SQLite for local dev, PostgreSQL for prod | Zero-config development, robust production |
| 2026-04-22 | App Router with Server Components | Simpler data fetching, less client JS |
| 2026-04-22 | shadcn/ui for components | Accessible, composable, no runtime overhead |
| 2026-04-22 | Downgrade Prisma from v7 to v5 | Prisma v7 requires a driver adapter for SQLite which does not yet have a stable package. v5 works out of the box. |
