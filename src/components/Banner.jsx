import React, { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import Particles from "./Particles";
import TextType from "./TextType";
import img from "../assets/images/mainBG.jpeg";

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

const fadeUp = (delay = 0, duration = 0.7) => ({
  hidden: { y: 36, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const scalePop = (delay = 0) => ({
  hidden: { scale: 0.6, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 18, delay },
  },
});

const SplitText = ({ text, variants, className, letterClassName }) => (
  <motion.span
    variants={variants.container}
    initial="hidden"
    animate="visible"
    aria-label={text}
    className={className}
  >
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden"
        style={{ perspective: "600px" }}
      >
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

const FloatingShape = ({ className, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
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

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      x.set((e.clientX - left - width / 2) * 0.5);
      y.set((e.clientY - top - height / 2) * 0.5);
    },
    [x, y],
  );
  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.6 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
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
          backgroundColor: "rgba(220,38,38,0.85)",
          color: "#fff",
          boxShadow: "0 0 24px rgba(220,38,38,0.45)",
          borderColor: "rgba(220,38,38,0.8)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className={`w-11 h-11 flex items-center justify-center border-2 rounded-full
          transition-colors duration-200 cursor-pointer
          ${
            isDark
              ? "border-red-900/60 text-red-400"
              : "border-red-500/40 text-red-400 shadow-red-500/10 shadow-lg"
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
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [rawX, rawY]);

  return { smoothX, smoothY };
};

const Banner = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { smoothX, smoothY } = useParallaxMouse();

  const midX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const midY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const imgX = useTransform(smoothX, [-1, 1], [8, -8]);

  const imgXs = useSpring(imgX, { stiffness: 50, damping: 22 });

  const greetVars = makeLetterVariants(0.7, 0.03);
  const nameVars = makeLetterVariants(1.05, 0.04);

  const socials = [
    { icon: faGithub, href: "https://github.com/Abinashrout244", delay: 2.3 },
    {
      icon: faLinkedin,
      href: "https://www.linkedin.com/in/abinash-rout-274285322",
      delay: 2.4,
    },
    { icon: faXTwitter, href: "https://x.com/AbinashRout2251", delay: 2.5 },
    {
      icon: faInstagram,
      href: "https://www.instagram.com/frequency._0.001",
      delay: 2.6,
    },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-screen overflow-hidden flex items-center
        px-6 md:px-20 lg:px-36 pt-10 transition-colors duration-700
        ${isDark ? "bg-[#0a0505]" : "bg-[#0d0404]"}`}
    >
      {/* ── BACKGROUND LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Photo — right-anchored, subtle fade-in */}
        <motion.div
          style={{ x: imgXs }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={img}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            style={{ opacity: 0.8 }}
          />
        </motion.div>

        {/* Dark vignette over the whole image so it reads as a dark hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.22) 100%)",
          }}
        />

        {/* Strong left-to-right fade — keeps left text zone very readable */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.82) 25%, rgba(5,5,5,0.45) 50%, rgba(5,5,5,0.12) 70%, transparent 100%)"
              : "linear-gradient(to right, #0d0404 0%, rgba(13,4,4,0.78) 22%, rgba(13,4,4,0.42) 45%, rgba(13,4,4,0.10) 70%, transparent 100%)",
          }}
        />

        {/* Bottom fade so scroll indicator sits cleanly */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to top, #0a0505 0%, transparent 100%)"
              : "linear-gradient(to top, #0d0404 0%, transparent 100%)",
          }}
        />

        {/* Red glow — echoes the photo's red bg */}
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.06, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "rgba(180,20,20,0.22)" }}
        />
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.08, 1] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(140,10,10,0.18)" }}
        />

        {/* Particles */}
        <Particles
          particleColors={["#ffffff", "#ef4444", "#dc2626"]}
          particleCount={500}
          particleSpread={12}
          speed={0.2}
          particleBaseSize={160}
          moveParticlesOnHover
          alphaParticles
          pixelRatio={1}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── FLOATING SHAPES ── */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* Top-left ring */}
        <FloatingShape delay={0.4} className="top-[10%] left-[6%]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[140px] h-[140px] rounded-full border border-dashed opacity-15"
            style={{ borderColor: "#dc2626" }}
          />
        </FloatingShape>

        {/* Pulsing dot */}
        <FloatingShape delay={0.5} className="top-[20%] left-[40%]">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 rounded-full"
            style={{ background: "#dc2626" }}
          />
        </FloatingShape>

        {/* Horizontal accent line */}
        <FloatingShape delay={0.6} className="top-[55%] left-[2%]">
          <motion.div
            animate={{ width: ["40px", "90px", "40px"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="h-[1px] opacity-30"
            style={{
              width: "60px",
              background: "linear-gradient(to right, #dc2626, transparent)",
            }}
          />
        </FloatingShape>

        {/* Triangle */}
        <FloatingShape delay={0.7} className="bottom-[22%] left-[14%]">
          <motion.div
            animate={{ rotate: [0, 20, 0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="opacity-20"
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <polygon
                points="22,4 42,40 2,40"
                stroke="#dc2626"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </motion.div>
        </FloatingShape>

        {/* Vertical line right side */}
        <FloatingShape delay={0.5} className="top-[30%] right-[8%]">
          <motion.div
            animate={{ height: ["30px", "80px", "30px"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="w-[1px] opacity-20"
            style={{
              height: "50px",
              background:
                "linear-gradient(to bottom, transparent, #ef4444, transparent)",
            }}
          />
        </FloatingShape>

        {/* Dot cluster */}
        <FloatingShape delay={0.8} className="top-[42%] left-[5%]">
          <div className="flex flex-col gap-2 opacity-30">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [0, 6, 0] }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#ef4444" }}
              />
            ))}
          </div>
        </FloatingShape>

        {/* Bottom-right small ring */}
        <FloatingShape delay={0.45} className="bottom-[15%] right-[22%]">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-[70px] h-[70px] rounded-full border opacity-10"
            style={{ borderColor: "#ef4444" }}
          />
        </FloatingShape>
      </motion.div>

      {/* ── LEFT — TEXT CONTENT ── */}
      <div className="relative z-10 w-full md:w-[52%] mt-20 md:mt-0 flex flex-col gap-3 md:gap-5 pb-20 md:pb-0">
        {/* Role badge */}
        <motion.div
          variants={scalePop(0.45)}
          initial="hidden"
          animate="visible"
          className="self-start flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px]
            font-bold tracking-[0.35em] uppercase backdrop-blur-md"
          style={{
            borderColor: "rgba(220,38,38,0.4)",
            background: "rgba(220,38,38,0.08)",
            color: "#f87171",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#ef4444" }}
          />
          Available for Work
        </motion.div>

        {/* Greeting */}
        <div className="overflow-hidden">
          <SplitText
            text="Hello, I'm"
            variants={greetVars}
            className="text-3xl md:text-4xl font-extrabold text-white"
          />
        </div>

        {/* Name — red gradient */}
        <div className="overflow-hidden -mt-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          >
            <SplitText
              text="Abinash Rout"
              variants={nameVars}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
              letterClassName="text-transparent bg-clip-text bg-gradient-to-br from-white via-red-300 to-red-600"
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
          <span className="font-mono text-2xl font-bold text-red-800/70">
            &lt;
          </span>
          <TextType
            text={[
              "Web Developer",
              "Frontend Developer",
              "React Developer",
              "MERN Stack Dev",
            ]}
            className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300"
            cursorClassName="w-[2px] h-6 ml-0.5 bg-red-400"
            typingSpeed={70}
            deletingSpeed={45}
            pauseDuration={1800}
            showCursor
            cursorCharacter="|"
          />
          <span className="font-mono text-2xl font-bold text-red-800/70">
            /&gt;
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp(1.9)}
          initial="hidden"
          animate="visible"
          className="text-base md:text-lg max-w-lg leading-relaxed text-white/50"
        >
          Crafting immersive web experiences where{" "}
          <span className="font-semibold text-white/90">
            design meets engineering.
          </span>{" "}
          Specialising in React, animation, and high-performance UI.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp(2.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mt-2"
        >
          {/* Primary — red glow */}
          <a href="#project" className="group relative">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-[2px] rounded-full blur-sm pointer-events-none"
              style={{
                background: "linear-gradient(to right, #dc2626, #991b1b)",
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative py-3.5 px-9 rounded-full text-white font-bold text-sm tracking-wide"
              style={{ background: "#0a0505" }}
            >
              View My Work
            </motion.button>
          </a>

          {/* Secondary — glass */}
          <a
            href="https://drive.google.com/uc?export=download&id=1MXVXgnLh9UW3OEVKifR_x-3C0VHb92rD"
            target="_blank"
            rel="noreferrer"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "rgba(255,255,255,0.10)",
                boxShadow: "0 0 28px rgba(220,38,38,0.20)",
              }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="py-3.5 px-9 rounded-full font-semibold text-sm tracking-wide border backdrop-blur-md text-white/80"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              Download CV
            </motion.button>
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0 } },
          }}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 mt-3 md:mt-4 pb-10 md:pb-0"
        >
          {socials.map((s, i) => (
            <MagneticIcon key={i} {...s} isDark={isDark} />
          ))}
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div
          className="w-[22px] h-[34px] rounded-full border-2 flex justify-center pt-1.5"
          style={{ borderColor: "rgba(220,38,38,0.30)" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2.5 rounded-full"
            style={{ background: "rgba(220,38,38,0.50)" }}
          />
        </div>
        <motion.span
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[9px] tracking-[0.5em] uppercase font-mono"
          style={{ color: "rgba(220,38,38,0.35)" }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Banner;
