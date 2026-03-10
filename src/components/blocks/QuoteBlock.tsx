"use client";

import { motion } from "framer-motion";

export interface QuoteBlockProps {
  text?: string;
  attribution?: string;
  accentColor?: string;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
}

export default function QuoteBlock({
  text = "Two souls with but a single thought, two hearts that beat as one.",
  attribution = "— John Keats",
  accentColor = "#C9A84C",
  textColor = "#2C2C2C",
  fontSize = 22,
  fontFamily = "",
}: QuoteBlockProps) {
  const resolvedFont = fontFamily || "var(--font-display), serif";

  return (
    <motion.blockquote
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        textAlign: "center",
        padding: "40px 24px",
        margin: 0,
        position: "relative",
      }}
    >
      {/* Top ornamental flourish */}
      <svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        style={{ margin: "0 auto 20px", display: "block" }}
      >
        <path
          d="M0 10C10 10 10 2 20 2C30 2 30 18 40 18C50 18 50 10 60 10"
          stroke={accentColor}
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      </svg>

      {/* Quote marks */}
      <span
        style={{
          fontSize: fontSize * 2.5,
          fontFamily: "Georgia, serif",
          color: accentColor,
          lineHeight: 0.5,
          display: "block",
          marginBottom: 12,
          opacity: 0.4,
        }}
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p
        style={{
          fontSize,
          fontFamily: resolvedFont,
          fontStyle: "italic",
          lineHeight: 1.6,
          color: textColor,
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        {text}
      </p>

      {/* Closing quote */}
      <span
        style={{
          fontSize: fontSize * 2.5,
          fontFamily: "Georgia, serif",
          color: accentColor,
          lineHeight: 0.5,
          display: "block",
          marginTop: 12,
          opacity: 0.4,
        }}
      >
        &rdquo;
      </span>

      {/* Attribution */}
      {attribution && (
        <p
          style={{
            fontSize: 13,
            color: `${textColor}88`,
            marginTop: 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {attribution}
        </p>
      )}

      {/* Bottom ornamental flourish */}
      <svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        style={{ margin: "20px auto 0", display: "block" }}
      >
        <path
          d="M0 10C10 10 10 18 20 18C30 18 30 2 40 2C50 2 50 10 60 10"
          stroke={accentColor}
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </motion.blockquote>
  );
}
