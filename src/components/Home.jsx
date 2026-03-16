import React from "react";
import Banner from "./Banner";
import About from "./About";
import Skill from "./Skill";
import Project from "./Project";
import Contact from "./Contact";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`transition-colors duration-700 min-h-screen ${
        isDark
          ? "bg-[#121212]" // Deep Black for Dark Mode
          : "bg-linear-to-br  from-[#050510] via-[#0a1a3a] to-[#1e3a8a]" // Your Navy/Blue for Light Mode
      }`}
    >
      <Banner />
      <About />
      <Skill />
      <Project />
      <div className="pb-36">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
