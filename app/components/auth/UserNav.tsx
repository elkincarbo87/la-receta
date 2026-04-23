"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserNav() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-2">
      {session.user.role === "ADMIN" && (
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </Link>
      )}
      <Badge variant="secondary" className="hidden sm:inline-flex text-xs gap-1">
        {session.user.name || session.user.email}
        <span className="text-muted-foreground">({session.user.role})</span>
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut()}
        className="gap-1"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Salir</span>
      </Button>
    </div>
  );
}