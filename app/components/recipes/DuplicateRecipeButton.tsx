"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Loader2 } from "lucide-react";

export function DuplicateRecipeButton({ recipeId }: { recipeId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDuplicate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/recetas/${recipeId}/duplicar`, {
        method: "POST",
      });

      if (res.ok) {
        const recipe = await res.json();
        router.push(`/recetas/${recipe.id}`);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="outline" onClick={handleDuplicate} disabled={loading}>
      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      <Copy className="h-4 w-4 mr-2" />
      Duplicar
    </Button>
  );
}
