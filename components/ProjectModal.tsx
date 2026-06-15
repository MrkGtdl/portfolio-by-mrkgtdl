"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/constants/projects";
import { useEffect, useState } from "react";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!project) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setCurrentImage(0);

    return () => {
      document.body.style.overflow = original;
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-[9998] backdrop-blur-sm bg-black/40 dark:bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* OUTER STAGE */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* OUTER CONTAINER */}
            <motion.div
              className="
                relative
                w-[95vw]
                max-w-5xl
                min-h-[80vh]
                max-h-[92vh]
                p-4 pt-14
                sm:p-6 sm:pt-16
                rounded-3xl
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                shadow-2xl
              "
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="
                  absolute top-4 right-4 z-50
                  h-11 w-11
                  flex items-center justify-center
                  rounded-full
                  bg-white dark:bg-zinc-800
                  text-zinc-700 dark:text-zinc-200
                  border border-zinc-200 dark:border-zinc-700
                  shadow-lg
                  hover:scale-105
                  transition
                "
              >
                <X size={18} />
              </button>

              {/* INNER MODAL CARD */}
              <motion.div
                className="
                  relative
                  w-full
                  h-[85vh]
                  overflow-hidden
                  rounded-2xl
                  bg-zinc-50 dark:bg-zinc-950
                  border border-zinc-200 dark:border-zinc-800
                  shadow-xl
                  flex
                  flex-col
                "
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
              >
                {/* IMAGE CAROUSEL */}
                <div className="relative h-[55%] shrink-0 overflow-hidden">
                  {project.image?.length > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={project.image[currentImage]}
                        alt={`${project.title}-${currentImage}`}
                        className="h-full w-full object-cover"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      />
                    </AnimatePresence>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Prev */}
                  {project.image?.length > 1 && (
                    <button
                      onClick={() =>
                        setCurrentImage(
                          currentImage === 0
                            ? project.image.length - 1
                            : currentImage - 1,
                        )
                      }
                      className="
                        absolute left-4 top-1/2 -translate-y-1/2
                        h-10 w-10
                        rounded-full
                        bg-black/40 text-white
                        backdrop-blur
                        flex items-center justify-center
                        hover:bg-black/60
                        transition
                      "
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {/* Next */}
                  {project.image?.length > 1 && (
                    <button
                      onClick={() =>
                        setCurrentImage(
                          currentImage === project.image.length - 1
                            ? 0
                            : currentImage + 1,
                        )
                      }
                      className="
                        absolute right-4 top-1/2 -translate-y-1/2
                        h-10 w-10
                        rounded-full
                        bg-black/40 text-white
                        backdrop-blur
                        flex items-center justify-center
                        hover:bg-black/60
                        transition
                      "
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {/* Dots */}
                  {project.image?.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.image.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`h-2 rounded-full transition-all ${
                            currentImage === index
                              ? "w-6 bg-white"
                              : "w-2 bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  {/* HEADER */}
                  <div className="border-b border-zinc-200 dark:border-zinc-800 p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h2>

                    <div className="mt-2 flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span>{project.date}</span>
                      <span>•</span>
                      <span>{project.jobType}</span>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>

                    {project.features?.length ? (
                      <div className="mt-8">
                        <h3 className="mb-3 font-semibold text-zinc-900 dark:text-zinc-100">
                          Features
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                          {project.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {project.liveUrl && (
                      <div className="mt-8">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            inline-flex items-center gap-2
                            px-4 py-2 rounded-lg
                            bg-zinc-900 dark:bg-white
                            text-white dark:text-black
                            font-medium
                            hover:opacity-90
                            transition
                          "
                        >
                          <ExternalLink size={16} />
                          View Live Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
