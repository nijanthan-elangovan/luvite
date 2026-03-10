"use client";

import { motion } from "framer-motion";

export interface ScheduleCardProps {
  eventName?: string;
  date?: string;
  time?: string;
  venue?: string;
  details?: string;
  routeLink?: string;
  routeText?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function ScheduleCard({
  eventName = "Mehendi",
  date = "20 Feb 2027",
  time = "11:00 AM",
  venue = "The Grand Orchid, Jaipur",
  details = "A colorful celebration with music and close family.",
  routeLink = "https://maps.google.com",
  routeText = "See the route",
  accentColor = "#c9a84c",
  backgroundColor = "#f9f4ea",
  textColor = "#2C2C2C",
}: ScheduleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      style={{
        background: backgroundColor,
        border: `1px solid ${accentColor}44`,
        borderRadius: 16,
        padding: 22,
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          color: accentColor,
          fontFamily: "Manrope, sans-serif",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {date} | {time}
      </p>

      <h3
        style={{
          margin: "0 0 8px",
          color: textColor,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: "0.03em",
        }}
      >
        {eventName}
      </h3>

      <p style={{ margin: "0 0 8px", color: `${textColor}cc`, fontSize: 14, fontFamily: "Manrope, sans-serif" }}>
        {venue}
      </p>
      <p style={{ margin: "0 0 16px", color: `${textColor}b0`, fontSize: 14, lineHeight: 1.55, fontFamily: "Manrope, sans-serif" }}>
        {details}
      </p>

      <a
        href={routeLink}
        style={{
          display: "inline-block",
          borderRadius: 999,
          padding: "8px 14px",
          textDecoration: "none",
          background: accentColor,
          color: "#fff",
          fontFamily: "Manrope, sans-serif",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {routeText}
      </a>
    </motion.article>
  );
}
