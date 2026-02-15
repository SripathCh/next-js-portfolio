"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Custom cursor — a small dot that follows your mouse with smooth spring physics
// Only shows on desktop (hidden on touch devices)
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    // Only show on non-touch devices
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50 mix-blend-difference" />
    </motion.div>
  );
}
