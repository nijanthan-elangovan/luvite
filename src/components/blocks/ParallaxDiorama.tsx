"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import Countdown from "@/components/blocks/Countdown";

export type ParallaxLayer = {
  src: string;
  speed?: number;
  opacity?: number;
  scale?: number;
  rotate?: number;
};

export interface ParallaxDioramaProps {
  blessingText?: string;
  familyText?: string;
  title?: string;
  subtitle?: string;
  targetDate?: string;
  themeColor?: string;
  height?: number;
  overlayColor?: string;
  layers?: ParallaxLayer[];
}

const defaultLayers: ParallaxLayer[] = [
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=2200&q=80",
    speed: 0.2,
    opacity: 0.42,
    scale: 1.1,
    rotate: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2200&q=80",
    speed: 0.35,
    opacity: 0.32,
    scale: 1.12,
    rotate: -1,
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=80",
    speed: 0.5,
    opacity: 0.4,
    scale: 1.08,
    rotate: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2200&q=80",
    speed: 0.7,
    opacity: 0.36,
    scale: 1.07,
    rotate: -0.8,
  },
  {
    src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=2200&q=80",
    speed: 0.95,
    opacity: 0.24,
    scale: 1.05,
    rotate: 0.6,
  },
];

export default function ParallaxDiorama({
  blessingText = "Shree Ganeshaya Namah",
  familyText = "WITH BLESSINGS OF OUR FAMILIES",
  title = "ABHISHEK WEDS KANIKA",
  subtitle = "Join us as we celebrate love, laughter, and a lifetime together.",
  targetDate = "2027-02-21T18:00:00",
  themeColor = "#c9a84c",
  height = 900,
  overlayColor = "rgba(10,8,6,0.62)",
  layers = defaultLayers,
}: ParallaxDioramaProps) {
  const ref = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      style={{
        position: "relative",
        minHeight: height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {layers.map((layer, index) => {
        const speed = layer.speed ?? (index + 1) * 0.2;
        const yScroll = useTransform(
          scrollYProgress,
          [0, 1],
          [0, -120 * speed]
        );
        const xHover = useTransform(mouseX, [-0.5, 0.5], [-16 * speed, 16 * speed]);
        const yHover = useTransform(mouseY, [-0.5, 0.5], [-12 * speed, 12 * speed]);
        const rotate = useTransform(
          mouseX,
          [-0.5, 0.5],
          [-(layer.rotate ?? 0), layer.rotate ?? 0]
        );

        return (
          <motion.img
            key={`${layer.src}-${index}`}
            src={layer.src}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-3%",
              width: "106%",
              height: "106%",
              objectFit: "cover",
              opacity: layer.opacity ?? 0.3,
              scale: layer.scale ?? 1.08,
              y: yScroll,
              x: xHover,
              rotate,
              translateY: yHover,
              pointerEvents: "none",
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayColor,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 2,
          width: "min(100%, 980px)",
          padding: "80px 24px 56px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: "0 0 20px",
            color: "#d9bc77",
            fontSize: 16,
            letterSpacing: "0.14em",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {blessingText}
        </p>
        <p
          style={{
            margin: "0 0 24px",
            color: "#b59a5f",
            fontSize: 12,
            letterSpacing: "0.3em",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {familyText}
        </p>
        <h1
          style={{
            margin: "0 0 16px",
            color: "#f6efe3",
            fontWeight: 400,
            letterSpacing: "0.08em",
            fontSize: "clamp(2.1rem, 6.2vw, 4.4rem)",
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 1.16,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: "0 0 34px",
            color: "#d4c3a2",
            fontSize: 18,
            letterSpacing: "0.04em",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {subtitle}
        </p>
        <Countdown
          targetDate={targetDate}
          expiredMessage="The celebrations are live!"
          themeColor={themeColor}
        />
      </motion.div>
    </section>
  );
}
