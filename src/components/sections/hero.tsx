"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowDown } from "lucide-react";

// Split a string into individual characters for animation
function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
}) {
  return (
    <motion.span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${charClassName ?? ""}`}
          initial={{ opacity: 0, y: 80, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          // Each letter has a subtle hover lift
          whileHover={{ y: -8, color: "var(--accent)", transition: { duration: 0.2 } }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Scrolling marquee of roles/tags (like the reference site's repeating tagline)
function RoleMarquee() {
  const roles = [
    "FULL-STACK DEVELOPER",
    "AI ENTHUSIAST",
    "CREATIVE PROBLEM SOLVER",
    "TYPESCRIPT",
    "REACT",
    "NEXT.JS",
  ];

  const marqueeContent = roles.join(" \u2022 ");

  return (
    <div className="relative w-screen overflow-hidden py-6 border-y border-white/5">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Duplicate content for seamless loop */}
        {[0, 1].map((copy) => (
          <span
            key={copy}
            className="text-sm md:text-base tracking-[0.3em] uppercase text-muted font-light"
          >
            {marqueeContent} &bull; {marqueeContent} &bull;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Animated scroll-down indicator
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <span className="text-xs uppercase tracking-[0.3em] text-muted">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-4 w-4 text-muted" />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax: the name drifts up as you scroll down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Split name into first and last for the stacked layout
  const nameParts = personalInfo.name.split(" ");
  const firstName = nameParts[0] || "YOUR";
  const lastName = nameParts.slice(1).join(" ") || "NAME";

  return (
    <>
      <section
        ref={containerRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* Subtle radial gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,108,255,0.08)_0%,_transparent_70%)]" />

        {/* Grain overlay for texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Animated name */}
        <motion.div style={{ y: nameY, opacity }} className="relative z-10 text-center">
          {/* First name */}
          <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.9] tracking-tighter">
            <SplitText text={firstName} delay={0.3} />
          </h1>

          {/* Last name — outlined style for contrast */}
          <h1 className="font-[family-name:var(--font-oswald)] text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.9] tracking-tighter text-stroke">
            <SplitText text={lastName} delay={0.6} charClassName="text-stroke" />
          </h1>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-base md:text-lg text-muted tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mt-10"
          >
            <motion.a
              href="/work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:border-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <ArrowDown className="relative z-10 h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
              {/* Hover fill effect */}
              <span className="absolute inset-0 z-0 bg-accent/10 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            </motion.a>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* Role marquee sits right below the hero */}
      <RoleMarquee />
    </>
  );
}
