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
      onClick={() => onOpen(project)}
      className="
        rounded-xl border border-[color:var(--border)]
        bg-[color:var(--surface)]
        backdrop-blur-md overflow-hidden cursor-pointer
      "
    >
      <div className="h-40 flex items-center justify-center bg-[color:var(--bg)]/40">
        <p className="text-[color:var(--muted)]">{project.title}</p>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>

        <p className="text-sm text-[color:var(--muted)]">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
