"use client";

import { useEffect, useMemo, useState } from "react";

export interface CountdownProps {
  targetDate?: string;
  expiredMessage?: string;
  themeColor?: string;
}

function getTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const delta = target - now;

  if (Number.isNaN(target) || delta <= 0) {
    return null;
  }

  return {
    days: Math.floor(delta / (1000 * 60 * 60 * 24)),
    hours: Math.floor((delta / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((delta / (1000 * 60)) % 60),
    seconds: Math.floor((delta / 1000) % 60),
  };
}

export default function Countdown({
  targetDate = "2026-12-31T23:59:59",
  expiredMessage = "The event has started!",
  themeColor = "#111827",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const units = useMemo(
    () => [
      { label: "Days", value: timeLeft?.days ?? 0 },
      { label: "Hours", value: timeLeft?.hours ?? 0 },
      { label: "Minutes", value: timeLeft?.minutes ?? 0 },
      { label: "Seconds", value: timeLeft?.seconds ?? 0 },
    ],
    [timeLeft]
  );

  if (!timeLeft) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: themeColor, fontWeight: 600 }}>
        {expiredMessage}
      </div>
    );
  }

  return (
    <section style={{ padding: 20, textAlign: "center" }}>
      <div
        style={{
          display: "grid",
          gap: 10,
          gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
          maxWidth: 520,
          margin: "0 auto",
        }}
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            style={{
              border: `1px solid ${themeColor}`,
              borderRadius: 10,
              padding: "12px 10px",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700, color: themeColor }}>
              {String(unit.value).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 12, letterSpacing: 0.8, color: themeColor }}>{unit.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
