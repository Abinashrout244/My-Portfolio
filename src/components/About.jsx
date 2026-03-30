import React, { useEffect, useRef } from "react";
import img from "../assets/images/aviblazor.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/* ── Count-up number component ── */
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

/* ── Stat card ── */
const StatCard = ({ value, suffix, label, delay, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(219,39,119,0.15)" }}
    className={`relative flex-1 min-w-[120px] flex flex-col items-center justify-center p-6 rounded-3xl border
      transition-colors duration-300 text-center overflow-hidden group
      ${isDark ? "bg-[#1e1e1e]/70 border-white/10 backdrop-blur-md" : "bg-white/10 border-white/20 backdrop-blur-md"}`}
  >
    {/* Glow on hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl
      ${isDark ? "bg-white/3" : "bg-pink-500/5"}`} />
    <p className={`text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r
      ${isDark ? "from-white to-gray-400" : "from-pink-500 to-indigo-400"}`}>
      <CountUp to={value} suffix={suffix} />
    </p>
    <p className={`text-[11px] uppercase tracking-widest mt-1 font-bold ${isDark ? "text-gray-500" : "text-white/50"}`}>
      {label}
    </p>
  </motion.div>
);

/* ── Text stagger variants ── */
const textContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const textLine = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const imageRef = useRef(null);

  /* GSAP slide-in for image */
  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { x: -80, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 1,  suffix: "+", label: "Years Exp"    },
    { value: 10, suffix: "+", label: "Projects Done" },
    { value: 8,  suffix: "+", label: "Technologies"  },
  ];

  return (
    <section
      id="about"
      className={`min-h-screen scroll-mt-24 px-6 md:px-20 lg:px-40 py-20 relative overflow-hidden transition-all duration-700 bg-transparent
        ${isDark ? "text-[#e0e0e0]" : "text-white"}`}
    >
      {/* Section header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className={`px-4 py-1 rounded-full border text-xs font-bold tracking-[0.3em] uppercase mb-4
            ${isDark ? "border-gray-700 bg-gray-800/30 text-gray-400" : "border-pink-500/30 bg-pink-500/10 text-pink-500"}`}
        >
          Discovery
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-black tracking-tighter"
        >
          About{" "}
          <span className={`italic bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500
            ${isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"}`}>
            Me.
          </span>
        </motion.h2>
      </div>

      {/* Main grid */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 justify-center items-center relative z-10">

        {/* LEFT: Image — GSAP animated */}
        <div ref={imageRef} className="w-full md:w-[45%] flex flex-col items-center justify-center relative">
          <div className="relative group w-[300px] md:w-[400px] lg:w-[450px] [perspective:1500px]">
            <div className="relative w-full h-[350px] md:h-[500px] lg:h-[550px] transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

              {/* FRONT */}
              <div className={`absolute inset-0 [backface-visibility:hidden] p-2 backdrop-blur-md rounded-[2.5rem] border shadow-2xl
                ${isDark ? "bg-[#1e1e1e] border-white/10" : "bg-gradient-to-r from-indigo-500 to-cyan-500 border-2 border-white/50"}`}>
                <div className="rounded-[2rem] overflow-hidden bg-gray-200 dark:bg-[#121212] h-full w-full">
                  <img src="https://static.vecteezy.com/system/resources/previews/021/907/517/large_2x/anime-boy-avatar-ai-generative-art-ai-generation-art-photo.jpg"
                    alt="Avi Anime" className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>

              {/* BACK */}
              <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-2 backdrop-blur-md rounded-[2.5rem] border shadow-2xl
                ${isDark ? "bg-[#1e1e1e] border-indigo-500/40" : "bg-gradient-to-r from-indigo-500 to-cyan-500 border-2 border-white/50"}`}>
                <div className="rounded-[2rem] overflow-hidden h-full w-full">
                  <img src={img} alt="Abinash Rout Real" className="h-full w-full object-cover group-hover:scale-105 transition-all duration-700" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating role badge */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 -mt-10 w-[240px] md:w-[320px] h-[80px] md:h-[100px] [perspective:1000px] group"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className={`absolute inset-0 [backface-visibility:hidden] border flex flex-col items-center justify-center rounded-[2rem] shadow-xl
                ${isDark ? "bg-[#1e1e1e] border-white/10" : "bg-[#0f172a]/80 backdrop-blur-2xl border border-pink-400"}`}>
                <h2 className="text-center text-lg font-bold">
                  <span className={`block font-black uppercase tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r
                    ${isDark ? "from-white to-gray-500" : "from-pink-500 to-rose-500"}`}>FRONTEND</span>
                  <span className={isDark ? "text-gray-400" : "text-white"}>DEVELOPER</span>
                </h2>
              </div>
              <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] backdrop-blur-2xl flex flex-col items-center justify-center rounded-[2rem] shadow-xl
                ${isDark ? "bg-[#1e1e1e] border-indigo-500/40" : "bg-[#0f172a]/90 border-indigo-500/40"}`}>
                <h2 className="text-center text-lg font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 block font-black uppercase tracking-[0.2em]">FULLSTACK</span>
                  <span className={isDark ? "text-gray-400" : "text-white"}>DEVELOPER</span>
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Text + Stat cards */}
        <div className="w-full md:w-[55%] flex flex-col gap-8">

          {/* Stat cards row */}
          <div className="flex gap-4 flex-wrap">
            {stats.map((s, i) => (
              <StatCard key={i} {...s} delay={i * 0.12} isDark={isDark} />
            ))}
          </div>

          {/* Staggered text */}
          <motion.div
            variants={textContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} className="space-y-6"
          >
            <motion.h3
              variants={textLine}
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter uppercase italic"
            >
              Turning Ideas <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r
                ${isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"}`}>
                Into Interfaces
              </span>
            </motion.h3>

            <motion.p
              variants={textLine}
              className={`text-lg md:text-xl leading-relaxed font-medium ${isDark ? "text-gray-400" : "text-slate-600"}`}
            >
              Hi, I'm Avi — a dedicated Frontend Developer crafting
              <span className={`font-bold px-1 ${isDark ? "text-white" : "text-pink-600"}`}> immersive digital experiences</span>.
              I blend architectural clean code with high-end interactive aesthetics.
              <br /><br />
              Currently scaling new heights in the
              <span className={`font-black italic ml-2 border-b-2 pb-1
                ${isDark ? "text-gray-300 border-gray-600" : "text-pink-500 border-indigo-500/50"}`}>
                MERN Stack Ecosystem!
              </span>
            </motion.p>

            <motion.div variants={textLine} className="pt-2">
              <a href="#contact" className={`group relative inline-flex items-center gap-4 px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 border
                ${isDark ? "bg-[#1e1e1e] border-white/10 text-white hover:border-gray-500" : "bg-transparent border-white/10 text-white"}`}>
                <span className="relative z-10">Contact Me</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <FontAwesomeIcon icon={faArrowRight} className="text-pink-500 text-lg" />
                </motion.div>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-full ${isDark ? "bg-white" : "bg-pink-600"}`} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-0 w-72 h-72 rounded-full blur-[120px] -z-10 animate-pulse
        ${isDark ? "bg-gray-500/5" : "bg-pink-600/10"}`} />
    </section>
  );
};

export default About;
