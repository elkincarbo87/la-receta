"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

interface RecipeImageProps {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function RecipeImage({ src, alt, width, height, className }: RecipeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground ${className ?? ""}`}
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
      width={width}
      height={height}
      unoptimized
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
