"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout, Server, Wrench, Database } from "lucide-react";
import {
  _React,
  NodejsIcon,
  _Vue,
  Javascript,
  Laravel,
  Php,
  Payload,
  NextjsIcon,
  TypescriptIcon,
  Postgresql,
  Mysql,
  Microsoft,
  SupabaseIcon,
  GitIcon,
  DockerIcon,
  OpenaiIcon,
  GoogleGemini,
  Graphql,
} from "@dev.icons/react";

const tabs = [
  { key: "frontend", label: "Front End", icon: Layout },
  { key: "backend", label: "Back End", icon: Server },
  { key: "database", label: "Database", icon: Database },
  { key: "others", label: "Tools", icon: Wrench },
] as const;

const skills = {
  frontend: [
    {
      name: "Vue.js",
      description: "Progressive JavaScript Framework",
      icon: _Vue,
    },
    { name: "Next.js", description: "React Framework", icon: NextjsIcon },
    { name: "React", description: "UI Library", icon: _React },
    {
      name: "TypeScript",
      description: "Typed JavaScript",
      icon: TypescriptIcon,
    },
    {
      name: "JavaScript",
      description: "Programming Language",
      icon: Javascript,
    },
  ],
  backend: [
    { name: "Node.js", description: "JavaScript Runtime", icon: NodejsIcon },
    { name: "Laravel", description: "PHP Framework", icon: Laravel },
    { name: "PHP", description: "Server-side Language", icon: Php },
    { name: "Payload CMS", description: "Headless CMS", icon: Payload },
    { name: "GraphQL", description: "API Query Language", icon: Graphql },
  ],
  database: [
    {
      name: "PostgreSQL",
      description: "Relational Database",
      icon: Postgresql,
    },
    { name: "MySQL", description: "Relational Database", icon: Mysql },
    { name: "SQL Server", description: "Relational Database", icon: Microsoft },
    {
      name: "Supabase",
      description: "Backend-as-a-Service",
      icon: SupabaseIcon,
    },
  ],
  others: [
    { name: "Git", description: "Version Control System", icon: GitIcon },
    { name: "Docker", description: "Containerization", icon: DockerIcon },
    { name: "ChatGPT", description: "AI Assistant", icon: OpenaiIcon },
    { name: "Gemini", description: "AI Assistant", icon: GoogleGemini },
  ],
};

export default function Skills({ trigger }: { trigger: string }) {
  const [activeTab, setActiveTab] = useState<
    "frontend" | "backend" | "database" | "others"
  >("frontend");

  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const controls = useAnimation();

  useEffect(() => {
    if (trigger !== "skills") return;

    controls.set({ y: -50, opacity: 0 });

    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [trigger, controls]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section id="skills" animate={controls}>
      <motion.div
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
        {/* HEADING */}
        <div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-[color:var(--text)]">
            MY
          </h2>

          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-[color:var(--accent)] -mt-2">
            TOOLKIT
          </h2>
        </div>

        {/* TABS */}
        {/* TABS */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            const isHovered = hoveredTab === tab.key;
            const hasHoveredNeighbor = hoveredTab !== null;

            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                onHoverStart={() => setHoveredTab(tab.key)}
                onHoverEnd={() => setHoveredTab(null)}
                animate={{
                  scale: isHovered ? 1.45 : hasHoveredNeighbor ? 1.1 : 1,
                  x: isHovered ? -6 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 18,
                }}
                whileTap={{ scale: 0.9 }}
                className="relative group p-2"
              >
                <motion.div
                  animate={{
                    filter:
                      activeTab === tab.key
                        ? "drop-shadow(0 0 12px var(--accent))"
                        : "drop-shadow(0 0 0px transparent)",
                  }}
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-300 ${
                      activeTab === tab.key
                        ? "text-[color:var(--accent)]"
                        : "text-[color:var(--muted)] group-hover:text-[color:var(--text)]"
                    }`}
                  />
                </motion.div>

                {/* Tooltip */}
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.9,
                    x: isHovered ? 0 : 10,
                  }}
                  transition={{ duration: 0.15 }}
                  className="
            pointer-events-none
            absolute right-full mr-4 top-1/2 -translate-y-1/2
            whitespace-nowrap rounded-md
            bg-[color:var(--surface)]
            border border-[color:var(--border)]
            px-2 py-1 text-xs
            text-[color:var(--text)]
          "
                >
                  {tab.label}
                </motion.span>

                {/* Active Indicator */}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="
              absolute -left-4 top-1/2 -translate-y-1/2
              w-1 h-8 rounded-full
              bg-[color:var(--accent)]
            "
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* SKILLS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-8"
          >
            <section className="w-full flex justify-center pr-20">
              <div className="w-full max-w-4xl px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {skills[activeTab].map((skill) => {
                    const Icon = skill.icon;

                    return (
                      <motion.div
                        key={skill.name}
                        variants={item}
                        whileHover={{ scale: 1.03 }}
                        className="
                          flex items-center gap-4 w-full
                          p-3 rounded-xl
                          border border-[color:var(--border)]
                          bg-[color:var(--surface)]
                        "
                      >
                        <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0">
                          <Icon className="w-8 h-8 text-black" />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-[color:var(--text)]">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-[color:var(--muted)]">
                            {skill.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
