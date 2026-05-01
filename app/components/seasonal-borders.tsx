// app/components/seasonal-borders.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export function SpringBorder({ color, size = "normal" }: { color: string; size?: "small" | "normal" }) {
  const s = size === "small" ? 0.6 : 1;
  return (
    <>
      {[
        { top: "-2px", left: "10%", rotate: 0, delay: 0 },
        { top: "-2px", right: "15%", rotate: 25, delay: 0.3 },
        { bottom: "-2px", left: "20%", rotate: 170, delay: 0.6 },
        { bottom: "-2px", right: "18%", rotate: 190, delay: 0.9 },
      ].map((leaf, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute", ...leaf,
            width: `${14 * s}px`, height: `${10 * s}px`,
            zIndex: 2, pointerEvents: "none",
          }}
          animate={{ rotate: [leaf.rotate - 3, leaf.rotate + 3, leaf.rotate - 3], scale: [1, 1.08, 1] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: leaf.delay, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 14 10" style={{ width: "100%", height: "100%" }}>
            <ellipse cx="7" cy="5" rx="7" ry="5" fill={`${color}30`} />
          </svg>
        </motion.div>
      ))}
      {[
        { top: "-5px", left: "40%", delay: 0 },
        { bottom: "-5px", right: "45%", delay: 0.5 },
      ].map((flower, i) => (
        <motion.div
          key={`f-${i}`}
          style={{ position: "absolute", ...flower, width: `${8 * s}px`, height: `${8 * s}px`, zIndex: 3, pointerEvents: "none" }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: flower.delay, ease: "easeInOut" }}
        >
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: `radial-gradient(circle, ${color}50, transparent)`,
          }} />
        </motion.div>
      ))}
    </>
  );
}

export function SummerBorder({ color, size = "normal" }: { color: string; size?: "small" | "normal" }) {
  const s = size === "small" ? 0.6 : 1;
  return (
    <>
      {[
        { top: "-4px", right: "15%", delay: 0 },
        { bottom: "-3px", left: "20%", delay: 0.4 },
      ].map((ray, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", ...ray, zIndex: 2, pointerEvents: "none" }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: ray.delay, ease: "easeInOut" }}
        >
          {[...Array(3)].map((_, j) => (
            <div key={j} style={{
              display: "inline-block",
              width: `${6 * s}px`, height: `${2 * s}px`, borderRadius: "1px",
              background: color, opacity: 0.5 - j * 0.15, marginRight: "2px",
            }} />
          ))}
        </motion.div>
      ))}
    </>
  );
}

export function AutumnBorder({ color, size = "normal" }: { color: string; size?: "small" | "normal" }) {
  const s = size === "small" ? 0.6 : 1;
  const autumnColors = ["#F97316", "#EF4444", "#FBBF24"];
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: i === 0 ? "-3px" : i === 1 ? "auto" : "auto",
            bottom: i === 1 ? "-3px" : "auto",
            left: `${20 + i * 30}%`,
            width: `${10 * s}px`, height: `${7 * s}px`,
            zIndex: 2, pointerEvents: "none",
          }}
          animate={{ y: [0, 4, 0], rotate: [0, 10, -5, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 12 8" style={{ width: "100%", height: "100%" }}>
            <path d="M6 0 C8 0, 12 3, 12 5 C12 7, 9 8, 6 8 C3 8, 0 7, 0 5 C0 3, 4 0, 6 0Z" fill={`${autumnColors[i]}50`} />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

export function WinterBorder({ color, size = "normal" }: { color: string; size?: "small" | "normal" }) {
  const s = size === "small" ? 0.6 : 1;
  return (
    <>
      {[
        { top: "-4px", left: "15%", delay: 0 },
        { top: "-3px", right: "20%", delay: 0.3 },
        { bottom: "-4px", left: "30%", delay: 0.6 },
        { bottom: "-3px", right: "18%", delay: 0.9 },
      ].map((frost, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", ...frost, zIndex: 2, pointerEvents: "none" }}
          animate={{ opacity: [0.2, 0.6, 0.2], rotate: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: frost.delay, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 12 12" style={{ width: `${12 * s}px`, height: `${12 * s}px` }}>
            <line x1="6" y1="0" x2="6" y2="12" stroke={`${color}50`} strokeWidth="0.8" />
            <line x1="0" y1="6" x2="12" y2="6" stroke={`${color}50`} strokeWidth="0.8" />
            <line x1="2" y1="2" x2="10" y2="10" stroke={`${color}30`} strokeWidth="0.5" />
            <line x1="10" y1="2" x2="2" y2="10" stroke={`${color}30`} strokeWidth="0.5" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}