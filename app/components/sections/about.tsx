// app/components/sections/about.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../theme-provider";
import { motion } from "framer-motion";
import { SpringBorder, SummerBorder, AutumnBorder, WinterBorder } from "../seasonal-borders";

const seasonalAnims = {
  spring: {
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.12,
  },
  summer: {
    item: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.1,
  },
  autumn: {
    item: { hidden: { opacity: 0, x: -20, y: 20 }, visible: { opacity: 1, x: 0, y: 0 } },
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.14,
  },
  winter: {
    item: { hidden: { opacity: 0, y: 15, filter: "blur(2px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    stagger: 0.13,
  },
};

const services = [
  { title: "Web Development", desc: "Next.js, React, TypeScript — fast, SEO-optimized, scalable.", icon: "🌐" },
  { title: "Mobile Apps", desc: "Cross-platform Flutter apps with native performance.", icon: "📱" },
  { title: "UI/UX Design", desc: "Clean interfaces that convert visitors into customers.", icon: "🎨" },
  { title: "API Architecture", desc: "Robust backends with Node.js, Express & REST APIs.", icon: "⚙️" },
];

export default function About() {
  const { theme, themeName } = useTheme();
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const anim = seasonalAnims[themeName] || seasonalAnims.winter;
  const viewportConfig = { once: true, margin: "-80px" };

  const getSeasonalEmoji = () => {
    switch (themeName) {
      case "spring": return "🌸";
      case "summer": return "☀️";
      case "autumn": return "🍂";
      case "winter": return "❄️";
      default: return "💻";
    }
  };

  const getBorderDecoration = () => {
    const color = theme.colors.primary;
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
      <section id="about" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>About</span>
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)" }}>
          What I do
        </h2>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}
    >
      {/* Section label */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}
      >
        <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
        <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>
          About
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: theme.colors.text,
          fontFamily: "var(--font-space)",
          margin: "0 0 16px",
          maxWidth: "600px",
        }}
      >
        I turn complex problems
        <br />
        into{" "}
        <span style={{ color: theme.colors.primary }}>elegant solutions</span>
      </motion.h2>

      {/* Short bio */}
      <motion.p
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{
          fontSize: "1rem",
          lineHeight: 1.7,
          color: theme.colors.textSecondary,
          margin: "0 0 48px",
          maxWidth: "560px",
        }}
      >
        I&apos;m Genesis — a freelance developer with 5+ years of experience crafting
        performant web and mobile applications. I partner with startups and agencies
        to ship products that users love.
      </motion.p>

      {/* Services grid */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "16px",
          marginBottom: "56px",
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
            whileHover={{ y: -2 }}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: "14px",
              padding: "24px",
              position: "relative",
              overflow: "visible",
              cursor: "default",
              transition: "border-color 0.3s",
            }}
          >
            {getBorderDecoration()}
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "10px" }}>{service.icon}</span>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: theme.colors.text, marginBottom: "4px" }}>
                {service.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: theme.colors.textSecondary, lineHeight: 1.5, margin: 0 }}>
                {service.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom bar: season + CTA */}
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: "16px",
          paddingTop: "24px",
          borderTop: `1px solid ${theme.colors.border}`,
        }}
      >
        <span style={{ fontSize: "0.78rem", color: theme.colors.textSecondary, opacity: 0.5, display: "flex", alignItems: "center", gap: "6px" }}>
          {getSeasonalEmoji()} Currently in {theme.label.toLowerCase()} mode
        </span>
        <motion.a
          href="#projects"
          style={{
            fontSize: "0.85rem",
            fontWeight: 500,
            color: theme.colors.primary,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          whileHover={{ gap: "12px" }}
          transition={{ duration: 0.2 }}
        >
          See my work
          <span>→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}