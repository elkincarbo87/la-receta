"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function UserNav() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut()}
      className="gap-1 h-9 px-2.5"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Salir</span>
    </Button>
  );
}
