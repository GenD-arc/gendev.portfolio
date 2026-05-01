// app/components/theme-background.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";

// ─── Client-only wrapper to prevent hydration mismatch ───
function ClientOnly({ children }: { children: React.ReactNode }) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!mounted) return null;
  return <>{children}</>;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// ─── SPRING ───
function CherryBlossoms() {
  const petals = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 7 + 1) * 100,
      delay: seededRandom(i * 13 + 2) * 10,
      duration: 6 + seededRandom(i * 19 + 3) * 8,
      size: 8 + seededRandom(i * 23 + 4) * 12,
      rotation: seededRandom(i * 29 + 5) * 360,
    }));
  }, []);

  return (
    <ClientOnly>
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            style={{
              position: "absolute",
              top: "-5%",
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              background: "radial-gradient(circle, rgba(255,183,197,0.8) 0%, rgba(236,72,153,0.4) 60%, transparent 100%)",
              borderRadius: "50% 0 50% 0",
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: [0, Math.sin(petal.delay) * 120, Math.cos(petal.delay) * 60, 0],
              rotate: [petal.rotation, petal.rotation + 360],
              opacity: [0, 0.9, 0.8, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0, height: "30%",
            background: `linear-gradient(0deg, rgba(236,72,153,0.08) 0%, transparent 100%)`,
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </ClientOnly>
  );
}

// ─── SUMMER ───
function Fireflies() {
  const flies = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 31 + 7) * 100,
      top: 35 + seededRandom(i * 17 + 3) * 55,
      delay: seededRandom(i * 41 + 11) * 5,
      size: 2 + seededRandom(i * 53 + 13) * 3,
      wanderX: seededRandom(i * 59 + 17) * 40 - 20,
      wanderY: seededRandom(i * 37 + 19) * 30 - 15,
    }));
  }, []);

  return (
    <ClientOnly>
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        {flies.map((fly) => (
          <motion.div
            key={fly.id}
            style={{
              position: "absolute",
              left: `${fly.left}%`,
              top: `${fly.top}%`,
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              backgroundColor: "#FDE047",
              borderRadius: "50%",
              boxShadow: "0 0 6px 2px rgba(253,224,71,0.5), 0 0 12px 4px rgba(253,224,71,0.2)",
            }}
            animate={{
              x: [0, fly.wanderX, -fly.wanderX * 0.7, fly.wanderX * 0.5, 0],
              y: [0, fly.wanderY, -fly.wanderY * 0.8, fly.wanderY * 0.4, 0],
              opacity: [0, 1, 0.4, 0.8, 0],
            }}
            transition={{
              duration: 4 + fly.delay,
              delay: fly.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </ClientOnly>
  );
}

// ─── AUTUMN ───
function FallingLeaves() {
  const leafColors = ["#F97316", "#EF4444", "#FBBF24", "#B91C1C", "#D97706", "#EA580C"];
  const leaves = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 43 + 13) * 100,
      delay: seededRandom(i * 27 + 7) * 8,
      duration: 5 + seededRandom(i * 31 + 17) * 7,
      size: 10 + seededRandom(i * 19 + 3) * 16,
      rotation: seededRandom(i * 37 + 23) * 360,
      swayA: seededRandom(i * 47 + 29) * 80,
      swayB: seededRandom(i * 53 + 31) * 60,
      color: leafColors[Math.floor(seededRandom(i * 61 + 37) * leafColors.length)],
    }));
  }, []);

  return (
    <ClientOnly>
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            style={{
              position: "absolute",
              top: "-8%",
              left: `${leaf.left}%`,
              width: `${leaf.size}px`,
              height: `${leaf.size * 0.7}px`,
              backgroundColor: leaf.color,
              borderRadius: "20% 80% 30% 70%",
              opacity: 0.7,
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: [0, leaf.swayA, -leaf.swayB, leaf.swayA * 0.6, 0],
              rotate: [leaf.rotation, leaf.rotation + 540, leaf.rotation + 720],
              opacity: [0, 0.85, 0.7, 0],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "25%",
            background: "linear-gradient(0deg, rgba(249,115,22,0.12) 0%, transparent 100%)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute", bottom: "10%", right: "15%",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,140,30,0.35) 0%, rgba(255,100,20,0.15) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </ClientOnly>
  );
}

