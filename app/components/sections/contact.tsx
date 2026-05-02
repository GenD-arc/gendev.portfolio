"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../theme-provider";
import { motion } from "framer-motion";
import { SpringBorder, SummerBorder, AutumnBorder, WinterBorder } from "../seasonal-borders";
import { profile } from "../../../data/profile";

const seasonalAnims = {
  spring: {
    item: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    buttonTransition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  summer: {
    item: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    buttonTransition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  autumn: {
    item: { hidden: { opacity: 0, x: -15, y: 20 }, visible: { opacity: 1, x: 0, y: 0 } },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    buttonTransition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  winter: {
    item: { hidden: { opacity: 0, y: 15, filter: "blur(2px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    buttonTransition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Contact() {
  const { theme, themeName } = useTheme();
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    if (res.ok) {
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setSubmitted(false);
    }
  } catch {
    setSubmitted(false);
  }
};

  const anim = seasonalAnims[themeName] || seasonalAnims.winter;
  const viewportConfig = { once: true, margin: "-60px" };

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

  const contactInfo = [
    { label: "Email", value: profile.email, isLink: true },
    { label: "Location", value: profile.location },
    { label: "Availability", value: profile.availability },
  ];

  const socialPlatforms = [
    { name: "GitHub", url: profile.socials.github },
    { name: "LinkedIn", url: profile.socials.linkedin },
    { name: "Email", url: `mailto:${profile.email}` },
  ];

  const inputBaseStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: "10px",
    fontSize: "0.875rem", backgroundColor: "transparent",
    border: `1px solid ${theme.colors.border}`, color: theme.colors.text,
    outline: "none", transition: "all 0.3s ease",
    boxSizing: "border-box", fontFamily: "inherit",
  };

  const inputFocusStyle: React.CSSProperties = {
    border: `1px solid ${theme.colors.primary}`,
    boxShadow: `0 0 0 3px ${theme.colors.primary}08`,
  };

  if (!mounted) {
    return (
      <section id="contact" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
            <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Contact</span>
            <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)" }}>
            Start a project
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" style={{ position: "relative", padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      <motion.div
        variants={anim.item} transition={anim.transition}
        initial="hidden" whileInView="visible" viewport={viewportConfig}
        style={{ textAlign: "center", marginBottom: "56px" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
          <span style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: theme.colors.primary }}>Contact</span>
          <span style={{ width: "24px", height: "1px", background: theme.colors.primary, opacity: 0.5 }} />
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: theme.colors.text, fontFamily: "var(--font-space)", margin: "0 0 8px", lineHeight: 1.15 }}>
          Start a <span style={{ color: theme.colors.primary }}>project</span>
        </h2>
        <p style={{ fontSize: "0.9rem", color: theme.colors.textSecondary, opacity: 0.5, margin: 0 }}>
          Tell me about your idea. I&apos;ll get back within 24 hours.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "48px", maxWidth: "800px", margin: "0 auto" }}>
        <motion.div
          variants={anim.item} transition={anim.transition}
          initial="hidden" whileInView="visible" viewport={viewportConfig}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {contactInfo.map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: theme.colors.textSecondary, opacity: 0.5, marginBottom: "4px" }}>
                {item.label}
              </div>
              {item.isLink ? (
                <a
                  href={`mailto:${item.value}`}
                  style={{
                    fontSize: "0.95rem", fontWeight: 500, color: theme.colors.primary,
                    textDecoration: "none", transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {item.value}
                </a>
              ) : (
                <div style={{ fontSize: "0.95rem", fontWeight: 500, color: theme.colors.text }}>
                  {item.value}
                </div>
              )}
            </div>
          ))}

          <div style={{ paddingTop: "8px" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: theme.colors.textSecondary, opacity: 0.5, marginBottom: "10px" }}>
              Social
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {socialPlatforms.map((platform) => (
                <motion.a
                  key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  style={{
                    padding: "10px 16px", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 500,
                    backgroundColor: theme.colors.surface,
                    border: `1px solid ${theme.colors.border}`,
                    color: theme.colors.textSecondary, textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.color = theme.colors.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.color = theme.colors.textSecondary; }}
                >
                  {platform.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          variants={anim.item} transition={anim.transition}
          initial="hidden" whileInView="visible" viewport={viewportConfig}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}
        >
          <div>
            <input type="text" required value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
              style={{ ...inputBaseStyle, ...(focusedField === "name" ? inputFocusStyle : {}) }}
              placeholder="Your name"
            />
          </div>
          <div>
            <input type="email" required value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
              style={{ ...inputBaseStyle, ...(focusedField === "email" ? inputFocusStyle : {}) }}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <textarea required rows={4} value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
              style={{ ...inputBaseStyle, ...(focusedField === "message" ? inputFocusStyle : {}), resize: "vertical", minHeight: "100px" }}
              placeholder="What are you looking to build?"
            />
          </div>

          <motion.button
            variants={anim.item} transition={anim.buttonTransition}
            initial="hidden" whileInView="visible" viewport={viewportConfig}
            type="submit" disabled={submitted}
            whileHover={submitted ? {} : { scale: 1.01 }}
            whileTap={submitted ? {} : { scale: 0.99 }}
            style={{
              padding: "14px 24px", borderRadius: "10px", fontWeight: 600, fontSize: "0.85rem",
              backgroundColor: submitted ? "#22c55e" : theme.colors.primary,
              color: "#fff", border: "none",
              cursor: submitted ? "default" : "pointer", transition: "all 0.3s",
              boxShadow: submitted ? "none" : `0 4px 16px ${theme.colors.primary}20`,
              position: "relative", overflow: "visible",
            }}
          >
            {getBorderDecoration()}
            <span style={{ position: "relative", zIndex: 1 }}>
              {submitted ? "Sent — I'll be in touch" : "Send message"}
            </span>
          </motion.button>

          <p style={{ fontSize: "0.7rem", color: theme.colors.textSecondary, opacity: 0.35, textAlign: "center", margin: 0 }}>
            No spam, no nonsense. Just a conversation about your project.
          </p>
        </motion.form>
      </div>
    </section>
  );
}