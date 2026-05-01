"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../../data/profile";

const categories = ["all", "web", "mobile", "design"];
const INITIAL_COUNT = 6;
const MOBILE_INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 6;
const MOBILE_LOAD_MORE_COUNT = 4;

const seasonalAnims = {
  spring: { item: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  summer: { item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  autumn: { item: { hidden: { opacity: 0, x: -15, y: 20 }, visible: { opacity: 1, x: 0, y: 0 } }, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
  winter: { item: { hidden: { opacity: 0, y: 15, filter: "blur(2px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Projects() {
  const { theme, themeName } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const count = window.innerWidth < 768 ? MOBILE_INITIAL_COUNT : INITIAL_COUNT;
    const frame = requestAnimationFrame(() => setVisibleCount(count));
    return () => cancelAnimationFrame(frame);
  }, [activeCategory]);

  const anim = seasonalAnims[themeName] || seasonalAnims.winter;
  const viewportConfig = { once: true, margin: "-60px" };
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);
  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  const handleLoadMore = () => {
    const increment = isMobile ? MOBILE_LOAD_MORE_COUNT : LOAD_MORE_COUNT;
    setVisibleCount((prev) => Math.min(prev + increment, filtered.length));
  };

  if (!mounted) {
    return (
      <section id="projects" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
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
        style={{ marginBottom: "48px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Portfolio</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)", margin: 0, lineHeight: 1.15 }}>
            Selected <span style={{ color: theme.colors.primary }}>work</span>
          </h2>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <motion.button
                key={cat} onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{
                  padding: "5px 14px", borderRadius: "9999px", fontSize: "0.72rem", fontWeight: 500,
                  textTransform: "capitalize", cursor: "pointer",
                  border: `1px solid ${activeCategory === cat ? theme.colors.primary : theme.colors.border}`,
                  backgroundColor: activeCategory === cat ? theme.colors.primary : "transparent",
                  color: activeCategory === cat ? "#fff" : theme.colors.textSecondary,
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2-Column Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: "20px",
      }}>
        <AnimatePresence>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                transition: "border-color 0.3s, transform 0.3s",
                transform: hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {/* Image area */}
              <div style={{ position: "relative", height: isMobile ? "200px" : "240px", overflow: "hidden" }}>
                {/* Gradient base */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(150deg, ${project.color}90 0%, ${project.color}30 40%, ${theme.colors.surface} 100%)`,
                  transition: "transform 0.6s ease",
                  transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                }} />

                {/* Actual image if available */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                )}

                {/* Color overlay on images */}
                {project.image && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(150deg, ${project.color}50 0%, transparent 50%, ${theme.colors.surface}80 100%)`,
                    pointerEvents: "none",
                  }} />
                )}

                {/* Decorative shapes */}
                <div style={{ position: "absolute", top: "24px", right: "24px", width: "60px", height: "60px", borderRadius: "50%", border: `1.5px solid ${project.color}25`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-20px", left: "-10px", width: "100px", height: "100px", borderRadius: "50%", background: `radial-gradient(circle, ${project.color}12, transparent 70%)`, pointerEvents: "none" }} />

                {/* Badges */}
                <div style={{ position: "absolute", top: "16px", left: "16px", display: "flex", gap: "8px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", backgroundColor: `${theme.colors.surface}dd`, backdropFilter: "blur(8px)", border: `1px solid ${theme.colors.border}`, color: project.color }}>
                    {project.category}
                  </span>
                  <span style={{ padding: "4px 10px", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: 500, backgroundColor: `${theme.colors.surface}dd`, backdropFilter: "blur(8px)", border: `1px solid ${theme.colors.border}`, color: theme.colors.textSecondary }}>
                    {project.year}
                  </span>
                </div>

                {/* Result on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute", bottom: "16px", left: "16px",
                    padding: "6px 14px", borderRadius: "9999px",
                    fontSize: "0.75rem", fontWeight: 600,
                    backgroundColor: `${project.color}dd`, color: "#fff",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {project.result}
                </motion.div>
              </div>

              {/* Content */}
              <div style={{ padding: "20px 24px 24px" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: theme.colors.text, fontFamily: "var(--font-space)", margin: "0 0 4px" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: theme.colors.textSecondary, lineHeight: 1.5, margin: "0 0 14px" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} style={{ padding: "3px 8px", borderRadius: "5px", fontSize: "0.68rem", fontWeight: 500, backgroundColor: `${project.color}06`, color: project.color, border: `1px solid ${project.color}12` }}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span style={{ padding: "3px 8px", borderRadius: "5px", fontSize: "0.68rem", color: theme.colors.textSecondary, opacity: 0.5 }}>
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More / Show Less */}
      {filtered.length > (isMobile ? MOBILE_INITIAL_COUNT : INITIAL_COUNT) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", marginTop: "32px" }}
        >
          {hasMore ? (
            <motion.button
              onClick={handleLoadMore}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "12px 32px", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 500,
                backgroundColor: "transparent", border: `1px solid ${theme.colors.border}`,
                color: theme.colors.text, cursor: "pointer", transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.color = theme.colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.color = theme.colors.text; }}
            >
              Show more ({remaining} remaining)
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setVisibleCount(isMobile ? MOBILE_INITIAL_COUNT : INITIAL_COUNT)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "12px 32px", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 500,
                backgroundColor: "transparent", border: `1px solid ${theme.colors.border}`,
                color: theme.colors.textSecondary, cursor: "pointer", transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.color = theme.colors.primary; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.color = theme.colors.textSecondary; }}
            >
              Show less ↑
            </motion.button>
          )}
        </motion.div>
      )}
    </section>
  );
}