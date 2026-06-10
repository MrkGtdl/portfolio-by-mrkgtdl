"use client";

import { motion, useAnimation, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ value, resetKey }: { value: number; resetKey: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.25,
      onUpdate(latest) {
        setCount(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, resetKey]);

  return (
    <span ref={ref} className="inline-block text-[color:var(--accent)]">
      {count}+
    </span>
  );
}

export default function About({ trigger }: { trigger: string }) {
  const controls = useAnimation();

  useEffect(() => {
    if (trigger !== "about") return;

    controls.set({ y: -50, opacity: 0 });

    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [trigger, controls]);

  return (
    <motion.section id="about" animate={controls} className="mt-6">
      {/* FLOATING CONTAINER */}
      <motion.div
        className="
          relative z-10
          min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-5rem)]
          max-w-7xl mx-auto
          backdrop-blur-md
          border border-[color:var(--border)]
          rounded-2xl
          shadow-2xl
          px-6 md:px-12 py-24
          flex flex-col justify-center
          bg-[color:var(--surface)]
        "
      >
        {/* HEADING */}
        <div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[color:var(--text)]">
            FULL STACK
          </h2>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[color:var(--accent)] -mt-2">
            DEVELOPER
          </h2>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--muted)]">
          Passionate about creating intuitive and engaging user experiences.
          Specializing in transforming ideas into beautifully crafted products.
        </p>

        {/* STATS */}
        <div className="mt-20 w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full auto-rows-fr">
            {[
              { label: "Years of Experience", value: 15 },
              { label: "Total Projects", value: 15 },
              { label: "Tech Stacks", value: 10 },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  h-full
                  bg-[color:var(--surface)]
                  backdrop-blur-xl
                  border border-[color:var(--border)]
                  rounded-2xl p-6 text-center
                  shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)]
                  hover:-translate-y-2
                  transition-all duration-300
                  flex flex-col justify-center
                "
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[color:var(--text)]">
                  <Counter value={item.value} resetKey={trigger} />
                </h3>

                <p className="mt-2 text-sm tracking-wide text-[color:var(--muted)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
