// app/components/sections/projects.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../theme-provider";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { SpringBorder, SummerBorder, AutumnBorder, WinterBorder } from "../seasonal-borders";

const projects = [
  { title: "Nebula Dashboard", description: "Real-time analytics dashboard with stunning data visualizations.", tags: ["Next.js", "TypeScript", "D3.js", "Tailwind CSS"], category: "web", color: "#7C3AED", year: "2024", role: "Full-stack Developer" },
  { title: "FlowPay Mobile", description: "Cross-platform fintech with biometric authentication.", tags: ["Flutter", "Dart", "Firebase", "Stripe"], category: "mobile", color: "#E85D3A", year: "2024", role: "Mobile Developer" },
  { title: "Terra Marketplace", description: "Full-stack e-commerce with AI-powered recommendations.", tags: ["Next.js", "Node.js", "PostgreSQL", "Redis"], category: "web", color: "#5B9BD5", year: "2023", role: "Full-stack Developer" },
  { title: "Lumen Fitness", description: "Fitness tracking with custom plans and social features.", tags: ["Flutter", "Node.js", "MongoDB", "WebSockets"], category: "mobile", color: "#F5C842", year: "2023", role: "Mobile Developer" },
  { title: "Aether Blog", description: "Minimalist blogging platform with MDX and RSS support.", tags: ["Next.js", "MDX", "Vercel", "Prisma"], category: "web", color: "#7C6F9E", year: "2023", role: "Full-stack Developer" },
  { title: "Prism Design System", description: "Accessible UI component library with full documentation.", tags: ["React", "Storybook", "CSS Modules", "Jest"], category: "design", color: "#FF6B6B", year: "2022", role: "Design Engineer" },
];

const categories = ["all", "web", "mobile", "design"];

