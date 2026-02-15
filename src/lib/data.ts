// ============================================
// Portfolio Data — Edit this file to personalize
// ============================================

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  color: string; // accent color for hover effects per project
  link?: string;
  github?: string;
  year: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "ai";
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

// ----- Personal Info -----
export const personalInfo = {
  name: "Your Name",
  tagline: "Full-Stack Developer & AI Enthusiast",
  email: "your@email.com",
  resumeUrl: "/resume.pdf",
  location: "Your City, Country",
  bio: [
    "I'm a full-stack developer passionate about building beautiful, performant web applications. I thrive at the intersection of design and engineering, where creativity meets clean code.",
    "Currently focused on modern web technologies and exploring how AI can enhance developer workflows and user experiences. I believe the best products come from understanding both the technical and human side of problems.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or diving into the latest AI research.",
  ],
};

// ----- Skills -----
export const skills: Skill[] = [
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "Git", category: "tools" },
  { name: "Docker", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "Claude API", category: "ai" },
  { name: "OpenAI API", category: "ai" },
  { name: "Prompt Engineering", category: "ai" },
  { name: "LangChain", category: "ai" },
];

// ----- Experience -----
export const experience: Experience[] = [
  {
    role: "Full-Stack Developer",
    company: "Company Name",
    period: "2023 — Present",
    description:
      "Building scalable web applications with React, Next.js, and Node.js. Leading frontend architecture and implementing CI/CD pipelines.",
  },
  {
    role: "Junior Developer",
    company: "Previous Company",
    period: "2021 — 2023",
    description:
      "Developed responsive web interfaces and REST APIs. Collaborated with design teams to translate Figma mockups into pixel-perfect code.",
  },
];

// ----- Projects -----
export const projects: Project[] = [
  {
    slug: "ai-portfolio-chat",
    title: "AI Portfolio Chat",
    description: "An AI-powered chatbot embedded in my portfolio that answers questions about my experience.",
    longDescription:
      "Built with the Anthropic Claude API and Next.js API routes. Uses retrieval-augmented generation to answer visitor questions based on my resume and project data. Features streaming responses and a sleek chat UI with Framer Motion animations.",
    tags: ["Next.js", "TypeScript", "Claude API", "AI"],
    image: "/images/project-ai-chat.jpg",
    color: "#646cff",
    year: "2025",
  },
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce application with real-time inventory and Stripe payments.",
    longDescription:
      "End-to-end e-commerce solution featuring product catalog, cart management, Stripe checkout integration, and an admin dashboard. Built with Next.js, PostgreSQL, and Prisma ORM. Implements optimistic UI updates and real-time stock tracking.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Prisma"],
    image: "/images/project-ecommerce.jpg",
    color: "#10b981",
    year: "2024",
  },
  {
    slug: "task-manager",
    title: "Task Manager App",
    description: "A drag-and-drop Kanban board with real-time collaboration features.",
    longDescription:
      "Collaborative task management tool inspired by Trello. Features drag-and-drop cards, real-time updates via WebSockets, user authentication, and team workspaces. Responsive design works seamlessly on mobile and desktop.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/images/project-tasks.jpg",
    color: "#f59e0b",
    year: "2024",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    description: "A beautiful weather app with animated visualizations and 7-day forecasts.",
    longDescription:
      "Weather application pulling data from OpenWeatherMap API. Features animated weather icons, interactive charts for temperature/humidity trends, location search with autocomplete, and dark/light theme support.",
    tags: ["React", "TypeScript", "REST API", "Charts"],
    image: "/images/project-weather.jpg",
    color: "#3b82f6",
    year: "2023",
  },
];

// ----- Social Links -----
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/yourusername", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "linkedin" },
];
