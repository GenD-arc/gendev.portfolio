// app/components/error-boundary.tsx
"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: "40px 24px",
              textAlign: "center",
              color: "#a0a0a0",
              fontSize: "0.9rem",
            }}
          >
            <p>Something went wrong.</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                marginTop: "12px",
                padding: "8px 20px",
                borderRadius: "8px",
                border: "1px solid #444",
                background: "transparent",
                color: "#fff",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}