"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface MotionConfig {
  type?: "fade" | "slide" | "zoom";
  delay?: number;
  parallaxSpeed?: number;
}

export interface AnimationWrapperProps {
  motionConfig?: MotionConfig;
  children: ReactNode;
}

export default function AnimationWrapper({
  motionConfig,
  children,
}: AnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxSpeed = motionConfig?.parallaxSpeed ?? 0;
  const y = useTransform(scrollYProgress, [0, 1], [0, -parallaxSpeed * 120]);

  const type = motionConfig?.type ?? "fade";
  const initial =
    type === "slide"
      ? { opacity: 0, y: 24 }
      : type === "zoom"
        ? { opacity: 0, scale: 0.94 }
        : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: motionConfig?.delay ?? 0 }}
      style={parallaxSpeed ? { y } : undefined}
    >
      {children}
    </motion.div>
  );
}
