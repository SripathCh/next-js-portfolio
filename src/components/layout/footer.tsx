"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";
import { socialLinks, personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <FadeIn>
      <footer className="border-t border-white/10 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <p className="text-sm text-muted">
            Built with Next.js &amp; TypeScript
          </p>
        </div>
      </footer>
    </FadeIn>
  );
}
