import React, { useState, useRef, useEffect } from "react";
import { ProjectData } from "../utils/Project";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const Project = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionTopRef = useRef(null);
  const hasInteracted = useRef(false);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hasInteracted.current && !showAll && sectionTopRef.current) {
      const timeoutId = setTimeout(() => {
        sectionTopRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [showAll]);

  const displayedProjects = showAll ? ProjectData : ProjectData.slice(0, 3);

  const handleToggle = () => {
    hasInteracted.current = true;
    setShowAll(!showAll);
  };

  return (
    <div
      ref={sectionTopRef}
      className="scroll-mt-24 pt-6 md:pt-20 px-6 md:px-28 py-20 transition-all duration-700 bg-transparent"
      id="project"
    >
      {/* 1. HEADER */}
      <div className="justify-center items-center flex flex-col space-y-4 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`uppercase font-black text-4xl md:text-6xl text-center tracking-tighter transition-colors ${
            isDark ? "text-[#e0e0e0]" : "text-white"
          }`}
        >
          My{" "}
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 ${
              isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"
            }`}
          >
            Projects
          </span>
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            isDark
              ? "bg-gray-600"
              : "bg-gradient-to-r from-pink-500 to-indigo-500"
          }`}
        />
      </div>

      {/* 2. PROJECT GRID */}
      <motion.ul
        variants={parent}
        initial="hidden"
        whileInView="show"
        // Lower amount (0.05) ensures it triggers even on small mobile screens
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((item) => (
            <motion.li
              variants={card}
              key={item.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.05 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className={`group relative rounded-[2.5rem] overflow-hidden border transition-all duration-700 shadow-2xl flex flex-col h-full ${
                isDark
                  ? "bg-[#1e1e1e] border-white/5 hover:border-gray-500/50"
                  : "bg-white/10 backdrop-blur-md border border-white/10 hover:border-pink-500/30"
              }`}
            >
              {/* TOP IMAGE SECTION */}
              <div className="relative overflow-hidden h-[240px] m-3 rounded-[1.8rem]">
                <a
                  href={item.Deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full relative z-10"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.imgAlt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/10 border border-green-500/20 backdrop-blur-md rounded-full flex items-center gap-1.5 z-20">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                      Live
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 opacity-80 transition-colors pointer-events-none ${
                      isDark
                        ? "bg-gradient-to-t from-[#121212]"
                        : "bg-gradient-to-t from-slate-900/60"
                    }`}
                  />
                </a>

                {/* TECH PILLS */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-20 pointer-events-none">
                  {item.tech.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter backdrop-blur-xl border rounded-full transition-all duration-500 ${
                        isDark
                          ? "bg-[#2a2a2a] border-white/10 text-gray-300"
                          : "bg-white/20 border-white/20 text-white group-hover:bg-pink-500 group-hover:border-pink-400"
                      }`}
                    >
                      {skill.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* BOTTOM CONTENT SECTION */}
              <div className="p-7 pt-2 flex flex-col grow">
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className={`text-2xl font-black tracking-tighter transition-all duration-300 ${
                      isDark
                        ? "text-white group-hover:text-gray-400"
                        : "text-white group-hover:text-pink-400"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <span
                    className={`text-[10px] font-mono mt-2 uppercase tracking-widest ${
                      isDark ? "text-gray-500" : "text-white/40"
                    }`}
                  >
                    #{item.id}
                  </span>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-8 grow line-clamp-2 font-medium transition-colors ${
                    isDark ? "text-gray-400" : "text-white/70"
                  }`}
                >
                  {item.desc}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-3 mt-auto">
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isDark
                        ? "bg-transparent border-white/10 text-gray-300 hover:bg-white hover:text-black"
                        : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black"
                    }`}
                  >
                    Source
                  </a>

                  <a
                    href={item.Deploy}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg text-[11px] font-bold uppercase tracking-wider text-white transition-all duration-300 ${
                      isDark
                        ? "bg-gradient-to-r from-gray-600 to-gray-400 shadow-gray-900/20 hover:scale-105"
                        : "bg-gradient-to-r from-pink-600 to-indigo-600 shadow-pink-500/20 hover:scale-105"
                    }`}
                  >
                    Preview
                  </a>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* SHOW MORE BUTTON */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={handleToggle}
          className="relative group inline-flex items-center justify-center px-10 py-3 font-bold transition-all duration-300"
        >
          <span
            className={`absolute inset-0 w-full h-full rounded-full border-2 transition-all ${
              isDark
                ? "border-gray-700 group-hover:border-white"
                : "border-white/20 group-hover:border-pink-500"
            }`}
          ></span>
          <span
            className={`relative flex items-center gap-2 tracking-widest text-xs uppercase ${
              isDark
                ? "text-gray-300 group-hover:text-white"
                : "text-white/70 group-hover:text-pink-500"
            }`}
          >
            {showAll ? "Show Less" : "Show More Projects"}
            {showAll ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Project;
