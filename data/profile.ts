// ─── Types ───
interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category: "web" | "mobile" | "design";
  color: string;
  year: string;
  result: string;
}

// ─── Profile ───
export const profile = {
  name: "Genesis Perez",
  title: "Freelance Web & Mobile Developer",
  tagline: "I build high-performance web & mobile apps that users love.",
  bio: "I'm Genesis — a freelance developer with 5+ years of experience crafting performant web and mobile applications. I partner with startups and agencies to ship products that users love.",
  email: "zerepgen@gmail.com",
  location: "Quezon Province — Philippines",
  availability: "Available for projects",
  socials: {
    github: "https://github.com/GenD-arc",
    linkedin: "https://linkedin.com/in/genesisperez",
    twitter: "https://twitter.com/genesisperez",
  },
};

// ─── Skills ───
export const skills = [
  { name: "Next.js", level: 95, category: "Frontend" as const },
  { name: "React", level: 95, category: "Frontend" as const },
  { name: "HTML / CSS", level: 98, category: "Frontend" as const },
  { name: "Tailwind CSS", level: 92, category: "Frontend" as const },
  { name: "Node.js", level: 85, category: "Backend" as const },
  { name: "Express", level: 85, category: "Backend" as const },
  { name: "REST APIs", level: 90, category: "Backend" as const },
  { name: "Flutter", level: 90, category: "Mobile" as const },
  { name: "TypeScript", level: 90, category: "Language" as const },
  { name: "JavaScript", level: 95, category: "Language" as const },
  { name: "Git / GitHub", level: 88, category: "Tools" as const },
  { name: "Figma", level: 75, category: "Design" as const },
];

// ─── Services ───
export const services = [
  { title: "Web Development", desc: "Next.js, React, TypeScript — fast, SEO-optimized, scalable.", icon: "🌐" },
  { title: "Mobile Apps", desc: "Cross-platform Flutter apps with native performance.", icon: "📱" },
  { title: "UI/UX Design", desc: "Clean interfaces that convert visitors into customers.", icon: "🎨" },
  { title: "API Architecture", desc: "Robust backends with Node.js, Express & REST APIs.", icon: "⚙️" },
];

// ─── Projects ───
export const projects: Project[] = [
  {
    title: "Nebula Dashboard",
    description: "Real-time analytics with stunning visualizations.",
    image: "/projects/nebula.png",
    tags: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS"],
    category: "web",
    color: "#7C3AED",
    year: "2024",
    result: "40% faster load times",
  },
  {
    title: "FlowPay Mobile",
    description: "Cross-platform fintech with biometric auth.",
    tags: ["Flutter", "Dart", "Firebase", "Stripe"],
    category: "mobile",
    color: "#E85D3A",
    year: "2024",
    result: "50k+ downloads",
  },
  {
    title: "Terra Marketplace",
    description: "E-commerce with AI-powered recommendations.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    category: "web",
    color: "#5B9BD5",
    year: "2023",
    result: "30% revenue increase",
  },
  {
    title: "Lumen Fitness",
    description: "Fitness tracking with custom plans.",
    tags: ["Flutter", "Node.js", "MongoDB", "WebSockets"],
    category: "mobile",
    color: "#F5C842",
    year: "2023",
    result: "4.8★ App Store",
  },
  {
    title: "Aether Blog",
    description: "Minimalist blogging with MDX and RSS.",
    tags: ["Next.js", "MDX", "Vercel", "Prisma"],
    category: "web",
    color: "#7C6F9E",
    year: "2023",
    result: "10k monthly readers",
  },
  {
    title: "Prism Design System",
    description: "Accessible UI library with full docs.",
    tags: ["React", "Storybook", "CSS Modules", "Jest"],
    category: "design",
    color: "#FF6B6B",
    year: "2022",
    result: "Used by 3 teams",
  },
];

// ─── Testimonials ───
export const testimonials = [
  {
    quote: "Genesis delivered our dashboard ahead of schedule. The attention to detail was remarkable.",
    name: "Sarah Chen",
    role: "CTO, Nebula Analytics",
    color: "#7C3AED",
  },
  {
    quote: "Working with Genesis felt like having an in-house senior developer. Clean code, clear communication.",
    name: "Marcus Torres",
    role: "Founder, FlowPay",
    color: "#E85D3A",
  },
  {
    quote: "Genesis built our e-commerce platform with performance I didn't think was possible on our budget.",
    name: "Elena Rodriguez",
    role: "Product Lead, Terra Market",
    color: "#5B9BD5",
  },
];

// ─── Navigation ───
export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#testimonials", label: "Praise" },
  { href: "#contact", label: "Contact" },
];