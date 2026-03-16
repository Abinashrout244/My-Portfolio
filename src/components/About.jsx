import React from "react";
import img from "../assets/images/aviblazor.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faCode,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen scroll-mt-24 px-6 md:px-20 lg:px-40 py-20 relative overflow-hidden"
    >
      {/* 1. SECTION HEADER (Added on Top) */}
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="px-4 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-500 text-xs font-bold tracking-[0.3em] uppercase mb-4"
        >
          Discovery
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tighter"
        >
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 text-6xl italic">
            Me.
          </span>
        </motion.h2>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 justify-center items-center relative z-10">
        {/* LEFT SIDE: THE IMAGE BOX */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-[45%] flex flex-col items-center justify-center relative"
        >
          {/* Main Image Glass Container */}
          {/* Main Image 3D Flip Container */}
          <div className="relative group w-[300px] md:w-[400px] lg:w-[450px] [perspective:1500px]">
            <div className="relative w-full h-[350px] md:h-[500px] lg:h-[550px] transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* FRONT SIDE (Anime/Illustration) */}
              <div className="absolute inset-0 [backface-visibility:hidden] p-2 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-2xl">
                {/* Shine Effect (from your original code) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="rounded-[2rem] overflow-hidden bg-[#0f172a] h-full w-full">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/021/907/517/large_2x/anime-boy-avatar-ai-generative-art-ai-generation-art-photo.jpg" // Replace with your Anime image path
                    alt="Avi Anime"
                    className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* BACK SIDE (Real Photo) */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-2 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-pink-500/20 shadow-2xl">
                <div className="rounded-[2rem] overflow-hidden bg-[#0f172a] h-full w-full">
                  <img
                    src={img} // Your Real photo
                    alt="Abinash Rout Real"
                    className="h-full w-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Role Badge */}
          {/* Floating Role Badge with 3D Flip */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 -mt-10 w-[240px] md:w-[320px] h-[80px] md:h-[100px] [perspective:1000px] cursor-pointer group"
          >
            {/* The Inner Card that actually rotates */}
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* FRONT SIDE (Frontend Developer) */}
              <div className="absolute inset-0 backface-hidden [backface-visibility:hidden] bg-[#0f172a]/80 backdrop-blur-2xl border border-white/20 flex flex-col items-center justify-center rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <h2 className="text-white text-center text-lg font-bold tracking-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 text-2xl block font-black uppercase tracking-[0.2em]">
                    FRONTEND
                  </span>
                  DEVELOPER
                </h2>
              </div>

              {/* BACK SIDE (Fullstack Developer) */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0f172a]/90 backdrop-blur-2xl border border-indigo-500/40 flex flex-col items-center justify-center rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)]">
                <h2 className="text-white text-center text-lg font-bold tracking-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 text-2xl block font-black uppercase tracking-[0.2em]">
                    FULLSTACK
                  </span>
                  DEVELOPER
                </h2>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: THE CONTENT */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-[55%] flex flex-col gap-8"
        >
          <div className="space-y-6">
            {/* Title */}
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter uppercase italic">
              Turning Ideas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
                Into Interfaces
              </span>
            </h3>

            {/* Description Body */}
            <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-xl font-medium">
              Hi, I'm Avi — a dedicated Frontend Developer crafting
              <span className="text-white font-bold px-1">
                {" "}
                immersive digital experiences
              </span>
              . I blend architectural clean code with high-end interactive
              aesthetics.
              <br />
              <br />
              Currently scaling new heights in the
              <span className="text-pink-500 font-black italic ml-2 border-b-2 border-indigo-500/50 pb-1">
                MERN Stack Ecosystem!
              </span>
            </p>

            {/* THE ARROW ACTION BUTTON */}
            <div className="pt-6">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-4 px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all duration-500 hover:border-pink-500/50"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Contact Me
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative z-10"
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-pink-500 text-lg group-hover:translate-x-2 transition-transform duration-300"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-600/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default About;
