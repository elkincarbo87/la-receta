import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IceCream, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <motion.div
        className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-amber-100/80 to-emerald-100/80 rounded-full blur-xl scale-150" />
        <motion.div
          className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm border border-border/50 shadow-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <IceCream className="h-10 w-10 text-primary/80" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-2 tracking-tight">
          No hay recetas guardadas
        </h2>
        <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
          Comienza a guardar tus experimentos de helado para poder revisarlos y mejorarlos.
        </p>
        <Link href="/recetas/nueva">
          <Button className="h-11 px-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <Plus className="h-4 w-4 mr-2" />
            Crear primera receta
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
