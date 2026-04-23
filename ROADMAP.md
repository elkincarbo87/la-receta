# Roadmap

## Now – v0.1 (Shipped)
Core CRUD for ice cream recipes.
- [x] Create, read, update, delete recipes
- [x] Dynamic ingredient lists with quantities and units
- [x] Notes / method field
- [x] Responsive layout
- [x] Empty state

## Next – v0.2 (Shipped)
Make the app actually usable day-to-day.
- [x] **Search & Filter** – find recipes by name from the dashboard
- [x] **Tags / Categories** – label recipes (e.g., "chocolate", "vegan", "testing")
- [x] **Ratings** – star rating per recipe to track which experiments worked
- [x] **Sorting** – sort by date, name, or rating
- [x] **Duplicate Recipe** – clone an existing recipe to tweak it

## Later – v0.3 (In Progress)
Scale up the workflow.
- [x] **Batch / Scaling** – auto-calculate ingredient quantities when scaling a recipe up or down
- [x] **Image Upload** – attach a photo of the finished batch (base64 in SQLite)
- [x] **Export to PDF** – printable recipe card for the kitchen
- [ ] **Shared Collections** – public or invite-only recipe collections

## Future – v1.0 (Long Term)
Professional-grade tool.
- [ ] **User Accounts** – multi-user support with auth (Clerk / NextAuth)
- [ ] **Version History** – track changes across recipe iterations
- [ ] **Analytics Dashboard** – visualize ingredient costs, success rates, seasonal trends
- [ ] **API / Integrations** – webhooks, export to Google Sheets, POS integrations

## Deployment Milestones
| Milestone | Target | Status |
|---|---|---|
| MVP on Vercel | v0.1 | Ready |
| Custom domain | v0.2 | Not started |
| Production database (PostgreSQL) | v0.2 | Not started |
| Public beta | v0.3 | Not started |
