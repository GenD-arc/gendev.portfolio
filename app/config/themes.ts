// config/themes.ts
import { ThemeConfig } from "../types/theme";

export const themes: ThemeConfig[] = [
  {
    name: "spring",
    label: "Spring",
    timeRange: [3, 5], // March - May
    colors: {
      primary: "#EC4899",    // Pink
      secondary: "#A78BFA",  // Soft purple
      accent: "#F9A8D4",     // Light pink
      background: "from-[#1a0a1e] via-[#2d1540] to-[#1a2a1a]",
      surface: "rgba(255, 255, 255, 0.06)",
      text: "#FCE7F3",
      textSecondary: "#D8B4FE",
      gradient: "from-[#EC4899] to-[#A78BFA]",
      border: "rgba(236, 72, 153, 0.2)",
    },
    icon: "🌸",
  },
  {
    name: "summer",
    label: "Summer",
    timeRange: [6, 8], // June - August
    colors: {
      primary: "#F59E0B",    // Amber
      secondary: "#60A5FA",  // Sky blue
      accent: "#FCD34D",     // Golden
      background: "from-[#0d2848] via-[#1a5090] to-[#2870b8]",
      surface: "rgba(255, 255, 255, 0.07)",
      text: "#FEF3C7",
      textSecondary: "#93C5FD",
      gradient: "from-[#F59E0B] to-[#60A5FA]",
      border: "rgba(245, 158, 11, 0.2)",
    },
    icon: "☀️",
  },
  {
    name: "autumn",
    label: "Autumn",
    timeRange: [9, 11], // September - November
    colors: {
      primary: "#F97316",    // Orange
      secondary: "#EF4444",  // Red
      accent: "#FBBF24",     // Amber gold
      background: "from-[#1a0a05] via-[#3d1a0a] to-[#5c2010]",
      surface: "rgba(255, 255, 255, 0.05)",
      text: "#FFF7ED",
      textSecondary: "#FCA5A5",
      gradient: "from-[#F97316] to-[#EF4444]",
      border: "rgba(249, 115, 22, 0.2)",
    },
    icon: "🍂",
  },
  {
    name: "winter",
    label: "Winter",
    timeRange: [12, 2], // December - February
    colors: {
      primary: "#60A5FA",    // Ice blue
      secondary: "#E0E7FF",  // Frost white
      accent: "#93C5FD",     // Light blue
      background: "from-[#050a1a] via-[#0d1835] to-[#132050]",
      surface: "rgba(255, 255, 255, 0.04)",
      text: "#EFF6FF",
      textSecondary: "#BFDBFE",
      gradient: "from-[#60A5FA] to-[#E0E7FF]",
      border: "rgba(96, 165, 250, 0.2)",
    },
    icon: "❄️",
  },
];

export function getThemeByMonth(month: number): ThemeConfig {
  if (month >= 3 && month <= 5) return themes[0]; // Spring
  if (month >= 6 && month <= 8) return themes[1]; // Summer
  if (month >= 9 && month <= 11) return themes[2]; // Autumn
  return themes[3]; // Winter (Dec, Jan, Feb)
}