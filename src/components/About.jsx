import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCode } from "@fortawesome/free-solid-svg-icons";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CountUp = ({ to, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000 });

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => {
    return spring.on("change", (val) => {
      if (ref.current) ref.current.textContent = Math.round(val) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const StatCard = ({ value, suffix, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{
      y: -5,
      borderColor: "rgba(168,85,247,0.35)",
      boxShadow: "0 12px 32px rgba(168,85,247,0.12)",
    }}
    className="flex-1 flex flex-col items-center justify-center p-3 rounded-2xl text-center transition-all duration-300"
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <p
      className="text-2xl font-black"
      style={{
        background: "linear-gradient(135deg,#A855F7,#6366f1)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <CountUp to={value} suffix={suffix} />
    </p>
    <p
      className="text-[9px] uppercase tracking-[.18em] font-bold mt-1"
      style={{ color: "#334e68", fontFamily: "'JetBrains Mono', monospace" }}
    >
      {label}
    </p>
  </motion.div>
);

const CodeLine = ({ lineNum, children }) => (
  <div
    className="flex text-[11.5px] leading-[1.8] whitespace-pre"
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  >
    <span
      className="w-[38px] text-right pr-[14px] select-none text-[10px] flex-shrink-0"
      style={{ color: "#1e3451" }}
    >
      {lineNum}
    </span>
    <span>{children}</span>
  </div>
);

const kw = (t) => <span style={{ color: "#c084fc" }}>{t}</span>;
const va = (t) => <span style={{ color: "#7dd3fc" }}>{t}</span>;
const st = (t) => <span style={{ color: "#fde68a" }}>{t}</span>;
const bo = (t) => <span style={{ color: "#4ade80" }}>{t}</span>;
const pu = (t) => <span style={{ color: "#94a3b8" }}>{t}</span>;
const cm = (t) => (
  <span style={{ color: "#1e3d5c", fontStyle: "italic" }}>{t}</span>
);

const pillStyles = {
  MongoDB: {
    bg: "rgba(74,222,128,.08)",
    border: "rgba(74,222,128,.25)",
    color: "#4ade80",
  },
  Express: {
    bg: "rgba(251,191,36,.07)",
    border: "rgba(251,191,36,.2)",
    color: "#fbbf24",
  },
  React: {
    bg: "rgba(125,211,252,.07)",
    border: "rgba(125,211,252,.2)",
    color: "#7dd3fc",
  },
  "Node.js": {
    bg: "rgba(74,222,128,.06)",
    border: "rgba(74,222,128,.18)",
    color: "#86efac",
  },
  "Next.js": {
    bg: "rgba(255,255,255,.05)",
    border: "rgba(255,255,255,.1)",
    color: "#e2e8f0",
  },
  TypeScript: {
    bg: "rgba(96,165,250,.07)",
    border: "rgba(96,165,250,.22)",
    color: "#60a5fa",
  },
};

const TechPill = ({ tech }) => {
  const s = pillStyles[tech] || pillStyles["Next.js"];
  return (
    <motion.span
      whileHover={{ scale: 1.08 }}
      className="px-[11px] py-[4px] rounded-full text-[10px] font-bold tracking-[.06em]"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {tech}
    </motion.span>
  );
};

const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const textLine = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const editorRef = useRef(null);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 1, suffix: "+", label: "Yrs Exp" },
    { value: 3, suffix: "+", label: "Projects" },
    { value: 8, suffix: "+", label: "Technologies" },
  ];

  const stack = [
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "Next.js",
    "TypeScript",
  ];

  return (
    <section
      id="about"
      className="min-h-screen scroll-mt-24 px-6 md:px-20 lg:px-40 py-20 relative overflow-hidden transition-all duration-700 bg-transparent"
      style={{ color: "#e2e8f0" }}
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&display=swap');`}</style>

      {/* Section Header */}
      <div className="flex flex-col items-center mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-4 py-1 rounded-full mb-4 text-[10px] font-bold tracking-[.25em] uppercase"
          style={{
            border: "1px solid rgba(168,85,247,0.3)",
            background: "rgba(168,85,247,0.08)",
            color: "#A855F7",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#A855F7] animate-pulse" />
          Open to work
        </motion.div>

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
            👨‍💻
          </motion.span>

          <h2
            className="text-4xl md:text-6xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            About{" "}
            <span
              className={`italic bg-clip-text text-transparent bg-linear-to-r transition-all duration-500
        ${isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"}`}
            >
              Me.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-10 lg:gap-16 justify-center items-start relative z-10">
        {/* LEFT — VS Code Editor */}
        <div ref={editorRef} className="w-full md:w-[48%]">
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[18px] overflow-hidden transition-all duration-500 group"
            style={{
              background: "#0d1424",
              border: "1px solid #1e3a5f",
            }}
            whileHover={{
              borderColor: "rgba(168,85,247,0.45)",
              boxShadow:
                "0 0 0 1px rgba(168,85,247,.15), 0 32px 64px rgba(0,0,0,.6)",
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center px-[14px] py-[10px]"
              style={{
                background: "#080f1e",
                borderBottom: "1px solid #111d30",
              }}
            >
              <div className="flex gap-[6px]">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span
                className="flex-1 text-center text-[11px] tracking-[.06em]"
                style={{
                  color: "#334e68",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                portfolio.js — dev/avi
              </span>
            </div>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom: "1px solid #111d30" }}>
              {["portfolio.js", "skills.js"].map((tab, i) => (
                <div
                  key={tab}
                  className="px-4 py-[6px] text-[10px] tracking-[.04em]"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    borderRight: "1px solid #111d30",
                    color: i === 0 ? "#7dd3fc" : "#2d4a6e",
                    borderBottom: i === 0 ? "2px solid #7dd3fc" : "none",
                    background:
                      i === 0 ? "rgba(125,211,252,0.04)" : "transparent",
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Code */}
            <div className="py-[14px]">
              <CodeLine lineNum={1}>
                {cm("/** @author Avi · Full Stack Dev */")}
              </CodeLine>
              <CodeLine lineNum={2}>{""}</CodeLine>
              <CodeLine lineNum={3}>
                {kw("const ")}
                {va("developer")}
                {pu(" = {")}
              </CodeLine>
              <CodeLine lineNum={4}>
                {"  "}
                {va("name")}
                {pu(": ")}
                {st('"Abinash Rout"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={5}>
                {"  "}
                {va("role")}
                {pu(": ")}
                {st('"Full Stack Developer"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={6}>
                {"  "}
                {va("location")}
                {pu(": ")}
                {st('"Bhubaneswar,Odisha, India"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={7}>
                {"  "}
                {va("experience")}
                {pu(": ")}
                {st('"Fresher"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={8}>
                {"  "}
                {va("available")}
                {pu(":  ")}
                {bo("true")}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={9}>{""}</CodeLine>
              <CodeLine lineNum={10}>
                {"  "}
                {va("stack")}
                {pu(": [")}
              </CodeLine>
              <CodeLine lineNum={11}>
                {"    "}
                {st('"MongoDB"')}
                {pu(", ")}
                {st('"Express"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={12}>
                {"    "}
                {st('"React"')}
                {pu(", ")}
                {st('"Node.js"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={13}>
                {"    "}
                {st('"Next.js"')}
                {pu(", ")}
                {st('"TypeScript"')}
              </CodeLine>
              <CodeLine lineNum={14}>
                {"  "}
                {pu("],")}
              </CodeLine>
              <CodeLine lineNum={15}>{""}</CodeLine>
              <CodeLine lineNum={16}>
                {"  "}
                {va("focus")}
                {pu(": ")}
                {st('"Scalable web apps"')}
                {pu(",")}
              </CodeLine>
              <CodeLine lineNum={17}>
                {"  "}
                {va("passion")}
                {pu(": ")}
                {st('"Beautiful UX"')}
              </CodeLine>
              <CodeLine lineNum={18}>{pu("};")}</CodeLine>
              <CodeLine lineNum={19}>{""}</CodeLine>
              <CodeLine lineNum={20}>
                {kw("export default ")}
                {va("developer")}
                {pu(";")}
                <span
                  className="inline-block w-[2px] h-[15px] ml-[4px] align-middle rounded-sm animate-pulse"
                  style={{ background: "#A855F7" }}
                />
              </CodeLine>
            </div>

            {/* Terminal bar */}
            <div
              className="flex items-center gap-2 px-[14px] py-[10px]"
              style={{
                background: "#060d1a",
                borderTop: "1px solid #0f2033",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span className="text-[11px]" style={{ color: "#4ade80" }}>
                $
              </span>
              <span className="text-[11px]" style={{ color: "#7dd3fc" }}>
                node run portfolio.js
              </span>
              <span
                className="text-[11px] ml-auto"
                style={{ color: "#4ade80" }}
              >
                ✓ compiled successfully
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Info Panel */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="w-full md:w-[52%] flex flex-col gap-5"
        >
          {/* Stats */}
          <motion.div variants={textLine} className="flex gap-2">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} delay={i * 0.1} />
            ))}
          </motion.div>

          {/* Available badge */}
          <motion.div variants={textLine}>
            <span
              className="inline-flex items-center gap-2 px-[14px] py-[6px] rounded-full text-[11px] font-bold tracking-[.1em] uppercase"
              style={{
                background: "rgba(74,222,128,0.07)",
                border: "1px solid rgba(74,222,128,0.2)",
                color: "#4ade80",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              Available for freelance &amp; full-time
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={textLine}
            className="text-[13px] leading-[1.85]"
            style={{
              color: "#475569",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span style={{ color: "#c084fc", fontWeight: 700 }}>
              Hi, I'm Avi
            </span>{" "}
            — a{" "}
            <strong style={{ color: "#cbd5e1" }}>Full Stack Developer</strong>{" "}
            who builds{" "}
            <span style={{ color: "#7dd3fc" }}>
              fast, scalable, and visually sharp
            </span>{" "}
            web applications.
            <br />
            <br />I live in the{" "}
            <strong style={{ color: "#cbd5e1" }}>MERN stack</strong>, obsess
            over clean architecture, and care deeply about the last{" "}
            <strong style={{ color: "#cbd5e1" }}>1% of polish</strong> that
            separates good from great.
            <br />
            <br />
            Currently open to roles where{" "}
            <strong style={{ color: "#cbd5e1" }}>craft and impact</strong>{" "}
            matter equally.
          </motion.p>

          {/* Tech pills */}
          <motion.div variants={textLine}>
            <p
              className="text-[9px] uppercase tracking-[.2em] font-bold mb-2"
              style={{
                color: "#1e3d5c",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Tech stack
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {stack.map((t) => (
                <TechPill key={t} tech={t} />
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={textLine} className="flex gap-3 flex-wrap pt-1">
            <motion.a
              href="#contact"
              whileHover={{
                y: -3,
                boxShadow: "0 16px 40px rgba(124,58,237,0.35)",
              }}
              className="inline-flex items-center gap-2 px-[26px] py-[11px] rounded-full font-bold text-[11px] uppercase tracking-[.15em] text-white no-underline"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Contact me
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.span>
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{
                y: -3,
                borderColor: "rgba(168,85,247,0.4)",
                color: "#c084fc",
              }}
              className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-full font-bold text-[11px] uppercase tracking-[.12em] no-underline transition-colors duration-300"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <FontAwesomeIcon icon={faCode} />
              View work
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 rounded-full -z-10 animate-pulse"
        style={{ background: "rgba(168,85,247,0.04)", filter: "blur(100px)" }}
      />
    </section>
  );
};

export default About;
