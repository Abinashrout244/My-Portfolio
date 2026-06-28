import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const CertificatePreview = ({ item, document, isDark, onClose }) => {
  if (!item) return null;

  const previewSource = document?.image ?? item.certificateImage ?? item.certificate;
  const previewTitle = document?.label ?? "Certificate Preview";
  const previewSubtitle = document?.kind ?? item.degree;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[2100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 16 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d14] shadow-2xl"
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          <div
            className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${
              isDark ? item.color.dark : item.color.light
            }`}
          />

          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                {previewTitle}
              </p>
              <p className="text-sm text-white/70">{previewSubtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close certificate preview"
            >
              <X size={16} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-[#090b10] p-3 sm:p-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-2 shadow-inner">
              <img
                src={previewSource}
                alt={previewSubtitle}
                className="h-auto w-full rounded-xl object-contain"
                style={{ maxHeight: "calc(100vh - 12rem)" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificatePreview;
