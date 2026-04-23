import { RecipeForm } from "@/app/components/recipes/RecipeForm";

export default function NewRecipePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Nueva Receta</h1>
      <RecipeForm />
    </div>
  );
}
