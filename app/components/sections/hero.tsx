// app/components/sections/hero.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../theme-provider";
import { motion } from "framer-motion";
import { SpringBorder, SummerBorder, AutumnBorder, WinterBorder } from "../seasonal-borders";
import { profile } from "../../../data/profile";

const seasonalAnims = {
  spring: {
    container: { hidden: {}, visible: {} },
    containerTransition: { staggerChildren: 0.15, delayChildren: 0.2 },
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    itemTransition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    buttonHover: { scale: 1.03, y: -2 },
    buttonTap: { scale: 0.97 },
  },
  summer: {
    container: { hidden: {}, visible: {} },
    containerTransition: { staggerChildren: 0.12, delayChildren: 0.15 },
    item: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    itemTransition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    buttonHover: { scale: 1.04, y: -3 },
    buttonTap: { scale: 0.96 },
  },
  autumn: {
    container: { hidden: {}, visible: {} },
    containerTransition: { staggerChildren: 0.18, delayChildren: 0.25 },
    item: { hidden: { opacity: 0, x: -20, y: 20, rotate: -1 }, visible: { opacity: 1, x: 0, y: 0, rotate: 0 } },
    itemTransition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
    buttonHover: { scale: 1.03, y: -2 },
    buttonTap: { scale: 0.97 },
  },
  winter: {
    container: { hidden: {}, visible: {} },
    containerTransition: { staggerChildren: 0.2, delayChildren: 0.3 },
    item: { hidden: { opacity: 0, y: 15, filter: "blur(3px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    itemTransition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    buttonHover: { scale: 1.03, y: -2 },
    buttonTap: { scale: 0.97 },
  },
};

const codeLines = [
  "const developer = {",
  `  name: "${profile.name}",`,
  '  stack: ["Next.js", "React", "Flutter"],',
  '  passion: "Building amazing UX",',
  "  available: true",
  "};",
];

export default function Hero() {
  const { theme, themeName } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const anim = seasonalAnims[themeName] || seasonalAnims.winter;

  const getSeasonalEmoji = () => {
    switch (themeName) {
      case "spring": return "🌸";
      case "summer": return "☀️";
      case "autumn": return "🍂";
      case "winter": return "❄️";
      default: return "💻";
    }
  };

  const getBorder = (size: "small" | "normal" = "normal") => {
    const color = theme.colors.primary;
    switch (themeName) {
      case "spring": return <SpringBorder color={color} size={size} />;
      case "summer": return <SummerBorder color={color} size={size} />;
      case "autumn": return <AutumnBorder color={color} size={size} />;
      case "winter": return <WinterBorder color={color} size={size} />;
      default: return null;
    }
  };

  const stats = [
    { value: "1+", label: "Years" },
    { value: "6", label: "Projects" },
    { value: "2", label: "Clients" },
  ];

  if (!mounted) {
    return (
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div>
          <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)" }}>
            {profile.name}
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {/* Ambient cursor glow — desktop only */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.colors.primary}06, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 0,
            transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: 0.6,
          }}
        />
      )}

      <motion.div
        variants={anim.container}
        transition={anim.containerTransition}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{
          width: "100%", zIndex: 10, paddingTop: isMobile ? "80px" : "60px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "40px" : "60px",
          alignItems: "center",
        }}
      >
        {/* Left column — Text */}
        <div>
          <motion.div variants={anim.item} transition={anim.itemTransition}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 16px", borderRadius: "9999px", fontSize: "0.7rem",
                fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em",
                backgroundColor: `${theme.colors.primary}10`,
                border: `1px solid ${theme.colors.primary}20`,
                color: theme.colors.primary, marginBottom: "32px",
                position: "relative", overflow: "visible",
              }}
            >
              {getBorder("small")}
              <span style={{ position: "relative", zIndex: 1 }}>{profile.availability}</span>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: theme.colors.primary,
                animation: "pulse 2s ease-in-out infinite",
                position: "relative", zIndex: 1,
              }} />
            </span>
          </motion.div>

          <motion.h1
            variants={anim.item} transition={anim.itemTransition}
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 700,
              lineHeight: 0.95, color: theme.colors.text,
              fontFamily: "var(--font-space)", margin: "0 0 8px",
              letterSpacing: "-0.03em",
            }}
          >
            {profile.name.split(" ")[0]}
            <br />
            <span style={{ color: theme.colors.primary }}>{profile.name.split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            variants={anim.item} transition={anim.itemTransition}
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              lineHeight: 1.5, color: theme.colors.textSecondary,
              margin: "0 0 8px", maxWidth: "420px",
            }}
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={anim.item} transition={anim.itemTransition}
            style={{
              fontSize: "0.8rem", color: theme.colors.textSecondary,
              opacity: 0.5, margin: "0 0 40px",
            }}
          >
            {profile.location} · {profile.availability}
          </motion.p>

          <motion.div
            variants={anim.item} transition={anim.itemTransition}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "56px" }}
          >
            <motion.a
              href="#projects"
              whileHover={anim.buttonHover}
              whileTap={anim.buttonTap}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "14px 28px", borderRadius: "12px", fontWeight: 600,
                fontSize: "0.85rem", backgroundColor: theme.colors.primary,
                color: "#fff", textDecoration: "none",
                boxShadow: `0 4px 20px ${theme.colors.primary}25`,
                position: "relative", overflow: "visible",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 8px 30px ${theme.colors.primary}40`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 4px 20px ${theme.colors.primary}25`)}
            >
              {getBorder("small")}
              <span style={{ position: "relative", zIndex: 1 }}>View my work</span>
              <span style={{ fontSize: "0.7rem", position: "relative", zIndex: 1 }}>↓</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={anim.buttonHover}
              whileTap={anim.buttonTap}
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "14px 28px", borderRadius: "12px", fontWeight: 500,
                fontSize: "0.85rem", backgroundColor: "transparent",
                border: `1.5px solid ${theme.colors.border}`,
                color: theme.colors.text, textDecoration: "none",
                position: "relative", overflow: "visible",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.colors.border)}
            >
              Let&apos;s talk
            </motion.a>
          </motion.div>

          <motion.div
            variants={anim.item} transition={anim.itemTransition}
            style={{ display: "flex", gap: "40px" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: "1.8rem", fontWeight: 700, color: theme.colors.text,
                  fontFamily: "var(--font-space)", lineHeight: 1, marginBottom: "4px",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: "0.7rem", color: theme.colors.textSecondary,
                  textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.6,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — Code snippet (desktop only) */}
        {!isMobile && (
          <motion.div
            variants={anim.item} transition={anim.itemTransition}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div
              style={{
                backgroundColor: `${theme.colors.surface}80`, backdropFilter: "blur(16px)",
                border: `1px solid ${theme.colors.border}`, borderRadius: "16px",
                padding: "28px 32px", fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
                fontSize: "0.8rem", lineHeight: 1.8, color: theme.colors.textSecondary,
                position: "relative", overflow: "visible",
                boxShadow: `0 20px 60px rgba(0,0,0,0.3)`, transform: "rotate(-2deg)",
              }}
            >
              {getBorder("normal")}
              {codeLines.map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                  style={{
                    color: i === 1 || i === 4 ? theme.colors.primary :
                           i === 2 ? "#60A5FA" :
                           i === 5 ? theme.colors.textSecondary :
                           theme.colors.textSecondary,
                  }}
                >
                  {line}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  display: "inline-block", width: "8px", height: "16px",
                  backgroundColor: theme.colors.primary, marginLeft: "2px",
                  verticalAlign: "middle",
                }}
              />
            </div>

            <div style={{
              position: "absolute", width: "300px", height: "300px",
              borderRadius: "50%", border: `1px solid ${theme.colors.primary}10`,
              zIndex: -1,
            }} />
            <motion.div
              style={{
                position: "absolute", width: "200px", height: "200px",
                borderRadius: "50%", border: `1px solid ${theme.colors.secondary}08`,
                zIndex: -1,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: "absolute", bottom: "40px", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: "8px",
        }}
      >
        <span style={{ fontSize: "0.65rem", color: theme.colors.textSecondary, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="24" fill="none" stroke={theme.colors.textSecondary} opacity="0.4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}