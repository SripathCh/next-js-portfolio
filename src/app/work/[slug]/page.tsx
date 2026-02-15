import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetail from "@/components/sections/project-detail";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static pages for all known project slugs at build time
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Dynamic metadata per project
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find adjacent projects for prev/next navigation
  const currentIndex = projects.indexOf(project);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      <ProjectDetail
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}
