import React, { useState, useRef, useEffect } from "react";
import { ProjectData } from "../utils/Project";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigDown, ArrowDown, ArrowUp } from "lucide-react";

const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const Project = () => {
  const [showAll, setShowAll] = useState(false);
  const sectionTopRef = useRef(null);

  // Track if the user has actually interacted with the "Show Less" button
  const hasInteracted = useRef(false);

  // 1. GLOBAL REFRESH LOGIC (Run only once on mount)
  useEffect(() => {
    // Disable browser's auto-scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Force window to top
    window.scrollTo(0, 0);
  }, []);

  // 2. LOCAL "SHOW LESS" SCROLL LOGIC
  useEffect(() => {
    // Only scroll if the user has clicked "Show Less" (not on refresh/load)
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

  return (
    <div
      ref={sectionTopRef}
      className="scroll-mt-24 pt-6 md:pt-20 px-6 md:px-28 py-20 bg-transparent"
      id="project"
    >
      <div className="justify-center items-center flex flex-col space-y-4 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase font-black text-4xl md:text-6xl text-center tracking-tighter text-white"
        >
          My{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-indigo-500">
            Projects
          </span>
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100px" }}
          className="h-1.5 bg-linear-to-r from-pink-500 to-indigo-500 rounded-full"
        />
      </div>

      {/* PROJECT GRID */}
      <motion.ul
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((item) => (
            <motion.li
              layout
              variants={card}
              initial="hidden"
              whileInView="show" // Trigger when scrolled into view
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }} // Lifts the card up on hover
              transition={{ duration: 0.4 }}
              key={item.id}
              className="group relative bg-[#0f172a]/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-pink-500/30 transition-all duration-700 shadow-2xl flex flex-col h-full"
            >
              {/* TOP IMAGE SECTION */}
              <div className="relative overflow-hidden h-[240px] m-3 rounded-[1.8rem]">
                <a
                  href={item.Deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="block h-full"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.imgAlt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Overlay Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                </a>

                {/* ENHANCED TECH STACK - Floating Glass Pills */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 z-20 pointer-events-none">
                  {item.tech.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-[10px] font-bold text-white/90 uppercase tracking-tighter bg-white/10 backdrop-blur-xl border border-white/10 rounded-full shadow-sm transform transition-all duration-500 group-hover:bg-pink-500 group-hover:border-pink-400 group-hover:-translate-y-1"
                      style={{ transitionDelay: `${index * 40}ms` }}
                    >
                      {skill.text}
                    </span>
                  ))}
                </div>

                {/* Live Status Indicator */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/10 border border-green-500/20 backdrop-blur-md rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
                    Live
                  </span>
                </div>
              </div>

              {/* BOTTOM CONTENT SECTION */}
              <div className="p-7 pt-2 flex flex-col grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-indigo-500 transition-all duration-300">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-white/20 font-mono mt-2 uppercase tracking-widest">
                    #{item.id}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 grow line-clamp-2 font-medium">
                  {item.desc}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-3">
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl hover:bg-white hover:text-black transition-all duration-300 border border-white/10 text-[11px] font-bold uppercase tracking-wider"
                    >
                      Source
                      <img
                        src="https://img.icons8.com/?size=100&id=0tREDFkScvsm&format=png&color=000000"
                        className="w-4 h-4 invert group-hover:invert-0 transition-all"
                        alt="GitHub"
                      />
                    </a>

                    <a
                      href={item.Deploy}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/20 text-[11px] font-bold uppercase tracking-wider text-white"
                    >
                      Preview
                      <ArrowDown size={14} className="-rotate-135" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <div className="mt-16 flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="relative group inline-flex items-center justify-center px-10 py-3 font-bold text-white transition-all duration-300"
        >
          <span className="absolute inset-0 w-full h-full rounded-full border-2 border-pink-500/50 group-hover:border-pink-500 transition-all"></span>
          <span className="absolute inset-0 w-full h-full rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 blur-md transition-all"></span>

          <span className="relative flex items-center gap-2 tracking-widest text-xs uppercase">
            {showAll ? (
              <p className="flex gap-2">
                Show Less
                <ArrowUp size={16} />
              </p>
            ) : (
              <p className="flex flex-row gap-2">
                Show More Projects
                <ArrowDown size={16} />
              </p>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Project;
