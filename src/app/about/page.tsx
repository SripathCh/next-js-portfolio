import type { Metadata } from "next";
import AboutBio from "@/components/sections/about-bio";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about my background, skills, and experience as a full-stack developer.",
};
import AboutSkills from "@/components/sections/about-skills";
import AboutExperience from "@/components/sections/about-experience";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutBio />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <AboutSkills />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <AboutExperience />
    </main>
  );
}
