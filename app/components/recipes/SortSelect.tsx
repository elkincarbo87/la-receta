"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortLabels: Record<
  string,
  string
> = {
  date_desc: "Más reciente",
  date_asc: "Más antiguo",
  name_asc: "Nombre (A-Z)",
  name_desc: "Nombre (Z-A)",
  rating_desc: "Mayor calificación",
  rating_asc: "Menor calificación",
};

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "date_desc";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === "date_desc") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      <SelectTrigger className="w-full sm:w-[180px] rounded-xl bg-white/60 backdrop-blur-sm border-border/60 h-10">
        <SelectValue placeholder="Ordenar por..." />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-border/60">
        {Object.keys(sortLabels).map((key) => (
          <SelectItem
            key={key}
            value={key}
            className="rounded-lg cursor-pointer focus:bg-primary/5"
          >
            {sortLabels[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
