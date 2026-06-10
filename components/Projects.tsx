"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { projects } from "@/constants/projects";
import ProjectDrawer from "./ProjectDrawer";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";

const featuredProjects = projects.slice(0, 3);

type Project = (typeof projects)[number];

export default function Projects({ trigger }: { trigger: string }) {
  const controls = useAnimation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (trigger !== "projects") return;

    controls.set({ y: -50, opacity: 0 });

    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [trigger, controls]);

  return (
    <>
      <motion.section id="projects" animate={controls}>
        <motion.div
          animate={{
            scale: drawerOpen ? 0.97 : 1,
            opacity: drawerOpen ? 0.85 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 25,
          }}
          className="
    relative z-10
    min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-5rem)]
    max-w-7xl mx-auto
    backdrop-blur-md
    border border-[color:var(--border)]
    bg-[color:var(--surface)]
    rounded-2xl
    shadow-2xl
    px-6 md:px-12 py-8
    flex flex-col justify-start
  "
        >
          {/* TITLE */}
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[color:var(--text)]">
              THINGS
            </h2>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[color:var(--accent)] -mt-2">
              I&apos;VE BUILT
            </h2>
          </div>

          {/* PROJECT GRID */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={(p) => {
                  console.log("clicked project:", p);
                  setSelectedProject(p);
                  setDrawerOpen(true);
                }}
                onClick={() => {
                  console.log("card clicked", project);
                  onOpen(project);
                }}
              />
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-end">
            <motion.button
              onClick={() => {
                setDrawerOpen(true);
              }}
              className="
                px-8 py-3 rounded-lg font-semibold
                bg-[color:var(--accent)]
                text-black
                transition-all duration-300
              "
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              See More
            </motion.button>
          </div>
        </motion.div>
      </motion.section>

      {/* DRAWER */}
      <ProjectDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        projects={projects}
      />
    </>
  );
}
