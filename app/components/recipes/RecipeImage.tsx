"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

interface RecipeImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

export function RecipeImage({ src, alt, className }: RecipeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground h-full ${className ?? ""}`}
      >
        <ImagePlus className="h-8 w-8" />
        <span className="text-xs">Sin imagen</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setHasError(true)}
      className={`object-cover ${className ?? ""}`}
    />
  );
}
