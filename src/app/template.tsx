"use client";

import { motion } from "framer-motion";

// template.tsx re-mounts on every route change (unlike layout.tsx which persists).
// This gives us a natural hook for page enter/exit animations.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
