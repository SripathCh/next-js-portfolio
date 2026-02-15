"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { SlideUp, FadeIn, SlideIn } from "@/components/ui/motion";
import { ArrowLeft, ArrowUpRight, ArrowRight, Github } from "lucide-react";

interface ProjectDetailProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  return (
    <>
      {/* Hero area */}
      <section className="px-6 pt-32 pb-12">
        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <FadeIn>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              All Projects
            </Link>
          </FadeIn>

          {/* Title + year */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SlideUp delay={0.1}>
              <h1 className="font-[family-name:var(--font-oswald)] text-5xl md:text-7xl font-bold uppercase tracking-tight">
                {project.title}
              </h1>
            </SlideUp>

            <FadeIn delay={0.3}>
              <span className="text-sm uppercase tracking-widest text-muted">{project.year}</span>
            </FadeIn>
          </div>

          {/* Tags */}
          <FadeIn delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider"
                  style={{ borderColor: `${project.color}40`, color: project.color }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project image / hero visual */}
      <section className="px-6 pb-16">
        <SlideUp delay={0.3}>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/5">
            <motion.div
              className="relative aspect-[16/9] w-full"
              style={{
                background: `linear-gradient(135deg, ${project.color}20, ${project.color}05, rgba(10,10,10,1))`,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
            >
              {/* Placeholder — replace with <Image> when you have project screenshots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-oswald)] text-6xl md:text-8xl font-bold uppercase text-white/5">
                  {project.title}
                </span>
              </div>
            </motion.div>
          </div>
        </SlideUp>
      </section>

      {/* Description + links */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_280px]">
          {/* Long description */}
          <SlideIn direction="left" delay={0.1}>
            <div>
              <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-tight">
                About the Project
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {project.longDescription || project.description}
              </p>
            </div>
          </SlideIn>

          {/* Sidebar: links + info */}
          <SlideIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-muted mb-3">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-sm text-muted">Year</span>
                    <span className="text-sm text-white">{project.year}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-sm text-muted">Category</span>
                    <span className="text-sm text-white">Web Application</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm uppercase tracking-wider transition-colors hover:border-accent hover:bg-accent/10"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Live Demo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm uppercase tracking-wider text-muted transition-colors hover:border-white/20 hover:text-white"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </motion.a>
                )}
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto flex max-w-5xl items-stretch justify-between gap-4">
          {prevProject ? (
            <Link href={`/work/${prevProject.slug}`} className="group flex-1">
              <FadeIn>
                <span className="text-xs uppercase tracking-widest text-muted">Previous</span>
                <div className="mt-2 flex items-center gap-3">
                  <ArrowLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-1" />
                  <span className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors group-hover:text-accent">
                    {prevProject.title}
                  </span>
                </div>
              </FadeIn>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextProject ? (
            <Link href={`/work/${nextProject.slug}`} className="group flex-1 text-right">
              <FadeIn delay={0.1}>
                <span className="text-xs uppercase tracking-widest text-muted">Next</span>
                <div className="mt-2 flex items-center justify-end gap-3">
                  <span className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold uppercase tracking-tight transition-colors group-hover:text-accent">
                    {nextProject.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
                </div>
              </FadeIn>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>
    </>
  );
}
