import React, { useState } from "react";
import img from "../assets/images/con-removebg-preview.png";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
console.log(import.meta.env.VITE_PUBLIC_KEY);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    idea: "",
  });
  const [err, setErr] = useState({});
  const [status, setStatus] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const text = form.textarea.value;
    console.log(text, name, email);

    if (!name || !email || !text) {
      alert("All fields are mandatory. Please fill all the fields.");
      return;
    }

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: name,
          email: email,
          idea: text,
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          alert(`Submit Succesfulyy....\n
          UserName:${name}\n
          Email:${email}\n
          Your Message:${text}\n
          
        `);
          form.reset();
        },
        (error) => {
          console.log(error);
          alert("Something went wrong! Unable to send your message.");
        }
      );
  };

  return (
    <div className="scroll-mt-20 py-20 px-2 md:px-28 pt-5 md:pt-5" id="contact">
      <div className="flex flex-col gap-23">
        <div className="flex flex-col gap-2">
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white text-center pt-16"
          >
            Get in <span className="text-pink-700">Touch</span>
          </motion.h1>
          <motion.h6
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-slate-200 text-center md:text-center px-2 md:text-lg md:px-36"
          >
            Thanks for stopping by! If you’d like to connect, ask something, or
            start a new project together, this is the perfect place. Just drop
            me a message anytime—I love hearing new ideas and helping people
            bring their vision to life. I’ll get back to you soon, and I’m
            excited to chat with you!
          </motion.h6>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* left side */}
          <div className="w-full flex flex-col justify-center gap-5 items-start">
            <motion.img
              initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
              whileInView={{ rotate: 360, scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
              src={img}
              className="object-cover h-full w-full"
            />
          </div>

          {/* rightside */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-700/70 backdrop-blur-xl p-10 shadow-2xl border border-white/10"
          >
            <motion.h2
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
              }}
              className="text-4xl font-extrabold text-white text-center tracking-wide mb-6"
            >
              Send a Message
            </motion.h2>

            <form className="flex flex-col gap-6" onSubmit={handleForm}>
              {/* Name */}
              <motion.input
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "linear",
                }}
                type="text"
                name="name"
                id="userName"
                viewport={{ once: true }}
                required
                placeholder="Your Name*"
                className="p-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 shadow-md"
              />

              {/* Email */}
              <motion.input
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "linear",
                }}
                type="email"
                name="email"
                id="userEmail"
                viewport={{ once: true }}
                required
                placeholder="Your Email*"
                className="p-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 
        focus:outline-none focus:ring-2  focus:ring-indigo-500 transition-all duration-300 shadow-md"
              />

              {/* Message */}
              <motion.textarea
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "linear",
                  repeat: "",
                }}
                viewport={{ once: true }}
                placeholder="Your Message*"
                name="textarea"
                id="textarea"
                required
                className="p-4 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 h-40
        focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-md resize-none"
              ></motion.textarea>

              {/* Button */}
              <motion.button
                viewport={{ once: true }}
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                }}
                type="submit"
                className="w-full py-3 mt-2 rounded-lg text-white font-semibold tracking-wide 
             bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 
            hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500
        shadow-lg shadow-pink-600/30 hover:shadow-pink-500/40
        transition-all duration-300 active:scale-95"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
