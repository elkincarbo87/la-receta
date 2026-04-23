import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, FlaskConical } from "lucide-react";

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    date: string;
    _count: { ingredients: number };
  };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const formattedDate = new Date(recipe.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/recetas/${recipe.id}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg leading-tight">{recipe.name}</h3>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>{recipe._count.ingredients} ingredientes</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
