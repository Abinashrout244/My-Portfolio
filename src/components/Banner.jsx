

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub, faLinkedin, faXTwitter, faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Tilt from "react-parallax-tilt";
import { useTheme } from "../context/ThemeContext";
import Particles from "./Particles";
import TextType from "./TextType";
import img      from "../assets/images/anime.png";


const makeLetterVariants = (delay = 0, stagger = 0.04) => ({
  container: {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  },
  letter: {
    hidden: { y: "120%", opacity: 0, rotateX: 40 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  },
});

/** Generic fade-up for blocks of content */
const fadeUp = (delay = 0, duration = 0.7) => ({
  hidden: { y: 36, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/** Scale-in from below for badge pill */
const scalePop = (delay = 0) => ({
  hidden: { scale: 0.6, opacity: 0, y: 10 },
  visible: {
    scale: 1, opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay },
  },
});


const SplitText = ({ text, variants, className, letterClassName, as: Tag = "span" }) => (
  <motion.span
    variants={variants.container}
    initial="hidden"
    animate="visible"
    aria-label={text}
    className={className}
  >
    {text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden" style={{ perspective: "600px" }}>
        <motion.span
          variants={variants.letter}
          className={`inline-block ${letterClassName || ""}`}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      </span>
    ))}
  </motion.span>
);


const FloatingShape = ({ style, className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
    className={`absolute pointer-events-none ${className}`}
  >
    {children}
  </motion.div>
);

const MagneticIcon = ({ icon, href, delay, isDark }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 18 });
  const sy = useSpring(y, { stiffness: 300, damping: 18 });
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.5);
    y.set((e.clientY - top - height / 2) * 0.5);
  }, [x, y]);
  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.6 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { type: "spring", stiffness: 280, damping: 18, delay },
        },
      }}
    >
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{
          scale: 1.25,
          backgroundColor: isDark ? "rgba(75,85,99,0.9)" : "rgba(219,39,119,0.9)",
          color: "#fff",
          boxShadow: isDark
            ? "0 0 20px rgba(156,163,175,0.3)"
            : "0 0 24px rgba(219,39,119,0.45)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className={`w-11 h-11 flex items-center justify-center border-2 rounded-full
          transition-colors duration-200 cursor-pointer
          ${isDark
            ? "border-gray-700 text-gray-400"
            : "border-pink-500/40 text-pink-400 shadow-pink-500/10 shadow-lg"
          }`}
      >
        <FontAwesomeIcon icon={icon} size="sm" />
      </motion.a>
    </motion.div>
  );
};


const useParallaxMouse = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const update = (e) => {
      // normalise: -1 → +1 from screen centre
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [rawX, rawY]);

  return { smoothX, smoothY };
};


const Banner = () => {
  const { theme }  = useTheme();
  const isDark     = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax engine
  const { smoothX, smoothY } = useParallaxMouse();

  // Derived per-depth transforms (stronger on mid, subtle on fg)
  const midX  = useTransform(smoothX, [-1, 1], [-22, 22]);
  const midY  = useTransform(smoothY, [-1, 1], [-14, 14]);
  const fgX   = useTransform(smoothX, [-1, 1], [-8,  8 ]);
  const fgY   = useTransform(smoothY, [-1, 1], [-5,  5 ]);
  const imgX  = useTransform(smoothX, [-1, 1], [-15, 15]);
  const imgY  = useTransform(smoothY, [-1, 1], [-10, 10]);

  // spring for fgX/fgY
  const fgXs  = useSpring(fgX,  { stiffness: 80, damping: 20 });
  const fgYs  = useSpring(fgY,  { stiffness: 80, damping: 20 });

  // Letter variants (different delays for greeting vs name)
  const greetVars = makeLetterVariants(0.7, 0.03);
  const nameVars  = makeLetterVariants(1.05, 0.04);

  const socials = [
    { icon: faGithub,    href: "https://github.com/Abinashrout244",                       delay: 2.3 },
    { icon: faLinkedin,  href: "https://www.linkedin.com/in/abinash-rout-274285322",      delay: 2.4 },
    { icon: faXTwitter,  href: "https://x.com/AbinashRout2251",                           delay: 2.5 },
    { icon: faInstagram, href: "https://www.instagram.com/frequency._0.001",              delay: 2.6 },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-screen overflow-hidden flex flex-col md:flex-row items-center
        justify-between px-6 md:px-20 lg:px-36 transition-colors duration-700
        bg-transparent dark:bg-[#090909]`}
    >
      
      <motion.div
        initial={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1,   filter: "blur(0px)"  }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Particles */}
        <Particles
          particleColors={isDark
            ? ["#9ca3af", "#374151", "#ffffff"]
            : ["#ffffff", "#db2777", "#6366f1"]}
          particleCount={600}
          particleSpread={14}
          speed={0.25}
          particleBaseSize={180}
          moveParticlesOnHover
          alphaParticles
          pixelRatio={1}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Primary radial glow — shifts with theme */}
        <motion.div
          animate={{
            opacity: [0.35, 0.55, 0.35],
            scale:   [1, 1.06, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full blur-[160px]
            ${isDark ? "bg-gray-700/20" : "bg-indigo-700/20"}`}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px]
            ${isDark ? "bg-indigo-900/20" : "bg-pink-600/20"}`}
        />
      </motion.div>

    
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* Top-left large ring */}
        <FloatingShape
          delay={0.4}
          className="top-[10%] left-[6%]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className={`w-[140px] h-[140px] rounded-full border border-dashed opacity-20
              ${isDark ? "border-gray-400" : "border-pink-400"}`}
          />
        </FloatingShape>

        {/* Top-right small solid circle */}
        <FloatingShape
          delay={0.5}
          className="top-[18%] right-[18%]"
        >
          <motion.div
            animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-5 h-5 rounded-full opacity-40
              ${isDark ? "bg-gray-400" : "bg-pink-400"}`}
          />
        </FloatingShape>

        {/* Thin horizontal line — left */}
        <FloatingShape
          delay={0.6}
          className="top-[55%] left-[2%]"
        >
          <motion.div
            animate={{ width: ["40px", "90px", "40px"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`h-[1px] opacity-25 bg-gradient-to-r
              ${isDark ? "from-gray-400 to-transparent" : "from-pink-400 to-transparent"}`}
            style={{ width: "60px" }}
          />
        </FloatingShape>

        {/* Bottom-left triangle outline */}
        <FloatingShape
          delay={0.7}
          className="bottom-[22%] left-[14%]"
        >
          <motion.div
            animate={{ rotate: [0, 20, 0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="opacity-15"
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <polygon
                points="22,4 42,40 2,40"
                stroke={isDark ? "#9ca3af" : "#ec4899"}
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.div>
        </FloatingShape>

        {/* Right-side vertical line */}
        <FloatingShape
          delay={0.5}
          className="top-[30%] right-[8%]"
        >
          <motion.div
            animate={{ height: ["30px", "80px", "30px"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className={`w-[1px] opacity-20 bg-gradient-to-b
              ${isDark ? "from-transparent via-gray-400 to-transparent" : "from-transparent via-indigo-400 to-transparent"}`}
            style={{ height: "50px" }}
          />
        </FloatingShape>

        {/* Mid-left floating dot cluster */}
        <FloatingShape
          delay={0.8}
          className="top-[42%] left-[5%]"
        >
          <div className="flex flex-col gap-2 opacity-30">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-gray-500" : "bg-pink-400"}`}
              />
            ))}
          </div>
        </FloatingShape>

        {/* Corner accent — bottom right (behind image area) */}
        <FloatingShape
          delay={0.45}
          className="bottom-[15%] right-[22%]"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`w-[70px] h-[70px] rounded-full border opacity-10
              ${isDark ? "border-gray-300" : "border-indigo-400"}`}
          />
        </FloatingShape>
      </motion.div>


      {/* LEFT — TEXT CONTENT */}
      <motion.div
        style={{ x: fgXs, y: fgYs }}
        className="relative z-10 w-full md:w-[52%] mt-28 md:mt-0 flex flex-col gap-5"
      >
        {/* Role badge — top pill */}
        <motion.div
          variants={scalePop(0.45)}
          initial="hidden"
          animate="visible"
          className={`self-start flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px]
            font-bold tracking-[0.35em] uppercase backdrop-blur-md
            ${isDark
              ? "border-gray-700 bg-gray-900/60 text-gray-400"
              : "border-pink-500/30 bg-pink-500/10 text-pink-400"
            }`}
        >
          {/* Pulsing dot */}
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse
            ${isDark ? "bg-gray-400" : "bg-pink-400"}`}
          />
          Available for Work
        </motion.div>

        {/* ── Greeting line ── */}
        <div className="overflow-hidden">
          <SplitText
            text="Hello, I'm"
            variants={greetVars}
            className="text-3xl md:text-4xl font-extrabold text-white dark:text-gray-100"
          />
        </div>

        {/* ── Name — larger, gradient, character spring ── */}
        <div className="overflow-hidden -mt-2">
          {/* Post-reveal idle: whole name softly floats */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <SplitText
              text="Abinash Rout"
              variants={nameVars}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
              letterClassName={`text-transparent bg-clip-text bg-gradient-to-br
                ${isDark
                  ? "from-white via-gray-200 to-gray-500"
                  : "from-pink-400 via-fuchsia-300 to-indigo-400"
                }`}
            />
          </motion.div>
        </div>

        {/* Typewriter role */}
        <motion.div
          variants={fadeUp(1.65)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mt-1"
        >
          <span className={`font-mono text-2xl font-bold ${isDark ? "text-gray-600" : "text-indigo-300/60"}`}>
            &lt;
          </span>
          <TextType
            text={["Web Developer","Frontend Developer","React Developer","MERN Stack Dev"]}
            className={`text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r
              ${isDark ? "from-gray-300 to-gray-500" : "from-pink-400 to-indigo-400"}`}
            cursorClassName={`w-[2px] h-6 ml-0.5 ${isDark ? "bg-gray-400" : "bg-pink-400"}`}
            typingSpeed={70} deletingSpeed={45} pauseDuration={1800} showCursor cursorCharacter="|"
          />
          <span className={`font-mono text-2xl font-bold ${isDark ? "text-gray-600" : "text-indigo-300/60"}`}>
            /&gt;
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp(1.9)}
          initial="hidden"
          animate="visible"
          className={`text-base md:text-lg max-w-lg leading-relaxed
            ${isDark ? "text-gray-500" : "text-white/60"}`}
        >
          Crafting immersive web experiences where{" "}
          <span className={`font-semibold ${isDark ? "text-gray-300" : "text-white"}`}>
            design meets engineering.
          </span>{" "}
          Specialising in React, animation, and high-performance UI.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          variants={fadeUp(2.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mt-2"
        >
          {/* Primary — glowing gradient border */}
          <a href="#project" className="group relative">
            {/* Animated gradient halo */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -inset-[2px] rounded-full blur-sm pointer-events-none bg-gradient-to-r
                ${isDark ? "from-gray-400 to-gray-700" : "from-pink-500 to-indigo-600"}`}
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`relative py-3.5 px-9 rounded-full text-white font-bold text-sm tracking-wide
                ${isDark ? "bg-[#0e0e0e]" : "bg-[#050510]"}`}
            >
              View My Work
            </motion.button>
          </a>

          {/* Secondary — glass */}
          <a
            href="https://drive.google.com/uc?export=download&id=1MXVXgnLh9UW3OEVKifR_x-3C0VHb92rD"
            target="_blank" rel="noreferrer"
          >
            <motion.button
              whileHover={{
                scale: 1.05, y: -2,
                backgroundColor: "rgba(255,255,255,0.12)",
                boxShadow: isDark
                  ? "0 0 24px rgba(156,163,175,0.15)"
                  : "0 0 28px rgba(219,39,119,0.25)",
              }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`py-3.5 px-9 rounded-full font-semibold text-sm tracking-wide border backdrop-blur-md
                ${isDark
                  ? "bg-white/5 border-white/10 text-gray-300"
                  : "bg-white/5 border-white/15 text-white"
                }`}
            >
              Download CV
            </motion.button>
          </a>
        </motion.div>

        {/* ── Social icons ── magnetic, staggered ── */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0 } } }}
          initial="hidden"
          animate="visible"
          className="flex gap-3 mt-4"
        >
          {socials.map((s, i) => (
            <MagneticIcon key={i} {...s} isDark={isDark} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── RIGHT — IMAGE ── */}
      <motion.div
        style={{ x: imgX, y: imgY }}
        initial={{ x: 120, opacity: 0, filter: "blur(12px)" }}
        animate={{ x: 0,   opacity: 1, filter: "blur(0px)"  }}
        transition={{ duration: 1.1, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full md:w-[46%] flex justify-center items-end
          h-[45vh] md:h-[68vh] mt-16 md:mt-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ── Decorative rings behind image ── */}
        {/* Outer slow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 m-auto w-[70%] h-[70%] rounded-full border border-dashed pointer-events-none opacity-15
            ${isDark ? "border-gray-400" : "border-pink-300"}`}
        />
        {/* Inner faster ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 m-auto w-[50%] h-[50%] rounded-full border pointer-events-none opacity-10
            ${isDark ? "border-gray-300" : "border-indigo-400"}`}
        />
        {/* Pulsing glow */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-full blur-[90px] pointer-events-none bg-gradient-to-t
            ${isDark ? "from-gray-600/20 to-transparent" : "from-pink-500/25 to-indigo-500/10"}`}
        />

        {/* 3D tilt container */}
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          glareEnable
          glareMaxOpacity={isDark ? 0.07 : 0.14}
          glareColor={isDark ? "#ffffff" : "#ec4899"}
          glarePosition="all"
          glareBorderRadius="50%"
          scale={1.03}
          transitionSpeed={800}
          className="relative w-full h-full flex justify-center items-end"
        >
          {/* Primary image */}
          <motion.img
            src={img}
            alt="Abinash Rout"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 z-10 object-contain h-full"
          />
        </Tilt>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        {/* Mouse icon */}
        <div className={`w-[22px] h-[34px] rounded-full border-2 flex justify-center pt-1.5
          ${isDark ? "border-gray-700" : "border-white/20"}`}>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className={`w-1 h-2.5 rounded-full
              ${isDark ? "bg-gray-600" : "bg-white/30"}`}
          />
        </div>
        <motion.span
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`text-[9px] tracking-[0.5em] uppercase font-mono
            ${isDark ? "text-gray-700" : "text-white/25"}`}
        >
          Scroll
        </motion.span>
       </motion.div>
    </section>
  );
};

export default Banner;
