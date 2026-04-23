"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption =
  | "date_desc"
  | "date_asc"
  | "name_asc"
  | "name_desc"
  | "rating_desc"
  | "rating_asc";

const sortLabels: Record<SortOption, string> = {
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
  const currentSort = (searchParams.get("sort") as SortOption) ?? "date_desc";

  function handleChange(value: SortOption) {
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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por..." />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(sortLabels) as SortOption[]).map((key) => (
          <SelectItem key={key} value={key}>
            {sortLabels[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
