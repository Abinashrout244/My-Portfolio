import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Particles from "./Particles";
import TextType from "./TextType";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// Import your assets
import bgimg from "../assets/images/banner-bg.png";
import img from "../assets/images/gibli-removebg-preview.png";

const Banner = () => {
  // Framer Motion Variants
  const fadeInUp = (delay) => ({
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: delay, ease: "easeOut" },
    },
  });

  const socialVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 8,
      backgroundColor: "#db2777",
      color: "#ffffff",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-24 lg:px-40 bg-[#0f172a] text-white overflow-hidden"
    >
      {/* --- FIXED PARTICLES BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff", "#db2777", "#5227FF"]} // Added pink and purple to match your theme
          particleCount={800} // Increased from 200 to 800 for "More Dots"
          particleSpread={15} // Increased spread for more density
          speed={0.3} // Slightly faster movement
          particleBaseSize={200} // Slightly smaller dots to handle the higher count
          moveParticlesOnHover={true} // This makes them react as you "drag" your mouse across
          alphaParticles={true} // Makes them look more professional/faded
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* 1. BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* 2. LEFT CONTENT */}
      <div className="z-10 w-full md:w-3/5 mt-24 md:mt-0 flex flex-col gap-4">
        <div className="flex flex-row gap-3 items-center">
          <span className="text-pink-500 font-mono text-3xl md:text-5xl font-bold">
            &lt;
          </span>
          <TextType
            // 1. Changed 'texts' to 'text' (Standard for this component)
            text={[
              "Web Developer",
              "Frontend Developer",
              "React Developer",
              "MERN Stack Developer",
            ]}
            // 2. Ensure 'bg-clip-text' has 'display: inline-block' or 'block' to render correctly
            className="inline-block text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 tracking-tighter"
            // 3. Ensure cursor has width so it's visible
            cursorClassName="bg-pink-500 w-[2px] h-8 md:h-10 ml-1"
            typingSpeed={75}
            deletingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            variableSpeedEnabled={false}
            cursorBlinkDuration={0.5}
          />
          <span className="text-pink-500 font-mono text-3xl md:text-5xl font-bold">
            /&gt;
          </span>
        </div>

        <motion.h2
          variants={fadeInUp(0.2)}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          Hello, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400">
            Abinash Rout
          </span>
        </motion.h2>

        <motion.p
          variants={fadeInUp(0.4)}
          initial="hidden"
          animate="visible"
          className="text-gray-400 text-lg max-w-xl leading-relaxed"
        >
          Crafting fast, modern, and user-friendly web experiences. I specialize
          in building interactive UIs using{" "}
          <span className="text-white font-semibold">React & Tailwind</span>,
          bridging the gap between design and scalable code.
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          variants={fadeInUp(0.6)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mt-4"
        >
          <a href="#project" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <button className="relative py-3 px-8 bg-[#0f172a] rounded-full text-white font-bold transition-all">
              View My Work
            </button>
          </a>

          <a
            href="https://drive.google.com/file/d/1zEL7K67CU8GDD2dC3RPylt7edjnAk45J/view?usp=drivesdk"
            target="_blank"
            rel="noreferrer"
          >
            <button className="py-3 px-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all">
              Download CV
            </button>
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={fadeInUp(0.8)}
          initial="hidden"
          animate="visible"
          className="flex gap-4 mt-8"
        >
          {[
            { icon: faGithub, link: "https://github.com/Abinashrout244" },
            {
              icon: faLinkedin,
              link: "https://www.linkedin.com/in/abinash-rout-274285322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            },
            {
              icon: faXTwitter,
              link: "https://x.com/AbinashRout2251?t=7EqFwIyXIWGtz9Fexrl0Yg&s=09",
            },
            {
              icon: faInstagram,
              link: "https://www.instagram.com/frequency._0.001?igsh=MTViOHE3eHNwZ3p1dQ==",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              variants={socialVariants}
              initial="initial"
              whileHover="hover"
              href={item.link}
              target="_blank"
              className="w-12 h-12 flex items-center justify-center border-2 border-pink-500/50 rounded-full text-pink-500 transition-all shadow-lg shadow-pink-500/10"
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* 3. RIGHT IMAGE SECTION */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 w-full md:w-2/5 flex justify-center items-end h-[50vh] md:h-[80vh] mt-12 md:mt-0"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent rounded-full blur-[100px] z-0" />
        <motion.img
          whileHover={{ y: -10, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={img}
          alt="Abinash Rout"
          className="relative z-10 object-contain h-full drop-shadow-[0_20px_50px_rgba(219,39,119,0.4)]"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
