import React, { useEffect, useMemo, useState } from "react";
import bgimg from "../assets/images/banner-bg.png";
//import { motion } from "framer-motion";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../assets/images/gibli-removebg-preview.png";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Banner = () => {
  const roles = useMemo(
    () => [
      "Web Developer",
      "Frontend Developer",
      "React Developer",
      "MERN Stack Developer",
    ],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          // typing forward
          setSubIndex(subIndex + 1);
        } else if (deleting && subIndex > 0) {
          // deleting backward
          setSubIndex(subIndex - 1);
        } else if (!deleting && subIndex === current.length) {
          // pause then start deleting
          setTimeout(() => setDeleting(true), 1000);
        } else if (deleting && subIndex === 0) {
          // move to next word
          setDeleting(false);
          setIndex((index + 1) % roles.length);
        }
      },
      deleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  const container = (delay) => {
    return {
      hidden: { x: -100, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay },
      },
    };
  };

  const icon = (duration) => {
    return {
      initial: { y: -6 },
      animate: {
        y: [6, -6],
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    };
  };

  return (
    <div
      id="home"
      className="relative flex flex-col md:flex-row pt-24 md:pt-10 justify-between pr-2   md:px-40 bg-cover bg-center md:space-x-28 bg-no-repeat md:h-screen  items-center  text-white"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      <div className=" w-full flex flex-col gap-3 pl-3">
        <motion.div
          className="mb-3 flex items-center text-xl sm:text-2xl md:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h6>{roles[index].substring(0, subIndex)}</h6>
          <span className="w-[2px] ml-1 bg-white align-middle inline-block h-10"></span>
        </motion.div>
        <motion.h2
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className="text-5xl font-semibold text-pink-600"
        >
          Hello ,I'm
        </motion.h2>
        <motion.h1
          variants={container(0.5)}
          initial="hidden"
          animate="visible"
          className="text-6xl font-bold"
        >
          Abinash Rout
        </motion.h1>
        <motion.p
          variants={container(1)}
          initial="hidden"
          animate="visible"
          className="pr-3 md:pr-12"
        >
          Hi, I’m Avi — a passionate Web Developer crafting fast, modern and
          user-friendly web experiences. I specialize in building responsive
          websites and interactive UIs using React, JavaScript, and the MERN
          stack.(Backend on Progress..)
        </motion.p>
        <motion.div
          variants={container(1.5)}
          initial="hidden"
          animate="visible"
          className="flex flex-row gap-4 py-2"
        >
          <a href="#project">
            <button className="py-2 px-4 bg-gradient-to-l from-pink-500 to-indigo-500 rounded-full shadow shadow-slate-200 text-white font-semibold">
              Project View
            </button>
          </a>
          <a
            href="https://drive.google.com/file/d/1q1lHOqrVon0cVt3muULvgn52X7KCvAQm/view?usp=drivesdk"
            target="_blank"
          >
            <button className="py-2 px-4 bg-white rounded-full shadow shadow-slate-200 text-black font-semibold">
              My Resume
            </button>
          </a>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 3.5 }}
          className="flex flex-row space-x-4 mt-4"
        >
          <motion.a
            variants={icon(2.5)}
            initial="initial"
            animate="animate"
            href="https://github.com/Abinashrout244"
            target="_blank"
            className="border-2 border-pink-500 py-4 px-2 rounded-full hover:bg-pink-500 shadow shadow-pink-500 transition-all ease-in-out hover:-translate-y-2"
          >
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </motion.a>
          <motion.a
            variants={icon(3)}
            initial="initial"
            animate="animate"
            href="https://www.linkedin.com/in/abinash-rout-274285322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            className="border-2 border-pink-500 py-4 px-2 rounded-full hover:bg-pink-500 shadow shadow-pink-500 transition-all ease-in-out hover:-translate-y-2"
          >
            <FontAwesomeIcon icon={faLinkedin} size="xl" />
          </motion.a>
          <motion.a
            variants={icon(2)}
            initial="initial"
            animate="animate"
            href="https://x.com/AbinashRout2251?t=7EqFwIyXIWGtz9Fexrl0Yg&s=09"
            target="_blank"
            className="border-2 border-pink-500 py-4 px-2 rounded-full hover:bg-pink-500 shadow shadow-pink-500 transition-all ease-in-out hover:-translate-y-2"
          >
            <FontAwesomeIcon icon={faXTwitter} size="xl" />
          </motion.a>
          <motion.a
            variants={icon(3.5)}
            initial="initial"
            animate="animate"
            href="https://www.instagram.com/frequency._0.001?igsh=MTViOHE3eHNwZ3p1dQ=="
            target="_blank"
            className="border-2 border-pink-500 py-4 px-2 rounded-full hover:bg-pink-500 shadow shadow-pink-500 transition-all ease-in-out hover:-translate-y-2"
          >
            <FontAwesomeIcon icon={faInstagram} size="xl" />
          </motion.a>
        </motion.div>
      </div>
      <div className="h-screen pl-5 md:pl-0">
        <motion.img
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          src={img}
          className="object-cover h-[90%]"
        />
      </div>
    </div>
  );
};

export default Banner;
