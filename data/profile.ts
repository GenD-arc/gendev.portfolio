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
  features?: string[];
  link?: string;
}

// ─── Profile ───
export const profile = {
  name: "Genesis Perez",
  title: "Freelance Web & Mobile Developer",
  tagline: "I build high-performance web & mobile apps that users love.",
  bio: "I'm Genesis — a freelance developer with 1+ years of experience crafting performant web and mobile applications. I am a graduating Computer Science student from Manuel S. Enverga University Foundation-Candelaria Inc. and currently seeking for employment opportunities.",
  email: "zerepgen@gmail.com",
  location: "Quezon Province — Philippines",
  availability: "Available for projects/employment",
  socials: {
    github: "https://github.com/GenD-arc",
    linkedin: "https://www.linkedin.com/in/genesis-perez-018052370",
    email: "zerepgen@gmail.com",
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
  { name: "Dart", level: 90, category: "Mobile" as const },
  { name: "TypeScript", level: 90, category: "Language" as const },
  { name: "JavaScript", level: 95, category: "Language" as const },
  { name: "GitHub", level: 88, category: "Tools" as const },
  { name: "CleverCloud", level: 88, category: "Tools" as const },
  { name: "Render", level: 88, category: "Tools" as const },
  { name: "MySQL", level: 88, category: "Database" as const },
];

// ─── Services ───
export const services = [
  { title: "Web Development", desc: "Next.js, React, TypeScript — fast, and scalable.", icon: "🌐" },
  { title: "Mobile Apps", desc: "Cross-platform Flutter apps with native performance.", icon: "📱" },
  { title: "Frontend Design", desc: "Clean interfaces that convert visitors into customers.", icon: "🎨" },
  { title: "API Architecture", desc: "Robust backends with Node.js, Express & REST APIs.", icon: "⚙️" },
];

// ─── Projects ───
export const projects: Project[] = [
  {
    title: "MSEUF-CI Resource Booking Portal",
    description: "Automated booking system for university resources with real-time availability.",
    tags: ["Flutter", "Dart", "Node.js", "Express", "MySQL"],
    category: "web",
    color: "#7C3AED",
    year: "2025",
    result: "50-60% reduction in booking conflicts",
    features: [
      "Real-time resource availability calendar",
      "Role-based access (Superadmin, Admin, User)",
      "Status tracking for bookings (pending, approved, rejected)",
      "Booking conflict detection & resolution",
      "Responsive design for all devices",
      "Analytics dashboard for resource utilization and user activity",
    ],
  },
  {
    title: "qTask Kanban App",
    description: "Task management web app with real-time collaboration and analytics.",
    tags: ["C#", "ASP.NET Core", "React", "SQL Server", "ApexCharts", "SortableJS"],
    category: "web",
    color: "#7C3AED",
    year: "2026",
    result: "To be used by an IT Company for internal task management",
    features: [
      "Drag-and-drop Kanban board with real-time updates",
      "User authentication and role-based access control",
      "Task details with comments, attachments, and activity log",
      "Analytics dashboard for task progress and team performance",
      "Responsive design for desktop and mobile",
      "Status tracking for tasks (to do, in progress, done)",
      "Risk level indicators based on due dates and activity",
      "Customizable workflows and task templates",
      "Sophisticated design with smooth animations and intuitive UI",
    ],
  },
  {
    title: "GAJA Sari-Sari Store App",
    description: "Offline-first inventory and sales app for local sari-sari stores with analytics.",
    tags: ["Flutter", "Dart"],
    category: "mobile",
    color: "#E85D3A",
    year: "2026",
    result: "Not yet launched",
    features: [
      "Offline-first architecture — works without internet",
      "Inventory management with stock alerts",
      "Sales tracking with daily/weekly reports",
      "Profit margin calculator per product",
      "Analytics dashboard for sales trends and inventory turnover",
      "User-friendly interface and easy to navigate",
      "Notifications for low stock, and utang alerts",
    ],
  },
  {
    title: "EcoSense Mobile App",
    description: "Mobile app to help users track the status of the enviroment(temperature, humidity, etc.) around their plants with indicators and warnings.",
    tags: ["Flutter", "Dart", "Node.js", "Arduino Uno Kit"],
    category: "mobile",
    color: "#E85D3A",
    year: "2026",
    result: "Won first place in a local arduino exhibit",
    features: [
      "Real-time environmental monitoring with sensor integration",
      "User-friendly interface with plant care tips and reminders",
      "Data visualization with charts for temperature, humidity, and soil moisture",
    ]
  },
  {
    title: "Web Portfolio",
    description: "Personal portfolio showcasing projects, skills, and contact info with a seasonal theme.",
    tags: ["Next.js", "React", "Framer Motion", "TypeScript"],
    category: "web",
    color: "#5B9BD5",
    year: "2026",
    result: "Live at https://gendev-portfolio.vercel.app/",
    //link: "https://genesis-perez.com",
    features: [
      "Four-season dynamic theme system",
      "Custom cursor with seasonal effects",
      "Responsive design for all devices",
      "Centralized data management",
      "Contact form with email integration",
      "Performance-optimized animations",
    ],
  },
  {
    title: "Flu Awareness Campaign Micropage",
    description: "One-page campaign site to educate users about flu prevention.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    color: "#7C6F9E",
    year: "2026",
    result: "Used in local health campaigns",
    link: "https://flu-vax.com",
    features: [
      "Mobile-friendly single page design",
      "Fast load time under 2 seconds",
      "Educational content with engaging visuals",
      "Can be accessed through QR code from printed materials",
    ],
  },
  {
    title: "EMRC Seat Reservation System",
    description: "Web-based seat reservation system for EMRC events",
    tags: ["PHP", "MySQL", "JavaScript"],
    category: "web",
    color: "#FF6B6B",
    year: "2025",
    result: "School project, not launched",
    features: [
      "Real-time seat availability updates",
      "Admin panel for event management",
      "Handles multiple events with separate seating arrangements",
      "Handles blocking of seats for reservations, maintenance, or vip guests",
      "User-friendly interface for easy booking",
    ],
  },
];

// ─── Testimonials ───
export const testimonials = [
  {
    quote: "The GAJA app transformed how we manage our inventory and sales. It's a game-changer for small businesses like ours.",
    name: "Maria Santos",
    role: "Sari-Sari Store Owner",
    color: "#5B9BD5",
  }
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