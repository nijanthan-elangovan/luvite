"use client";

import { useMemo } from "react";

export interface FloatingHeartsProps {
  count?: number;
  color?: string;
  height?: number;
}

export default function FloatingHearts({
  count = 14,
  color = "#f472b6",
  height = 320,
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: Math.max(1, count) }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 6 + Math.random() * 7,
        delay: Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 14,
        border: "1px solid #fbcfe8",
        background: "linear-gradient(180deg, #fff1f2 0%, #fdf2f8 100%)",
        height,
      }}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            position: "absolute",
            bottom: -30,
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            background: color,
            opacity: heart.opacity,
            transform: "rotate(45deg)",
            animation: `floatHeart ${heart.duration}s linear ${heart.delay}s infinite`,
          }}
        >
          <span
            style={{
              position: "absolute",
              width: heart.size,
              height: heart.size,
              borderRadius: "50%",
              top: -heart.size / 2,
              left: 0,
              background: color,
            }}
          />
          <span
            style={{
              position: "absolute",
              width: heart.size,
              height: heart.size,
              borderRadius: "50%",
              top: 0,
              left: -heart.size / 2,
              background: color,
            }}
          />
        </span>
      ))}

      <style jsx>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) rotate(45deg);
          }
          100% {
            transform: translateY(-420px) rotate(45deg);
          }
        }
      `}</style>
    </section>
  );
}
