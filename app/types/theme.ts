export type ThemeName = "spring" | "summer" | "autumn" | "winter";

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  timeRange: [number, number]; // [startMonth, endMonth] — 1-12
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    gradient: string;
    border: string;
  };
  icon: string;
}