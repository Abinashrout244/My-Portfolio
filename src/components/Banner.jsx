import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../context/ThemeContext";
import Particles from "./Particles";
import TextType from "./TextType";
import { useState } from "react";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import hoverimg from "../assets/images/gibli-removebg-preview.png";
import img from "../assets/images/anime.png";

const Banner = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fadeInUp = (delay) => ({
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: delay, ease: "easeOut" },
    },
  });
  const [isHovered, setIsHovered] = useState(false);

  const socialVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: 8,
      backgroundColor: isDark ? "#4b5563" : "#db2777",
      color: "#ffffff",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section
      id="home"
      // Added transition-all to make the background fade smoothly
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-24 lg:px-40 transition-all duration-700 bg-transparent text-white overflow-hidden dark:bg-[#121212] dark:text-[#e0e0e0]"
    >
      {/* --- PARTICLES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={
            isDark
              ? ["#9ca3af", "#4b5563", "#ffffff"]
              : ["#ffffff", "#db2777", "#5227FF"]
          }
          particleCount={800}
          particleSpread={15}
          speed={0.3}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* 1. BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none dark:bg-gray-500/10 transition-colors duration-500" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none dark:bg-gray-400/10 transition-colors duration-500" />

      {/* 2. LEFT CONTENT */}
      <div className="z-10 w-full md:w-3/5 mt-24 md:mt-0 flex flex-col gap-4">
        <div className="flex flex-row gap-3 items-center">
          <span className="text-pink-500 font-mono text-3xl md:text-5xl font-bold dark:text-gray-500 transition-colors">
            &lt;
          </span>
          <TextType
            text={[
              "Web Developer",
              "Frontend Developer",
              "React Developer",
              "MERN Stack Developer",
            ]}
            // Forced state-based classes for the gradient to ensure it updates
            className={`inline-block text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r tracking-tighter transition-all duration-500 ${
              isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"
            }`}
            cursorClassName={`w-[2px] h-8 md:h-10 ml-1 transition-colors ${
              isDark ? "bg-white" : "bg-pink-500"
            }`}
            typingSpeed={75}
            deletingSpeed={50}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
          />
          <span className="text-pink-500 font-mono text-3xl md:text-5xl font-bold dark:text-gray-500 transition-colors">
            /&gt;
          </span>
        </div>

        <motion.h2
          variants={fadeInUp(0.2)}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-extrabold text-white dark:text-[#f3f4f6] transition-colors"
        >
          Hello, I'm{" "}
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${
              isDark ? "from-white to-gray-400" : "from-pink-500 to-indigo-400"
            }`}
          >
            Abinash Rout
          </span>
        </motion.h2>

        <motion.p
          variants={fadeInUp(0.4)}
          initial="hidden"
          animate="visible"
          className="text-gray-400 text-lg max-w-xl leading-relaxed dark:text-gray-400 transition-colors"
        >
          Crafting fast, modern, and user-friendly web experiences. I specialize
          in building interactive UIs using{" "}
          <span className="text-white font-semibold dark:text-white">
            React & Tailwind
          </span>
          .
        </motion.p>

        {/* Buttons Section */}
        <motion.div
          variants={fadeInUp(0.6)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mt-4"
        >
          <a href="#project" className="group relative">
            <div
              className={`absolute -inset-0.5 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300 bg-gradient-to-r ${
                isDark
                  ? "from-gray-400 to-gray-700"
                  : "from-pink-600 to-indigo-600"
              }`}
            ></div>
            <button className="relative py-3 px-8 bg-[#0f172a] rounded-full text-white font-bold transition-all dark:bg-[#1e1e1e] dark:text-[#e0e0e0]">
              View My Work
            </button>
          </a>

          <a
            href="https://drive.google.com/uc?export=download&id=1MXVXgnLh9UW3OEVKifR_x-3C0VHb92rD"
            target="_blank"
            rel="noreferrer"
          >
            <button className="py-3 px-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white font-semibold hover:bg-white hover:text-black transition-all dark:bg-[#1e1e1e] dark:border-[#2b2b2b] dark:text-[#e0e0e0] dark:hover:bg-white dark:hover:text-black">
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
              link: "https://www.linkedin.com/in/abinash-rout-274285322",
            },
            { icon: faXTwitter, link: "https://x.com/AbinashRout2251" },
            {
              icon: faInstagram,
              link: "https://www.instagram.com/frequency._0.001",
            },
          ].map((item, i) => (
            <motion.a
              key={i}
              variants={socialVariants}
              initial="initial"
              whileHover="hover"
              href={item.link}
              target="_blank"
              className={`w-12 h-12 flex items-center justify-center border-2 rounded-full transition-all shadow-lg ${
                isDark
                  ? "border-gray-600 text-gray-400 shadow-none"
                  : "border-pink-500/50 text-pink-500 shadow-pink-500/10"
              }`}
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 w-full md:w-2/5 flex justify-center items-end h-[50vh] md:h-[80vh] mt-12 md:mt-0 cursor-pointer"
      >
        {/* The Glow Background */}
        <div
          className={`absolute inset-0 rounded-full blur-[100px] z-0 transition-all duration-500 bg-gradient-to-t ${
            isDark
              ? "from-gray-500/10 to-transparent"
              : "from-pink-600/20 to-transparent"
          }`}
        />

        <div className="relative w-full h-full flex justify-center items-end">
          {/* PRIMARY IMAGE */}
          <motion.img
            src={img} // Your original image
            alt="Abinash Rout"
            animate={{
              opacity: isHovered ? 0 : 1,
              filter: isHovered
                ? "blur(10px) brightness(1.2)"
                : "blur(0px) brightness(1)",
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="relative z-10 object-contain h-full"
          />

          {/* HOVER IMAGE (The new one) */}
          <motion.img
            src={hoverimg} // The image you want to show on hover
            alt="Abinash Hover"
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              filter: isHovered ? "blur(0px)" : "blur(10px)",
              scale: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.4 }}
            className="absolute z-20 object-contain h-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
