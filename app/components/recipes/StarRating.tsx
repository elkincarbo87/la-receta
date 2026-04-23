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
          className={`${isInteractive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
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