// ─── WINTER ───
function Snowfall() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 29 + 11) * 100,
      delay: seededRandom(i * 17 + 3) * 10,
      duration: 4 + seededRandom(i * 23 + 7) * 6,
      size: 2 + seededRandom(i * 31 + 13) * 5,
      drift: seededRandom(i * 37 + 19) * 80 - 40,
    }));
  }, []);

  return (
    <ClientOnly>
      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", overflow: "hidden" }}>
        {snowflakes.map((flake) => (
          <motion.div
            key={flake.id}
            style={{
              position: "absolute",
              top: "-5%",
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: 0.8,
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: [0, flake.drift * 0.6, flake.drift, flake.drift * 0.4, 0],
              opacity: [0, 0.9, 0.7, 0.5, 0],
            }}
            transition={{
              duration: flake.duration,
              delay: flake.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "15%",
            background: "linear-gradient(0deg, rgba(200,220,255,0.06) 0%, transparent 100%)",
          }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </ClientOnly>
  );
}

function WinterAurora() {
  return (
    <ClientOnly>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: `${5 + i * 12}%`,
              left: `${10 + i * 20}%`,
              width: `${70 - i * 10}%`,
              height: "30%",
              background: `linear-gradient(180deg, rgba(${100 + i * 40},${200 + i * 20},${255},0.15) 0%, transparent 80%)`,
              filter: "blur(50px)",
              borderRadius: "60%",
            }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </ClientOnly>
  );
}

// ─── MAIN ───
export default function ThemeBackground() {
  const { themeName } = useTheme();

  const backgroundElements = useMemo(() => {
    switch (themeName) {
      case "spring":
        return <CherryBlossoms />;
      case "summer":
        return (
          <>
            <Fireflies />
          </>
        );
      case "autumn":
        return <FallingLeaves />;
      case "winter":
        return (
          <>
            <WinterAurora />
            <Snowfall />
          </>
        );
      default:
        return <Snowfall />;
    }
  }, [themeName]);

  const bgStyle = useMemo((): React.CSSProperties => {
    switch (themeName) {
      case "spring":
        return {
          background: `
            radial-gradient(ellipse at 30% 70%, rgba(236,72,153,0.12) 0%, transparent 40%),
            radial-gradient(ellipse at 70% 40%, rgba(167,139,250,0.1) 0%, transparent 40%),
            linear-gradient(180deg, #1a0a1e 0%, #2d1540 35%, #1a2a1a 70%, #0d1a0a 100%)
          `,
        };
      case "summer":
        return {
          background: `
            radial-gradient(ellipse at 50% 25%, rgba(255,230,80,0.2) 0%, transparent 30%),
            radial-gradient(ellipse at 50% 60%, rgba(96,165,250,0.2) 0%, transparent 50%),
            linear-gradient(180deg, #0d2848 0%, #1a5090 35%, #2870b8 70%, #1a3a5c 100%)
          `,
        };
      case "autumn":
        return {
          background: `
            radial-gradient(ellipse at 70% 70%, rgba(249,115,22,0.2) 0%, transparent 35%),
            radial-gradient(ellipse at 30% 40%, rgba(239,68,68,0.15) 0%, transparent 45%),
            linear-gradient(180deg, #1a0a05 0%, #3d1a0a 35%, #5c2010 70%, #2d1008 100%)
          `,
        };
      case "winter":
        return {
          background: `
            radial-gradient(ellipse at 40% 60%, rgba(96,165,250,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 60% 30%, rgba(147,197,253,0.08) 0%, transparent 50%),
            linear-gradient(180deg, #050a1a 0%, #0d1835 35%, #132050 70%, #0a0f28 100%)
          `,
        };
      default:
        return {
          background: "linear-gradient(180deg, #050a1a 0%, #0d1835 50%, #132050 100%)",
        };
    }
  }, [themeName]);

  // Find the return at the bottom (~line 355) and replace with:

return (
  <ClientOnly>
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        transition: "background 2s ease",
        ...bgStyle,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={themeName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          {backgroundElements}
        </motion.div>
      </AnimatePresence>
    </div>
  </ClientOnly>
);
}