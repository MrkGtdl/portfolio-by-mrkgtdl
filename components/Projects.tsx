"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { projects } from "@/constants/projects";
import ProjectDrawer from "./ProjectDrawer";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";

const featuredProjects = projects.slice(0, 3);

export default function Projects({ trigger }: { trigger: string }) {
  const controls = useAnimation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (trigger !== "projects") return;

    controls.set({
      y: -50,
      opacity: 0,
    });

    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });
  }, [trigger, controls]);

  return (
    <>
      <motion.section id="projects" animate={controls} className="mt-4 md:mt-6">
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

            min-h-auto
            lg:min-h-[calc(100vh-5rem)]

            max-w-7xl
            mx-auto

            rounded-2xl
            border border-[color:var(--border)]

            bg-[color:var(--surface)]
            backdrop-blur-md
            shadow-2xl

            px-5
            sm:px-8
            md:px-12

            py-12
            sm:py-16
            md:py-20
          "
        >
          {/* TITLE */}
          <div>
            <h2
              className="
                font-black
                tracking-tight
                text-[color:var(--text)]

                text-4xl
                sm:text-5xl
                md:text-7xl
                lg:text-8xl
              "
            >
              THINGS
            </h2>

            <h2
              className="
                font-black
                tracking-tight
                text-[color:var(--accent)]

                text-4xl
                sm:text-5xl
                md:text-7xl
                lg:text-8xl

                -mt-1
                md:-mt-2
              "
            >
              I&apos;VE BUILT
            </h2>
          </div>

          {/* PROJECT GRID */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3

              gap-5
              md:gap-6

              mt-10
            "
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={(p) => {
                  setSelectedProject(p);
                  setDrawerOpen(true);
                }}
              />
            ))}
          </div>

          {/* BUTTON */}
          <div
            className="
              mt-8

              flex
              justify-stretch
              sm:justify-end
            "
          >
            <motion.button
              onClick={() => {
                setSelectedProject(null);
                setDrawerOpen(true);
              }}
              className="
                w-full
                sm:w-auto

                px-8
                py-3

                rounded-lg
                font-semibold

                bg-[color:var(--accent)]
                text-black

                transition-all
                duration-300
              "
              whileHover={{
                scale: 1.03,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
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
