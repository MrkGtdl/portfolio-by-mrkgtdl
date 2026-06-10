"use client";

import { motion } from "framer-motion";
import Footer from "@/components/footer";

export default function Hero() {
  return (
    <section className="flex items-center justify-center px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full"
      >
        {/* FLOATING CARD */}
        <motion.div
          className="
            relative
            rounded-2xl
            bg-[color:var(--surface)]
            shadow-2xl
            p-10 md:p-14
            overflow-hidden
          "
          animate={{
            y: [0, -8, 0],
            rotate: [0, 0.4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.02,
            rotate: 0,
          }}
        >
          {/* CONTENT */}
          <div className="relative z-10">
            {/* IMAGE */}
            <div className="flex justify-center mb-6">
              <div className="w-72 h-72 bg-[color:var(--muted)]/20 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/prof.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* NAME */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-[color:var(--text)] mb-4 text-center"
            >
              Mark Kenneth Gatdula
            </motion.p>

            {/* DESCRIPTION */}
            <p className="mt-6 text-lg max-w-xl mx-auto text-center leading-relaxed text-[color:var(--muted)]">
              A Full Stack Developer passionate about building innovative,
              scalable, and user-focused digital solutions.
            </p>

            {/* ACCENT LINE */}
            <div className="mt-6 flex justify-center">
              <Footer />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
