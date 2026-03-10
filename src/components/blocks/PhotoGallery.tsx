"use client";

import { motion } from "framer-motion";

export interface PhotoGalleryProps {
  images?: { src: string; alt?: string }[];
  columns?: number;
  gap?: number;
  borderRadius?: number;
}

export default function PhotoGallery({
  images = [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", alt: "Photo 1" },
    { src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=600&q=80", alt: "Photo 2" },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80", alt: "Photo 3" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80", alt: "Photo 4" },
  ],
  columns = 2,
  gap = 12,
  borderRadius = 12,
}: PhotoGalleryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        width: "100%",
      }}
    >
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{
            overflow: "hidden",
            borderRadius,
            aspectRatio: i % 3 === 0 ? "4/5" : "1/1",
          }}
        >
          <img
            src={img.src}
            alt={img.alt || `Photo ${i + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLImageElement).style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
