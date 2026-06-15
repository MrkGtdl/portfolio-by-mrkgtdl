"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiMongodb,
  SiPayloadcms,
  SiPostgresql,
  SiGraphql,
  SiRedwoodjs,
  SiPhp,
  SiMysql,
  SiLaravel,
  SiJquery,
  SiJavascript,
  SiDocker,
  SiSupabase,
} from "react-icons/si";
import type { Project } from "@/constants/projects";
import { useEffect, useState } from "react";

type Props = {
  project: Project | null;
  onClose: () => void;
};

const stackIcons: Record<string, JSX.Element> = {
  "Next.js": <SiNextdotjs size={14} />,
  React: <SiReact size={14} />,
  TypeScript: <SiTypescript size={14} />,
  TailwindCSS: <SiTailwindcss size={14} />,
  "Framer Motion": <SiFramer size={14} />,
  "Node.js": <SiNodedotjs size={14} />,
  MongoDB: <SiMongodb size={14} />,
  PayloadCMS: <SiPayloadcms size={14} />,
  PostgreSQL: <SiPostgresql size={14} />,
  GraphQL: <SiGraphql size={14} />,
  RedwoodJS: <SiRedwoodjs size={14} />,
  Php: <SiPhp size={14} />,
  Laravel: <SiLaravel size={14} />,
  MySQL: <SiMysql size={14} />,
  Jquery: <SiJquery size={14} />,
  Javascript: <SiJavascript size={14} />,
  Docker: <SiDocker size={14} />,
  Supabase: <SiSupabase size={14} />,
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
            className="fixed inset-0 z-[9998] h-full backdrop-blur-md bg-black/40 dark:bg-black/75"
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
                backdrop-blur-xl
                shadow-2xl
              "
              style={{
                background:
                  "color-mix(in srgb, var(--surface) 95%, transparent)",
                border: "1px solid var(--border)",
              }}
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
                  shadow-lg
                  hover:scale-105
                  transition-all duration-200
                "
                style={{
                  background: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <X size={18} />
              </button>

              {/* INNER MODAL CARD */}
              <motion.div
                className="
                  relative
                  w-full
                  h-[70vh]
                  overflow-hidden
                  rounded-2xl
                  shadow-xl
                  flex
                  flex-col
                "
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* PREV */}
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
                        h-10 w-10 rounded-full
                        text-white
                        backdrop-blur-md
                        flex items-center justify-center
                        hover:scale-105
                        transition-all
                      "
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {/* NEXT */}
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
                        h-10 w-10 rounded-full
                        text-white
                        backdrop-blur-md
                        flex items-center justify-center
                        hover:scale-105
                        transition-all
                      "
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {/* DOTS */}
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
                  <div
                    className="p-6 sm:p-8"
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <h2
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: "var(--text)" }}
                    >
                      {project.title}
                    </h2>

                    <div
                      className="mt-2 flex gap-2 text-sm"
                      style={{ color: "var(--muted)" }}
                    >
                      <span>{project.date}</span>
                      <span>•</span>
                      <span>{project.jobType}</span>
                    </div>

                    {/* TECH STACK */}
                    {project.stack?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <div
                            key={tech}
                            className="
                              inline-flex items-center gap-2
                              rounded-full
                              px-3 py-1.5
                              text-xs font-medium
                            "
                            style={{
                              background: "var(--bg)",
                              color: "var(--text)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {stackIcons[tech] ?? null}
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* BODY */}
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                    <p
                      className="leading-relaxed text-sm sm:text-base"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.description}
                    </p>

                    {project.features?.length ? (
                      <div className="mt-8">
                        <h3
                          className="mb-3 font-semibold"
                          style={{ color: "var(--text)" }}
                        >
                          Features
                        </h3>

                        <ul
                          className="list-disc pl-5 space-y-2 text-sm"
                          style={{ color: "var(--muted)" }}
                        >
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
                            px-4 py-2
                            rounded-xl
                            text-white
                            font-medium
                            hover:opacity-90
                            transition-all
                          "
                          style={{
                            background: "var(--accent)",
                          }}
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
