import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IceCream, Plus } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <IceCream className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No hay recetas guardadas</h2>
      <p className="text-muted-foreground max-w-sm mb-6">
        Comienza a guardar tus experimentos de helado para poder revisarlos y mejorarlos.
      </p>
      <Link href="/recetas/nueva">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear primera receta
        </Button>
      </Link>
    </div>
  );
}
