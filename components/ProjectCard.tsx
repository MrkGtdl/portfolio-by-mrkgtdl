"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export type Project = {
  title: string;
  description: string;
  date?: string;
  jobType?: string;
  image: string[];
};

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || project.image.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % project.image.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, project.image]);

  return (
    <motion.div
      layoutId={`project-${project.title}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(project)}
      className="
        group
        rounded-xl
        overflow-hidden
        cursor-pointer

        border border-[color:var(--border)]
        bg-[color:var(--surface)]
        backdrop-blur-md

        transition-all duration-300
      "
    >
      {/* IMAGE CAROUSEL */}
      <div
        className="
          relative
          h-40 sm:h-48 md:h-52
          overflow-hidden
          bg-[color:var(--bg)]/40
        "
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {project.image.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.img
                key={project.image[current]}
                src={project.image[current]}
                alt={project.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  group-hover:scale-105
                  transition-transform duration-500
                "
              />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Dots */}
            {project.image.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {project.image.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(index);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-5 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[color:var(--muted)]">{project.title}</p>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">
        <h3
          className="
            text-base sm:text-lg
            font-semibold
            text-[color:var(--text)]
            line-clamp-1
          "
        >
          {project.title}
        </h3>

        <p
          className="
            mt-2
            text-xs sm:text-sm
            text-[color:var(--muted)]
            line-clamp-3
          "
        >
          {project.description}
        </p>

        {(project.date || project.jobType) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.date && (
              <span
                className="
                  rounded-full
                  px-2.5 py-1
                  text-[10px] sm:text-xs
                  bg-[color:var(--bg)]
                  text-[color:var(--muted)]
                "
              >
                {project.date}
              </span>
            )}

            {project.jobType && (
              <span
                className="
                  rounded-full
                  px-2.5 py-1
                  text-[10px] sm:text-xs
                  bg-[color:var(--bg)]
                  text-[color:var(--muted)]
                "
              >
                {project.jobType}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
