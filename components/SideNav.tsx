"use client";

import { Home, User, Folder, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function SideNav() {
  const [active, setActive] = useState("about");
  const [hovered, setHovered] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);

  // ----------------------------
  // Smooth scroll (Lenis safe)
  // ----------------------------
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const lenis = (window as unknown as { lenis?: any }).lenis;

    if (!lenis) {
      window.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
      return;
    }

    lenis.scrollTo(el, {
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      offset: -10,
    });
  };

  // ----------------------------
  // Active section tracking
  // ----------------------------
  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        let bestMatch: { id: string; ratio: number } | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;

            if (!bestMatch || ratio > bestMatch.ratio) {
              bestMatch = {
                id: entry.target.id,
                ratio,
              };
            }
          }
        });

        if (bestMatch) {
          setActive(bestMatch.id);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const items = [
    { icon: Home, id: "about", label: "About" },
    { icon: User, id: "skills", label: "Skills" },
    { icon: Folder, id: "projects", label: "Projects" },
    { icon: Mail, id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className="
        flex items-center justify-center

        gap-3
        sm:gap-5
        md:gap-8
        lg:gap-10

        px-2
        sm:px-3
        md:px-4

        py-2

        rounded-2xl
        bg-white/5
        backdrop-blur-xl
        shadow-lg

        w-full
        max-w-fit
      "
    >
      {items.map(({ icon: Icon, id, label }, index) => {
        const isActive = active === id;

        const hoveredIndex = items.findIndex((i) => i.id === hovered);

        let scale = 1;

        if (hoveredIndex !== -1) {
          const distance = Math.abs(index - hoveredIndex);

          if (distance === 0) scale = 1.3;
          else if (distance === 1) scale = 1.12;
          else if (distance === 2) scale = 1.03;
        }

        return (
          <div
            key={id}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Desktop Tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="
                    hidden md:block

                    absolute top-14

                    px-2 py-1
                    text-xs

                    rounded-md
                    whitespace-nowrap

                    bg-[color:var(--surface)]
                    border border-[color:var(--border)]
                    text-[color:var(--text)]
                  "
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Pill */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-[color:var(--accent)]
                "
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}

            <motion.button
              onClick={() => scrollTo(id)}
              onHoverStart={() => setHovered(id)}
              onHoverEnd={() => setHovered(null)}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale,
                y: hovered === id ? -4 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
              className="
                relative z-10

                w-10 h-10
                sm:w-12 sm:h-12
                md:w-14 md:h-14

                flex items-center justify-center

                rounded-xl
              "
            >
              <motion.div
                animate={{
                  scale: hovered === id ? 1.1 : 1,
                }}
                className={
                  isActive ? "drop-shadow-[0_0_12px_var(--accent)]" : ""
                }
              >
                <Icon
                  className={`
                    w-4 h-4
                    sm:w-5 sm:h-5
                    md:w-[22px] md:h-[22px]
                    ${isActive ? "text-white" : "text-[color:var(--muted)]"}
                  `}
                />
              </motion.div>
            </motion.button>

            {/* Mobile Label */}
            <span
              className="
                mt-1
                text-[10px]
                md:hidden

                text-[color:var(--muted)]
              "
            >
              {label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}
