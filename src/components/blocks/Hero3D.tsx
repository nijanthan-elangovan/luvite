"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export interface Hero3DProps {
  heading?: string;
  subheading?: string;
  date?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
}

export default function Hero3D({
  heading = "Ankit & Priya",
  subheading = "Together with their families, request the honour of your presence",
  date = "Saturday, the Fifteenth of June",
  backgroundImage = "",
  overlayOpacity = 0.4,
}: Hero3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--cream)] via-[var(--background)] to-[var(--blush)]" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[10%] left-[10%] h-32 w-32 rounded-full border border-gold/20"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[12%] h-24 w-24 rounded-full border border-gold/30"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* 3D Floating Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 mx-4 max-w-xl"
      >
        <div
          className={cn(
            "rounded-2xl border border-gold/30 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-md",
            "md:p-16"
          )}
        >
          {/* Gold accent line */}
          <motion.div
            className="mx-auto mb-8 h-px w-16 bg-gold"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          <motion.p
            className="mb-4 text-sm tracking-[0.3em] uppercase text-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subheading}
          </motion.p>

          <motion.h1
            className="font-display text-5xl font-bold leading-tight text-charcoal md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transform: "translateZ(40px)" }}
          >
            {heading}
          </motion.h1>

          <motion.div
            className="mx-auto my-6 h-px w-24 bg-gold/50"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <motion.p
            className="font-display text-lg text-charcoal/70 italic md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ transform: "translateZ(20px)" }}
          >
            {date}
          </motion.p>

          {/* Decorative corner flourishes */}
          <div className="absolute top-4 left-4 h-8 w-8 border-t border-l border-gold/40" />
          <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-gold/40" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-gold/40" />
          <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-gold/40" />
        </div>
      </motion.div>
    </section>
  );
}
