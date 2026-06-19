import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { answerAssistantQuestion } from "../utils/assistantProfile";

const starterQuestions = [
  "Who is Abhi?",
  "What technologies does Abhi work with?",
  "How can I contact Abhi?",
];

const PortfolioAssistant = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hasAskedQuestion, setHasAskedQuestion] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `✦ I'm Aster, your gateway to Abhi's portfolio.
Explore his projects, skills, education, experience, and aspirations through a simple conversation. What would you like to discover?`,
    },
  ]);

  const panelTheme = useMemo(
    () =>
      isDark
        ? "bg-[#121212]/95 border-white/10 text-white"
        : "bg-[#0d1224]/95 border-white/15 text-white",
    [isDark],
  );

  const sendMessage = (messageText = input) => {
    const trimmed = messageText.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerAssistantQuestion(trimmed) },
    ]);
    setHasAskedQuestion(true);
    setInput("");
  };

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isOpen]);

  const openAssistant = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 120);
  };
  const handleNavigation = (target) => {
    const section = document.querySelector(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-4 flex max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl ${panelTheme}`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15 text-red-300">
                  <Sparkles size={20} />
                </span>
                <div>
                  <h2 className="text-sm font-bold">Aster</h2>
                  <p className="text-xs text-white/45">Portfolio guide</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div
              data-lenis-prevent
              onWheel={(event) => event.stopPropagation()}
              onTouchMove={(event) => event.stopPropagation()}
              className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[84%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-red-600 text-white"
                        : "bg-white/10 text-white/82"
                    }`}
                  >
                    {message.text.startsWith("#") ? (
                      <button
                        onClick={() => handleNavigation(message.text)}
                        className="font-medium text-red-300 underline"
                      >
                        Open {message.text.replace("#", "")} section
                      </button>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} aria-hidden="true" />
            </div>

            {/* The starter question before user asked anything to the chatbot */}

            {!hasAskedQuestion && (
              <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Abhi..."
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-red-400/60"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-500 active:scale-95"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={isOpen ? () => setIsOpen(false) : openAssistant}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close Abhi's assistant" : "Open Abhi's assistant"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-300/30 bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.35)]"
      >
        {isOpen ? <X size={22} /> : <Bot size={24} />}
      </motion.button>
    </div>
  );
};

export default PortfolioAssistant;
