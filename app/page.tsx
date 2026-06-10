import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SideNav from "@/components/SideNav";
import Footer from "@/components/footer";
import BulbToggle from "@/components/BulbToggle";

export default function Home() {
  return (
    <main className="text-white min-h-screen flex">
      {/* LEFT */}
      <aside
        className="
    w-[35%]
    h-screen
    sticky top-0
    border-r border-[color:var(--border)]
    flex flex-col
    p-8
  "
      >
        {/* TOP */}
        <div className="flex justify-center">
          <div className="rounded px-4 py-2">
            <SideNav />
          </div>
        </div>

        {/* MIDDLE (CENTER AREA) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10">
          <Hero />

          <div className="rounded px-4 py-3">
            <BulbToggle />
          </div>
        </div>
      </aside>

      {/* RIGHT (IMPORTANT CHANGE: NO overflow container) */}
      <section
        className="
          w-[65%]
          min-h-screen
          p-8
          space-y-42
          pb-32
        "
      >
        <About />
        <Skills />
        <Projects />
        <Contact />
      </section>
    </main>
  );
}
