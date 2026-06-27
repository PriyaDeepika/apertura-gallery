"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const initial =
    direction === "up"
      ? { opacity: 0, y }
      : direction === "left"
      ? { opacity: 0, x: -y }
      : direction === "right"
      ? { opacity: 0, x: y }
      : { opacity: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
