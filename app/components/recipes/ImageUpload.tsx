"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [errors, setErrors] = useState<string[]>([]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const totalFiles = files.length;
    const newPreviews: string[] = [];
    const newErrors: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        newErrors.push(`${file.name} no es una imagen válida.`);
        processed++;
        if (processed === totalFiles) {
          finalize(newPreviews, newErrors);
        }
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          newPreviews.push(reader.result as string);
        }
        processed++;
        if (processed === totalFiles) {
          finalize(newPreviews, newErrors);
        }
      };
      reader.onerror = () => {
        newErrors.push(`Error al leer ${file.name}.`);
        processed++;
        if (processed === totalFiles) {
          finalize(newPreviews, newErrors);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function finalize(previews: string[], fileErrors: string[]) {
    if (previews.length > 0) {
      onChange([...value, ...previews]);
    }
    setErrors(fileErrors);
    setTimeout(() => setErrors([]), 5000);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="sr-only"
      />

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group aspect-square">
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                fill
                unoptimized
                className="rounded-lg border object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((err, i) => (
            <div key={i} className="flex items-center gap-1.5 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center gap-2 h-32 w-full border-dashed border rounded-md cursor-pointer hover:bg-accent transition-colors"
      >
        <ImagePlus className="h-6 w-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {value.length > 0 ? "Agregar más imágenes" : "Subir imágenes"}
        </span>
      </label>
    </div>
  );
}
