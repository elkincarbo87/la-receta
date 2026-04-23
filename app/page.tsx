import { prisma } from "@/lib/prisma";
import { RecipeCard } from "./components/recipes/RecipeCard";
import { EmptyState } from "./components/recipes/EmptyState";
import { SearchInput } from "./components/recipes/SearchInput";
import { SortSelect } from "./components/recipes/SortSelect";
import { FadeIn } from "./components/ui/FadeIn";
import { StaggerContainer, StaggerItem } from "./components/ui/StaggerContainer";

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
      <div className="space-y-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Recetas</h1>
              <p className="text-muted-foreground mt-1">
                Gestiona tus experimentos de helado
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <SearchInput />
              <SortSelect />
            </div>
          </div>
        </FadeIn>

        {isSearching ? (
          <FadeIn delay={0.2}>
            <div className="text-center py-12 text-muted-foreground">
              <p>No se encontraron recetas para &quot;{search}&quot;.</p>
            </div>
          </FadeIn>
        ) : (
          <EmptyState />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recetas</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona tus experimentos de helado
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <SearchInput />
            <SortSelect />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-sm text-muted-foreground">
          {isSearching
            ? `${recipes.length} resultado${recipes.length === 1 ? "" : "s"} para "${search}"`
            : `${recipes.length} ${recipes.length === 1 ? "receta" : "recetas"} guardadas`}
        </p>
      </FadeIn>

      <StaggerContainer
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.05}
        delayChildren={0.15}
      >
        {recipes.map((recipe) => (
          <StaggerItem key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </StaggerItem>
        ))}
      </StaggerContainer>
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
