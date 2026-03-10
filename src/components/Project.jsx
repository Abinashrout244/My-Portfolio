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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
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
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
              key={item.id}
              className="group relative bg-white/5 backdrop-blur-xl rounded-4xl overflow-hidden border border-white/10 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-500 shadow-2xl flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-[220px]">
                <a href={item.Deploy} target="_blank" rel="noreferrer">
                  <img
                    src={item.imgUrl}
                    alt={item.imgAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </a>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 grow line-clamp-3">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-5">
                  <div className="flex gap-4">
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-300 border border-white/10"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=0tREDFkScvsm&format=png&color=000000"
                        className="w-5 h-5 invert"
                        alt="GitHub"
                      />
                    </a>
                    <a
                      href={item.Deploy}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-pink-500 rounded-full hover:bg-white hover:text-pink-500 transition-all duration-300 shadow-lg shadow-pink-500/20"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=21104&format=png&color=000000"
                        className="w-5 h-5 invert"
                        alt="Deploy"
                      />
                    </a>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Project.0{item.id}
                  </span>
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
