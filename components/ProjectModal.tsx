"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/constants/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* BACKDROP (must be highest) */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            layoutId={`project-${project.title}`}
            className="
              fixed left-1/2 top-1/2 z-[9999]
              w-[95vw] max-w-4xl
              max-h-[90vh] overflow-y-auto
              rounded-2xl
              border border-[color:var(--border)]
              bg-[color:var(--surface)]
              -translate-x-1/2 -translate-y-1/2
            "
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {/* CLOSE */}
            <button onClick={onClose} className="absolute right-4 top-4 z-10">
              <X size={20} />
            </button>

            {/* IMAGE */}
            {project.image?.length > 0 && (
              <img
                src={project.image[0]}
                alt={project.title}
                className="h-64 w-full object-cover"
              />
            )}

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-2xl font-bold">{project.title}</h2>

              <p className="mt-4 text-[color:var(--muted)]">
                {project.description}
              </p>

              {/* LINKS */}
              <div className="mt-6 flex gap-4">
                {project.liveUrl && (
                  <a className="flex items-center gap-2" href={project.liveUrl}>
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
