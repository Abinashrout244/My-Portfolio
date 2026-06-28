import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  GraduationCap,
  MapPin,
  CalendarDays,
  Award,
  Layers,
  ExternalLink,
  FileText,
  Download,
  CheckCircle2,
} from "lucide-react";

const getModalContent = (item) =>
  item?.details ?? {
    about: "",
    courses: [],
    skills: [],
    achievements: [],
  };

const InfoChip = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
    <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
      <Icon size={11} />
      {label}
    </span>
    <span className="text-sm font-semibold text-white/90">{value}</span>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center">
    <p className="text-lg font-bold text-white">{value}</p>
    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
      {label}
    </p>
  </div>
);

const Tag = ({ children, accent }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide border ${
      accent
        ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
        : "border-white/[0.07] bg-white/[0.03] text-white/70"
    }`}
  >
    {children}
  </span>
);

const DocButton = ({ href, label, icon: Icon, download: dl }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    download={dl ? "" : undefined}
    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[12px] font-semibold text-white/75 transition hover:bg-white/[0.08] hover:text-white"
  >
    <Icon size={14} />
    {label}
  </a>
);

const EducationModal = ({ isOpen, onClose, item, isDark }) => {
  const [renderItem, setRenderItem] = useState(item);

  useEffect(() => {
    if (item) setRenderItem(item);
  }, [item]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen || !renderItem) return undefined;
    const id = window.setTimeout(() => setRenderItem(null), 320);
    return () => window.clearTimeout(id);
  }, [isOpen, renderItem]);

  if (typeof document === "undefined" || !renderItem) return null;

  const content = getModalContent(renderItem);
  const gradientBar = isDark ? renderItem.color.dark : renderItem.color.light;
  const Icon = renderItem.icon;

  const stats = [
    { label: renderItem.gradeLabel, value: renderItem.grade },
    { label: "Projects", value: renderItem.stats?.projects ?? "-" },
    { label: "Status", value: renderItem.isCurrent ? "Active" : "Done" },
  ];

  return createPortal(
    <AnimatePresence mode="wait">
      {renderItem && (
        <motion.div
          key={renderItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[2000] flex items-end justify-center sm:items-center sm:p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-xl" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex h-[100svh] w-full max-w-2xl flex-col overflow-hidden rounded-none border border-white/[0.08] bg-[#0d0f16] shadow-2xl sm:h-auto sm:max-h-[calc(100svh-2rem)] sm:rounded-2xl"
            style={{
              boxShadow: `0 0 0 1px ${renderItem.glowLight ?? "rgba(99,102,241,0.15)"}`,
            }}
          >
            <div className={`h-[3px] w-full shrink-0 bg-gradient-to-r ${gradientBar}`} />

            <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white sm:h-14 sm:w-14 sm:rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${renderItem.glowLight ?? "rgba(99,102,241,0.15)"}, transparent)`,
                    boxShadow: `0 0 20px ${renderItem.glowLight ?? "rgba(99,102,241,0.12)"}`,
                  }}
                >
                  <Icon size={28} strokeWidth={2.2} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      {renderItem.degree}
                    </h2>
                    {renderItem.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Active
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-white/45">
                    {renderItem.field}
                  </p>
                  <p className="mt-1.5 text-sm text-white/65">
                    {renderItem.institution}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-y-contain p-5 sm:p-6"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <InfoChip icon={MapPin} label="Location" value={renderItem.location} />
                <InfoChip icon={CalendarDays} label="Duration" value={renderItem.duration} />
                <InfoChip icon={Award} label={renderItem.gradeLabel} value={renderItem.grade} />
                <InfoChip icon={GraduationCap} label="Type" value={renderItem.type} />
              </div>

              <div>
                <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  About
                </p>
                <p className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 text-sm leading-relaxed text-white/70">
                  {content.about}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    Coursework
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {content.courses.map((c) => (
                      <Tag key={c} accent>
                        {c}
                      </Tag>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {content.skills.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Highlights
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {stats.map((s) => (
                    <StatCard key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Achievements
                </p>
                <div className="flex flex-col gap-2">
                  {content.achievements.map((a) => (
                    <div key={a} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-4 sm:px-6">
              <div className="flex flex-wrap gap-2">
                <DocButton href={renderItem.certificate} label="Certificate" icon={ExternalLink} />
                {renderItem.marksheet && (
                  <DocButton href={renderItem.marksheet} label="Marksheet" icon={FileText} />
                )}
                {renderItem.resume && (
                  <DocButton href={renderItem.resume} label="Resume" icon={Download} dl />
                )}
              </div>

              <motion.a
                href={renderItem.certificate}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white ${gradientBar}`}
              >
                <Layers size={14} />
                View certificate
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default EducationModal;
