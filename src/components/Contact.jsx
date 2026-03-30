import React from "react";
import img from "../assets/images/con-removebg-preview.png";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";
import { Mail, User, MessageSquare, Send } from "lucide-react";

const SERVICE_ID  = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_PUBLIC_KEY;

/* Stagger for form fields */
const formContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const formField = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* Labeled animated input wrapper */
const AnimatedField = ({ icon: Icon, label, isDark, children }) => (
  <motion.div variants={formField} className="relative group">
    <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10
      ${isDark ? "text-gray-600 group-focus-within:text-gray-400" : "text-white/30 group-focus-within:text-pink-400"}`}>
      <Icon size={15} />
    </div>
    {children}
  </motion.div>
);

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const text = form.textarea.value;
    if (!name || !email || !text) { alert("All fields are mandatory."); return; }
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { name, email, idea: text }, PUBLIC_KEY)
      .then(() => { alert("Submitted!"); form.reset(); }, () => alert("Something went wrong!"));
  };

  return (
    <section className="relative scroll-mt-24 py-20 px-6 md:px-24 lg:px-40 overflow-hidden bg-transparent" id="contact">
      {/* Background glows */}
      <div className={`absolute top-1/2 left-[-10%] w-72 h-72 rounded-full blur-[120px] pointer-events-none ${isDark ? "bg-gray-500/5" : "bg-pink-600/10"}`} />
      <div className={`absolute bottom-10 right-[-5%] w-80 h-80 rounded-full blur-[150px] pointer-events-none ${isDark ? "bg-gray-400/5" : "bg-indigo-600/10"}`} />

      <div className="flex flex-col gap-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl md:text-6xl font-black tracking-tighter ${isDark ? "text-[#e0e0e0]" : "text-white"}`}
          >
            LET'S{" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? "from-white to-gray-500" : "from-pink-500 to-indigo-500"}`}>
              CONNECT.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`max-w-2xl text-base md:text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-white/70"}`}
          >
            Have a question or a proposal? Drop a message below and I'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center items-center"
          >
            <div className={`absolute inset-0 blur-[80px] rounded-full animate-pulse ${isDark ? "bg-white/5" : "bg-pink-500/20"}`} />
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src={img}
              className={`relative z-10 w-full max-w-[450px] object-contain
                ${isDark ? "drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]" : "drop-shadow-[0_20px_50px_rgba(219,39,119,0.3)]"}`}
            />
          </motion.div>

          {/* Form with animated rotating gradient border */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Animated conic gradient border */}
            <div className="absolute -inset-[1px] rounded-[2rem] overflow-hidden pointer-events-none z-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] w-[300%] h-[300%]"
                style={{
                  background: isDark
                    ? "conic-gradient(from 0deg, transparent 0deg, #6b7280 60deg, transparent 120deg)"
                    : "conic-gradient(from 0deg, transparent 0deg, #ec4899 60deg, #6366f1 120deg, transparent 180deg)",
                  opacity: 0.6,
                }}
              />
            </div>

            <div className={`relative z-10 backdrop-blur-2xl border p-8 md:p-12 rounded-[2rem] shadow-2xl transition-all duration-500
              ${isDark ? "bg-[#1e1e1e]/90 border-white/10" : "bg-white/10 border-white/15"}`}
            >
              <h2 className="text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
                Send a Message
                <span className={`flex-grow h-[1px] max-w-[60px] ${isDark ? "bg-gray-700" : "bg-pink-500/40"}`} />
              </h2>

              <motion.form
                variants={formContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col gap-5" onSubmit={handleForm}
              >
                <AnimatedField icon={User} label="Name" isDark={isDark}>
                  <motion.input variants={formField} type="text" name="name" required placeholder="Your Name"
                    className={`w-full pl-10 pr-4 py-4 rounded-xl border focus:outline-none focus:ring-1 transition-all duration-300
                      ${isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500/30"
                              : "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-pink-500 focus:ring-pink-500/30"}`}
                  />
                </AnimatedField>

                <AnimatedField icon={Mail} label="Email" isDark={isDark}>
                  <motion.input variants={formField} type="email" name="email" required placeholder="Your Email"
                    className={`w-full pl-10 pr-4 py-4 rounded-xl border focus:outline-none focus:ring-1 transition-all duration-300
                      ${isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500/30"
                              : "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-indigo-500 focus:ring-indigo-500/30"}`}
                  />
                </AnimatedField>

                <AnimatedField icon={MessageSquare} label="Message" isDark={isDark}>
                  <motion.textarea variants={formField} name="textarea" required placeholder="Tell me about your project..."
                    className={`w-full pl-10 pr-4 py-4 rounded-xl border h-36 focus:outline-none focus:ring-1 resize-none transition-all duration-300
                      ${isDark ? "bg-[#121212] border-white/10 text-white placeholder-gray-600 focus:border-gray-500 focus:ring-gray-500/30"
                              : "bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-purple-500 focus:ring-purple-500/30"}`}
                  />
                </AnimatedField>

                <motion.button
                  variants={formField}
                  whileHover={{ scale: 1.02, boxShadow: isDark ? "0 0 24px rgba(156,163,175,0.25)" : "0 0 28px rgba(219,39,119,0.45)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-4 mt-2 rounded-xl text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-3 shadow-lg transition-all duration-500 bg-gradient-to-r
                    ${isDark ? "from-gray-700 to-gray-500" : "from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500"}`}
                >
                  <Send size={16} /> Initiate Project
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
