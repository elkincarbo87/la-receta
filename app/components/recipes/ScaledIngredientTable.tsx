"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { parseQuantity, formatQuantity } from "@/app/lib/scaling";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface ScaledIngredientTableProps {
  ingredients: Ingredient[];
  scale?: number;
  onScaleChange?: (scale: number) => void;
}

const PRESETS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];

export function ScaledIngredientTable({ ingredients, scale = 1, onScaleChange }: ScaledIngredientTableProps) {
  const isControlled = onScaleChange != null;
  const currentScale = scale;
  const setScale = isControlled ? onScaleChange : () => {};

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base">Ingredientes</CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Escala: <strong className="text-foreground">{currentScale}x</strong>
            </span>
            <Slider
              value={[currentScale]}
              onValueChange={([v]) => setScale(v)}
              min={0.25}
              max={4}
              step={0.25}
              className="w-32"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setScale(p)}
              className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                currentScale === p
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-accent"
              }`}
            >
              {p}x
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Ingrediente</TableHead>
              <TableHead className="text-right min-w-[100px]">Cantidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient) => {
              const base = parseQuantity(ingredient.quantity);
              const scaled = base != null ? base * currentScale : null;

              return (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell className="text-right">
                    {scaled != null ? (
                      <span>
                        {formatQuantity(scaled)} {ingredient.unit}
                        {currentScale !== 1 && (
                          <span className="text-muted-foreground text-xs ml-1">
                            ({ingredient.quantity} {ingredient.unit})
                          </span>
                        )}
                      </span>
                    ) : (
                      <span>
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
