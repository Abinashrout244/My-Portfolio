import React from "react";
import img from "../assets/images/footer-bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import img1 from "../assets/images/gibli-removebg-preview.png";
import { motion } from "motion/react";

const data = [
  {
    id: 1,
    text: "Instagram",
    icon: "https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=000000",
    link: "https://www.instagram.com/frequency._0.001?igsh=MTViOHE3eHNwZ3p1dQ==",
    duration: 2.5,
  },
  {
    id: 2,
    text: "Github",
    icon: "https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=000000",
    link: "https://github.com/Abinashrout244",
    duration: 3,
  },
  {
    id: 3,
    text: "Twitter",
    icon: "https://img.icons8.com/?size=100&id=13963&format=png&color=000000",
    link: "https://x.com/AbinashRout2251?t=7EqFwIyXIWGtz9Fexrl0Yg&s=09",
    duration: 5,
  },
  {
    id: 4,
    text: "Linked in",
    icon: "https://img.icons8.com/?size=100&id=108786&format=png&color=000000",
    link: "https://www.linkedin.com/in/abinash-rout-274285322?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    duration: 2,
  },
  {
    id: 5,
    text: "leetcode",
    icon: "https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=000000",
    link: "https://leetcode.com/u/Abinash_90/",
    duration: 6,
  },
];

const iconVarients = (duration) => {
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

const Footer = () => {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="md:h-[70vh] pb-5 absolute bg-no-repeat bg-cover bg-center w-full px-5 md:px-20 "
    >
      <div className="bg-white rounded-4xl w-full h-[250px] relative -top-20 grid grid-cols-1 md:grid-cols-2 m py-4 md:py-0 px-5 md:px-28 justify-center items-center gap-5">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-slate-800 font-bold text-2xl md:text-3xl leading-snug"
          >
            Subscribe to our
            <span className="block">Newsletter</span>& Never miss latest
            <span className="block uppercase">Updates</span>
          </motion.h2>
        </div>
        <motion.form
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row gap-2 rounded-lg outline-2 outline-[#0a1a3a] p-1 "
        >
          <input
            type="email"
            name="email"
            id="newEmail"
            placeholder="Email Address"
            className="px-2 py-5 w-full focus:outline-0"
          />
          <button className="uppercase rounded-lg bg-gradient-to-br  from-[#050510] via-[#0a1a3a] to-[#1e3a8a] text-white px-5  md:px-14 py-2">
            submit
          </button>
        </motion.form>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-3 gap-23 md:gap-10 md:gap-0">
        <div className="w-full flex flex-col justify-center items-start">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white tracking-wide mb-5">
            Contact Information
          </h2>

          <motion.ul
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <li className="flex items-center gap-4 group">
              <img
                src="https://img.icons8.com/?size=100&id=4BBjXDasmgX3&format=png&color=ffffff"
                className="size-10 opacity-80 group-hover:opacity-100 transition"
              />
              <h6 className="text-lg font-semibold text-white group-hover:text-pink-400 transition">
                routabinash3775@gmail.com
              </h6>
            </li>

            <li className="flex items-center gap-4 group">
              <img
                src="https://img.icons8.com/?size=100&id=OTO1K2lZkfsj&format=png&color=ffffff"
                className="size-10 opacity-80 group-hover:opacity-100 transition"
              />
              <h6 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition">
                +91 8249281685
              </h6>
            </li>

            <li className="flex items-center gap-4 group">
              <img
                src="https://img.icons8.com/?size=100&id=85049&format=png&color=ffffff"
                className="size-12 opacity-80 group-hover:opacity-100 transition"
              />
              <h6 className="text-lg font-semibold text-white group-hover:text-purple-400 transition">
                Jajpur, BBSR, Odisha
              </h6>
            </li>
          </motion.ul>
        </div>
        <div className="w-full h-full flex justify-center items-center overflow-hidden">
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={img1}
            className="max-w-full max-h-[250px] object-contain"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-around gap-5"
        >
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <FontAwesomeIcon icon={faCode} size="2xl" color="red" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Avi Dev
            </h2>
          </div>
          <div className="flex flex-col gap-10 border border-slate-700 rounded-lg p-5 items-start">
            <h6 className="text-white text-3xl font-bold">
              CONNECT WITH <span className="text-4xl text-pink-500">ME</span>
            </h6>
            <ul className="flex flex-row gap-3">
              {data.map((item) => {
                return (
                  <motion.li
                    variants={iconVarients(item.duration)}
                    initial="initial"
                    animate="animate"
                    key={item.id}
                    className="relative group inline-block bg-slate-700 p-2 border border-slate-100 rounded-lg"
                  >
                    <a href={item.link} target="_blank">
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -top-12
                   bg-pink-500 text-white text-sm px-3 py-1 rounded
                   opacity-0 group-hover:opacity-100 transition
                   whitespace-nowrap z-10"
                      >
                        {item.text}
                      </span>
                      <img
                        src={item.icon}
                        className="size-10 opacity-80 group-hover:opacity-100 transition"
                      />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
