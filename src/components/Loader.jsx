import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// Split text into span-wrapped letters for stagger reveal
const SplitText = ({ text, className, stagger = 0.05, delay = 0.3 }) => {
  const letters = text.split("");
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const letter = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } },
  };
  return (
    <motion.span variants={container} initial="hidden" animate="visible" className={className}>
      {letters.map((l, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span variants={letter} className="inline-block">
            {l === " " ? "\u00A0" : l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const Loader = ({ onComplete }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Animate progress 0 → 100 over ~2s
    let start = null;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(step);
      } else {
        // small pause then trigger exit
        setTimeout(() => setDone(true), 400);
      }
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden
            ${isDark ? "bg-[#090909]" : "bg-[#050510]"}`}
        >
          {/* Grid decoration */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
                : "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Centre glow */}
          <div className={`absolute w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none
            ${isDark ? "bg-gray-500/10" : "bg-indigo-600/15"}`}
          />

          {/* Initials reveal */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Big initials */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-4xl font-black border
                  ${isDark
                    ? "bg-[#1e1e1e] border-white/10 text-white"
                    : "bg-white/10 border-white/20 text-white"
                  }`}
              >
                <span className={`text-transparent bg-clip-text bg-gradient-to-br
                  ${isDark ? "from-white to-gray-400" : "from-pink-400 to-indigo-400"}`}>
                  AR
                </span>
              </motion.div>
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={`absolute -inset-2 rounded-[2.5rem] border-t-2 border-r-2 border-transparent
                  ${isDark ? "border-t-gray-500 border-r-gray-600" : "border-t-pink-500 border-r-indigo-500"}`}
              />
            </div>

            {/* Name */}
            <div className="text-center">
              <SplitText
                text="ABINASH ROUT"
                className="text-2xl md:text-3xl font-black tracking-[0.3em] text-white"
                stagger={0.04}
                delay={0.5}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className={`text-xs tracking-[0.4em] uppercase mt-2 ${isDark ? "text-gray-500" : "text-white/40"}`}
              >
                Front-End Developer
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="w-64 mt-4"
            >
              <div className={`w-full h-[2px] rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-white/10"}`}>
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${isDark ? "from-gray-400 to-gray-600" : "from-pink-500 to-indigo-500"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className={`font-mono text-[10px] tracking-widest ${isDark ? "text-gray-600" : "text-white/30"}`}>
                  Loading
                </span>
                <span className={`font-mono text-[10px] ${isDark ? "text-gray-500" : "text-white/40"}`}>
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
