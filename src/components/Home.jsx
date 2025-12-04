import React from "react";
import Banner from "./Banner";
import About from "./About";
import Skill from "./Skill";
import Project from "./Project";
import Contact from "./Contact";

const Home = () => {
  return (
    <div className="bg-gradient-to-br pb-36 from-[#050510] via-[#0a1a3a] to-[#1e3a8a] h-full">
      <Banner />
      <About />
      <Skill />
      <Project />
      <Contact />
    </div>
  );
};

export default Home;
