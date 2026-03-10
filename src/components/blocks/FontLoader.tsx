"use client";

import { useEffect } from "react";

const loadedFonts = new Set<string>();

export default function FontLoader({ fontFamily }: { fontFamily?: string }) {
  useEffect(() => {
    if (!fontFamily || loadedFonts.has(fontFamily)) return;

    loadedFonts.add(fontFamily);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }, [fontFamily]);

  return null;
}
