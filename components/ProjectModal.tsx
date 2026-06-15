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
            className="fixed inset-0 z-[9998] backdrop-blur-md bg-black/40 dark:bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* STAGE */}
          <motion.div
            className="
              fixed inset-0 z-[9999]
              flex items-end sm:items-center justify-center
              p-0 sm:p-4
              translate-y-8 sm:translate-y-0
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MODAL */}
            <motion.div
              className="
                relative
                w-full sm:w-[95vw] sm:max-w-5xl
                h-[100dvh] sm:h-auto
                sm:min-h-[80vh] sm:max-h-[92vh]
                rounded-none sm:rounded-3xl
                overflow-hidden
                backdrop-blur-xl
                shadow-2xl
                flex flex-col
              "
              style={{
                background:
                  "color-mix(in srgb, var(--surface) 95%, transparent)",
                border: "1px solid var(--border)",
              }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
            >
              {/* CLOSE */}
              <button
                onClick={onClose}
                className="
                  absolute top-3 right-3 sm:top-4 sm:right-4
                  h-10 w-10 sm:h-11 sm:w-11
                  flex items-center justify-center
                  rounded-full
                  transition-all duration-200
                  z-[60]
                  hover:scale-105 active:scale-95
                  backdrop-blur-md
                    dark:bg-black/60
                dark:text-white
                dark:border-white/10
                "
                style={{
                  background: "rgba(255,255,255,0.85)",
                  color: "#111",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              >
                <X size={20} className="opacity-90" />
              </button>

              {/* IMAGE */}
              <div className="relative shrink-0 h-[40vh] sm:h-[55%] overflow-hidden">
                {project.image?.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={project.image[currentImage]}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
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
                      absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
                      h-8 w-8 sm:h-10 sm:w-10
                      rounded-full
                      flex items-center justify-center
                      text-white
                      backdrop-blur-md
                    "
                    style={{
                      background: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <ChevronLeft size={18} />
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
                      absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
                      h-8 w-8 sm:h-10 sm:w-10
                      rounded-full
                      flex items-center justify-center
                      text-white
                      backdrop-blur-md
                    "
                    style={{
                      background: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                )}

                {/* DOTS */}
                {project.image?.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
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
              <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                <h2
                  className="text-xl sm:text-3xl font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {project.title}
                </h2>

                <div
                  className="mt-2 text-xs sm:text-sm flex gap-2"
                  style={{ color: "var(--muted)" }}
                >
                  <span>{project.date}</span>
                  <span>•</span>
                  <span>{project.jobType}</span>
                </div>

                {/* STACK */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack?.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {stackIcons[tech]}
                      {tech}
                    </div>
                  ))}
                </div>

                <p
                  className="mt-6 text-sm sm:text-base leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {project.description}
                </p>

                {project.liveUrl && (
                  <div className="mt-6">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      <ExternalLink size={16} />
                      View Live
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
