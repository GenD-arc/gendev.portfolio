"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../theme-provider";
import { motion } from "framer-motion";
import { SpringBorder, SummerBorder, AutumnBorder, WinterBorder } from "../seasonal-borders";

const testimonials = [
  {
    quote: "Genesis delivered our dashboard ahead of schedule. The attention to detail was remarkable — every interaction felt intentional.",
    name: "Sarah Chen",
    role: "CTO, Nebula Analytics",
    color: "#7C3AED",
  },
  {
    quote: "Working with Genesis felt like having an in-house senior developer. Clear communication, clean code, and a final product that exceeded our vision.",
    name: "Marcus Torres",
    role: "Founder, FlowPay",
    color: "#E85D3A",
  },
  {
    quote: "We needed a complex e-commerce platform and Genesis built it with performance I didn't think was possible on our budget. 40% faster load times than our old site.",
    name: "Elena Rodriguez",
    role: "Product Lead, Terra Market",
    color: "#5B9BD5",
  },
];

export default function Testimonials() {
  const { theme, themeName } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted]);

  const getBorderDecoration = (color: string) => {
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
      <section id="testimonials" style={{ position: "relative", padding: "100px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Testimonials</span>
            <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)" }}>
            What clients say
          </h2>
        </div>
      </section>
    );
  }

  const t = testimonials[active];

  return (
    <section id="testimonials" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "48px" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Testimonials</span>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)", margin: 0, lineHeight: 1.15 }}>
          What <span style={{ color: theme.colors.primary }}>clients</span> say
        </h2>
      </motion.div>

      {/* Carousel */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: "20px",
          padding: "40px 36px",
          position: "relative",
          overflow: "visible",
          textAlign: "center",
        }}
      >
        {getBorderDecoration(t.color)}

        {/* Quote mark */}
        <div style={{ fontSize: "4rem", lineHeight: 0.5, color: `${t.color}30`, marginBottom: "20px", fontFamily: "Georgia, serif" }}>
          &ldquo;
        </div>

        <p style={{
          fontSize: "1.05rem",
          lineHeight: 1.7,
          color: theme.colors.text,
          margin: "0 0 24px",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          {t.quote}
        </p>

        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: t.color }}>
            {t.name}
          </div>
          <div style={{ fontSize: "0.75rem", color: theme.colors.textSecondary, opacity: 0.5 }}>
            {t.role}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "16px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                backgroundColor: i === active ? t.color : `${theme.colors.textSecondary}20`,
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}