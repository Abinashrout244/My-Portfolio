import React from "react";
import img from "../assets/images/aviblazor.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faCode } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

const About = () => {
  return (
    <div
      id="about"
      className="min-h-screen  scroll-mt-20  flex flex-col md:flex-row gap-10 px-6 md:px-20 lg:px-40 justify-center items-center  py-10"
    >
      {/* LEFT SIDE IMAGE */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col items-center "
      >
        <div className="border border-slate-100 rounded-lg overflow-hidden shadow-lg shadow-blue-500/20">
          <img
            src={img}
            className="h-[350px] md:h-[450px] w-full object-cover brightness-90 hover:brightness-75 transition duration-300"
          />
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-700 p-3 w-[250px] md:w-[300px] z-20 text-center -mt-7 rounded-lg shadow-lg">
          <h2 className="text-white text-xl font-bold leading-tight">
            <span className="text-red-600 text-2xl block">FRONTEND</span>
            DEVELOPER
          </h2>
        </div>
      </motion.div>

      {/* RIGHT SIDE TEXT */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 pl-4 md:pl-0"
      >
        <div className="text-slate-100 space-y-6 animate-fadeIn">
          {/* Heading */}
          <div className="flex items-center gap-2 bg-pink-500/20 w-fit px-5 py-2 rounded-lg">
            <p className="text-xl font-extrabold tracking-wide">About</p>
            <span className="text-red-600 text-3xl flex items-center gap-1">
              Me <FontAwesomeIcon icon={faCode} />
            </span>
          </div>

          {/* Subheading */}
          <div className="flex items-center uppercase text-2xl md:text-4xl font-semibold">
            <p>Turning Ideas Into Interfaces</p>
            <FontAwesomeIcon icon={faDesktop} className="text-pink-300" />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed opacity-90">
            Hi, I'm Avi — a passionate Frontend Developer who loves building
            beautiful, smooth, and modern web interfaces. I work with
            technologies like React, Tailwind CSS, Firebase Authentication, and
            modern UI patterns. I enjoy blending clean design with interactive
            experiences, and I'm always learning new tools to improve
            performance and design .Now i am Strating my{" "}
            <span className="font-bold text-red-600">
              Backend Journy(MERN Stack)!!
            </span>
          </p>

          {/* Button */}
          <a
            href="#contact"
            className="inline-block px-6 py-3 border border-pink-400 text-pink-300 rounded-xl text-lg font-semibold hover:bg-pink-500/20 transition-transform duration-300 hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
