import React, { useState } from "react";
import { motion } from "motion/react";

const data = [
  {
    id: 1,
    text: "HTML",
    percentage: "90%",
    width: "90%",
  },
  {
    id: 2,
    text: "Css",
    percentage: "80%",
    width: "80%",
  },
  {
    id: 3,
    text: "JAVA SCRIPT",
    percentage: "70%",
    width: "70%",
  },
  {
    id: 4,
    text: "react",
    percentage: "69%",
    width: "69%",
  },
  {
    id: 5,
    text: "Tailwind css",
    percentage: "77%",
    width: "77%",
  },
  {
    id: 6,
    text: "NOde.js",
    percentage: "10%",
    width: "10%",
  },
  {
    id: 1,
    text: "dsa",
    percentage: "30%",
    width: "30%",
  },
];
const skill = [
  {
    id: 1,
    img: "https://img.icons8.com/?size=100&id=20909&format=png&color=000000",
  },
  {
    id: 2,
    img: "https://img.icons8.com/?size=100&id=21278&format=png&color=000000",
  },
  {
    id: 3,
    img: "https://img.icons8.com/?size=100&id=TyEv5JJxLmAE&format=png&color=FFFF00",
  },
  {
    id: 4,
    img: "https://img.icons8.com/?size=100&id=NfbyHexzVEDk&format=png&color=000000",
  },
  {
    id: 5,
    img: "https://img.icons8.com/?size=100&id=WoopfRcDj3RF&format=png&color=000000",
  },

  {
    id: 7,
    img: "https://img.icons8.com/?size=100&id=iEBcQcM9rnZ9&format=png&color=000000",
  },
  {
    id: 8,
    img: "https://img.icons8.com/?size=100&id=FBycNmdwUQz1&format=png&color=000000",
  },
  {
    id: 9,
    img: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000",
  },
];
const toll = [
  {
    id: 1,
    img: "https://img.icons8.com/?size=100&id=v05jsvW3RprR&format=png&color=000000",
  },

  {
    id: 2,
    img: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
  },
  {
    id: 4,
    img: "https://img.icons8.com/?size=100&id=zfHRZ6i1Wg0U&format=png&color=000000",
  },
  {
    id: 5,
    img: "https://img.icons8.com/?size=100&id=24895&format=png&color=000000",
  },
];

const optional = [
  {
    id: 1,
    img: "https://img.icons8.com/?size=100&id=l2v1nCw4goor&format=png&color=000000",
  },
  {
    id: 2,
    img: "https://img.icons8.com/?size=100&id=kwi0rSegAaX3&format=png&color=000000",
  },
  {
    id: 3,
    img: "https://img.icons8.com/?size=100&id=FJCUJYTof2TA&format=png&color=000000",
  },
  {
    id: 4,
    img: "https://img.icons8.com/?size=100&id=e4pUQ752DRTk&format=png&color=000000",
  },
];

const Skill = () => {
  const [tab, setTab] = useState("skill");
  return (
    <div
      id="skill"
      className="scroll-mt-24 h-screen px-2 md:px-28 pt-5 md:pt-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg p-3 md:p-5">
        {/* LEFT SIDE */}
        <div className="space-y-5 md:space-y-7 p-2 md:p-5">
          <motion.h1
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl text-white font-bold uppercase text-center"
          >
            Tech Stack & Abilities I've
          </motion.h1>

          <ul className="space-y-4 md:space-y-5">
            {data.map((item, index) => (
              <motion.li
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                key={index}
                className="space-y-2.5"
              >
                <div className="flex flex-row justify-between px-1 md:px-2 text-sm md:text-[16px] font-semibold text-white/50">
                  <h2 className="uppercase">{item.text}</h2>
                  <span>{item.percentage}</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${item.width}` }}
                  ></div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 md:gap-6 p-2 h-full w-full relative min-h-[400px]"
        >
          {/* BUTTONS */}
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-row gap-2 md:gap-4 bg-slate-200 rounded-full px-2 py-1 md:p-2 z-20 overflow-x-auto whitespace-nowrap"
          >
            <button
              className={`rounded-full px-6 py-1.5 md:px-10 md:py-2.5 ${
                tab === "skill"
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white"
                  : "border border-slate-700"
              }`}
              onClick={() => setTab("skill")}
            >
              SKILL'S
            </button>

            <button
              className={`rounded-full px-6 py-1.5 md:px-10 md:py-2.5 ${
                tab === "tool"
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white"
                  : "border border-slate-700"
              }`}
              onClick={() => setTab("tool")}
            >
              TOOL"S
            </button>

            <button
              className={`rounded-full px-6 py-1.5 md:px-10 md:py-2.5 ${
                tab === "optional"
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white"
                  : "border border-slate-700"
              }`}
              onClick={() => setTab("optional")}
            >
              OPTIONAL
            </button>
          </motion.div>

          {/* SKILL GRID */}
          {tab === "skill" && (
            <div className="grid grid-cols-3 gap-3 md:gap-6 bg-black rounded-xl h-full w-full p-3 md:p-6 pt-16 md:pt-20">
              {skill.map((item) => (
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0 }}
                  key={item.id}
                  className="flex justify-center items-center bg-slate-900 p-2 rounded-xl hover:bg-slate-800 transition duration-300 shadow-md hover:scale-105"
                >
                  <img src={item.img} className="w-10 h-10 md:w-14 md:h-14" />
                </motion.div>
              ))}
            </div>
          )}

          {/* TOOL GRID */}
          {tab === "tool" && (
            <div className="grid grid-cols-3 gap-3 md:gap-6 bg-black rounded-xl h-full w-full p-3 md:p-6 pt-16 md:pt-20">
              {toll.map((item) => (
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0 }}
                  key={item.id}
                  className="flex justify-center items-center bg-slate-900 p-2 rounded-xl hover:bg-slate-800 transition duration-300 shadow-md hover:scale-105"
                >
                  <img src={item.img} className="w-10 h-10 md:w-14 md:h-14" />
                </motion.div>
              ))}
            </div>
          )}

          {/* OPTIONAL GRID */}
          {tab === "optional" && (
            <div className="grid grid-cols-3 gap-3 md:gap-6 bg-black rounded-xl h-full w-full p-3 md:p-6 pt-16 md:pt-20">
              {optional.map((item) => (
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0 }}
                  key={item.id}
                  className="flex justify-center items-center bg-slate-900 p-2 rounded-xl hover:bg-slate-800 transition duration-300 shadow-md hover:scale-105"
                >
                  <img src={item.img} className="w-10 h-10 md:w-14 md:h-14" />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Skill;
