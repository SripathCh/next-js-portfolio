import type { Metadata } from "next";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description: "Browse my portfolio of projects — full-stack applications, AI tools, and more.",
};
import ProjectCard from "@/components/sections/project-card";
import WorkHeader from "@/components/sections/work-header";

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <WorkHeader />

      {/* Project Grid */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
