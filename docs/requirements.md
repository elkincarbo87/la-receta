# Requirements

## User Stories

### US-01: View All Recipes
As a user, I want to see a list of all my saved ice cream recipes so I can quickly find what I'm looking for.
- Display recipe name and creation date in a card or row layout.
- Sort by date (newest first by default).
- Show total ingredient count per recipe.

### US-02: Create a Recipe
As a user, I want to add a new recipe with its ingredients so I can track experiments.
- Input recipe name (required).
- Input preparation / test date (default to today).
- Dynamically add/remove ingredient rows.
- Each ingredient needs: name, quantity, unit.
- Optional notes / method textarea.
- Save redirects to the recipe detail page.

### US-03: View Recipe Detail
As a user, I want to view a single recipe's full details.
- Show recipe name, date, notes.
- Show ingredients in a clear table or list with quantities.
- Provide edit and delete actions.

### US-04: Edit a Recipe
As a user, I want to update an existing recipe or its ingredients.
- Pre-populate form with current data.
- Allow adding/removing ingredients dynamically.
- Save updates in place.

### US-05: Delete a Recipe
As a user, I want to remove a recipe permanently.
- Show a confirmation dialog before deletion.

## Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Recipe name must be unique | Must |
| FR-02 | Ingredient quantity accepts decimal numbers | Must |
| FR-03 | Form validates required fields client-side | Must |
| FR-04 | Database enforces data integrity (cascading delete for ingredients) | Must |
| FR-05 | Responsive layout for mobile and desktop | Must |
| FR-06 | Empty state messaging when no recipes exist | Should |
| FR-07 | Search/filter recipes by name | Nice |
| FR-08 | Tag/categorize recipes | Nice |

## Non-Functional Requirements
- **Performance**: Page load < 1s on local network.
- **Accessibility**: Keyboard-navigable forms, ARIA labels, color contrast.
- **Data Safety**: SQLite file committed for dev; production uses managed database.
