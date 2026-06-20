import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useTheme } from "../context/ThemeContext";

/* ─────────────────────────────────────────────
   EDUCATION DATA — easy to customise
───────────────────────────────────────────── */
const educationData = [
  {
    id: 1,
    type: "B.Tech",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Oxford College Of Enginnering & Management",
    location: "Bhubaneswar, Odisha",
    duration: "2024 – 2028",
    grade: "8.7 CGPA",
    gradeLabel: "CGPA",
    isCurrent: true,
    icon: "🎓",
    color: { light: "from-pink-500 to-indigo-500", dark: "from-pink-400 to-indigo-400" },
    glowLight: "rgba(236,72,153,0.25)",
    glowDark: "rgba(236,72,153,0.18)",
  },
  {
    id: 2,
    type: "12th",
    degree: "Higher Secondary Certificate",
    field: "Science (PCM)",
    institution: "Shanti Institue of Management & HIgher Secondary School",
    location: "CDA-10,Cuttack, Odisha",
    duration: "2023 – 2024",
    grade: "86%",
    gradeLabel: "Percentage",
    isCurrent: false,
    icon: "📚",
    color: { light: "from-indigo-500 to-cyan-500", dark: "from-indigo-400 to-cyan-400" },
    glowLight: "rgba(99,102,241,0.25)",
    glowDark: "rgba(99,102,241,0.18)",
  },
  {
    id: 3,
    type: "10th",
    degree: "Secondary School Certificate",
    field: "General Studies",
    institution: "Baghua Brahmani Devee High Scholl ,Baghua",
    location: "Balishai ,Jajpur",
    duration: "2021 – 2022",
    grade: "85%",
    gradeLabel: "Percentage",
    isCurrent: false,
    icon: "🏫",
    color: { light: "from-cyan-500 to-emerald-500", dark: "from-cyan-400 to-emerald-400" },
    glowLight: "rgba(6,182,212,0.25)",
    glowDark: "rgba(6,182,212,0.18)",
  },
];

