"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { Project } from "@/constants/projects";
import ProjectCard from "@/components/ProjectCard";

type Props = {
  open: boolean;
  onClose: () => void;
  projects: Project[];
};

const ITEMS_PER_PAGE = 5;

export default function ProjectDrawer({ open, onClose, projects }: Props) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (open) setPage(1);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const handleProjectOpen = (project: Project) => {
    console.log(project);

    // future:
    // setSelectedProject(project)
    // open modal
    // route to details page
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* DRAWER */}
          <motion.div
            className="
              fixed
              top-2 sm:top-4
              left-1/2 -translate-x-1/2

              w-[95%] sm:w-[92%]
              h-[92vh] sm:h-[95vh]

              z-[1000]

              flex flex-col

              rounded-2xl

              border border-[color:var(--border)]

              bg-[color:var(--surface)]
              backdrop-blur-xl

              shadow-xl

              overflow-hidden
            "
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 20,
            }}
          >
            {/* HEADER */}
            <div
              className="
                h-16

                flex items-center justify-between

                px-4 sm:px-6

                border-b border-[color:var(--border)]

                shrink-0
              "
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[color:var(--text)]">
                  PROJECTS
                </h2>

                <p className="text-xs sm:text-sm text-[color:var(--muted)]">
                  Portfolio Showcase
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  p-2

                  rounded-lg

                  text-[color:var(--muted)]

                  hover:text-[color:var(--text)]
                  hover:bg-[color:var(--bg)]

                  transition
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3

                  gap-4 sm:gap-6
                "
              >
                {paginatedProjects.map((project) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    onOpen={handleProjectOpen}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div
                  className="
                    flex items-center justify-center
                    gap-4
                    mt-8
                  "
                >
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="
                      px-4 py-2

                      rounded-lg

                      border border-[color:var(--border)]

                      bg-[color:var(--surface)]

                      text-[color:var(--text)]

                      disabled:opacity-40
                      disabled:cursor-not-allowed

                      transition
                    "
                  >
                    Previous
                  </button>

                  <span className="text-sm text-[color:var(--muted)]">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="
                      px-4 py-2

                      rounded-lg

                      border border-[color:var(--border)]

                      bg-[color:var(--surface)]

                      text-[color:var(--text)]

                      disabled:opacity-40
                      disabled:cursor-not-allowed

                      transition
                    "
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
