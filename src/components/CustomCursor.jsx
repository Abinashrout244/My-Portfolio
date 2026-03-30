import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

/**
 * Custom cursor: a small dot + trailing ring.
 * Hidden automatically on touch devices.
 * Expands when hovering interactive elements (a, button, [data-cursor]).
 */
const CustomCursor = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

  // Ring follows with lag
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Detect touch devices — hide cursor on them
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    // Hide native cursor globally
    document.body.classList.add("custom-cursor-active");

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor]");
      setIsHovering(!!target);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseleave", handleLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (isTouchDevice) return null;

  const dotColor = isDark
    ? isHovering ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)"
    : isHovering ? "rgba(236,72,153,1)" : "rgba(99,102,241,0.9)";

  const ringColor = isDark
    ? "rgba(255,255,255,0.15)"
    : "rgba(236,72,153,0.2)";

  return (
    <>
      {/* Small dot */}
      <motion.div
        style={{ translateX: dotX, translateY: dotY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ scale: { duration: 0.2 } }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="w-2 h-2 rounded-full transition-colors duration-200"
          style={{ backgroundColor: dotColor }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        style={{ translateX: ringX, translateY: ringY, opacity: isVisible ? 1 : 0 }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering
            ? isDark ? "rgba(255,255,255,0.4)" : "rgba(236,72,153,0.5)"
            : ringColor,
        }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
        className="fixed top-0 left-0 z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border"
      >
        <div
          className="w-9 h-9 rounded-full border transition-colors duration-300"
          style={{ borderColor: isHovering
            ? isDark ? "rgba(255,255,255,0.4)" : "rgba(236,72,153,0.5)"
            : ringColor
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
