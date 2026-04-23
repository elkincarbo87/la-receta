"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { RecipeImage } from "./RecipeImage";
import { Calendar, FlaskConical, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    date: string | Date;
    _count: { ingredients: number };
    tags: { id: string; name: string }[];
    rating: number | null;
    photos: { id: string; url: string }[];
  };
}

const tagStyles = [
  "bg-[var(--tag-rose)] text-[var(--tag-rose-text)]",
  "bg-[var(--tag-emerald)] text-[var(--tag-emerald-text)]",
  "bg-[var(--tag-amber)] text-[var(--tag-amber-text)]",
  "bg-[var(--tag-sky)] text-[var(--tag-sky-text)]",
  "bg-[var(--tag-violet)] text-[var(--tag-violet-text)]",
];

export function RecipeCard({ recipe }: RecipeCardProps) {
  const formattedDate = new Date(recipe.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const firstPhoto = recipe.photos[0]?.url ?? null;

  return (
    <Link href={`/recetas/${recipe.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
      >
        <Card className="h-[340px] flex flex-col gap-0 p-0 overflow-hidden border-border/60 shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-card/80 backdrop-blur-sm">
          <div className="relative flex-1 min-h-0 overflow-hidden group">
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
              <RecipeImage
                src={firstPhoto}
                alt={recipe.name}
                className="transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            {recipe.rating != null && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                <StarRating rating={recipe.rating} size="sm" />
              </div>
            )}
          </div>
          <CardHeader className="py-3 px-4 shrink-0 space-y-0">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 tracking-tight">
              {recipe.name}
            </h3>
          </CardHeader>
          <CardContent className="py-3 px-4 text-sm space-y-2 shrink-0">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <FlaskConical className="h-3.5 w-3.5 shrink-0" />
              <span>{recipe._count.ingredients} ingredientes</span>
            </div>
            <div className="h-5">
              {recipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {recipe.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className={`text-xs border-0 font-medium ${tagStyles[index % tagStyles.length]}`}
                    >
                      <Tag className="h-3 w-3 mr-0.5" />
                      {tag.name}
                    </Badge>
                  ))}
                  {recipe.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center">
                      +{recipe.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
