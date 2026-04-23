import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { RecipeImage } from "./RecipeImage";
import { Calendar, FlaskConical, Tag } from "lucide-react";

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    date: string | Date;
    _count: { ingredients: number };
    tags: { id: string; name: string }[];
    rating: number | null;
    imageUrl: string | null;
  };
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const formattedDate = new Date(recipe.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/recetas/${recipe.id}`} className="block h-full">
      <Card className="h-[420px] flex flex-col hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden">
        <div className="relative h-40 shrink-0 overflow-hidden">
          <RecipeImage
            src={recipe.imageUrl}
            alt={recipe.name}
          />
        </div>
        <CardHeader className="pb-2 shrink-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">{recipe.name}</h3>
            {recipe.rating != null && (
              <StarRating rating={recipe.rating} size="sm" />
            )}
          </div>
        </CardHeader>
        <div className="flex-1 min-h-0" />
        <CardContent className="text-sm text-muted-foreground space-y-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5 shrink-0" />
            <span>{recipe._count.ingredients} ingredientes</span>
          </div>
          <div className="h-6">
            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {recipe.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag.id} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-0.5" />
                    {tag.name}
                  </Badge>
                ))}
                {recipe.tags.length > 2 && (
                  <span className="text-xs text-muted-foreground">+{recipe.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
