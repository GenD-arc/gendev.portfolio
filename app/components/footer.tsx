// app/components/footer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

  if (!mounted) {
    return (
      <footer style={{ position: "relative", padding: "32px 24px", borderTop: `1px solid ${theme.colors.border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.8rem", color: theme.colors.textSecondary, opacity: 0.5 }}>
            &copy; {year} Genesis Perez
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{ position: "relative", padding: "56px 24px 32px", borderTop: `1px solid ${theme.colors.border}` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* Top row */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "24px",
          marginBottom: "32px",
        }}>
          <a href="#home" style={{
            fontSize: "1rem", fontWeight: 700, color: theme.colors.text,
            fontFamily: "var(--font-space)", textDecoration: "none",
          }}>
            Genesis<span style={{ color: theme.colors.primary, fontSize: "0.8rem", fontWeight: 400 }}>.dev</span>
          </a>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} style={{
                fontSize: "0.78rem", color: theme.colors.textSecondary,
                textDecoration: "none", opacity: 0.5,
                transition: "opacity 0.2s, color 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = theme.colors.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; e.currentTarget.style.color = theme.colors.textSecondary; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: `linear-gradient(to right, transparent, ${theme.colors.border}, transparent)`,
          marginBottom: "24px",
        }} />

        {/* Bottom row */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}>
          <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary, opacity: 0.35, margin: 0 }}>
            &copy; {year} Genesis Perez. All rights reserved.
          </p>
          <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary, opacity: 0.35, margin: 0 }}>
            Designed & built with care
          </p>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            style={{
              position: "fixed", bottom: "28px", right: "28px",
              width: "40px", height: "40px", borderRadius: "50%",
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.textSecondary,
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "1rem", zIndex: 50,
              backdropFilter: "blur(12px)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; e.currentTarget.style.color = theme.colors.primary; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.colors.border; e.currentTarget.style.color = theme.colors.textSecondary; }}
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}