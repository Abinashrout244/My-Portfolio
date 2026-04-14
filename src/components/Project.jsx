import React, { useState, useRef, useEffect } from "react";
import { ProjectData } from "../utils/Project";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, ExternalLink, Github } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Project = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionTopRef = useRef(null);
  const gridRef = useRef(null);
  const hasInteracted = useRef(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if ("scrollRestoration" in window.history)
      window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (hasInteracted.current && !showAll && sectionTopRef.current) {
      const id = setTimeout(
        () =>
          sectionTopRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        100,
      );
      return () => clearTimeout(id);
    }
  }, [showAll]);

  /* GSAP stagger on cards */
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards?.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ctx.revert();
  }, [showAll]);

  const displayedProjects = showAll ? ProjectData : ProjectData.slice(0, 3);
  const handleToggle = () => {
    hasInteracted.current = true;
    setShowAll(!showAll);
  };

  return (
    <div
      ref={sectionTopRef}
      className="scroll-mt-24 pt-6 md:pt-20 px-6 md:px-28 py-20 bg-transparent"
      id="project"
    >
      {/* Header */}
      <div className="justify-center items-center flex flex-col space-y-4 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`uppercase font-black text-4xl md:text-6xl text-center tracking-tighter ${isDark ? "text-[#e0e0e0]" : "text-white"}`}
        >
          My{" "}
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"}`}
          >
            Projects
          </span>
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          viewport={{ once: true }}
          className={`h-1.5 rounded-full ${isDark ? "bg-gray-600" : "bg-gradient-to-r from-pink-500 to-indigo-500"}`}
        />
      </div>

      {/* Grid */}
      <ul
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-visible"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((item) => (
            <motion.li
              key={item.id}
              exit={{ opacity: 0, scale: 0.9 }}
              className="project-card"
            >
              {/* 3D Tilt wrapper */}
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                glareEnable={true}
                glareMaxOpacity={isDark ? 0.08 : 0.12}
                glareColor={isDark ? "#ffffff" : "#db2777"}
                glarePosition="all"
                glareBorderRadius="2.5rem"
                scale={1.02}
                transitionSpeed={600}
                className="h-full"
              >
                <motion.div
                  whileHover={{
                    boxShadow: isDark
                      ? "0 24px 48px rgba(0,0,0,0.6), 0 0 24px rgba(156,163,175,0.08)"
                      : "0 24px 48px rgba(0,0,0,0.3), 0 0 30px rgba(219,39,119,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`group relative rounded-[2.5rem] overflow-hidden border flex flex-col h-full transition-colors duration-500 shadow-2xl
                    ${isDark ? "bg-[#1e1e1e] border-white/5 hover:border-gray-500/50" : "bg-white/10 backdrop-blur-md border border-white/10 hover:border-pink-500/30"}`}
                >
                  {/* Image area */}
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Hover overlay — view live CTA */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20 rounded-[1.6rem]">
                        <span
                          className={`flex items-center gap-2 px-5 py-2 rounded-full text-white font-bold text-sm border border-white/30 backdrop-blur-md
                          ${isDark ? "bg-white/10" : "bg-pink-500/20"}`}
                        >
                          <ExternalLink size={14} /> View Live
                        </span>
                      </div>

                      {/* Live badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/10 border border-green-500/20 backdrop-blur-md rounded-full flex items-center gap-1.5 z-30">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                          Live
                        </span>
                      </div>

                      <div
                        className={`absolute inset-0 opacity-80 pointer-events-none ${isDark ? "bg-gradient-to-t from-[#121212]" : "bg-gradient-to-t from-slate-900/60"}`}
                      />
                    </a>

                    {/* Tech pills */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-20 pointer-events-none">
                      {item.tech.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter backdrop-blur-xl border rounded-full transition-all duration-500
                          ${isDark ? "bg-[#2a2a2a] border-white/10 text-gray-300" : "bg-white/20 border-white/20 text-white group-hover:bg-pink-500 group-hover:border-pink-400"}`}
                        >
                          {skill.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 pt-2 flex flex-col grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3
                        className={`text-2xl font-black tracking-tighter transition-all duration-300
                        ${isDark ? "text-white group-hover:text-gray-400" : "text-white group-hover:text-pink-400"}`}
                      >
                        {item.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono mt-2 uppercase tracking-widest ${isDark ? "text-gray-500" : "text-white/40"}`}
                      >
                        #{item.id}
                      </span>
                    </div>
                    <p
                      className={`text-sm leading-relaxed mb-8 grow line-clamp-2 font-medium ${isDark ? "text-gray-400" : "text-white/70"}`}
                    >
                      {item.desc}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 mt-auto">
                      <motion.a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300
                          ${isDark ? "bg-transparent border-white/10 text-gray-300 hover:bg-white hover:text-black" : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black"}`}
                      >
                        <Github size={12} /> Source
                      </motion.a>
                      <motion.a
                        href={item.Deploy}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{
                          scale: 1.06,
                          boxShadow: isDark
                            ? "0 0 20px rgba(156,163,175,0.3)"
                            : "0 0 24px rgba(219,39,119,0.45)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-white
                          ${isDark ? "bg-gradient-to-r from-gray-600 to-gray-400" : "bg-gradient-to-r from-pink-600 to-indigo-600 shadow-pink-500/20"}`}
                      >
                        <ExternalLink size={12} /> Preview
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Show More */}
      <div className="mt-16 flex justify-center">
        <motion.button
          onClick={handleToggle}
          whileHover={{
            scale: 1.05,
            boxShadow: isDark
              ? "0 0 24px rgba(156,163,175,0.2)"
              : "0 0 28px rgba(219,39,119,0.3)",
          }}
          whileTap={{ scale: 0.96 }}
          className="relative group inline-flex items-center justify-center px-10 py-3 font-bold"
        >
          <span
            className={`absolute inset-0 w-full h-full rounded-full border-2 transition-all
            ${isDark ? "border-gray-700 group-hover:border-white" : "border-white/20 group-hover:border-pink-500"}`}
          />
          <span
            className={`relative flex items-center gap-2 tracking-widest text-xs uppercase
            ${isDark ? "text-gray-300 group-hover:text-white" : "text-white/70 group-hover:text-pink-500"}`}
          >
            {showAll ? "Show Less" : "Show More Projects"}
            {showAll ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default Project;
