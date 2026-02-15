"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-[family-name:var(--font-oswald)] text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-white/5">
          404
        </h1>
        <h2 className="mt-2 font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-tight">
          Page Not Found
        </h2>
        <p className="mt-4 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-widest transition-colors hover:border-accent hover:bg-accent/10"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
