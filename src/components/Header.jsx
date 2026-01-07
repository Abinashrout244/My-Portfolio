import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-36 z-[1000] transition-all duration-300
          ${
            scroll
              ? " shadow-md text-white bg-white/10 shadow shadow-white/50 py-2"
              : "bg-transparent text-white py-6"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCode} size="2xl" />
          <h2 className="text-2xl md:text-3xl font-bold">Avi Dev</h2>
        </div>

        <div className="flex items-center gap-6 md:gap-16">
          <nav className="hidden md:flex gap-7 font-semibold">
            <a
              href="#home"
              className="cursor-pointer hover:text-pink-600 duration-200"
            >
              HOME
            </a>
            <a
              href="#about"
              className="cursor-pointer hover:text-pink-600 duration-200"
            >
              ABOUT
            </a>
            <a
              href="#skill"
              className="cursor-pointer hover:text-pink-600 duration-200"
            >
              SKILL
            </a>
            <a
              href="#project"
              className="cursor-pointer hover:text-pink-600 duration-200"
            >
              PROJECT
            </a>
            <a
              href="#contact"
              className="cursor-pointer hover:text-pink-600 duration-200"
            >
              CONTACT
            </a>
          </nav>

          <a
            href="https://drive.google.com/file/d/1zEL7K67CU8GDD2dC3RPylt7edjnAk45J/view?usp=drivesdk"
            target="_blank"
          >
            <button className="flex items-center gap-2 text-white px-3 md:px-4 py-2 text-sm md:text-lg bg-gradient-to-l from-pink-500 to-indigo-500 rounded-md hover:opacity-90 duration-200 shadow-md">
              MY RESUME
              <FontAwesomeIcon icon={faLink} />
            </button>
          </a>

          {/* Mobile Icon */}
          <div
            className="md:hidden cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon
              icon={isOpen ? faX : faBars}
              size="2xl"
              className="text-white"
            />
          </div>
        </div>
      </header>

      {/* MOBILE MENU OUTSIDE HEADER */}
      {isOpen && (
        <div
          className={`fixed left-0 w-full h-screen bg-purple-900/95 text-white z-[900] flex items-center justify-center transition-all duration-300
          ${isOpen ? "top-0 opacity-100" : "-top-full opacity-0"}
        `}
        >
          <nav className="flex flex-col items-center gap-7 text-xl font-semibold">
            <a
              className="hover:text-pink-400 ease-in-out duration-1000"
              href="#home"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </a>
            <a
              className="hover:text-pink-400 duration-200"
              href="#about"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </a>
            <a
              className="hover:text-pink-400 duration-200"
              href="#skill"
              onClick={() => setIsOpen(false)}
            >
              SKILL
            </a>
            <a
              className="hover:text-pink-400 duration-200"
              href="#project"
              onClick={() => setIsOpen(false)}
            >
              PROJECT
            </a>
            <a
              className="hover:text-pink-400 duration-200"
              href="#contact"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
