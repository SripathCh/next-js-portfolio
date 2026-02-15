import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/layout/smooth-scroll";
import AiChat from "@/components/ai-chat";
import CustomCursor from "@/components/ui/cursor";

// Inter — clean, modern body font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Oswald — bold display font for headings (similar to the reference site)
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Full-Stack Developer",
    template: "%s | Portfolio",
  },
  description:
    "Personal portfolio of a Full-Stack Developer & AI Enthusiast. Built with Next.js, TypeScript, and Framer Motion.",
  keywords: [
    "full-stack developer",
    "portfolio",
    "react",
    "next.js",
    "typescript",
    "AI",
    "web developer",
  ],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Portfolio | Full-Stack Developer",
    description:
      "Personal portfolio of a Full-Stack Developer & AI Enthusiast.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Full-Stack Developer",
    description:
      "Personal portfolio of a Full-Stack Developer & AI Enthusiast.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${oswald.variable} antialiased`}>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <AiChat />
          <CustomCursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