/* ─────────────────────────────────────────────
   FLOATING PARTICLE
───────────────────────────────────────────── */
const Particle = ({ isDark, index }) => {
  const colors = isDark
    ? ["rgba(236,72,153,0.4)", "rgba(99,102,241,0.4)", "rgba(6,182,212,0.4)", "rgba(255,255,255,0.2)"]
    : ["rgba(236,72,153,0.5)", "rgba(99,102,241,0.5)", "rgba(6,182,212,0.5)", "rgba(255,255,255,0.3)"];

  const size = 3 + (index % 5);
  const color = colors[index % colors.length];
  const startX = 5 + ((index * 13) % 90);
  const startY = 5 + ((index * 17) % 85);
  const duration = 8 + (index % 7);
  const delay = (index * 0.7) % 5;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${startX}%`,
        top: `${startY}%`,
        filter: `blur(${size > 5 ? 1 : 0}px)`,
      }}
      animate={{
        y: [0, -30, 0, -15, 0],
        x: [0, 10, -5, 8, 0],
        opacity: [0.3, 0.8, 0.5, 0.9, 0.3],
        scale: [1, 1.2, 0.9, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

/* ─────────────────────────────────────────────
   TIMELINE DOT
───────────────────────────────────────────── */
const TimelineDot = ({ item, isDark, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    aria-label={`View ${item.degree}`}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
    style={{
      background: isDark
        ? "linear-gradient(135deg, #1e1e1e, #2a2a2a)"
        : "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(10,26,58,0.9))",
      boxShadow: isActive
        ? isDark
          ? `0 0 20px ${item.glowDark}, 0 0 40px ${item.glowDark}`
          : `0 0 24px ${item.glowLight}, 0 0 48px ${item.glowLight}`
        : "none",
      border: `2px solid ${isActive ? (isDark ? "rgba(236,72,153,0.6)" : "rgba(236,72,153,0.8)") : (isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)")}`,
    }}
  >
    <span className="text-xl md:text-2xl leading-none select-none">{item.icon}</span>
    {/* Pulse ring on active */}
    {isActive && (
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: `2px solid ${isDark ? item.glowDark : item.glowLight}` }}
        animate={{ scale: [1, 1.6, 1.6], opacity: [0.8, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
  </motion.button>
);

/* ─────────────────────────────────────────────
   INFO ROW
───────────────────────────────────────────── */
const InfoRow = ({ icon, label, value, isDark }) => (
  <div className="flex items-center gap-3">
    <span
      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-sm
        ${isDark ? "bg-white/5 text-gray-400" : "bg-white/10 text-white/70"}`}
    >
      {icon}
    </span>
    <div className="min-w-0">
      <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-gray-600" : "text-white/40"}`}>
        {label}
      </p>
      <p className={`text-sm font-semibold truncate ${isDark ? "text-gray-300" : "text-white/90"}`}>{value}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   EDUCATION CARD
───────────────────────────────────────────── */
const EducationCard = ({ item, index, isDark, isActive, onClick }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onClick={onClick}
      role="button"
      aria-pressed={isActive}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="relative rounded-3xl overflow-hidden cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(20,20,20,0.75))"
          : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${isActive
          ? isDark ? "rgba(236,72,153,0.4)" : "rgba(236,72,153,0.5)"
          : isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.12)"}`,
        boxShadow: isActive
          ? isDark
            ? `0 0 0 1px rgba(236,72,153,0.2), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${item.glowDark}`
            : `0 0 0 1px rgba(236,72,153,0.3), 0 20px 60px rgba(0,0,0,0.3), 0 0 50px ${item.glowLight}`
          : isDark
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(0,0,0,0.2)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Gradient top bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r ${isDark ? item.color.dark : item.color.light}`}
      />

      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${isDark ? item.glowDark : item.glowLight} 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-6 md:p-8">
        {/* TOP ROW — Type badge + Current badge */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            {/* Degree type pill */}
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] bg-linear-to-r ${isDark ? item.color.dark : item.color.light} text-white`}
            >
              {item.type}
            </span>
          </div>

          {item.isCurrent && (
            <motion.span
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: isDark ? "rgba(236,72,153,0.1)" : "rgba(236,72,153,0.15)",
                borderColor: isDark ? "rgba(236,72,153,0.3)" : "rgba(236,72,153,0.4)",
                color: isDark ? "#f472b6" : "#ec4899",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              Current
            </motion.span>
          )}
        </div>

        {/* DEGREE TITLE */}
        <h3 className={`text-xl md:text-2xl font-black tracking-tight mb-1 ${isDark ? "text-white" : "text-white"}`}>
          {item.degree}
        </h3>
        <p
          className={`text-sm font-semibold mb-5 bg-linear-to-r bg-clip-text text-transparent ${isDark ? item.color.dark : item.color.light}`}
        >
          {item.field}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-5"
          style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)" }}
        />

        {/* INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon="🏛️"
            label="Institution"
            value={item.institution}
            isDark={isDark}
          />
          <InfoRow
            icon="📍"
            label="Location"
            value={item.location}
            isDark={isDark}
          />
          <InfoRow
            icon="📅"
            label="Duration"
            value={item.duration}
            isDark={isDark}
          />
          <InfoRow
            icon="🏆"
            label={item.gradeLabel}
            value={item.grade}
            isDark={isDark}
          />
        </div>

        {/* GRADE PROGRESS BAR (decorative) */}
        <div className="mt-6">
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: item.gradeLabel === "CGPA" ? "82%" : item.grade } : {}}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 + 0.4 }}
              className={`h-full rounded-full bg-linear-to-r ${isDark ? item.color.dark : item.color.light}`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────
   MAIN EDUCATION COMPONENT
───────────────────────────────────────────── */
const Education = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeId, setActiveId] = useState(1);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  /* Scroll-driven timeline line growth */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section
      id="education"
      ref={sectionRef}
      aria-label="Education section"
      className={`scroll-mt-24 relative min-h-screen px-6 md:px-20 lg:px-40 py-20 overflow-hidden transition-all duration-700 bg-transparent
        ${isDark ? "text-[#e0e0e0]" : "text-white"}`}
    >
      {/* ── FLOATING PARTICLES ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <Particle key={i} index={i} isDark={isDark} />
        ))}
      </div>

      {/* ── AMBIENT GLOWS ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[140px] pointer-events-none animate-pulse"
        style={{ background: isDark ? "rgba(236,72,153,0.05)" : "rgba(236,72,153,0.08)" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[140px] pointer-events-none animate-pulse"
        style={{ background: isDark ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.08)", animationDelay: "1.5s" }}
      />

      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col items-center mb-16 text-center relative z-10">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`px-4 py-1 rounded-full border text-xs font-bold tracking-[0.3em] uppercase mb-4 transition-colors
            ${isDark
              ? "border-gray-700 bg-gray-800/30 text-gray-400"
              : "border-pink-500/30 bg-pink-500/10 text-pink-400"}`}
        >
          My Journey
        </motion.div>

        {/* Graduation cap + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-3"
        >
          <motion.span
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl md:text-5xl"
            aria-hidden="true"
          >
            🎓
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Edu
            <span
              className={`italic bg-clip-text text-transparent bg-linear-to-r transition-all duration-500
                ${isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"}`}
            >
              cation
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`text-sm md:text-base font-medium tracking-wide mb-5
            ${isDark ? "text-gray-500" : "text-white/50"}`}
        >
          My academic journey and qualifications
        </motion.p>

        {/* Decorative accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative h-[3px] w-24 origin-center"
          style={{
            background: isDark
              ? "linear-gradient(to right, transparent, #f472b6, #818cf8, transparent)"
              : "linear-gradient(to right, transparent, #ec4899, #6366f1, transparent)",
          }}
        >
          <span
            className="absolute left-1/2 -translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full"
            style={{
              background: isDark ? "#f472b6" : "#ec4899",
              boxShadow: isDark ? "0 0 8px rgba(244,114,182,0.8)" : "0 0 8px rgba(236,72,153,0.8)",
            }}
          />
        </motion.div>
      </div>

      {/* ── TIMELINE + CARDS ── */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex gap-6 md:gap-10 lg:gap-14" ref={timelineRef}>

          {/* ── LEFT: TIMELINE ── */}
          <div
            className="shrink-0 flex flex-col items-center"
            aria-hidden="true"
          >
            {/* Vertical track */}
            <div
              className="relative w-0.5 rounded-full overflow-hidden"
              style={{
                height: "100%",
                background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
                minHeight: "100%",
              }}
            >
              {/* Scroll-driven fill */}
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{
                  height: lineHeight,
                  background: isDark
                    ? "linear-gradient(to bottom, #f472b6, #818cf8, #22d3ee)"
                    : "linear-gradient(to bottom, #ec4899, #6366f1, #06b6d4)",
                  boxShadow: isDark
                    ? "0 0 8px rgba(244,114,182,0.5)"
                    : "0 0 10px rgba(236,72,153,0.5)",
                }}
              />
            </div>
          </div>

          {/* ── RIGHT: CARDS + DOTS ── */}
          <div className="flex-1 flex flex-col gap-10 md:gap-12">
            {educationData.map((item, index) => (
              <div key={item.id} className="relative flex gap-4 md:gap-6 items-start">
                {/* Timeline dot (absolutely positioned to overlap the line) */}
                <div
                  className="absolute -left-[calc(1.75rem+1px)] md:-left-[calc(2rem+1px)] top-6 -translate-x-1/2"
                  style={{ zIndex: 20 }}
                >
                  <TimelineDot
                    item={item}
                    isDark={isDark}
                    isActive={activeId === item.id}
                    onClick={() => setActiveId(item.id)}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 pl-6 md:pl-8">
                  <EducationCard
                    item={item}
                    index={index}
                    isDark={isDark}
                    isActive={activeId === item.id}
                    onClick={() => setActiveId(item.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM GRADIENT FADE ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(to top, #121212, transparent)"
            : "linear-gradient(to top, #050510, transparent)",
        }}
      />
    </section>
  );
};

export default Education;
