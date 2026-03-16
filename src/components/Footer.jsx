import React from "react";
import img from "../assets/images/footer-bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import img1 from "../assets/images/gibli-removebg-preview.png";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const data = [
  {
    id: 1,
    text: "Instagram",
    icon: "https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=ffffff",
    link: "https://www.instagram.com/frequency._0.001",
    duration: 2.5,
  },
  {
    id: 2,
    text: "Github",
    icon: "https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=ffffff",
    link: "https://github.com/Abinashrout244",
    duration: 3,
  },
  {
    id: 3,
    text: "Twitter",
    icon: "https://img.icons8.com/?size=100&id=13963&format=png&color=ffffff",
    link: "https://x.com/AbinashRout2251",
    duration: 5,
  },
  {
    id: 4,
    text: "Linked in",
    icon: "https://img.icons8.com/?size=100&id=108786&format=png&color=ffffff",
    link: "https://www.linkedin.com/in/abinash-rout-274285322",
    duration: 2,
  },
  {
    id: 5,
    text: "leetcode",
    icon: "https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=ffffff",
    link: "https://leetcode.com/u/Abinash_90/",
    duration: 6,
  },
];

const iconVarients = (duration) => ({
  initial: { y: -6 },
  animate: {
    y: [6, -6],
    transition: {
      duration: duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      style={{ backgroundImage: isDark ? "none" : `url(${img})` }}
      className="relative w-full -mt-10 bg-no-repeat bg-cover bg-center px-5 md:px-20 pb-10 overflow-visible transition-all duration-700 bg-transparent"
    >
      {/* 1. NEWSLETTER CARD */}
      <div
        className={`backdrop-blur-xl border rounded-[2rem] md:rounded-[3rem] w-full h-auto md:h-[220px] relative -top-20 grid grid-cols-1 md:grid-cols-2 py-8 md:py-0 px-6 md:px-28 justify-center items-center gap-8 shadow-2xl transition-all duration-500 ${
          isDark
            ? "bg-[#1e1e1e]/80 border-white/10"
            : "bg-white/10 border-white/20"
        }`}
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white font-bold text-2xl md:text-3xl leading-tight"
          >
            Subscribe to our
            <span className="block">Newsletter</span>& Never miss latest
            <span
              className={`block uppercase transition-colors ${isDark ? "text-gray-400" : "text-pink-500"}`}
            >
              Updates
            </span>
          </motion.h2>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex flex-row gap-2 rounded-full border p-1.5 backdrop-blur-md transition-colors ${
            isDark
              ? "bg-[#121212] border-white/10"
              : "bg-white/5 border-white/10"
          }`}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="px-6 py-3 w-full bg-transparent text-white focus:outline-0 placeholder:text-gray-400 text-sm md:text-base"
          />
          <button
            className={`uppercase font-bold rounded-full px-6 md:px-12 py-3 hover:scale-105 transition-all text-xs md:text-sm shadow-lg ${
              isDark
                ? "bg-gradient-to-r from-gray-700 to-gray-500 text-white shadow-gray-900/40"
                : "bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-pink-500/20"
            }`}
          >
            submit
          </button>
        </motion.form>
      </div>

      {/* 2. MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 mt-5 md:mt-10">
        {/* LEFT: CONTACT INFO */}
        <div className="w-full flex flex-col justify-center items-start">
          <h2
            className={`text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-8 border-b-2 pb-2 transition-colors ${
              isDark
                ? "text-[#e0e0e0] border-gray-600"
                : "text-white border-pink-500"
            }`}
          >
            Contact Info
          </h2>

          <motion.ul
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {[
              {
                id: "4BBjXDasmgX3",
                text: "routabinash3775@gmail.com",
                color: isDark
                  ? "group-hover:text-white"
                  : "group-hover:text-pink-400",
              },
              {
                id: "OTO1K2lZkfsj",
                text: "+91 8249281685",
                color: isDark
                  ? "group-hover:text-gray-300"
                  : "group-hover:text-indigo-400",
              },
              {
                id: "85049",
                text: "Jajpur, Odisha",
                color: isDark
                  ? "group-hover:text-gray-400"
                  : "group-hover:text-purple-400",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    isDark
                      ? "bg-[#1e1e1e] border-white/10 group-hover:border-gray-500"
                      : "bg-white/5 border-white/10 group-hover:border-pink-500/50"
                  }`}
                >
                  <img
                    src={`https://img.icons8.com/?size=100&id=${item.id}&format=png&color=ffffff`}
                    className="size-6 opacity-80 group-hover:opacity-100 transition"
                  />
                </div>
                <h6
                  className={`text-sm md:text-lg font-medium transition-colors ${isDark ? "text-gray-400" : "text-white"} ${item.color}`}
                >
                  {item.text}
                </h6>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* CENTER: MASCOT */}
        <div className="w-full flex justify-center items-center relative">
          <div
            className={`absolute size-48 md:size-64 blur-[80px] rounded-full pointer-events-none transition-colors ${
              isDark ? "bg-gray-500/10" : "bg-pink-500/10"
            }`}
          />
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={img1}
            className={`max-w-full h-48 md:h-64 object-contain relative z-10 transition-all duration-500 ${
              isDark
                ? "drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                : "drop-shadow-[0_10px_30px_rgba(236,72,153,0.3)]"
            }`}
          />
        </div>

        {/* RIGHT: BRAND & SOCIALS */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center md:items-end gap-8"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            >
              <FontAwesomeIcon
                icon={faCode}
                className={`text-3xl transition-colors ${isDark ? "text-gray-400" : "text-pink-500"}`}
              />
            </motion.div>
            <h2 className="text-3xl font-black text-white italic tracking-tighter">
              Avi
              <span className={isDark ? "text-gray-400" : "text-pink-500"}>
                .
              </span>
              Dev
            </h2>
          </div>

          <div
            className={`flex flex-col gap-6 backdrop-blur-md border rounded-[2rem] p-6 w-full max-w-sm transition-all ${
              isDark
                ? "bg-[#1e1e1e]/60 border-white/10"
                : "bg-white/5 border-white/10"
            }`}
          >
            <h6 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] text-center md:text-right">
              Connect With{" "}
              <span className={isDark ? "text-gray-300" : "text-pink-500"}>
                Me
              </span>
            </h6>
            <ul className="flex flex-row justify-center md:justify-end gap-3">
              {data.map((item) => (
                <motion.li
                  key={item.id}
                  variants={iconVarients(item.duration)}
                  initial="initial"
                  animate="animate"
                  className="relative group"
                >
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -top-10 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all text-white font-bold whitespace-nowrap z-20 ${
                        isDark ? "bg-gray-700" : "bg-pink-600"
                      }`}
                    >
                      {item.text}
                    </span>
                    <div
                      className={`p-2.5 border rounded-xl transition-all ${
                        isDark
                          ? "bg-white/5 border-white/5 hover:bg-gray-600"
                          : "bg-white/10 border-white/10 hover:bg-pink-500"
                      }`}
                    >
                      <img src={item.icon} className="size-6 md:size-8" />
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* 3. COPYRIGHT BAR */}
      <div
        className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest transition-colors ${
          isDark
            ? "border-white/5 text-gray-500"
            : "border-white/10 text-white/40"
        }`}
      >
        <p>© 2026 Abinash Rout. Built with React.</p>
        <p>Handcrafted with Passion</p>
      </div>
    </footer>
  );
};

export default Footer;
