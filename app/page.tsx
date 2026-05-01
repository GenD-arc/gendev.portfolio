// app/page.tsx
"use client";

import { useTheme } from "./components/theme-provider";
import { ErrorBoundary } from "./components/error-boundary";
import Navbar from "./components/navbar";
import Hero from "./components/sections/hero";
import About from "./components/sections/about";
import Skills from "./components/sections/skills";
import Projects from "./components/sections/projects";
import Contact from "./components/sections/contact";
import Footer from "./components/footer";

export default function Home() {
  const { replayKey } = useTheme();

  return (
    <main className="relative">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <ErrorBoundary key={`hero-${replayKey}`}>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary key={`about-${replayKey}`}>
        <About />
      </ErrorBoundary>
      <ErrorBoundary key={`skills-${replayKey}`}>
        <Skills />
      </ErrorBoundary>
      <ErrorBoundary key={`projects-${replayKey}`}>
        <Projects />
      </ErrorBoundary>
      <ErrorBoundary key={`contact-${replayKey}`}>
        <Contact />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </main>
  );
}