"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IceCream } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/app/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="relative w-full min-h-dvh flex items-center justify-center px-4">
      {/* Floating decoration elements — hidden on mobile */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-16 h-16 rounded-full bg-rose-200/50 dark:bg-rose-900/30 blur-xl hidden sm:block"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-20 h-20 rounded-full bg-emerald-200/50 dark:bg-emerald-900/30 blur-xl hidden sm:block"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-[30%] right-[20%] w-12 h-12 rounded-full bg-amber-200/50 dark:bg-amber-900/30 blur-xl hidden sm:block"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <FadeIn className="w-full max-w-[360px] sm:max-w-md">
        <div className="relative w-full sm:bg-card/80 sm:backdrop-blur-xl sm:rounded-3xl sm:border sm:border-border/50 sm:shadow-2xl px-6 py-12 sm:p-8">
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-border/50 shadow-sm mb-4"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IceCream className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold tracking-tight">Casa Nieve Lab</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Inicia sesión para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-10 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border-border/60 focus:ring-2 focus:ring-primary/15 focus:border-primary/20 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="h-10 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm border-border/60 focus:ring-2 focus:ring-primary/15 focus:border-primary/20 transition-all"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive text-center"
              >
                {error}
              </motion.p>
            )}

            <Button
              type="submit"
              className="w-full h-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Ingresando...
                </motion.span>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
