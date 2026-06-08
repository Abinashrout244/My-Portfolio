import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { useTheme } from "../context/ThemeContext";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID_1;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const getSocials = (isDark) => {
  const c = isDark ? "ffffff" : "000000";
  return [
    {
      id: 1,
      label: "Instagram",
      icon: `https://img.icons8.com/?size=100&id=BrU2BBoRXiWq&format=png&color=${c}`,
      link: "https://www.instagram.com/frequency._0.001",
    },
    {
      id: 2,
      label: "GitHub",
      icon: `https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=${c}`,
      link: "https://github.com/Abinashrout244",
    },
    {
      id: 3,
      label: "Twitter",
      icon: `https://img.icons8.com/?size=100&id=13963&format=png&color=${c}`,
      link: "https://x.com/AbinashRout2251",
    },
    {
      id: 4,
      label: "LinkedIn",
      icon: `https://img.icons8.com/?size=100&id=108786&format=png&color=${c}`,
      link: "https://www.linkedin.com/in/abinash-rout-274285322",
    },
    {
      id: 5,
      label: "LeetCode",
      icon: `https://img.icons8.com/?size=100&id=9L16NypUzu38&format=png&color=${c}`,
      link: "https://leetcode.com/u/Abinash_90/",
    },
  ];
};

const stackPills = [
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
  "JavaScript",
];

const footerLinks = [
  { name: "Work", link: "#project", blank: false },
  {
    name: "Resume",
    link: "https://drive.google.com/file/d/1MXVXgnLh9UW3OEVKifR_x-3C0VHb92rD/view?usp=drivesdk",
    blank: true,
  },
  { name: "Contact", link: "#contact", blank: false },
];

