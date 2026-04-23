"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number | null;
  onChange?: (rating: number) => void;
  size?: "sm" | "md";
}

export function StarRating({ rating, onChange, size = "md" }: StarRatingProps) {
  const sizeClasses = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const isInteractive = Boolean(onChange);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!isInteractive}
          onClick={() => onChange?.(star)}
          className={`${
            isInteractive
              ? "cursor-pointer hover:scale-110 active:scale-95"
              : "cursor-default"
          } transition-transform p-1 -m-1 min-w-[36px] min-h-[36px] flex items-center justify-center`}
          aria-label={isInteractive ? `Calificar con ${star} estrellas` : `${star} estrellas`}
        >
          <Star
            className={`${sizeClasses} ${
              (rating ?? 0) >= star
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
