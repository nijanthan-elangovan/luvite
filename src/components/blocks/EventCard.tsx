"use client";

import { motion } from "framer-motion";

export interface EventCardProps {
  eventName?: string;
  date?: string;
  time?: string;
  venue?: string;
  description?: string;
  icon?: "ring" | "music" | "flower" | "star" | "heart" | "camera";
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

const icons: Record<string, string> = {
  ring: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z",
  music: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
  flower: "M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9-4.97 0-9-4.03-9-9z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  camera: "M12 10.8c-1.77 0-3.2 1.43-3.2 3.2s1.43 3.2 3.2 3.2 3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2zM20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z",
};

export default function EventCard({
  eventName = "Wedding Ceremony",
  date = "December 15, 2026",
  time = "5:00 PM",
  venue = "The Grand Ballroom",
  description = "Join us for the sacred ceremony followed by dinner and celebrations.",
  icon = "ring",
  accentColor = "#C9A84C",
  backgroundColor = "#ffffff",
  textColor = "#2C2C2C",
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "relative",
        backgroundColor,
        borderRadius: 16,
        padding: "36px 28px",
        border: `1px solid ${accentColor}22`,
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Decorative corner flourishes */}
      <div style={{ position: "absolute", top: 8, left: 8, width: 24, height: 24, borderTop: `1.5px solid ${accentColor}55`, borderLeft: `1.5px solid ${accentColor}55` }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderTop: `1.5px solid ${accentColor}55`, borderRight: `1.5px solid ${accentColor}55` }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, width: 24, height: 24, borderBottom: `1.5px solid ${accentColor}55`, borderLeft: `1.5px solid ${accentColor}55` }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, width: 24, height: 24, borderBottom: `1.5px solid ${accentColor}55`, borderRight: `1.5px solid ${accentColor}55` }} />

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: `1.5px solid ${accentColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}
      >
        <svg width={22} height={22} viewBox="0 0 24 24" fill={accentColor}>
          <path d={icons[icon] || icons.ring} />
        </svg>
      </div>

      {/* Event name */}
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: textColor,
          margin: "0 0 8px",
          lineHeight: 1.2,
          fontFamily: "var(--font-display), serif",
        }}
      >
        {eventName}
      </h3>

      {/* Date & Time */}
      <p style={{ fontSize: 14, color: accentColor, fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 4px" }}>
        {date}
      </p>
      <p style={{ fontSize: 14, color: `${textColor}88`, margin: "0 0 12px" }}>
        {time} · {venue}
      </p>

      {/* Decorative line */}
      <div style={{ width: 40, height: 1, background: accentColor, margin: "0 auto 12px", opacity: 0.4 }} />

      {/* Description */}
      <p style={{ fontSize: 14, lineHeight: 1.6, color: `${textColor}aa`, margin: 0 }}>
        {description}
      </p>
    </motion.div>
  );
}
