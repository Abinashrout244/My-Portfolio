import React, { useState } from "react";
import img from "../assets/images/con-removebg-preview.png";
import { motion } from "framer-motion"; // Note: Changed to framer-motion as it's the standard import for most projects
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const text = form.textarea.value;

    if (!name || !email || !text) {
      alert("All fields are mandatory. Please fill all the fields.");
      return;
    }

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, { name, email, idea: text }, PUBLIC_KEY)
      .then(
        () => {
          alert(`Submit Successfully!`);
          form.reset();
        },
        (error) => {
          alert("Something went wrong! Unable to send your message.");
        },
      );
  };

  return (
    <section
      className="relative scroll-mt-24 py-20 px-6 md:px-24 lg:px-40 overflow-hidden"
      id="contact"
    >
      {/* 1. INNOVATIVE BACKGROUND BLUR BLOBS */}
      <div className="absolute top-1/2 left-[-10%] w-72 h-72 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-80 h-80 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="flex flex-col gap-16 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter"
          >
            LET'S{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
              CONNECT.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed"
          >
            Have a question or a proposal? Maybe you just want to say hi? Drop a
            message below and I'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE: CREATIVE IMAGE WITH FLOATING ANIMATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center items-center"
          >
            {/* Pulsing Glow behind image */}
            <div className="absolute inset-0 bg-pink-500/20 blur-[80px] rounded-full animate-pulse" />
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={img}
              className="relative z-10 w-full max-w-[450px] object-contain drop-shadow-[0_20px_50px_rgba(219,39,119,0.3)]"
            />
          </motion.div>

          {/* RIGHT SIDE: GLASSMORPHISM FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            {/* Gradient border effect wrapper */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
                Send a Message <span className="w-8 h-[2px] bg-pink-500"></span>
              </h2>

              <form className="flex flex-col gap-5" onSubmit={handleForm}>
                <div className="relative group/input">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all duration-300"
                  />
                </div>

                <div className="relative group/input">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
                  />
                </div>

                <div className="relative group/input">
                  <textarea
                    name="textarea"
                    required
                    placeholder="Tell me about your project..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 h-36 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl text-white font-bold tracking-widest uppercase text-sm
                             bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500
                             shadow-[0_10px_30px_rgba(219,39,119,0.3)] transition-all duration-300"
                >
                  Initiate Project
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
