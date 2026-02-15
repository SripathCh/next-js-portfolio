import type { MetadataRoute } from "next";

// Next.js auto-generates /robots.txt from this file
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://your-portfolio.vercel.app/sitemap.xml", // Update after deploying
  };
}
