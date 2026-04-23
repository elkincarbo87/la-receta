export default function RecipeDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 bg-muted animate-pulse rounded" />
        <div className="h-7 w-2/3 bg-muted animate-pulse rounded" />
      </div>
      <div className="h-64 sm:h-80 bg-muted animate-pulse rounded-lg" />
      <div className="flex flex-wrap gap-4">
        <div className="h-4 w-28 bg-muted animate-pulse rounded" />
        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        <div className="h-5 w-14 bg-muted animate-pulse rounded-full" />
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        <div className="h-9 w-24 bg-muted animate-pulse rounded" />
      </div>
      <div className="rounded-lg border border-border p-4 space-y-3">
        <div className="h-5 w-16 bg-muted animate-pulse rounded" />
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
}