const seasonalAnims = {
  spring: {
    item: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
  summer: {
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  autumn: {
    item: { hidden: { opacity: 0, x: -15, y: 20 }, visible: { opacity: 1, x: 0, y: 0 } },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
  winter: {
    item: { hidden: { opacity: 0, y: 15, filter: "blur(2px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

const slideTransition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };

export default function Projects() {
  const { theme, themeName } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const anim = seasonalAnims[themeName] || seasonalAnims.winter;
  const viewportConfig = { once: true, margin: "-60px" };
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setCurrentIndex(0);
      setDirection(0);
    });
    return () => cancelAnimationFrame(frame);
  }, [activeCategory]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return filtered.length - 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  };

  const getBorderDecoration = (color: string) => {
    switch (themeName) {
      case "spring": return <SpringBorder color={color} size="small" />;
      case "summer": return <SummerBorder color={color} size="small" />;
      case "autumn": return <AutumnBorder color={color} size="small" />;
      case "winter": return <WinterBorder color={color} size="small" />;
      default: return null;
    }
  };

  const currentProject = filtered[currentIndex];

  if (!mounted) {
    return (
      <section id="projects" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Portfolio</span>
            <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)" }}>Selected work</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Portfolio</span>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)", margin: "0 0 8px", lineHeight: 1.15 }}>
          Selected <span style={{ color: theme.colors.primary }}>work</span>
        </h2>
        <p style={{ fontSize: "0.9rem", color: theme.colors.textSecondary, opacity: 0.5, margin: 0 }}>
          A few projects I&apos;m proud of
        </p>
      </motion.div>

      {/* Filter pills */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "48px", flexWrap: "wrap" }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat} onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            style={{
              padding: "7px 18px", borderRadius: "9999px", fontSize: "0.78rem", fontWeight: 500,
              textTransform: "capitalize", cursor: "pointer",
              border: `1px solid ${activeCategory === cat ? theme.colors.primary : theme.colors.border}`,
              backgroundColor: activeCategory === cat ? theme.colors.primary : "transparent",
              color: activeCategory === cat ? "#fff" : theme.colors.textSecondary,
              transition: "all 0.25s", position: "relative", overflow: "visible",
            }}
          >
            {activeCategory === cat && getBorderDecoration(theme.colors.primary)}
            <span style={{ position: "relative", zIndex: 1 }}>{cat}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Carousel */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        ref={carouselRef}
        style={{ position: "relative", maxWidth: "750px", margin: "0 auto" }}
      >
        <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15}
          onDragStart={() => setCurrentIndex(currentIndex)} onDragEnd={handleDragEnd}
          style={{ cursor: "grab", position: "relative" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentProject.title}
              custom={direction}
              variants={slideVariants}
              transition={slideTransition}
              initial="enter" animate="center" exit="exit"
              style={{
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {getBorderDecoration(currentProject.color)}

              {/* Image area — sleeker */}
              <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${currentProject.color}80 0%, ${currentProject.color}20 50%, ${theme.colors.surface} 100%)` }} />
                
                {/* Abstract geometric shapes */}
                <div style={{ position: "absolute", top: "30px", right: "30px", width: "100px", height: "100px", borderRadius: "50%", border: `2px solid ${currentProject.color}30` }} />
                <div style={{ position: "absolute", bottom: "-40px", left: "-20px", width: "160px", height: "160px", borderRadius: "50%", background: `radial-gradient(circle, ${currentProject.color}15, transparent 70%)` }} />
                <div style={{ position: "absolute", top: "60px", left: "40px", width: "60px", height: "4px", borderRadius: "2px", background: `${currentProject.color}40`, transform: "rotate(-20deg)" }} />

                {/* Category badge */}
                <div style={{
                  position: "absolute", top: "20px", left: "20px",
                  padding: "5px 14px", borderRadius: "9999px",
                  fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
                  backgroundColor: `${theme.colors.surface}dd`, backdropFilter: "blur(8px)",
                  border: `1px solid ${theme.colors.border}`, color: currentProject.color,
                }}>
                  {currentProject.category}
                </div>

                {/* Year badge */}
                <div style={{
                  position: "absolute", top: "20px", right: "20px",
                  padding: "5px 12px", borderRadius: "9999px",
                  fontSize: "0.68rem", fontWeight: 500,
                  backgroundColor: `${theme.colors.surface}dd`, backdropFilter: "blur(8px)",
                  border: `1px solid ${theme.colors.border}`, color: theme.colors.textSecondary,
                }}>
                  {currentProject.year}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "32px 32px 28px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.5rem", color: theme.colors.text, fontFamily: "var(--font-space)", margin: 0 }}>
                    {currentProject.title}
                  </h3>
                  <span style={{ fontSize: "0.72rem", color: theme.colors.textSecondary, opacity: 0.5 }}>{currentProject.role}</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: theme.colors.textSecondary, lineHeight: 1.6, margin: "0 0 20px" }}>
                  {currentProject.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {currentProject.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "4px 10px", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 500,
                      backgroundColor: `${currentProject.color}08`, color: currentProject.color,
                      border: `1px solid ${currentProject.color}15`,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Arrows */}
        <button onClick={() => paginate(-1)}
          style={{ position: "absolute", top: "50%", left: "-18px", transform: "translateY(-50%)", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}`, color: theme.colors.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", zIndex: 5, backdropFilter: "blur(12px)", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.color = theme.colors.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.color = theme.colors.text; }}
        >←</button>
        <button onClick={() => paginate(1)}
          style={{ position: "absolute", top: "50%", right: "-18px", transform: "translateY(-50%)", width: "40px", height: "40px", borderRadius: "50%", backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}`, color: theme.colors.text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", zIndex: 5, backdropFilter: "blur(12px)", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.color = theme.colors.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.color = theme.colors.text; }}
        >→</button>
      </motion.div>

      {/* Dots + counter */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginTop: "28px" }}
      >
        <span style={{ fontSize: "0.7rem", color: theme.colors.textSecondary, opacity: 0.4, minWidth: "40px", textAlign: "right" }}>
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          {filtered.map((_, index) => (
            <button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }}
              style={{ width: index === currentIndex ? "20px" : "6px", height: "6px", borderRadius: "3px", border: "none", cursor: "pointer", backgroundColor: index === currentIndex ? theme.colors.primary : `${theme.colors.textSecondary}25`, transition: "all 0.3s ease" }}
            />
          ))}
        </div>
        <span style={{ fontSize: "0.7rem", color: theme.colors.textSecondary, opacity: 0.4, minWidth: "40px" }}>
          {String(filtered.length).padStart(2, "0")}
        </span>
      </motion.div>
    </section>
  );
}