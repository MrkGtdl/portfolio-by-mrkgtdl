"use client";

import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  date?: string;
  jobType?: string;
  image?: string;
};

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.div
      layoutId={`project-${project.title}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(project)}
      className="
        rounded-xl

        border border-[color:var(--border)]

        bg-[color:var(--surface)]
        backdrop-blur-md

        overflow-hidden
        cursor-pointer

        transition-transform

        active:scale-[0.98]
      "
    >
      {/* IMAGE / HEADER AREA */}
      <div
        className="
          h-28 sm:h-36 md:h-40

          flex items-center justify-center

          bg-[color:var(--bg)]/40

          overflow-hidden
        "
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="
              w-full h-full
              object-cover
              transition-transform duration-300
              hover:scale-105
            "
          />
        ) : (
          <p className="text-[color:var(--muted)] text-sm sm:text-base">
            {project.title}
          </p>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-5">
        <h3
          className="
            text-base sm:text-lg
            font-semibold
            text-[color:var(--text)]
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-1 sm:mt-2

            text-xs sm:text-sm

            text-[color:var(--muted)]

            line-clamp-3
          "
        >
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