const contactItems = [
  { icon: faEnvelope, text: "routabinash3775@gmail.com" },
  { icon: faPhone, text: "+91 82492 81685" },
  { icon: faLocationDot, text: "Jajpur, Odisha, India" },
];

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const socials = getSocials(isDark);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { subscriber_email: email },
        PUBLIC_KEY,
      );
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const btnLabel =
    status === "loading"
      ? "Sending..."
      : status === "success"
        ? "Subscribed ✓"
        : status === "error"
          ? "Failed, retry"
          : "Subscribe";

  const btnClass =
    status === "success"
      ? "bg-green-600 cursor-default"
      : status === "error"
        ? "bg-red-500 hover:opacity-85 active:scale-95"
        : status === "loading"
          ? "bg-[#7F77DD] opacity-60 cursor-not-allowed"
          : "bg-[#7F77DD] hover:opacity-85 active:scale-95";

  return (
    <footer
      className={`w-full transition-colors duration-500 ${
        isDark ? "bg-[#0e0e0e] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Accent Strip */}
      <div
        className="w-full h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, #7F77DD 0%, #D4537E 40%, #EF9F27 100%)",
        }}
      />

      {/* Newsletter Band */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-5 px-6 md:px-14 py-8 border-b transition-colors ${
          isDark ? "bg-[#161616] border-white/5" : "bg-gray-50 border-gray-100"
        }`}
      >
        <div>
          <p
            className={`text-[11px] font-medium tracking-[0.18em] uppercase mb-1 transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            Stay in the loop
          </p>
          <h3
            className={`text-lg md:text-xl font-medium leading-snug transition-colors ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Get the latest updates{" "}
            <span className="text-[#7F77DD]">delivered to you.</span>
          </h3>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="flex gap-2 w-full md:w-auto md:max-w-md"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === "loading" || status === "success"}
            className={`flex-1 h-10 px-4 text-sm rounded-lg border outline-none transition-all focus:border-[#7F77DD] ${
              isDark
                ? "bg-[#1e1e1e] border-white/10 text-white placeholder:text-gray-600"
                : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            }`}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className={`h-10 px-5 rounded-lg text-sm font-medium text-white transition-all whitespace-nowrap ${btnClass}`}
          >
            {btnLabel}
          </button>
        </form>

        {/* Status message below form */}
        {status === "success" && (
          <p className="text-xs text-green-500 mt-1 md:hidden">
            You're subscribed! Thanks.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400 mt-1 md:hidden">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 md:px-14 py-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${isDark ? "bg-[#1e1b3a]" : "bg-[#EEEDFE]"}`}
            >
              <FontAwesomeIcon
                icon={faCode}
                className="text-[#534AB7] text-base"
              />
            </div>
            <span
              className={`text-[22px] font-medium tracking-tight italic transition-colors ${isDark ? "text-white" : "text-gray-900"}`}
            >
              AviDev
            </span>
          </div>
          <p
            className={`text-sm leading-relaxed transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            Building polished digital experiences with clean code and sharp
            design.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-[7px] h-[7px] rounded-full bg-green-500 flex-shrink-0" />
            <span
              className={`text-xs transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Available for freelance work
            </span>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <ColumnTitle isDark={isDark}>Contact</ColumnTitle>
          <ul className="flex flex-col gap-3">
            {contactItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div
                  className={`w-[34px] h-[34px] rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                    isDark
                      ? "bg-[#1a1a1a] border-white/5 group-hover:border-[#7F77DD]/50 group-hover:bg-[#1e1b3a]"
                      : "bg-gray-50 border-gray-100 group-hover:border-[#7F77DD]/50 group-hover:bg-[#EEEDFE]"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-sm transition-colors ${
                      isDark
                        ? "text-gray-500 group-hover:text-[#7F77DD]"
                        : "text-gray-400 group-hover:text-[#534AB7]"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-500 group-hover:text-gray-200"
                      : "text-gray-400 group-hover:text-gray-700"
                  }`}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials Column */}
        <div>
          <ColumnTitle isDark={isDark}>Connect</ColumnTitle>
          <div className="grid grid-cols-3 gap-2">
            {socials.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg border transition-all ${
                  isDark
                    ? "border-white/5 hover:border-white/10 hover:bg-[#1a1a1a]"
                    : "border-slate-200 hover:border-slate-300 hover:bg-gray-100"
                }`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5 object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
                <span
                  className={`text-[10px] font-medium tracking-wide transition-colors ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Stack Column */}
        <div>
          <ColumnTitle isDark={isDark}>Built with</ColumnTitle>
          <div className="flex flex-wrap gap-2">
            {stackPills.map((tech) => (
              <span
                key={tech}
                className={`text-[11px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  isDark
                    ? "border-white/5 text-gray-500 bg-[#1a1a1a]"
                    : "border-gray-100 text-gray-400 bg-gray-50"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mx-6 md:mx-14 pt-5 border-t transition-colors ${
          isDark ? "border-white/5" : "border-gray-100"
        }`}
      >
        <p
          className={`text-xs tracking-wide transition-colors ${isDark ? "text-gray-600" : "text-gray-400"}`}
        >
          © 2026 Abinash Rout — Handcrafted with passion.
        </p>
        <div className="flex gap-5">
          {footerLinks.map((footLinks) => (
            <a
              key={footLinks.name}
              href={footLinks.link}
              target={footLinks.blank ? "_blank" : "_self"}
              rel={footLinks.blank ? "noreferrer" : ""}
              className={`text-xs transition-colors ${
                isDark
                  ? "text-gray-600 hover:text-gray-200"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {footLinks.name}
            </a>
          ))}
        </div>
      </div>

      <div className="h-8" />
    </footer>
  );
};

const ColumnTitle = ({ isDark, children }) => (
  <div className="flex items-center gap-3 mb-4">
    <p
      className={`text-[11px] font-medium tracking-[0.18em] uppercase whitespace-nowrap transition-colors ${isDark ? "text-gray-600" : "text-gray-400"}`}
    >
      {children}
    </p>
    <div
      className={`flex-1 h-px transition-colors ${isDark ? "bg-white/5" : "bg-gray-100"}`}
    />
  </div>
);

export default Footer;
