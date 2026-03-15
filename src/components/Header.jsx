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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

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
              ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
              : "bg-transparent"
          }`}
        >
          {/* LOGO */}
          <div className="flex items-center gap-3 group relative z-[1002]">
            <div className="relative bg-[#0f172a] p-2 rounded-lg border border-white/10">
              <FontAwesomeIcon
                icon={faCode}
                className="text-pink-500 text-xl"
              />
            </div>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase italic">
              Avi Dev
            </h2>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-[0.2em] text-gray-400 hover:text-white uppercase transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-pink-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </nav>

          {/* ACTION BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-5 relative z-[1002]">
            <a
              href="https://drive.google.com/file/d/1Kxc14xIOwjyLMZh41wX_bNkdYJ-u99rU/view?usp=drivesdk"
              target="_blank"
              className="hidden sm:block"
            >
              <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-white rounded-full group bg-gradient-to-br from-pink-500 to-indigo-500">
                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#0f172a] rounded-full group-hover:bg-opacity-0">
                  RESUME
                  <FontAwesomeIcon icon={faLink} className="ml-2 text-xs" />
                </span>
              </button>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl border border-white/10 active:scale-90 transition-transform"
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
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-md md:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80%] sm:w-[60%] z-[999] bg-[#0f172a] border-l border-white/10 shadow-2xl flex flex-col p-10 pt-32 md:hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,#db2777,transparent)]"></div>

              <div className="mb-10">
                <span className="text-pink-500 font-mono text-sm tracking-widest uppercase">
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
                      className="group flex items-center gap-4 text-3xl font-bold text-white hover:text-pink-500 transition-all tracking-tight"
                    >
                      <span className="text-xs font-mono text-pink-500 opacity-50">
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
                  {[
                    {
                      icon: faGithub,
                      link: "https://github.com/Abinashrout244",
                    },
                    { icon: faLinkedin, link: "https://linkedin.com/in/..." },
                    { icon: faXTwitter, link: "https://x.com/..." },
                    { icon: faInstagram, link: "https://instagram.com/..." },
                  ].map((item, index) => {
                    return (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        className="text-white/60 hover:text-pink-500 transition-colors"
                      >
                        <FontAwesomeIcon icon={item.icon} size="lg" />
                      </a>
                    );
                  })}
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
