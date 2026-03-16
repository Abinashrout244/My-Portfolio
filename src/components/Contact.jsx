import React from "react";
import img from "../assets/images/con-removebg-preview.png";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
        () => {
          alert("Something went wrong! Unable to send your message.");
        },
      );
  };

  return (
    <section
      className="relative scroll-mt-24 py-20 px-6 md:px-24 lg:px-40 overflow-hidden transition-all duration-700 bg-transparent"
      id="contact"
    >
      {/* 1. BACKGROUND GLOWS */}
      <div
        className={`absolute top-1/2 left-[-10%] w-72 h-72 rounded-full blur-[120px] pointer-events-none transition-colors ${
          isDark ? "bg-gray-500/5" : "bg-pink-600/10"
        }`}
      />
      <div
        className={`absolute bottom-10 right-[-5%] w-80 h-80 rounded-full blur-[150px] pointer-events-none transition-colors ${
          isDark ? "bg-gray-400/5" : "bg-indigo-600/10"
        }`}
      />

      <div className="flex flex-col gap-16 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors ${
              isDark ? "text-[#e0e0e0]" : "text-white"
            }`}
          >
            LET'S{" "}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r transition-all duration-500 ${
                isDark
                  ? "from-white to-gray-500"
                  : "from-pink-500 to-indigo-500"
              }`}
            >
              CONNECT.
            </span>
          </motion.h1>
          <motion.p
            className={`max-w-2xl text-base md:text-lg leading-relaxed transition-colors ${
              isDark ? "text-gray-400" : "text-white/70"
            }`}
          >
            Have a question or a proposal? Maybe you just want to say hi? Drop a
            message below and I'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE: IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center items-center"
          >
            <div
              className={`absolute inset-0 blur-[80px] rounded-full animate-pulse transition-colors ${
                isDark ? "bg-white/5" : "bg-pink-500/20"
              }`}
            />
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={img}
              className={`relative z-10 w-full max-w-[450px] object-contain transition-all duration-500 ${
                isDark
                  ? "drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                  : "drop-shadow-[0_20px_50px_rgba(219,39,119,0.3)]"
              }`}
            />
          </motion.div>

          {/* RIGHT SIDE: GLASSMORPHISM FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative group"
          >
            {/* Border Glow Wrapper */}
            <div
              className={`absolute -inset-1 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 bg-gradient-to-r ${
                isDark
                  ? "from-gray-500 to-gray-800"
                  : "from-pink-500 to-indigo-500"
              }`}
            ></div>

            <div
              className={`relative backdrop-blur-2xl border p-8 md:p-12 rounded-[2rem] shadow-2xl transition-all duration-500 ${
                isDark
                  ? "bg-[#1e1e1e]/80 border-white/10"
                  : "bg-white/10 border-white/20"
              }`}
            >
              <h2 className="text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
                Send a Message{" "}
                <span
                  className={`w-8 h-[2px] transition-colors ${isDark ? "bg-gray-500" : "bg-pink-500"}`}
                ></span>
              </h2>

              <form className="flex flex-col gap-5" onSubmit={handleForm}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-1 transition-all duration-300 ${
                    isDark
                      ? "bg-[#121212] border-white/10 text-white placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500"
                      : "bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-pink-500 focus:ring-pink-500"
                  }`}
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-1 transition-all duration-300 ${
                    isDark
                      ? "bg-[#121212] border-white/10 text-white placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500"
                      : "bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-indigo-500 focus:ring-indigo-500"
                  }`}
                />

                <textarea
                  name="textarea"
                  required
                  placeholder="Tell me about your project..."
                  className={`w-full p-4 rounded-xl border h-36 focus:outline-none focus:ring-1 transition-all duration-300 resize-none ${
                    isDark
                      ? "bg-[#121212] border-white/10 text-white placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500"
                      : "bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-purple-500 focus:ring-purple-500"
                  }`}
                ></textarea>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-4 mt-2 rounded-xl text-white font-bold tracking-widest uppercase text-sm shadow-lg transition-all duration-500 bg-gradient-to-r ${
                    isDark
                      ? "from-gray-700 to-gray-500 shadow-gray-900/40"
                      : "from-pink-600 to-indigo-600 shadow-pink-500/30 hover:from-pink-500 hover:to-indigo-500"
                  }`}
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
