"use client";

import { motion } from "framer-motion";

// Shown while a page is loading (e.g. during navigation)
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-3 w-3 rounded-full bg-accent"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
