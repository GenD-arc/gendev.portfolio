// app/components/sections/skills.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../theme-provider";
import { motion } from "framer-motion";
import { SpringBorder, SummerBorder, AutumnBorder, WinterBorder } from "../seasonal-borders";

type SkillCategory = "Frontend" | "Backend" | "Mobile" | "Language" | "Tools" | "Design";

const skillsByCategory: Record<SkillCategory, { name: string; level: number }[]> = {
  Frontend: [
    { name: "Next.js", level: 95 },
    { name: "React", level: 95 },
    { name: "HTML / CSS", level: 98 },
    { name: "Tailwind CSS", level: 92 },
  ],
  Backend: [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 85 },
    { name: "REST APIs", level: 90 },
  ],
  Mobile: [
    { name: "Flutter", level: 90 },
  ],
  Language: [
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 95 },
  ],
  Tools: [
    { name: "Git / GitHub", level: 88 },
  ],
  Design: [
    { name: "Figma", level: 75 },
  ],
};

const categoryMeta: Record<SkillCategory, { color: string; icon: string; label: string }> = {
  Frontend: { color: "#60A5FA", icon: "◢", label: "Frontend" },
  Backend:  { color: "#34D399", icon: "◯", label: "Backend" },
  Mobile:   { color: "#A78BFA", icon: "◇", label: "Mobile" },
  Language: { color: "#FBBF24", icon: "⬡", label: "Languages" },
  Tools:    { color: "#F472B6", icon: "◫", label: "Tools" },
  Design:   { color: "#FB923C", icon: "△", label: "Design" },
};

const seasonalAnims = {
  spring: {
    item: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.06,
  },
  summer: {
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.05,
  },
  autumn: {
    item: { hidden: { opacity: 0, x: -15, y: 20 }, visible: { opacity: 1, x: 0, y: 0 } },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.07,
  },
  winter: {
    item: { hidden: { opacity: 0, y: 15, filter: "blur(2px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.07,
  },
};

export default function Skills() {
  const { theme, themeName } = useTheme();
  const sectionRef = useRef(null);
  const [columns, setColumns] = useState(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setColumns(1);
      else if (w < 1024) setColumns(2);
      else setColumns(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const anim = seasonalAnims[themeName] || seasonalAnims.winter;
  const viewportConfig = { once: true, margin: "-60px" };

  const getBorderDecoration = (category: SkillCategory) => {
    const color = categoryMeta[category].color;
    switch (themeName) {
      case "spring": return <SpringBorder color={color} size="small" />;
      case "summer": return <SummerBorder color={color} size="small" />;
      case "autumn": return <AutumnBorder color={color} size="small" />;
      case "winter": return <WinterBorder color={color} size="small" />;
      default: return null;
    }
  };

  if (!mounted) {
    return (
      <section id="skills" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Tech stack</span>
        </div>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)" }}>
          Technologies I work with
        </h2>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      {/* Header */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ marginBottom: "48px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>
            Tech stack
          </span>
        </div>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
          color: theme.colors.text, fontFamily: "var(--font-space)",
          margin: 0, lineHeight: 1.15, maxWidth: "500px",
        }}>
          Technologies
          <br />
          <span style={{ color: theme.colors.primary }}>I work with</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "16px" }}>
        {(Object.keys(skillsByCategory) as SkillCategory[]).map((category, catIndex) => {
          const meta = categoryMeta[category];
          const skills = skillsByCategory[category];

          return (
            <motion.div
              key={category}
              variants={anim.item}
              transition={{ ...anim.transition, delay: catIndex * anim.stagger }}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              whileHover={{ y: -2 }}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: "16px",
                padding: "24px",
                border: `1px solid ${theme.colors.border}`,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${meta.color}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; }}
            >
              {getBorderDecoration(category)}

              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", position: "relative", zIndex: 1 }}>
                <span style={{
                  fontSize: "1.3rem",
                  color: meta.color,
                  fontWeight: 700,
                }}>
                  {meta.icon}
                </span>
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: meta.color,
                }}>
                  {meta.label}
                </span>
              </div>

              {/* Skills — tag style instead of bars */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", position: "relative", zIndex: 1 }}>
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "8px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      backgroundColor: `${meta.color}10`,
                      color: meta.color,
                      border: `1px solid ${meta.color}20`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Subtle level indicator stripe at bottom */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `${theme.colors.border}`,
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(...skills.map(s => s.level))}%` }}
                  viewport={viewportConfig}
                  transition={{ duration: 1, delay: 0.3 + catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: "100%",
                    background: meta.color,
                    opacity: 0.6,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.p
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{
          fontSize: "0.75rem", color: theme.colors.textSecondary,
          opacity: 0.4, marginTop: "28px", textAlign: "right",
        }}
      >
        {themeName === "spring" && "🌱 Always growing — exploring Rust & WASM"}
        {themeName === "summer" && "☀️ In my element with these tools"}
        {themeName === "autumn" && "🍂 Years of practice, distilled"}
        {themeName === "winter" && "❄️ Sharpening for what's next"}
      </motion.p>
    </section>
  );
}