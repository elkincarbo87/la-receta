"use client";

import { motion } from "framer-motion";

export default function HomeLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-9 w-40 bg-muted animate-shimmer rounded-xl" />
          <div className="h-5 w-64 bg-muted animate-shimmer rounded-lg" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-48 bg-muted animate-shimmer rounded-xl" />
          <div className="h-10 w-32 bg-muted animate-shimmer rounded-xl" />
        </div>
      </div>

      <div className="h-5 w-48 bg-muted animate-shimmer rounded-lg" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="rounded-2xl border border-border/60 bg-card/80 overflow-hidden"
          >
            <div className="h-48 bg-muted animate-shimmer" />
            <div className="p-4 space-y-3">
              <div className="h-6 w-3/4 bg-muted animate-shimmer rounded-lg" />
              <div className="h-4 w-1/2 bg-muted animate-shimmer rounded-lg" />
              <div className="flex gap-2 pt-1">
                <div className="h-6 w-16 bg-muted animate-shimmer rounded-full" />
                <div className="h-6 w-14 bg-muted animate-shimmer rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
