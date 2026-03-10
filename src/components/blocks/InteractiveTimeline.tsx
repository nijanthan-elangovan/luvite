"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface InteractiveTimelineProps {
  heading?: string;
  events?: TimelineEvent[];
}

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full items-center",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Content card */}
      <motion.div
        className={cn(
          "w-full rounded-xl border border-gold/20 bg-white/90 p-6 shadow-lg backdrop-blur-sm md:w-5/12",
          isLeft ? "md:text-right" : "md:text-left"
        )}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
          {event.date}
        </span>
        <h3 className="font-display mt-1 text-xl font-bold text-charcoal">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
          {event.description}
        </p>
      </motion.div>

      {/* Center dot + connector */}
      <div className="hidden md:flex md:w-2/12 justify-center">
        <motion.div
          className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-white shadow-md"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
        >
          <div className="h-2 w-2 rounded-full bg-gold" />
        </motion.div>
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-5/12" />
    </div>
  );
}

export default function InteractiveTimeline({
  heading = "Our Journey",
  events = [
    {
      date: "June 2020",
      title: "First Meeting",
      description: "A chance encounter that changed everything.",
    },
    {
      date: "December 2021",
      title: "The First Trip",
      description: "Exploring new places and making memories together.",
    },
    {
      date: "February 2024",
      title: "The Proposal",
      description: "A magical evening under the stars.",
    },
  ],
}: InteractiveTimelineProps) {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl font-bold text-charcoal md:text-5xl">
            {heading}
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold" />
        </motion.div>

        {/* Timeline track */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gold/30 md:block" />

          <div className="flex flex-col gap-12">
            {events.map((event, i) => (
              <TimelineItem key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
