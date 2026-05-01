// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import ThemeToggle from "./components/theme-toggle";
import ThemeBackground from "./components/theme-background";
import { ErrorBoundary } from "./components/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Genesis Perez | Freelance Web & Mobile Developer",
  description:
    "Genesis Perez — freelance web & mobile developer crafting performant, beautiful applications with Next.js, React, and Flutter. Available for projects worldwide.",
  keywords: [
    "web developer",
    "mobile developer",
    "freelancer",
    "Next.js",
    "Flutter",
    "React",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Genesis Perez" }],
  creator: "Genesis Perez",
  openGraph: {
    title: "Genesis Perez | Web & Mobile Developer",
    description: "Crafting performant, beautiful applications with Next.js, React, and Flutter.",
    type: "website",
    locale: "en_US",
    siteName: "Genesis Perez Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genesis Perez | Web & Mobile Developer",
    description: "Crafting performant, beautiful applications with Next.js, React, and Flutter.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        className="font-sans antialiased"
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#0a0a1a",
          color: "#ffffff",
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <ThemeBackground />
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}