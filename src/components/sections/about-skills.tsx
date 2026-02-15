"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "@/lib/data";
import type { Skill } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
  { key: "ai", label: "AI / ML" },
] as const;

type Category = (typeof categories)[number]["key"];

export default function AboutSkills() {
  const [active, setActive] = useState<Category>("all");

  const filtered: Skill[] =
    active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-sm uppercase tracking-[0.3em] text-accent">Skills</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold uppercase tracking-tight">
            Tech Stack
          </h2>
        </FadeIn>

        {/* Category filter tabs */}
        <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`relative rounded-full px-5 py-2 text-sm uppercase tracking-wider transition-colors ${
                  active === cat.key ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {active === cat.key && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full border border-accent bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skills grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="group flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-4 py-5 text-center transition-colors hover:border-accent/30 hover:bg-accent/5"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm font-medium text-muted transition-colors group-hover:text-white">
                    {skill.name}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
