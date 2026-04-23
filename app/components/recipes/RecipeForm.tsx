"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "./TagInput";
import { StarRating } from "./StarRating";
import { ImageUpload } from "./ImageUpload";
import { Plus, Trash2, Loader2 } from "lucide-react";

const ingredientSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  quantity: z.string().min(1, "Cantidad requerida"),
  unit: z.string().min(1, "Unidad requerida"),
});

const recipeSchema = z.object({
  name: z.string().min(1, "Nombre de la receta requerido"),
  date: z.string().min(1, "Fecha requerida"),
  notes: z.string().optional(),
  tags: z.array(z.string()),
  rating: z.number().min(0).max(5).nullable().optional(),
  photos: z.array(z.string()),
  ingredients: z.array(ingredientSchema).min(1, "Agrega al menos un ingrediente"),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  defaultValues?: RecipeFormValues;
  recipeId?: string;
}

export function RecipeForm({ defaultValues, recipeId }: RecipeFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(recipeId);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: defaultValues ?? {
      name: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      tags: [],
      rating: null,
      photos: [],
      ingredients: [{ name: "", quantity: "", unit: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const tags = useWatch({ control: form.control, name: "tags" }) ?? [];
  const rating = useWatch({ control: form.control, name: "rating" }) ?? null;
  const photos = useWatch({ control: form.control, name: "photos" }) ?? [];

  async function onSubmit(data: RecipeFormValues) {
    setSubmitting(true);
    try {
      const url = isEditing ? `/api/recetas/${recipeId}` : "/api/recetas";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const recipe = await res.json();
        router.push(`/recetas/${recipe.id}`);
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre de la receta</Label>
          <Input id="name" {...form.register("name")} placeholder="Ej. Vainilla Clásica" />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Input id="date" type="date" {...form.register("date")} />
          {form.formState.errors.date && (
            <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Calificación</Label>
          <StarRating
            rating={rating}
            onChange={(r) => form.setValue("rating", r, { shouldValidate: true })}
          />
        </div>

        <div className="space-y-2">
          <Label>Imágenes</Label>
          <ImageUpload
            value={photos}
            onChange={(urls) => form.setValue("photos", urls, { shouldValidate: true })}
          />
        </div>

        <div className="space-y-2">
          <Label>Etiquetas</Label>
          <TagInput
            tags={tags}
            onChange={(newTags) => form.setValue("tags", newTags, { shouldValidate: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notas / Método</Label>
          <Textarea
            id="notes"
            {...form.register("notes")}
            placeholder="Procedimiento, temperaturas, observaciones..."
            rows={5}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Ingredientes</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "", quantity: "", unit: "" })}
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar
          </Button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5 space-y-1">
                <Input
                  {...form.register(`ingredients.${index}.name`)}
                  placeholder="Nombre"
                />
                {form.formState.errors.ingredients?.[index]?.name && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.ingredients[index]?.name?.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3 space-y-1">
                <Input
                  {...form.register(`ingredients.${index}.quantity`)}
                  placeholder="Cantidad"
                />
                {form.formState.errors.ingredients?.[index]?.quantity && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.ingredients[index]?.quantity?.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-3 space-y-1">
                <Input
                  {...form.register(`ingredients.${index}.unit`)}
                  placeholder="Unidad"
                />
                {form.formState.errors.ingredients?.[index]?.unit && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.ingredients[index]?.unit?.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-1 flex justify-end sm:justify-start">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                  className="h-10 w-10"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {form.formState.errors.ingredients?.root && (
          <p className="text-sm text-destructive">{form.formState.errors.ingredients.root.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-4">
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isEditing ? "Guardar cambios" : "Guardar receta"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
