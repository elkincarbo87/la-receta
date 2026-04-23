"use client";

import { useState } from "react";
import { ScaledIngredientTable } from "./ScaledIngredientTable";
import { ExportPdfButton } from "./ExportPdfButton";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteRecipeButton } from "./DeleteRecipeButton";
import { DuplicateRecipeButton } from "./DuplicateRecipeButton";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface Tag {
  id: string;
  name: string;
}

interface RecipeActionsProps {
  recipe: {
    id: string;
    name: string;
    date: Date;
    notes: string | null;
    rating: number | null;
    imageUrl: string | null;
    ingredients: Ingredient[];
    tags: Tag[];
  };
}

export function RecipeActions({ recipe }: RecipeActionsProps) {
  const [scale, setScale] = useState(1);

  return (
    <div className="space-y-6">
      <ScaledIngredientTable
        ingredients={recipe.ingredients}
        scale={scale}
        onScaleChange={setScale}
      />

      <div className="flex items-center gap-3 pt-4">
        <Link href={`/recetas/${recipe.id}/editar`}>
          <Button variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </Link>
        <ExportPdfButton recipe={recipe} scale={scale} />
        <DuplicateRecipeButton recipeId={recipe.id} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
}
