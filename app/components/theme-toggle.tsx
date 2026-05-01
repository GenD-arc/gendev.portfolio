"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "./theme-provider";
import { themes } from "../config/themes";
import { ThemeName } from "../types/theme";

export default function ThemeToggle() {
  const { theme, themeName, isAutoMode, setThemeByName, setAutoMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

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

  const handleAutoMode = useCallback(() => {
    setAutoMode();
    setIsOpen(false);
  }, [setAutoMode]);

  const handleThemeSelect = useCallback(
    (name: ThemeName) => {
      setThemeByName(name);
      setIsOpen(false);
    },
    [setThemeByName]
  );

  return (
    <div style={{ position: "fixed", top: "16px", right: "16px", zIndex: 50 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          borderRadius: "9999px",
          backdropFilter: "blur(20px)",
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.text,
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          transition: "all 0.3s",
        }}
      >
        <span style={{ fontSize: "1.125rem" }}>
          {mounted ? theme.icon : "🎨"}
        </span>
        {!isMobile && (
          <span>
            {mounted ? (isAutoMode ? "Auto" : theme.label) : "Theme"}
          </span>
        )}
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 12px)",
            right: 0,
            borderRadius: "16px",
            backdropFilter: "blur(20px)",
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            padding: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            minWidth: "200px",
          }}
        >
          <button
            onClick={handleAutoMode}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              border: isAutoMode
                ? `1px solid ${theme.colors.primary}40`
                : "1px solid transparent",
              backgroundColor: isAutoMode
                ? `${theme.colors.primary}20`
                : "transparent",
              color: theme.colors.text,
              marginBottom: "4px",
            }}
          >
            <span>📅</span>
            <span>Auto (Season-based)</span>
            {isAutoMode && (
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.75rem",
                  opacity: 0.6,
                }}
              >
                Active
              </span>
            )}
          </button>

          <div
            style={{
              margin: "8px 0",
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          />

          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => handleThemeSelect(t.name as ThemeName)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                padding: "10px 12px",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                border:
                  !isAutoMode && themeName === t.name
                    ? `1px solid ${theme.colors.primary}40`
                    : "1px solid transparent",
                backgroundColor:
                  !isAutoMode && themeName === t.name
                    ? `${theme.colors.primary}20`
                    : "transparent",
                color: theme.colors.text,
              }}
            >
              <span style={{ fontSize: "1rem" }}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}