import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { Calendar, FlaskConical, Tag } from "lucide-react";

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    date: string;
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
    <Link href={`/recetas/${recipe.id}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden">
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-40 object-cover"
          />
        )}
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight">{recipe.name}</h3>
            {recipe.rating != null && (
              <StarRating rating={recipe.rating} size="sm" />
            )}
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>{recipe._count.ingredients} ingredientes</span>
          </div>
          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {recipe.tags.map((tag) => (
                <Badge key={tag.id} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-0.5" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
