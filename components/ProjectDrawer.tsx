"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/constants/projects";

type Props = {
  open: boolean;
  onClose: () => void;
  projects: Project[];
};

const ITEMS_PER_PAGE = 6;

export default function ProjectDrawer({ open, onClose, projects }: Props) {
  const [page, setPage] = useState(1);

  // reset page on open
  useEffect(() => {
    if (open) setPage(1);
  }, [open]);

  // lock scroll
  useEffect(() => {
    if (!open) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // pagination
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[999]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* DRAWER */}
          <motion.div
            className="
                fixed top-0 left-1/2 -translate-x-1/2
                w-[92%] h-[95vh]
                z-[1000]
                flex flex-col
                rounded-2xl
                border border-black/5 dark:border-white/10
                bg-white/12 dark:bg-white/5
                backdrop-blur-xl
                shadow-lg shadow-black/5
                overflow-hidden
            "
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 20,
              mass: 1.1,
            }}
          >
            {/* HEADER */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
              <div className="leading-tight">
                <h4 className="text-2xl font-black text-[color:var(--text)]">
                  PROJECT
                </h4>
                <h4 className="text-2xl font-black text-[color:var(--accent)]">
                  DETAILS
                </h4>
              </div>

              <button
                onClick={onClose}
                className="text-[color:var(--text)]/70 hover:text-[color:var(--text)] hover:scale-110 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 flex flex-col p-6">
              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProjects.map((project) => (
                  <div
                    key={project.title}
                    className="
                        h-[280px]
                        rounded-xl
                        border border-[color:var(--border)]
                        bg-[color:var(--surface)]
                        shadow-md
                        p-4
                        flex flex-col justify-between
                        transition
                        hover:scale-[1.02]
                        hover:shadow-lg
                        "
                  >
                    {/* IMAGE (optional) */}
                    {project.image && (
                      <div className="w-full h-[110px] rounded-lg overflow-hidden mb-3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    )}

                    {/* TITLE + DESC */}
                    <div>
                      <h2 className="text-lg font-semibold text-[color:var(--text)]">
                        {project.title}
                      </h2>

                      <p className="text-sm text-[color:var(--text)]/70 mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* TAGS */}
                    <div className="flex gap-2 mt-3 text-xs flex-wrap">
                      {project.date && (
                        <span className="px-2 py-1 rounded bg-white/10 text-[color:var(--text)]/70">
                          📅 {project.date}
                        </span>
                      )}

                      {project.jobType && (
                        <span className="px-2 py-1 rounded bg-white/10 text-white/70">
                          💼 {project.jobType}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-[color:var(--surface)] text-[color:var(--text)]/70 disabled:opacity-30"
                >
                  Prev
                </button>

                <span className="text-sm text-[color:var(--text)]/70">
                  {page} / {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-[color:var(--surface)] text-[color:var(--text)]/70 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
