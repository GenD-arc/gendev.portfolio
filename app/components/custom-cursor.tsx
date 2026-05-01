"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const { theme, themeName } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.body.style.cursor = "none";

    // Check what's under the cursor
    const checkPointer = () => {
      const el = document.elementFromPoint(position.x, position.y);
      if (el) {
        const style = window.getComputedStyle(el);
        const tag = el.tagName.toLowerCase();
        const role = el.getAttribute("role");
        const isClickable =
          style.cursor === "pointer" ||
          tag === "a" ||
          tag === "button" ||
          role === "button" ||
          el.closest("a") !== null ||
          el.closest("button") !== null;
        setIsPointer(isClickable);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const interval = setInterval(checkPointer, 80);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(interval);
    };
  }, [mounted, isMobile, position.x, position.y]);

  const getSeasonalCursor = () => {
    switch (themeName) {
      case "spring":
        return {
          emoji: "🌸",
          ringColor: `${theme.colors.primary}50`,
          dotColor: theme.colors.primary,
        };
      case "summer":
        return {
          emoji: "☀️",
          ringColor: `${theme.colors.primary}60`,
          dotColor: theme.colors.primary,
        };
      case "autumn":
        return {
          emoji: "🍂",
          ringColor: `${theme.colors.primary}50`,
          dotColor: theme.colors.primary,
        };
      case "winter":
        return {
          emoji: "❄️",
          ringColor: `${theme.colors.primary}40`,
          dotColor: theme.colors.primary,
        };
      default:
        return {
          emoji: "●",
          ringColor: `${theme.colors.primary}40`,
          dotColor: theme.colors.primary,
        };
    }
  };

  if (!mounted || isMobile) return null;

  const cursor = getSeasonalCursor();

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isPointer ? "56px" : "36px",
          height: isPointer ? "56px" : "36px",
          borderRadius: "50%",
          border: `2px solid ${cursor.ringColor}`,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isHidden ? 0 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{
          x: position.x - (isPointer ? 28 : 18),
          y: position.y - (isPointer ? 28 : 18),
          scale: isClicking ? 0.8 : 1,
          rotate: isPointer ? 360 : 0,
        }}
        transition={{
          x: { type: "spring", stiffness: 250, damping: 28, mass: 0.6 },
          y: { type: "spring", stiffness: 250, damping: 28, mass: 0.6 },
          scale: { duration: 0.15 },
          rotate: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        {/* Seasonal emoji inside ring on hover */}
        {isPointer && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ fontSize: "1.2rem", lineHeight: 1 }}
          >
            {cursor.emoji}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          backgroundColor: cursor.dotColor,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isHidden ? 0 : 1,
          boxShadow: `0 0 8px ${cursor.dotColor}60`,
        }}
        animate={{
          x: position.x - 2.5,
          y: position.y - 2.5,
          scale: isClicking ? 1.8 : isPointer ? 0 : 1,
          opacity: isPointer ? 0 : isHidden ? 0 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 500, damping: 30, mass: 0.2 },
          y: { type: "spring", stiffness: 500, damping: 30, mass: 0.2 },
          scale: { duration: 0.15 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
}