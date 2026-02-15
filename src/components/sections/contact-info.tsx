"use client";

import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Mail, FileDown, Github, Linkedin, ArrowUpRight } from "lucide-react";

// Map icon name strings from data.ts to actual Lucide components
const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
};

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      {/* Email */}
      <FadeIn delay={0.1}>
        <div>
          <span className="text-xs uppercase tracking-widest text-muted">Email</span>
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="mt-2 flex items-center gap-3 text-lg text-white transition-colors hover:text-accent"
            whileHover={{ x: 4 }}
          >
            <Mail className="h-5 w-5 text-accent" />
            {personalInfo.email}
          </motion.a>
        </div>
      </FadeIn>

      {/* Location */}
      <FadeIn delay={0.2}>
        <div>
          <span className="text-xs uppercase tracking-widest text-muted">Location</span>
          <p className="mt-2 text-lg text-white">{personalInfo.location}</p>
        </div>
      </FadeIn>

      {/* Resume download */}
      <FadeIn delay={0.3}>
        <div>
          <span className="text-xs uppercase tracking-widest text-muted">Resume</span>
          <motion.a
            href={personalInfo.resumeUrl}
            download
            className="group mt-3 flex items-center gap-3 rounded-xl border border-white/10 px-5 py-4 text-sm transition-colors hover:border-accent/30 hover:bg-accent/5"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileDown className="h-5 w-5 text-accent" />
            <span className="flex-1">
              <span className="block font-medium text-white">Download Resume</span>
              <span className="text-xs text-muted">PDF format</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </FadeIn>

      {/* Social links */}
      <FadeIn delay={0.4}>
        <div>
          <span className="text-xs uppercase tracking-widest text-muted">Socials</span>
          <StaggerContainer className="mt-3 flex gap-3" staggerDelay={0.1}>
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] || Github;
              return (
                <StaggerItem key={link.name}>
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/10 px-5 py-3 text-sm transition-colors hover:border-accent/30 hover:bg-accent/5"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5 text-muted transition-colors group-hover:text-accent" />
                    <span className="text-muted transition-colors group-hover:text-white">
                      {link.name}
                    </span>
                  </motion.a>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </FadeIn>
    </div>
  );
}
