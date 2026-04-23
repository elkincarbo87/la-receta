import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RecipeForm } from "@/app/components/recipes/RecipeForm";

export const dynamic = "force-dynamic";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
  });

  if (!recipe) {
    notFound();
  }

  const defaultValues = {
    name: recipe.name,
    date: recipe.date.toISOString().split("T")[0],
    notes: recipe.notes ?? "",
    ingredients: recipe.ingredients.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      unit: i.unit,
    })),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Editar Receta</h1>
      <RecipeForm defaultValues={defaultValues} recipeId={recipe.id} />
    </div>
  );
}
