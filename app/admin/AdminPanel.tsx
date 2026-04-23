"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Pencil, Trash2, Users } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  createdAt: Date | string;
};

export function AdminPanel({
  users: initialUsers,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  async function createUser(formData: FormData) {
    setError("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error creating user");
      return;
    }

    const user = await res.json();
    setUsers((prev) => [...prev, user]);
    setCreateOpen(false);
  }

  async function updateUser(id: string, formData: FormData) {
    setError("");
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        role: formData.get("role"),
        password: formData.get("password") || undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Error updating user");
      return;
    }

    const updated = await res.json();
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    setEditingUser(null);
  }

  async function deleteUser(id: string) {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Error deleting user");
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6" />
            Administración
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {users.length} usuario{users.length === 1 ? "" : "s"} registrados
          </p>
        </div>

        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            </DialogHeader>
            <UserForm onSubmit={createUser} error={error} />
          </DialogContent>
        </Dialog>
      </div>

      {error && !createOpen && !editingUser && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium truncate">
                  {user.name || "Sin nombre"}
                </p>
                <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                  {user.role}
                </Badge>
                {user.id === currentUserId && (
                  <Badge variant="outline" className="text-xs">
                    Tú
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {user.email}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Dialog
                open={editingUser?.id === user.id}
                onOpenChange={(open) =>
                  setEditingUser(open ? user : null)
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingUser(user)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Usuario</DialogTitle>
                  </DialogHeader>
                  <UserForm
                    user={user}
                    onSubmit={(fd) => updateUser(user.id, fd)}
                    error={editingUser?.id === user.id ? error : ""}
                  />
                </DialogContent>
              </Dialog>

              {user.id !== currentUserId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteUser(user.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserForm({
  user,
  onSubmit,
  error,
}: {
  user?: User;
  onSubmit: (formData: FormData) => void;
  error: string;
}) {
  return (
    <form
      action={onSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          name="name"
          defaultValue={user?.name ?? ""}
          placeholder="Nombre completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user?.email ?? ""}
          placeholder="correo@ejemplo.com"
          disabled={!!user}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {user ? "Nueva contraseña (dejar vacío para mantener)" : "Contraseña"}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={user ? "••••••••" : "Mínimo 6 caracteres"}
          required={!user}
          minLength={user ? undefined : 6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <Select name="role" defaultValue={user?.role ?? "USER"}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">Usuario</SelectItem>
            <SelectItem value="ADMIN">Administrador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full">
        {user ? "Guardar Cambios" : "Crear Usuario"}
      </Button>
    </form>
  );
}