import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, ArrowLeft, Pencil } from "lucide-react";
import { DeleteRecipeButton } from "@/app/components/recipes/DeleteRecipeButton";

export const dynamic = "force-dynamic";

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
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

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ingredientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipe.ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell className="text-right">
                    {ingredient.quantity} {ingredient.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
}
