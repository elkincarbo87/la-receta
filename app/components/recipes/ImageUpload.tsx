"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, AlertCircle } from "lucide-react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_DIMENSION = 1200;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error(`Error al leer ${file.name}`));
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo crear el canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };

    img.onerror = () => reject(new Error(`Error al cargar ${file.name}`));
  });
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [errors, setErrors] = useState<string[]>([]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPreviews: string[] = [];
    const newErrors: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        newErrors.push(`${file.name} no es una imagen válida.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        newErrors.push(
          `${file.name} excede ${MAX_FILE_SIZE_MB} MB.`
        );
        continue;
      }

      try {
        const dataUrl = await compressImage(file);
        newPreviews.push(dataUrl);
      } catch {
        newErrors.push(`Error al procesar ${file.name}.`);
      }
    }

    if (newPreviews.length > 0) {
      onChange([...value, ...newPreviews]);
    }

    setErrors(newErrors);
    if (newErrors.length > 0) {
      setTimeout(() => setErrors([]), 5000);
    }

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
