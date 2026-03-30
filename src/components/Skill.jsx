import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const data = [
  { id: 1, text: "HTML", percentage: "90%", width: "90%", color: "from-orange-500 to-red-500" },
  { id: 2, text: "Css", percentage: "80%", width: "80%", color: "from-blue-500 to-indigo-500" },
  { id: 3, text: "JAVA SCRIPT", percentage: "70%", width: "70%", color: "from-yellow-400 to-orange-500" },
  { id: 4, text: "react", percentage: "75%", width: "75%", color: "from-cyan-400 to-blue-500" },
  { id: 5, text: "Tailwind css", percentage: "77%", width: "77%", color: "from-teal-400 to-cyan-500" },
  { id: 6, text: "NOdE.js", percentage: "70%", width: "70%", color: "from-green-500 to-emerald-700" },
  { id: 7, text: "Express.js", percentage: "60%", width: "60%", color: "from-gray-300 to-gray-500" },
  { id: 8, text: "Mongo DB", percentage: "60%", width: "60%", color: "from-green-400 to-green-600" },
  { id: 9, text: "DSA", percentage: "30%", width: "30%", color: "from-pink-500 to-rose-600" },
];

const skillIcons = [
  { id: 1, img: "https://img.icons8.com/?size=100&id=20909&format=png&color=ffffff" },
  { id: 2, img: "https://img.icons8.com/?size=100&id=21278&format=png&color=ffffff" },
  { id: 3, img: "https://img.icons8.com/?size=100&id=TyEv5JJxLmAE&format=png&color=FFFF00" },
  { id: 4, img: "https://img.icons8.com/?size=100&id=NfbyHexzVEDk&format=png&color=ffffff" },
  { id: 5, img: "https://img.icons8.com/?size=100&id=WoopfRcDj3RF&format=png&color=ffffff" },
  { id: 7, img: "https://img.icons8.com/?size=100&id=iEBcQcM9rnZ9&format=png&color=ffffff" },
  { id: 8, img: "https://img.icons8.com/?size=100&id=FBycNmdwUQz1&format=png&color=ffffff" },
  { id: 9, img: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=ffffff" },
  { id: 10, img: "https://img.icons8.com/?size=100&id=bosfpvRzNOG8&format=png&color=ffffff" },
  { id: 11, img: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=ffffff" },
];

const toolIcons = [
  { id: 1, img: "https://img.icons8.com/?size=100&id=v05jsvW3RprR&format=png&color=ffffff" },
  { id: 2, img: "https://img.icons8.com/?size=100&id=20906&format=png&color=ffffff" },
  { id: 4, img: "https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=ffffff" },
  { id: 5, img: "https://img.icons8.com/?size=100&id=24895&format=png&color=ffffff" },
  { id: 6, img: "https://img.icons8.com/?size=100&id=QEQQKirln6Tf&format=png&color=ffffff" },
];

const optionalIcons = [
  { id: 1, img: "https://img.icons8.com/?size=100&id=l2v1nCw4goor&format=png&color=ffffff" },
  { id: 2, img: "https://img.icons8.com/?size=100&id=kwi0rSegAaX3&format=png&color=ffffff" },
  { id: 3, img: "https://img.icons8.com/?size=100&id=FJCUJYTof2TA&format=png&color=ffffff" },
  { id: 4, img: "https://img.icons8.com/?size=100&id=e4pUQ752DRTk&format=png&color=ffffff" },
  { id: 5, img: "https://img.icons8.com/?size=100&id=iWw83PVcBpLw&format=png&color=ffffff" },
];

// Stagger variants for icon grid
const iconGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const iconItem = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
  exit: { opacity: 0, scale: 0.5 },
};

const Skill = () => {
  const [tab, setTab] = useState("skill");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef(null);

  const getActiveData = () => {
    if (tab === "skill") return skillIcons;
    if (tab === "tool") return toolIcons;
    return optionalIcons;
  };

  // GSAP ScrollTrigger for section entry
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: el, start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skill"
      className={`scroll-mt-24 min-h-screen px-6 md:px-20 lg:px-40 py-20 relative overflow-hidden transition-all duration-700 bg-transparent 
      ${isDark ? "text-[#e0e0e0]" : "text-white"}`}
    >
      {/* 1. SECTION HEADER */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`px-4 py-1 rounded-full border text-xs font-bold tracking-[0.3em] uppercase mb-4 transition-colors ${
            isDark
              ? "border-gray-700 bg-gray-800/30 text-gray-400"
              : "border-pink-500/30 bg-pink-500/10 text-pink-500"
          }`}
        >
          My Expertise
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-black tracking-tighter"
        >
          Tech Stack &{" "}
          <span
            className={`italic bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 ${
              isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"
            }`}
          >
            Abilities.
          </span>
        </motion.h2>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div
        ref={sectionRef}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 backdrop-blur-xl rounded-[3rem] border p-8 md:p-12 shadow-2xl relative transition-all duration-500 ${
          isDark
            ? "bg-[#1e1e1e]/60 border-white/10"
            : "bg-white/10 border-white/20"
        }`}
      >
        {/* Glowing blob */}
        <div
          className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-colors ${
            isDark ? "bg-gray-500/5" : "bg-pink-500/10"
          }`}
        />

        {/* LEFT: PROGRESS BARS */}
        <div className="space-y-8">
          <ul className="space-y-6">
            {data.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase">
                  <span className={isDark ? "text-gray-300" : "text-white"}>{item.text}</span>
                  <span className={isDark ? "text-gray-400" : "text-pink-400"}>{item.percentage}</span>
                </div>
                <div
                  className={`w-full rounded-full h-2 overflow-hidden border transition-colors ${
                    isDark
                      ? "bg-[#121212] border-white/5"
                      : "bg-white/10 border-white/10"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* RIGHT: INTERACTIVE GRID */}
        <div className="flex flex-col gap-8 h-full">
          {/* TAB SWITCHER */}
          <div
            className={`flex p-1.5 rounded-full border relative transition-colors ${
              isDark ? "bg-[#121212] border-white/10" : "bg-black/20 border-white/10"
            }`}
          >
            {["skill", "tool", "optional"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest relative z-10 transition-colors duration-500 ${
                  tab === t
                    ? "text-white"
                    : isDark
                      ? "text-gray-500"
                      : "text-white/40"
                }`}
              >
                {t === "skill" ? "Skills" : t === "tool" ? "Tools" : "Optional"}
              </button>
            ))}

            <motion.div
              layoutId="tab-bg"
              className={`absolute inset-y-1.5 rounded-full ${
                isDark
                  ? "bg-gradient-to-r from-gray-600 to-gray-500"
                  : "bg-gradient-to-r from-pink-600 to-indigo-600"
              }`}
              animate={{
                left: tab === "skill" ? "6px" : tab === "tool" ? "33.3%" : "66.6%",
                width: "calc(33.3% - 8px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* ICON GRID */}
          <div
            className={`flex-grow rounded-[2rem] border p-8 backdrop-blur-sm min-h-[400px] transition-colors ${
              isDark
                ? "bg-[#121212]/50 border-white/5"
                : "bg-[#0f172a]/50 border border-white/10"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                variants={iconGrid}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-3 sm:grid-cols-4 gap-6"
              >
                {getActiveData().map((item) => (
                  <motion.div
                    key={`${tab}-${item.id}`}
                    variants={iconItem}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                      y: -6,
                      boxShadow: isDark
                        ? "0 0 16px rgba(156,163,175,0.2)"
                        : "0 0 20px rgba(219,39,119,0.35)",
                    }}
                    className={`aspect-square flex justify-center items-center border rounded-2xl transition-all duration-300 group shadow-lg cursor-pointer ${
                      isDark
                        ? "bg-[#1e1e1e] border-white/10 hover:bg-gray-700"
                        : "bg-white/10 border-white/20 hover:bg-pink-500"
                    }`}
                  >
                    <img
                      src={item.img}
                      className={`w-10 h-10 md:w-12 md:h-12 transition-all ${
                        isDark
                          ? "opacity-80 group-hover:opacity-100"
                          : "group-hover:brightness-200 transition-all"
                      }`}
                      alt="skill-icon"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
