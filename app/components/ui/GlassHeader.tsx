"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IceCream } from "lucide-react";
import { UserNav } from "../auth/UserNav";

export function GlassHeader() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/sign-in" || pathname === "/sign-up";

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 border border-primary/10">
            <IceCream className="h-[18px] w-[18px] text-primary" />
          </div>
          <span>Casa Nieve Lab</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3">
          <Link
            href="/recetas/nueva"
            className="text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors"
          >
            Nueva Receta
          </Link>
          <UserNav />
        </nav>
      </div>
    </header>
  );
}
