import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/app/components/recipes/StarRating";
import { RecipeActions } from "@/app/components/recipes/RecipeActions";
import { RecipeImage } from "@/app/components/recipes/RecipeImage";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

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

      {recipe.imageUrl && (
        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.name}
          width={800}
          height={384}
          className="rounded-lg border w-full max-h-96 object-cover"
        />
      )}

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

      <RecipeActions recipe={recipe} />

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
    </div>
  );
}
