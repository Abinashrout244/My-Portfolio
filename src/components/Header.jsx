import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLink,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skill" },
    { name: "Projects", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[1001] transition-all duration-500 px-4 md:px-10 pt-6">
        <div
          className={`mx-auto max-w-7xl flex justify-between items-center px-6 py-3 rounded-2xl transition-all duration-500 ${
            scroll || isOpen
              ? isDark
                ? "bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
                : "bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
              : "bg-transparent"
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 group relative z-[1002]">
            <div
              className={`relative p-2 rounded-lg border transition-colors duration-500 ${
                isDark
                  ? "bg-[#121212] border-white/10"
                  : "bg-white/10 border-white/20"
              }`}
            >
              <FontAwesomeIcon
                icon={faCode}
                className={`text-xl transition-colors ${isDark ? "text-gray-400" : "text-pink-500"}`}
              />
            </div>
            <h2
              className={`text-xl font-black tracking-tighter uppercase italic transition-colors ${
                isDark ? "text-[#e0e0e0]" : "text-white"
              }`}
            >
              Avi Dev
            </h2>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                    isDark ? "bg-gray-400" : "bg-pink-500"
                  }`}
                ></span>
              </a>
            ))}
          </nav>

          {/* ACTION BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-5 relative z-[1002]">
            <a
              href="https://drive.google.com/file/d/1MXVXgnLh9UW3OEVKifR_x-3C0VHb92rD/view?usp=drivesdk"
              target="_blank"
              className="hidden sm:block"
            >
              <button
                className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold rounded-full group transition-all ${
                  isDark
                    ? "bg-gray-600"
                    : "bg-gradient-to-br from-pink-500 to-indigo-500"
                }`}
              >
                <span
                  className={`relative px-5 py-2 transition-all ease-in duration-75 rounded-full group-hover:bg-opacity-0 ${
                    isDark
                      ? "bg-[#121212] text-gray-300"
                      : "bg-[#0f172a] text-white"
                  }`}
                >
                  RESUME
                  <FontAwesomeIcon icon={faLink} className="ml-2 text-xs" />
                </span>
              </button>
            </a>

            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl border active:scale-90 transition-all ${
                isDark
                  ? "bg-[#1e1e1e] border-white/10 text-white"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-md md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-screen w-[80%] sm:w-[60%] z-[999] border-l shadow-2xl flex flex-col p-10 pt-32 md:hidden transition-colors duration-500 ${
                isDark
                  ? "bg-[#121212] border-white/10"
                  : "bg-[#0a1a3a] border-white/10"
              }`}
            >
              <div className="mb-10">
                <span
                  className={`font-mono text-sm tracking-widest uppercase transition-colors ${
                    isDark ? "text-gray-500" : "text-pink-500"
                  }`}
                >
                  Navigation
                </span>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center gap-4 text-3xl font-bold transition-all tracking-tight ${
                        isDark
                          ? "text-white hover:text-gray-400"
                          : "text-white hover:text-pink-500"
                      }`}
                    >
                      <span
                        className={`text-xs font-mono opacity-50 ${isDark ? "text-gray-500" : "text-pink-500"}`}
                      >
                        0{i + 1}
                      </span>
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pt-10 border-t border-white/10"
              >
                <p className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-4">
                  Let's Connect
                </p>
                <div className="flex gap-6">
                  {/* Social links stay white with theme-based hover */}
                  {[faGithub, faLinkedin, faXTwitter, faInstagram].map(
                    (icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className={`transition-colors ${isDark ? "text-gray-500 hover:text-white" : "text-white/60 hover:text-pink-500"}`}
                      >
                        <FontAwesomeIcon icon={icon} size="lg" />
                      </a>
                    ),
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
