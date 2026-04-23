"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IceCream, Plus, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { UserNav } from "../auth/UserNav";
import { ThemeToggle } from "./ThemeToggle";

export function GlassHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAuthPage =
    pathname === "/login" || pathname === "/sign-in" || pathname === "/sign-up";

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-base sm:text-lg tracking-tight hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 shrink-0">
            <IceCream className="h-[18px] w-[18px] text-primary" />
          </div>
          <span className="whitespace-nowrap">Casa Nieve Lab</span>
        </Link>

        <nav className="ml-auto flex items-center gap-1.5 sm:gap-3">
          {/* 1. Nueva Receta */}
          <Link
            href="/recetas/nueva"
            className="inline-flex items-center justify-center sm:hidden w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-colors"
            aria-label="Nueva Receta"
          >
            <Plus className="h-4 w-4" />
          </Link>
          <Link
            href="/recetas/nueva"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors"
          >
            Nueva Receta
          </Link>

          {/* 2. Admin */}
          {session?.user.role === "ADMIN" && (
            <>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center sm:hidden w-9 h-9 rounded-lg bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-colors"
                aria-label="Admin"
              >
                <Shield className="h-4 w-4" />
              </Link>
              <Link
                href="/admin"
                className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary/80 hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors"
              >
                Admin
              </Link>
            </>
          )}

          {/* 3. User role badge — desktop only */}
          {session && (
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex text-xs gap-1"
            >
              {session.user.name || session.user.email}
              <span className="text-muted-foreground">({session.user.role})</span>
            </Badge>
          )}

          {/* 4. Theme Toggle */}
          <ThemeToggle />

          {/* 5. Exit */}
          <UserNav />
        </nav>
      </div>
    </header>
  );
}
