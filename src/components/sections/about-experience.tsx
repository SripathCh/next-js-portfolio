"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Briefcase } from "lucide-react";

export default function AboutExperience() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <span className="text-sm uppercase tracking-[0.3em] text-accent">Experience</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold uppercase tracking-tight">
            Where I&apos;ve Worked
          </h2>
        </FadeIn>

        {/* Timeline */}
        <StaggerContainer className="mt-12 space-y-0" staggerDelay={0.15}>
          {experience.map((exp, i) => (
            <StaggerItem key={i}>
              <motion.div
                className="group relative grid gap-4 border-l border-white/10 py-8 pl-8 md:grid-cols-[200px_1fr] md:gap-12"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background transition-colors group-hover:bg-accent" />

                {/* Period */}
                <div className="text-sm text-muted">{exp.period}</div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-accent" />
                    <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{exp.description}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
