"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position tracking for the spotlight/tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for fluid follow
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Subtle 3D tilt based on mouse position
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize mouse position to -0.5 to 0.5
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/work/${project.slug}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 800,
          }}
          className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-colors duration-300 hover:border-white/10"
        >
          {/* Spotlight gradient that follows cursor */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${springX.get()}px ${springY.get()}px, ${project.color}10, transparent 40%)`,
            }}
          />

          {/* Project image area */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.03]">
            {/* Color gradient placeholder — replace with <Image> when you have screenshots */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.color}15, ${project.color}05, transparent)`,
              }}
              animate={hovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Project number */}
            <span className="absolute top-5 left-6 font-[family-name:var(--font-oswald)] text-sm font-medium tracking-wider text-white/20">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Arrow icon — appears on hover */}
            <motion.div
              className="absolute top-5 right-6"
              initial={{ opacity: 0, x: -10, y: 10 }}
              animate={hovered ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-5 w-5 text-white" />
            </motion.div>

            {/* Large project title overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <motion.h3
                className="font-[family-name:var(--font-oswald)] text-3xl md:text-4xl font-bold uppercase tracking-tight text-center text-white/80"
                animate={hovered ? { scale: 1.05, color: "rgba(255,255,255,1)" } : { scale: 1, color: "rgba(255,255,255,0.8)" }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="relative z-20 flex items-start justify-between gap-4 p-6">
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-muted line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-xs tracking-wide border transition-colors"
                    style={{
                      borderColor: hovered ? `${project.color}40` : "rgba(255,255,255,0.05)",
                      color: hovered ? project.color : "var(--muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Year */}
            <span className="shrink-0 text-xs text-muted uppercase tracking-wider mt-1">
              {project.year}
            </span>
          </div>

          {/* Bottom border accent on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: project.color }}
            initial={{ width: "0%" }}
            animate={hovered ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
