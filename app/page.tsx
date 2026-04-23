import { prisma } from "@/lib/prisma";
import { RecipeCard } from "./components/recipes/RecipeCard";
import { EmptyState } from "./components/recipes/EmptyState";

export const dynamic = "force-dynamic";

export default async function Home() {
  const recipes = await prisma.recipe.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { ingredients: true },
      },
    },
  });

  if (recipes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Recetas</h1>
        <p className="text-muted-foreground">
          {recipes.length} {recipes.length === 1 ? "receta" : "recetas"} guardadas
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
