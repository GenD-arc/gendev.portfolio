// app/components/navbar.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home", icon: "🏠" },
  { href: "#about", label: "About", icon: "👤" },
  { href: "#skills", label: "Skills", icon: "⚡" },
  { href: "#projects", label: "Work", icon: "💼" },
  { href: "#contact", label: "Contact", icon: "✉️" },
];

export default function Navbar() {
  const { theme, themeName } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    if (currentY > lastScrollY.current && currentY > 200) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    lastScrollY.current = currentY;

    setScrolled(currentY > 30);

    const sections = navLinks.map((link) => link.href.replace("#", ""));
    for (const section of sections.reverse()) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    scrollHandlerRef.current = handleScroll;
  }, [handleScroll]);

  useEffect(() => {
    const onScroll = () => scrollHandlerRef.current?.();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getSeasonalEmoji = () => {
    switch (themeName) {
      case "spring": return "🌸";
      case "summer": return "☀️";
      case "autumn": return "🍂";
      case "winter": return "❄️";
      default: return "💻";
    }
  };

  if (!mounted) {
    return (
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        height: "64px", backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
      }} />
    );
  }

  // ─── MOBILE: Bottom Navigation Bar ───
  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                backgroundColor: `${theme.colors.surface}f5`,
                backdropFilter: "blur(30px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "40px 24px",
              }}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.1 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.surface,
                  border: `1.5px solid ${theme.colors.border}`,
                  color: theme.colors.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  zIndex: 2,
                }}
                aria-label="Close menu"
              >
                ✕
              </motion.button>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px", margin: "0 auto", width: "100%" }}>
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "18px 20px",
                        borderRadius: "16px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: isActive ? theme.colors.primary : theme.colors.text,
                        backgroundColor: isActive ? `${theme.colors.primary}10` : `${theme.colors.textSecondary}05`,
                        border: isActive ? `1.5px solid ${theme.colors.primary}20` : "1.5px solid transparent",
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{ fontSize: "1.5rem" }}>{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="menuActive"
                          style={{
                            marginLeft: "auto",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: theme.colors.primary,
                          }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: "120px",
                  left: "0",
                  right: "0",
                  textAlign: "center",
                  fontSize: "0.75rem",
                  color: theme.colors.textSecondary,
                  opacity: 0.5,
                }}
              >
                {getSeasonalEmoji()} {theme.label} season
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.nav
          animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 45,
            backgroundColor: `${theme.colors.surface}ee`,
            backdropFilter: "blur(20px) saturate(180%)",
            borderTop: `1px solid ${theme.colors.border}`,
            padding: "8px 12px",
            paddingBottom: "max(8px, env(safe-area-inset-bottom))",
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            maxWidth: "500px",
            margin: "0 auto",
          }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileTap={{ scale: 0.85 }}
                  onClick={(e) => {
                    if (link.href === "#home" && activeSection === "home") {
                      e.preventDefault();
                      setMobileOpen(true);
                    }
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "6px 10px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    minWidth: "56px",
                    position: "relative",
                    transition: "all 0.2s",
                  }}
                >
                  <motion.span
                    style={{ fontSize: "1.3rem", position: "relative", zIndex: 1 }}
                    animate={{ scale: isActive ? 1.2 : 1, y: isActive ? -2 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {link.icon}
                  </motion.span>
                  <span style={{
                    fontSize: "0.6rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                    transition: "color 0.2s",
                  }}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="bottomActive"
                      style={{
                        position: "absolute",
                        top: "-2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "24px",
                        height: "2px",
                        borderRadius: "1px",
                        backgroundColor: theme.colors.primary,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
        </motion.nav>

        <div style={{ height: "80px" }} />
      </>
    );
  }

  // ─── DESKTOP: Top Navigation Bar ───
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(4px)",
        backgroundColor: scrolled ? `${theme.colors.surface}dd` : "transparent",
        borderBottom: scrolled ? `1px solid ${theme.colors.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: theme.colors.text,
                fontFamily: "var(--font-space)",
                textDecoration: "none",
                display: "flex",
                alignItems: "baseline",
                gap: "4px",
            }}
            >
            Genesis<span style={{ color: theme.colors.primary, fontSize: "0.85rem", fontWeight: 400 }}>.dev</span>
        </motion.a>

          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    fontSize: "0.825rem",
                    fontWeight: 500,
                    color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                    backgroundColor: isActive ? `${theme.colors.primary}12` : "transparent",
                    textDecoration: "none",
                    transition: "color 0.2s ease, background-color 0.2s ease",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = theme.colors.text;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = theme.colors.textSecondary;
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "16px",
                        height: "3px",
                        borderRadius: "2px",
                        backgroundColor: theme.colors.primary,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}