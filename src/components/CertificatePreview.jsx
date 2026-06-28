import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Download, CheckCircle2 } from "lucide-react";

const CertificatePreview = ({ item, document, isDark, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!item) return null;

  const previewSource = document?.image ?? item.certificateImage ?? item.certificate;
  const previewTitle = document?.label ?? "Certificate Preview";
  const previewSubtitle = document?.kind ?? item.degree;

  /* Derive a clean filename from the label / degree */
  const filename =
    (document?.label ?? item.degree ?? "certificate")
      .toLowerCase()
      .replace(/\s+/g, "-") + ".jpg";

  const handleDownload = async () => {
    if (downloading) return;
    try {
      setDownloading(true);
      const response = await fetch(previewSource);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = filename;
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

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
          {/* Gradient top bar */}
          <div
            className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${
              isDark ? item.color.dark : item.color.light
            }`}
          />

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                {previewTitle}
              </p>
              <p className="text-sm text-white/70">{previewSubtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Download button */}
              <motion.button
                type="button"
                onClick={handleDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={downloading}
                aria-label="Download certificate"
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  downloaded
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-300"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <motion.span
                  animate={downloading ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    downloading
                      ? { duration: 1, repeat: Infinity, ease: "linear" }
                      : {}
                  }
                >
                  {downloaded ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <Download size={14} />
                  )}
                </motion.span>
                <span>
                  {downloading
                    ? "Downloading…"
                    : downloaded
                      ? "Downloaded!"
                      : "Download"}
                </span>
              </motion.button>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close certificate preview"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Image */}
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
