"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  photos: { id: string; url: string; order: number }[];
  alt: string;
}

export function PhotoGallery({ photos, alt }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) return null;

  function nextPhoto() {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }

  function prevPhoto() {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div className="space-y-3">
      <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg border bg-muted">
        <Image
          src={currentPhoto.url}
          alt={`${alt} - ${currentIndex + 1}`}
          fill
          unoptimized
          className="object-cover"
          sizes="100vw"
          priority
        />
        {photos.length > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full opacity-80 hover:opacity-100"
              onClick={prevPhoto}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full opacity-80 hover:opacity-100"
              onClick={nextPhoto}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-md border overflow-hidden transition-all ${
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-1"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={photo.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
