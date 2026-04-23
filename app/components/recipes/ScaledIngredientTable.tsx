"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface ScaledIngredientTableProps {
  ingredients: Ingredient[];
}

function parseQuantity(q: string): number | null {
  const trimmed = q.trim().replace(",", ".");
  if (trimmed.includes("/")) {
    const [numStr, denStr] = trimmed.split("/");
    const num = parseFloat(numStr);
    const den = parseFloat(denStr);
    if (!isNaN(num) && !isNaN(den) && den !== 0) return num / den;
  }
  const n = parseFloat(trimmed);
  return isNaN(n) ? null : n;
}

function formatQuantity(n: number): string {
  if (Number.isInteger(n)) return String(n);
  const rounded = Math.round(n * 100) / 100;
  return String(rounded);
}

const PRESETS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4];

export function ScaledIngredientTable({ ingredients }: ScaledIngredientTableProps) {
  const [scale, setScale] = useState(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base">Ingredientes</CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Escala: <strong className="text-foreground">{scale}x</strong>
            </span>
            <Slider
              value={[scale]}
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
                scale === p
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-accent"
              }`}
            >
              {p}x
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingrediente</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredients.map((ingredient) => {
              const base = parseQuantity(ingredient.quantity);
              const scaled = base != null ? base * scale : null;

              return (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell className="text-right">
                    {scaled != null ? (
                      <span>
                        {formatQuantity(scaled)} {ingredient.unit}
                        {scale !== 1 && (
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
