"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function HelpButton() {
  const pathname = usePathname();

  // Hide on help page (it already has navigation) and on public invite pages
  if (pathname.startsWith("/help") || pathname.startsWith("/invite/")) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      <Link
        href="/help"
        className="fixed right-6 bottom-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-colors hover:bg-gold-dark"
        aria-label="Help center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </Link>
    </motion.div>
  );
}
