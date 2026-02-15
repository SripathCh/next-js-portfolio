"use client";

import { SlideUp, FadeIn } from "@/components/ui/motion";
import { projects } from "@/lib/data";

export default function WorkHeader() {
  return (
    <section className="px-6 pt-32 pb-16">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-sm uppercase tracking-[0.3em] text-accent">Portfolio</span>
        </FadeIn>

        <SlideUp delay={0.1}>
          <h1 className="mt-4 font-[family-name:var(--font-oswald)] text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Selected
            <br />
            <span className="text-stroke">Works</span>
          </h1>
        </SlideUp>

        <FadeIn delay={0.3}>
          <p className="mt-6 max-w-lg text-base text-muted leading-relaxed">
            A collection of projects I&apos;ve built — from full-stack applications
            to AI-powered tools. Each one taught me something new.
          </p>
        </FadeIn>

        {/* Stats row */}
        <FadeIn delay={0.4}>
          <div className="mt-10 flex gap-12 border-t border-white/5 pt-8">
            <div>
              <span className="font-[family-name:var(--font-oswald)] text-3xl font-bold">{projects.length}</span>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">Projects</p>
            </div>
            <div>
              <span className="font-[family-name:var(--font-oswald)] text-3xl font-bold">
                {[...new Set(projects.flatMap((p) => p.tags))].length}
              </span>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">Technologies</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
