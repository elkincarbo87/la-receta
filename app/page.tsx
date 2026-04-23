import { prisma } from "@/lib/prisma";
import { RecipeCard } from "./components/recipes/RecipeCard";
import { EmptyState } from "./components/recipes/EmptyState";
import { SearchInput } from "./components/recipes/SearchInput";
import { SortSelect } from "./components/recipes/SortSelect";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
  const { search, sort } = await searchParams;
  const whereClause = search
    ? { name: { contains: search } }
    : {};

  const orderBy = getOrderBy(sort);

  const recipes = await prisma.recipe.findMany({
    where: whereClause,
    orderBy,
    include: {
      _count: {
        select: { ingredients: true },
      },
      tags: true,
      photos: {
        orderBy: { order: "asc" },
        take: 1,
      },
    },
  });

  const isSearching = Boolean(search);

  if (recipes.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Recetas</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <SearchInput />
            <SortSelect />
          </div>
        </div>
        {isSearching ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No se encontraron recetas para &quot;{search}&quot;.</p>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Recetas</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <SearchInput />
          <SortSelect />
        </div>
      </div>
      <p className="text-muted-foreground">
        {isSearching
          ? `${recipes.length} resultado${recipes.length === 1 ? "" : "s"} para "${search}"`
          : `${recipes.length} ${recipes.length === 1 ? "receta" : "recetas"} guardadas`}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

function getOrderBy(sort: string | undefined) {
  switch (sort) {
    case "date_asc":
      return { createdAt: "asc" as const };
    case "name_asc":
      return { name: "asc" as const };
    case "name_desc":
      return { name: "desc" as const };
    case "rating_desc":
      return { rating: "desc" as const };
    case "rating_asc":
      return { rating: "asc" as const };
    case "date_desc":
    default:
      return { createdAt: "desc" as const };
  }
}
