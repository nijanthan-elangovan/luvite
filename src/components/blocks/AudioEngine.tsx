"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export interface AudioEngineProps {
  src?: string;
  label?: string;
}

export default function AudioEngine({
  src = "",
  label = "Background Music",
}: AudioEngineProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const play = useCallback(() => {
    if (!audioRef.current || !src) return;
    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        // Fade in
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol = Math.min(vol + 0.05, 0.6);
          if (audioRef.current) audioRef.current.volume = vol;
          if (vol >= 0.6) clearInterval(fadeIn);
        }, 100);
      })
      .catch(() => {
        // Autoplay blocked — will retry on next interaction
      });
  }, [src]);

  // Start on first user interaction (bypasses autoplay block)
  useEffect(() => {
    if (hasInteracted) return;

    function onInteract() {
      setHasInteracted(true);
      play();
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("scroll", onInteract);
    }

    document.addEventListener("click", onInteract, { once: true });
    document.addEventListener("touchstart", onInteract, { once: true });
    document.addEventListener("scroll", onInteract, { once: true });

    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
      document.removeEventListener("scroll", onInteract);
    };
  }, [hasInteracted, play]);

  function toggle() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      {/* Floating music toggle button */}
      <motion.button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-white/90 shadow-lg backdrop-blur-sm transition-colors hover:bg-gold/10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.svg
              key="playing"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {/* Music bars animation */}
              <motion.rect
                x="4"
                y="8"
                width="3"
                height="8"
                rx="1"
                animate={{ height: [8, 14, 8], y: [8, 5, 8] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.rect
                x="10.5"
                y="6"
                width="3"
                height="12"
                rx="1"
                animate={{ height: [12, 6, 12], y: [6, 9, 6] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              />
              <motion.rect
                x="17"
                y="9"
                width="3"
                height="6"
                rx="1"
                animate={{ height: [6, 12, 6], y: [9, 6, 9] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="paused"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-charcoal/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <line x1="4" y1="12" x2="8" y2="12" />
              <line x1="10" y1="12" x2="14" y2="12" />
              <line x1="16" y1="12" x2="20" y2="12" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hint text */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            className="fixed bottom-20 right-4 z-50 rounded-lg bg-charcoal/80 px-3 py-2 text-xs text-white shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2 }}
          >
            {label} — tap anywhere to play
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
