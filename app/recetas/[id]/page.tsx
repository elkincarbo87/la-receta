import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/app/components/recipes/StarRating";
import { ScaledIngredientTable } from "@/app/components/recipes/ScaledIngredientTable";
import { Calendar, ArrowLeft, Pencil, Tag } from "lucide-react";
import { DeleteRecipeButton } from "@/app/components/recipes/DeleteRecipeButton";
import { DuplicateRecipeButton } from "@/app/components/recipes/DuplicateRecipeButton";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true, tags: true },
  });

  if (!recipe) {
    notFound();
  }

  const formattedDate = new Date(recipe.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{recipe.name}</h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        {recipe.rating != null && (
          <StarRating rating={recipe.rating} />
        )}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                <Tag className="h-3 w-3 mr-0.5" />
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <ScaledIngredientTable ingredients={recipe.ingredients} />

      {recipe.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{recipe.notes}</p>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-3 pt-4">
        <Link href={`/recetas/${recipe.id}/editar`}>
          <Button variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
        <DuplicateRecipeButton recipeId={recipe.id} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
}
