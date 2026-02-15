import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

// Next.js auto-generates /sitemap.xml from this file
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-portfolio.vercel.app"; // Update after deploying

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/work`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...projectUrls,
  ];
}
