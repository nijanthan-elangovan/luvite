"use client";

import { useMemo } from "react";

export interface FloatingPetalsProps {
  count?: number;
  color?: string;
  secondaryColor?: string;
  height?: number;
  variant?: "petals" | "leaves" | "stars" | "sparkles";
  speed?: number;
  opacity?: number;
}

/* SVG shapes for each variant */
function PetalSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 30 42" fill="none">
      <path
        d="M15 0C15 0 30 14 30 28C30 35.7 23.3 42 15 42C6.7 42 0 35.7 0 28C0 14 15 0 15 0Z"
        fill={color}
      />
    </svg>
  );
}

function LeafSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size * 1.2} height={size} viewBox="0 0 36 30" fill="none">
      <path
        d="M0 15C0 15 8 0 18 0C28 0 36 15 36 15C36 15 28 30 18 30C8 30 0 15 0 15Z"
        fill={color}
      />
      <path d="M4 15H32" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
    </svg>
  );
}

function StarSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L14.59 8.41L23.41 9.18L16.71 14.82L18.82 23.41L12 19.02L5.18 23.41L7.29 14.82L0.59 9.18L9.41 8.41L12 0Z" />
    </svg>
  );
}

function SparkleSVG({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
    </svg>
  );
}

const shapeComponents = {
  petals: PetalSVG,
  leaves: LeafSVG,
  stars: StarSVG,
  sparkles: SparkleSVG,
};

export default function FloatingPetals({
  count = 18,
  color = "#e8c4c4",
  secondaryColor = "",
  height = 400,
  variant = "petals",
  speed = 1,
  opacity = 0.6,
}: FloatingPetalsProps) {
  const items = useMemo(
    () =>
      Array.from({ length: Math.min(count, 40) }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 20,
        duration: (8 + Math.random() * 10) / speed,
        delay: Math.random() * 6,
        drift: -30 + Math.random() * 60,
        rotate: Math.random() * 360,
        rotateEnd: Math.random() * 360,
        itemOpacity: (0.3 + Math.random() * 0.7) * opacity,
        useSecondary: secondaryColor && Math.random() > 0.5,
      })),
    [count, speed, opacity, secondaryColor]
  );

  const ShapeComponent = shapeComponents[variant] || shapeComponents.petals;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height,
        width: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            top: -40,
            left: `${item.left}%`,
            opacity: item.itemOpacity,
            animation: `floatPetal-${item.id} ${item.duration}s ease-in-out ${item.delay}s infinite`,
          }}
        >
          <ShapeComponent
            color={item.useSecondary ? secondaryColor : color}
            size={item.size}
          />
        </div>
      ))}

      <style>{`
        ${items
          .map(
            (item) => `
          @keyframes floatPetal-${item.id} {
            0% {
              transform: translateY(0) translateX(0) rotate(${item.rotate}deg);
              opacity: 0;
            }
            10% {
              opacity: ${item.itemOpacity};
            }
            90% {
              opacity: ${item.itemOpacity};
            }
            100% {
              transform: translateY(${height + 60}px) translateX(${item.drift}px) rotate(${item.rotateEnd}deg);
              opacity: 0;
            }
          }
        `
          )
          .join("\n")}
      `}</style>
    </div>
  );
}
