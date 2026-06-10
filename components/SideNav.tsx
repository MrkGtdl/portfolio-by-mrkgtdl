"use client";

import { Home, User, Folder, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const iconVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.25,
    y: -2,
    transition: { type: "tween", duration: 0.15, ease: "easeOut" },
  },
};

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

    const lenis = (window as unknown).lenis;

    if (!lenis) {
      // fallback
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
  // Stable active section tracking
  // ----------------------------
  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the MOST visible section (prevents flicker)
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
        flex items-center gap-10 px-3 py-2
        rounded-2xl
        bg-white/5 backdrop-blur-xl
        shadow-lg
      "
    >
      {items.map(({ icon: Icon, id, label }, index) => {
        const isActive = active === id;

        const hoveredIndex = items.findIndex((i) => i.id === hovered);

        let scale = 1;

        if (hoveredIndex !== -1) {
          const distance = Math.abs(index - hoveredIndex);

          if (distance === 0) scale = 1.5;
          else if (distance === 1) scale = 1.2;
          else if (distance === 2) scale = 1.05;
        }

        return (
          <div key={id} className="relative flex items-center justify-center">
            {/* Tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="
              absolute top-12
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

            {/* Active pill */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="
            absolute inset-0 rounded-xl
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
          w-14 h-14
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
                  size={22}
                  className={
                    isActive ? "text-white" : "text-[color:var(--muted)]"
                  }
                />
              </motion.div>
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
}
