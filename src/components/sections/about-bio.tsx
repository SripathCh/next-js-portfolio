"use client";

import { motion } from "framer-motion";
import { SlideIn, FadeIn } from "@/components/ui/motion";
import { personalInfo } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function AboutBio() {
  return (
    <section className="px-6 pt-32 pb-20">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.5fr]">
        {/* Left: Photo placeholder + quick info */}
        <SlideIn direction="left">
          <div className="flex flex-col gap-6">
            {/* Photo placeholder — a styled div until you add a real image */}
            <motion.div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Gradient placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-oswald)] text-6xl font-bold uppercase text-white/10">
                  {personalInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            </motion.div>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5" />
                {personalInfo.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-accent">
                Available for work
              </span>
            </div>
          </div>
        </SlideIn>

        {/* Right: Bio text */}
        <div className="flex flex-col justify-center">
          <FadeIn>
            <span className="text-sm uppercase tracking-[0.3em] text-accent">About Me</span>
          </FadeIn>

          <SlideIn direction="right" delay={0.1}>
            <h2 className="mt-4 font-[family-name:var(--font-oswald)] text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Building the web,
              <br />
              <span className="text-stroke">one pixel at a time</span>
            </h2>
          </SlideIn>

          <div className="mt-8 space-y-5">
            {personalInfo.bio.map((paragraph, i) => (
              <FadeIn key={i} delay={0.2 + i * 0.1}>
                <p className="text-base leading-relaxed text-muted">{paragraph}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
