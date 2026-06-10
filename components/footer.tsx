"use client";

import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";
import BulbToggle from "@/components/BulbToggle";

export default function Footer() {
  const scrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(id);

    if (!container || !target) return;

    container.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  const items = [
    { icon: FaLinkedin, id: "linkedin" },
    { icon: FaGithub, id: "github" },
    { icon: FaFileDownload, id: "resume" }, // 👈 added resume
  ];

  return (
    <nav className="w-full flex items-center">
      <div className="w-full flex justify-center items-center gap-4">
        {items.map(({ icon: Icon, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-slate-400 hover:text-white transition p-2 rounded-lg hover:bg-slate-800"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </nav>
  );
}
