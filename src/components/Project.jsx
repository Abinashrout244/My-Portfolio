import React from "react";
import { ProjectData } from "../utils/Project";
import { motion } from "motion/react";
import { animate } from "motion";
const parent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // smooth wave effect
    },
  },
};
const card = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const icon = (duration) => {
  return {
    initial: { y: 5 },
    animate: {
      y: [5, -5],
      transition: {
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };
};

const Project = () => {
  return (
    <div className="scroll-mt-24  px-2 md:px-28 pt-44 md:pt-16" id="project">
      <div className="justify-center items-center flex flex-col space-y-3.5">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase font-bold text-4xl text-center text-red-600"
        >
          <span className="text-white"> My</span> Projects
        </motion.h1>
        <motion.h6
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-semibold text-slate-300 text-center px-2 md:px-34"
        >
          Here are Many Projects I have Done!.Each Project was carefully carfted
          with attention to detail,Performance and user Experience.
        </motion.h6>
      </div>
      <motion.ul
        variants={parent}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-10 p-4 mt-10"
      >
        {ProjectData.map((item) => {
          return (
            <motion.li
              variants={card}
              key={item.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.04] cursor-pointer transition hover:shadow-2xl hover:shadow-pink-500"
            >
              {/* Image */}
              <a href={item.Deploy} target="_blank">
                <img
                  src={item.imgUrl}
                  alt={item.imgAlt}
                  className="w-full h-[250px] object-cover"
                />
              </a>

              {/* Content */}
              <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-row gap-3 flex-wrap">
                  {item.tech.map((btn, index) => {
                    return (
                      <motion.button
                        variants={icon(0.5)}
                        animate="animate"
                        initial="initial"
                        key={index}
                        className="font-semibold bg-slate-600 px-3 py-1 rounded-md text-sm text-white"
                      >
                        {btn.text}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Title + Desc */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold text-white">
                    {item.title}
                  </h1>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-row gap-3 justify-end items-center border-t border-slate-700 pt-3">
                  <a href={item.github} target="_blank">
                    <motion.img
                      src="https://img.icons8.com/?size=100&id=0tREDFkScvsm&format=png&color=000000"
                      className="size-8 invert"
                    />
                  </a>
                  <a href={item.Deploy} target="_blank">
                    <motion.img
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                      src="https://img.icons8.com/?size=100&id=21104&format=png&color=000000"
                      className="size-8 invert"
                    />
                  </a>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
};

export default Project;
